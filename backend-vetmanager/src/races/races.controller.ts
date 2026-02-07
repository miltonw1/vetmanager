import { Body, Controller, Delete, Get, Param, Put, Post, NotFoundException, UseGuards } from "@nestjs/common";
import { Race } from "@prisma/client";
import { CreateRaceDto, RaceDto, UpdateRaceDto } from "./dto/race.dto";
import { RaceService } from "./races.service";

import { JwtAuthGuard } from "../session/guards/jwt.guard";
import { User } from "../session/decorators/user.decorator";
import { ActiveUser } from "../session/interfaces/active-user.interface";


@UseGuards(JwtAuthGuard)
@Controller("races")
export class RaceController {
	constructor(private readonly raceService: RaceService) {}

	@Post()
	create(@Body() data: CreateRaceDto, @User() user: ActiveUser): Promise<RaceDto> {
		return this.raceService.create(data as Race, user.userId);
	}

	@Get()
	findAll(@User() user: ActiveUser) {
		return this.raceService.findAll(user.userId);
	}

	@Get(":id")
	async findOne(@Param("id") id: string, @User() user: ActiveUser): Promise<RaceDto> {
		try {
			return await this.raceService.findOne(Number(id), user.userId);
		} catch {
			throw new NotFoundException("Race not found");
		}
	}

	@Put(":id")
	async update(@Param("id") id: string, @Body() data: UpdateRaceDto, @User() user: ActiveUser): Promise<RaceDto> {
		try {
			return await this.raceService.update(Number(id), data as Race, user.userId);
		} catch {
			throw new NotFoundException("Race not found");
		}
	}

	@Delete(":id")
	async remove(@Param("id") id: string, @User() user: ActiveUser): Promise<RaceDto> {
		try {
			return await this.raceService.remove(Number(id), user.userId);
		} catch {
			throw new NotFoundException("Race not found");
		}
	}
}
