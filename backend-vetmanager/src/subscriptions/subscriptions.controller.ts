import { Body, Controller, Get, Logger, Post, Query, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InvalidWebhookSignatureError, WebhookSignatureValidator } from "mercadopago";
import { JwtAuthGuard } from "../session/guards/jwt.guard";
import { User } from "../session/decorators/user.decorator";
import { ActiveUser } from "../session/interfaces/active-user.interface";
import { CreatePreferenceDto } from "./dto";
import { SubscriptionsService } from "./subscriptions.service";

@Controller("subscriptions")
export class SubscriptionsController {
	private readonly logger = new Logger(SubscriptionsController.name);

	constructor(
		private readonly subscriptionsService: SubscriptionsService,
		private readonly config: ConfigService,
	) {}

	@UseGuards(JwtAuthGuard)
	@Get("plans")
	getPlans() {
		return this.subscriptionsService.getPlans();
	}

	@UseGuards(JwtAuthGuard)
	@Get("status")
	getStatus(@User() user: ActiveUser) {
		return this.subscriptionsService.getStatus(user.userId);
	}

	@UseGuards(JwtAuthGuard)
	@Post("create")
	create(@Body() data: CreatePreferenceDto, @User() user: ActiveUser) {
		return this.subscriptionsService.createPreference(user.userId, data.plan);
	}

	@UseGuards(JwtAuthGuard)
	@Post("verify")
	async verify(
		@Body("subscription_id") subscriptionId: string | number | undefined,
		@Body("payment_id") paymentId: string | undefined,
		@User() user: ActiveUser,
	) {
		const parsedSubscriptionId = subscriptionId ? Number(subscriptionId) : undefined;
		return this.subscriptionsService.verifyPayment(user.userId, parsedSubscriptionId, paymentId);
	}

	@Post("webhook")
	async webhook(@Query() query: Record<string, string>, @Body() body: Record<string, unknown>) {
		const type = (query.type ?? query.topic ?? (body?.type as string)) || "";
		const dataId =
			query["data.id"] ?? query.id ?? ((body?.data as Record<string, unknown>)?.id as string) ?? "";

		if (type !== "payment" || !dataId) {
			return { received: true };
		}

		const secret = this.config.get<string>("mpWebhookSecret");

		if (secret) {
			try {
				WebhookSignatureValidator.validate({
					xSignature: query["x-signature"] ?? "",
					xRequestId: query["x-request-id"] ?? "",
					dataId: String(dataId),
					secret,
					toleranceSeconds: 300,
				});
			} catch (error) {
				if (error instanceof InvalidWebhookSignatureError) {
					this.logger.warn("Webhook con firma inválida");
					return { received: true };
				}
				throw error;
			}
		}

		try {
			await this.subscriptionsService.applyPayment(String(dataId));
		} catch (error) {
			this.logger.error(`Error procesando pago ${dataId}`, error as Error);
		}

		return { received: true };
	}
}
