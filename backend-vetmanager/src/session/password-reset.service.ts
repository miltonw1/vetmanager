import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { hash } from "bcrypt";
import { createHash, randomBytes } from "node:crypto";

import { MailService } from "../mail/mail.service";
import { resetPasswordTemplate } from "../mail/templates/reset-password";
import { PrismaService } from "../prisma/prisma.service";
import { UsersService } from "../users/services/users.service";

const TOKEN_TTL_MINUTES = 60;

@Injectable()
export class PasswordResetService {
	private readonly logger = new Logger(PasswordResetService.name);

	constructor(
		private readonly prisma: PrismaService,
		private readonly users: UsersService,
		private readonly mail: MailService,
		private readonly config: ConfigService,
	) {}

	async requestReset(email: string): Promise<void> {
		const user = await this.users.findByEmail(email);

		if (!user) return;

		const token = randomBytes(32).toString("hex");
		const expiresAt = new Date(Date.now() + TOKEN_TTL_MINUTES * 60 * 1000);

		await this.prisma.passwordResetToken.create({
			data: {
				user_id: user.id,
				token_hash: this.hashToken(token),
				expires_at: expiresAt,
			},
		});

		const frontendUrl = (this.config.get<string>("frontendUrl") || "http://localhost:5173").replace(/\/$/, "");
		const resetUrl = `${frontendUrl}/reset-password?token=${token}`;

		const sent = await this.mail.send({
			to: user.email,
			subject: "Restablecé tu contraseña de Vet Manager",
			html: resetPasswordTemplate({ name: user.name, resetUrl, expiresInMinutes: TOKEN_TTL_MINUTES }),
		});

		if (!sent && this.config.get<string>("mode") !== "production") {
			this.logger.warn(`Mail no enviado. Enlace de restablecimiento (solo local): ${resetUrl}`);
		}
	}

	async resetPassword(token: string, newPassword: string): Promise<void> {
		const resetToken = await this.prisma.passwordResetToken.findUnique({
			where: { token_hash: this.hashToken(token) },
		});

		if (!resetToken || resetToken.used_at || resetToken.expires_at.getTime() <= Date.now()) {
			throw new BadRequestException("El enlace de restablecimiento es inválido o expiró.");
		}

		const hashedPassword = await hash(newPassword, this.config.get("hashSaltRounds"));

		await this.prisma.$transaction([
			this.prisma.password.create({
				data: {
					user_id: resetToken.user_id,
					body: hashedPassword,
				},
			}),
			this.prisma.passwordResetToken.update({
				where: { id: resetToken.id },
				data: { used_at: new Date() },
			}),
		]);
	}

	private hashToken(token: string): string {
		return createHash("sha256").update(token).digest("hex");
	}
}
