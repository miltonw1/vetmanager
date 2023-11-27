import { Injectable } from "@nestjs/common";
import { Race } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RaceService {
	constructor(private prisma: PrismaService) {}

	create(data: Race): Promise<Race> {
		return this.prisma.race.create({
			data,
		});
	}

	findAll(): Promise<Race[]> {
		return this.prisma.race.findMany();
	}

	findOne(id: number): Promise<Race> {
		return this.prisma.race.findUniqueOrThrow({
			where: {
				id,
			},
		});
	}

	update(id: number, data: Race): Promise<Race> {
		return this.prisma.race.update({
			where: {
				id,
			},
			data,
		});
	}

	remove(id: number): Promise<Race> {
		return this.prisma.race.delete({
			where: {
				id,
			},
		});
	}
}
