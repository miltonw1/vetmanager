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

	findOne(id: number): Promise<Pet> {
		return this.prisma.pet.findUniqueOrThrow({
			where: {
				id,
			},
		});
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
