import { BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { compare } from "bcrypt";
import { createHash } from "node:crypto";

import { PasswordResetService } from "./password-reset.service";

function hashToken(token: string): string {
	return createHash("sha256").update(token).digest("hex");
}

describe("PasswordResetService", () => {
	let service: PasswordResetService;
	let prisma: {
		passwordResetToken: { create: jest.Mock; findUnique: jest.Mock; update: jest.Mock };
		password: { create: jest.Mock };
		$transaction: jest.Mock;
	};
	let users: { findByEmail: jest.Mock };
	let mail: { send: jest.Mock };
	let config: ConfigService;

	beforeEach(() => {
		prisma = {
			passwordResetToken: {
				create: jest.fn(),
				findUnique: jest.fn(),
				update: jest.fn(),
			},
			password: {
				create: jest.fn(),
			},
			$transaction: jest.fn(async (operations: Promise<unknown>[]) => Promise.all(operations)),
		};
		users = { findByEmail: jest.fn() };
		mail = { send: jest.fn().mockResolvedValue(true) };
		config = {
			get: (key: string) => ({ frontendUrl: "https://vet-manager.kaitech.com.ar", hashSaltRounds: 4 })[key],
		} as unknown as ConfigService;

		service = new PasswordResetService(prisma as never, users as never, mail as never, config);
	});

	describe("requestReset", () => {
		it("no hace nada si el email no existe", async () => {
			users.findByEmail.mockResolvedValue(null);

			await service.requestReset("nadie@test.com");

			expect(prisma.passwordResetToken.create).not.toHaveBeenCalled();
			expect(mail.send).not.toHaveBeenCalled();
		});

		it("guarda el token hasheado y envía el enlace por mail", async () => {
			users.findByEmail.mockResolvedValue({ id: 7, email: "user@test.com", name: "Milton" });
			prisma.passwordResetToken.create.mockResolvedValue({ id: 1 });

			await service.requestReset("user@test.com");

			expect(prisma.passwordResetToken.create).toHaveBeenCalledTimes(1);

			const createArgs = prisma.passwordResetToken.create.mock.calls[0][0];
			expect(createArgs.data.user_id).toBe(7);
			expect(createArgs.data.token_hash).toHaveLength(64);
			expect(createArgs.data.expires_at.getTime()).toBeGreaterThan(Date.now());

			expect(mail.send).toHaveBeenCalledTimes(1);

			const mailArgs = mail.send.mock.calls[0][0];
			expect(mailArgs.to).toBe("user@test.com");

			const rawToken = mailArgs.html.match(/token=([a-f0-9]{64})/)?.[1];
			expect(rawToken).toBeDefined();
			expect(createArgs.data.token_hash).toBe(hashToken(rawToken as string));
			expect(mailArgs.html).toContain("https://vet-manager.kaitech.com.ar/reset-password?token=");
		});
	});

	describe("resetPassword", () => {
		it("rechaza un token inexistente", async () => {
			prisma.passwordResetToken.findUnique.mockResolvedValue(null);

			await expect(service.resetPassword("token-invalido", "nueva")).rejects.toBeInstanceOf(BadRequestException);
			expect(prisma.password.create).not.toHaveBeenCalled();
		});

		it("rechaza un token ya usado", async () => {
			prisma.passwordResetToken.findUnique.mockResolvedValue({
				id: 1,
				user_id: 7,
				used_at: new Date(),
				expires_at: new Date(Date.now() + 60000),
			});

			await expect(service.resetPassword("token", "nueva")).rejects.toBeInstanceOf(BadRequestException);
		});

		it("rechaza un token expirado", async () => {
			prisma.passwordResetToken.findUnique.mockResolvedValue({
				id: 1,
				user_id: 7,
				used_at: null,
				expires_at: new Date(Date.now() - 1000),
			});

			await expect(service.resetPassword("token", "nueva")).rejects.toBeInstanceOf(BadRequestException);
		});

		it("guarda la nueva contraseña hasheada y marca el token como usado", async () => {
			const rawToken = "a".repeat(64);
			prisma.passwordResetToken.findUnique.mockResolvedValue({
				id: 3,
				user_id: 7,
				used_at: null,
				expires_at: new Date(Date.now() + 60000),
			});
			prisma.password.create.mockResolvedValue({ id: 10 });
			prisma.passwordResetToken.update.mockResolvedValue({ id: 3 });

			await service.resetPassword(rawToken, "nueva-contraseña");

			expect(prisma.passwordResetToken.findUnique).toHaveBeenCalledWith({
				where: { token_hash: hashToken(rawToken) },
			});

			const passwordArgs = prisma.password.create.mock.calls[0][0];
			expect(passwordArgs.data.user_id).toBe(7);
			expect(passwordArgs.data.body).not.toBe("nueva-contraseña");
			expect(await compare("nueva-contraseña", passwordArgs.data.body)).toBe(true);

			const updateArgs = prisma.passwordResetToken.update.mock.calls[0][0];
			expect(updateArgs.where).toEqual({ id: 3 });
			expect(updateArgs.data.used_at).toBeInstanceOf(Date);
		});
	});
});
