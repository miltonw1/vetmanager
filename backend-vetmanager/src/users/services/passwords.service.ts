import { Injectable, BadRequestException } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { hash, compare } from "bcrypt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class PasswordsService {
	constructor(private prisma: PrismaService, private readonly config: ConfigService) {}

	create(user: User, password: string, version?: string) {
		return this.prisma.password.create({
			data: {
				user_id: user.id,
				body: password,
				version,
			},
		});
	}

	async update(user: User, oldPassword: string, newPassword: string, version?: string) {
		const latestPassword = await this.prisma.password.findFirst({
			where: { user_id: user.id },
			orderBy: { created_at: "desc" },
		});

		if (!latestPassword || !(await compare(oldPassword, latestPassword.body))) {
			throw new BadRequestException("Contraseña actual incorrecta.");
		}

		const hashedPassword = await hash(newPassword, this.config.get("hashSaltRounds"));
		return this.prisma.password.create({
			data: {
				user_id: user.id,
				body: hashedPassword,
				version,
			},
		});
	}
}

