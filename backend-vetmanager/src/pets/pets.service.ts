import { Injectable } from "@nestjs/common";
import { Pet } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PetsService {
	constructor(private prisma: PrismaService) {}

	create(data: Pet, userId: number): Promise<Pet> {
		return this.prisma.pet.create({
			data: {
				...data,
				user_id: userId
			},
		});
	}

	findAll(userId: number): Promise<Pet[]> {
		return this.prisma.pet.findMany({
			where: { user_id: userId }
		});
	}

	findOne(id: number, userId: number): Promise<Pet> {
		return this.prisma.pet.findFirstOrThrow({
			where: {
				id,
				user_id: userId
			},
		});
	}

	update(id: number, data: Pet, userId: number): Promise<Pet> {
		return this.prisma.pet.update({
			where: {
				id,
				user_id: userId
			},
			data: {
				...data,
				user_id: userId // Aseguramos que no se cambie el dueño por error
			},
		});
	}

	remove(id: number, userId: number): Promise<Pet> {
		return this.prisma.pet.delete({
			where: {
				id,
				user_id: userId
			},
		});
	}
}
