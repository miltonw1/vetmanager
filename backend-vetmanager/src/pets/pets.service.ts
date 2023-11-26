import { Injectable } from "@nestjs/common";
import { Pet } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PetsService {
	constructor(private prisma: PrismaService) {}

	create(data: Pet): Promise<Pet> {
		return this.prisma.pet.create({
			data,
		});
	}

	findAll(): Promise<Pet[]> {
		return this.prisma.pet.findMany();
	}

	async findOne(id: number): Promise<Pet> {
		const pet = await this.prisma.pet.findUnique({
			where: {
				id,
			},
		})

		if (!pet) {
			throw new Error(`Pet (${id}) not found on DB`)
		}

		return pet
	}

	update(id: number, data: Pet): Promise<Pet> {
		return this.prisma.pet.update({
			where: {
				id,
			},
			data,
		});
	}

	remove(id: number): Promise<Pet> {
		return this.prisma.pet.delete({
			where: {
				id,
			},
		});
	}
}
