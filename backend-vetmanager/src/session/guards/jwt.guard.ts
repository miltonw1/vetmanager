import { ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PrismaService } from "../../prisma/prisma.service";

const READ_ONLY_ALLOWED_PATH = "/subscriptions";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	constructor(private readonly prisma: PrismaService) {
		super();
	}

	// biome-ignore lint/suspicious/noExplicitAny: matches @nestjs/passport signature
	handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
		return this.enforceSubscription(err, user, info, context, status) as TUser;
	}

	// biome-ignore lint/suspicious/noExplicitAny: matches @nestjs/passport signature
	private async enforceSubscription(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
		const result = super.handleRequest(err, user, info, context, status);

		if (!user) return result;

		const request = context.switchToHttp().getRequest();
		const method: string = request.method;

		if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
			return result;
		}

		const path: string = request.path ?? request.url ?? "";
		if (path.includes(READ_ONLY_ALLOWED_PATH)) {
			return result;
		}

		const dbUser = await this.prisma.user.findUnique({
			where: { id: user.userId },
			select: { plan_expires_at: true },
		});

		if (dbUser && dbUser.plan_expires_at < new Date()) {
			throw new HttpException(
				"Tu suscripción venció. Renová tu plan para poder seguir operando.",
				HttpStatus.PAYMENT_REQUIRED,
			);
		}

		return result;
	}
}
