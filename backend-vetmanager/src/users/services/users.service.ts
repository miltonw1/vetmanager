import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async create({ name, email }) {
		try {
			return await this.prisma.user.create({
				data: { name, email },
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
				throw new ConflictException("El correo ya está registrado");
			}
			throw error;
		}
	}

	findAll() {
		return this.prisma.user.findMany();
	}

	findOne(id: number) {
		return this.prisma.user.findFirstOrThrow({
			where: { id },
		});
	}

	update(id: number, data: User) {
		return this.prisma.user.update({
			where: { id },
			data,
		});
	}

	remove(id: number) {
		return this.prisma.user.delete({
			where: { id },
		});
	}

	findByEmail(email: string) {
		return this.prisma.user.findFirstOrThrow({
			where: { email },
			include: {
				passwords: {
					orderBy: [{ created_at: "desc" }],
				},
			},
		});
	}
}
