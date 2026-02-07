import { Injectable } from "@nestjs/common";
import { Species } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SpeciesService {
	constructor(private prisma: PrismaService) {}

	create(data: Species, userId: number): Promise<Species> {
		return this.prisma.species.create({
			data: {
				...data,
				user_id: userId
			},
		});
	}

	findAll(userId: number): Promise<Species[]> {
		return this.prisma.species.findMany({
			where: { user_id: userId }
		});
	}

	findOne(id: number, userId: number): Promise<Species> {
		return this.prisma.species.findFirstOrThrow({
			where: {
				id,
				user_id: userId
			},
		});
	}

	update(id: number, data: Species, userId: number): Promise<Species> {
		return this.prisma.species.update({
			where: {
				id,
				user_id: userId
			},
			data: {
				...data,
				user_id: userId
			},
		});
	}

	remove(id: number, userId: number): Promise<Species> {
		return this.prisma.species.delete({
			where: {
				id,
				user_id: userId
			},
		});
	}

	// createRace() {}

	async racesFromSpecies(id: number, userId: number) {
		const species = await this.prisma.species.findFirstOrThrow({ 
			where: { id, user_id: userId },
			include: { races: true }
		});

		return species.races;
	}
}
