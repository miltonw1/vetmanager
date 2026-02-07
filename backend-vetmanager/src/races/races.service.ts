import { Injectable } from "@nestjs/common";
import { Race } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RaceService {
	constructor(private prisma: PrismaService) {}

	create(data: Race, userId: number): Promise<Race> {
		return this.prisma.race.create({
			data: {
				...data,
				user_id: userId
			},
		});
	}

	findAll(userId: number): Promise<Race[]> {
		return this.prisma.race.findMany({
			where: { user_id: userId }
		});
	}

	findOne(id: number, userId: number): Promise<Race> {
		return this.prisma.race.findFirstOrThrow({
			where: {
				id,
				user_id: userId
			},
		});
	}

	update(id: number, data: Race, userId: number): Promise<Race> {
		return this.prisma.race.update({
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

	remove(id: number, userId: number): Promise<Race> {
		return this.prisma.race.delete({
			where: {
				id,
				user_id: userId
			},
		});
	}
}
