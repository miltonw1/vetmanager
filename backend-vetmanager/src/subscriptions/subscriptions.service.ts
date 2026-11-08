import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import MercadoPagoConfig, { Payment, Preference } from "mercadopago";
import { PrismaService } from "../prisma/prisma.service";
import { Plan, PLANS, findPlan } from "./plans";

@Injectable()
export class SubscriptionsService {
	private readonly mpClient: MercadoPagoConfig;

	constructor(
		private readonly prisma: PrismaService,
		private readonly config: ConfigService,
	) {
		this.mpClient = new MercadoPagoConfig({
			accessToken: this.config.get<string>("mercadoPagoAccessToken") ?? "",
			options: { timeout: 8000 },
		});
	}

	getPlans(): Plan[] {
		return PLANS;
	}

	async getStatus(userId: number) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: { plan_expires_at: true, is_trial: true },
		});

		if (!user) throw new NotFoundException("Usuario no encontrado");

		const now = new Date();
		const active = user.plan_expires_at > now;
		const daysRemaining = active
			? Math.ceil((user.plan_expires_at.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
			: 0;

		return {
			plan_expires_at: user.plan_expires_at,
			is_trial: user.is_trial,
			active,
			days_remaining: daysRemaining,
		};
	}

	async createPreference(userId: number, planId: string) {
		const plan = findPlan(planId);

		if (!plan) throw new BadRequestException("Plan inválido");

		const frontendUrl = (this.config.get<string>("frontendUrl") ?? "").replace(/\/$/, "");
		const notificationUrl = this.config.get<string>("mpNotificationUrl");
		const isPublicUrl =
			/^https:\/\//i.test(frontendUrl) && !/localhost|127\.0\.0\.1/i.test(frontendUrl);

		const subscription = await this.prisma.subscription.create({
			data: {
				user_id: userId,
				plan: plan.id,
				price: plan.price,
				days: plan.days,
				status: "pending",
			},
		});

		const preference = new Preference(this.mpClient);

		const response = await preference.create({
			body: {
				items: [
					{
						id: plan.id,
						title: `Vet Manager - Plan ${plan.title}`,
						description: plan.description,
						quantity: 1,
						unit_price: plan.price,
						currency_id: plan.currency,
					},
				],
				external_reference: String(subscription.id),
				...(isPublicUrl ? { auto_return: "approved" as const } : {}),
				back_urls: {
					success: `${frontendUrl}/plans?status=approved&subscription_id=${subscription.id}`,
					pending: `${frontendUrl}/plans?status=pending&subscription_id=${subscription.id}`,
					failure: `${frontendUrl}/plans?status=failure&subscription_id=${subscription.id}`,
				},
				...(notificationUrl ? { notification_url: notificationUrl } : {}),
				metadata: { user_id: userId, plan: plan.id, subscription_id: subscription.id },
			},
		});

		if (response.id) {
			await this.prisma.subscription.update({
				where: { id: subscription.id },
				data: { mp_preference_id: response.id },
			});
		}

		return {
			subscription_id: subscription.id,
			init_point: response.init_point,
			sandbox_init_point: response.sandbox_init_point,
		};
	}

	async getPayment(paymentId: string | number) {
		const payment = new Payment(this.mpClient);
		return payment.get({ id: paymentId });
	}

	async verifyPayment(userId: number, subscriptionId?: number, paymentId?: string) {
		let applied = false;

		if (paymentId) {
			applied = (await this.applyPayment(paymentId)).applied;
		} else if (subscriptionId) {
			const subscription = await this.prisma.subscription.findFirst({
				where: { id: subscriptionId, user_id: userId },
			});

			if (!subscription) throw new NotFoundException("Suscripción no encontrada");

			if (subscription.status !== "approved") {
				const found = await this.searchPaymentByReference(String(subscription.id));
				if (found) applied = (await this.applyPayment(found)).applied;
			}
		} else {
			applied = await this.syncPending(userId);
		}

		const status = await this.getStatus(userId);
		return { ...status, applied };
	}

	private async syncPending(userId: number): Promise<boolean> {
		const pending = await this.prisma.subscription.findMany({
			where: { user_id: userId, status: "pending" },
			orderBy: { created_at: "desc" },
			take: 10,
		});

		let applied = false;

		for (const subscription of pending) {
			try {
				const paymentId = await this.searchPaymentByReference(String(subscription.id));
				if (paymentId) {
					const result = await this.applyPayment(paymentId);
					if (result.applied) applied = true;
				}
			} catch {
				// Ignoramos errores individuales (p. ej. el pago todavía no existe en MP)
			}
		}

		return applied;
	}

	private async searchPaymentByReference(externalReference: string): Promise<string | null> {
		const payment = new Payment(this.mpClient);
		const search = await payment.search({
			options: { external_reference: externalReference, sort: "date_created", criteria: "desc", limit: 10 },
		});

		const approved = search.results?.find((item) => item.status === "approved");
		return approved?.id ? String(approved.id) : null;
	}

	async applyPayment(paymentId: string | number) {
		const payment = await this.getPayment(paymentId);

		if (payment.status !== "approved") {
			return { applied: false, status: payment.status };
		}

		const externalReference = payment.external_reference;
		if (!externalReference) return { applied: false, status: payment.status };

		const subscription = await this.prisma.subscription.findUnique({
			where: { id: Number(externalReference) },
		});

		if (!subscription) return { applied: false, status: payment.status };
		if (subscription.status === "approved") return { applied: false, status: "approved" };

		const user = await this.prisma.user.findUnique({
			where: { id: subscription.user_id },
			select: { plan_expires_at: true },
		});

		if (!user) return { applied: false, status: payment.status };

		const now = new Date();
		const base = user.plan_expires_at > now ? user.plan_expires_at : now;
		const newExpiration = new Date(base);
		newExpiration.setDate(newExpiration.getDate() + subscription.days);

		await this.prisma.$transaction([
			this.prisma.subscription.update({
				where: { id: subscription.id },
				data: { status: "approved", mp_payment_id: payment.id ? String(payment.id) : null },
			}),
			this.prisma.user.update({
				where: { id: subscription.user_id },
				data: { plan_expires_at: newExpiration, is_trial: false },
			}),
		]);

		return { applied: true, status: "approved" };
	}
}
