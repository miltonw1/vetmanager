import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class PasswordsService {
	constructor(private prisma: PrismaService) {}

	create(user: User, password: string, version?: string) {
		return this.prisma.password.create({
			data: {
				user_id: user.id,
				body: password,
				version,
			},
		});
	}
}
