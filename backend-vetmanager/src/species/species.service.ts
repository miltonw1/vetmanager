import { Injectable } from "@nestjs/common";
import { Species } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SpeciesService {
	constructor(private prisma: PrismaService) {}

	create(data: Species): Promise<Species> {
		return this.prisma.species.create({
			data,
		});
	}

	findAll(): Promise<Species[]> {
		return this.prisma.species.findMany();
	}

	findOne(id: number): Promise<Species> {
		return this.prisma.species.findUniqueOrThrow({
			where: {
				id,
			},
		});
	}

	update(id: number, data: Species): Promise<Species> {
		return this.prisma.species.update({
			where: {
				id,
			},
			data,
		});
	}

	remove(id: number): Promise<Species> {
		return this.prisma.species.delete({
			where: {
				id,
			},
		});
	}
}
