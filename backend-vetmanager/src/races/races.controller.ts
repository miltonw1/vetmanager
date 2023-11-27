import { Body, Controller, Delete, Get, Param, Put, Post, NotFoundException } from "@nestjs/common";
import { Race } from "@prisma/client";
import { CreateRaceDto, RaceDto, UpdateRaceDto } from "./dto/race.dto";
import { RaceService } from "./races.service";

@Controller("races")
export class RaceController {
	constructor(private readonly raceService: RaceService) {}

	@Post()
	create(@Body() data: CreateRaceDto): Promise<RaceDto> {
		return this.raceService.create(data as Race);
	}

	@Get()
	findAll() {
		return this.raceService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id") id: string): Promise<RaceDto> {
		try {
			return await this.raceService.findOne(Number(id));
		} catch {
			throw new NotFoundException("Race not found");
		}
	}

	@Put(":id")
	async update(@Param("id") id: string, @Body() data: UpdateRaceDto): Promise<RaceDto> {
		try {
			return await this.raceService.update(+id, data as Race);
		} catch {
			throw new NotFoundException("Race not found");
		}
	}

	@Delete(":id")
	async remove(@Param("id") id: string): Promise<RaceDto> {
		try {
			return await this.raceService.remove(+id);
		} catch {
			throw new NotFoundException("Race not found");
		}
	}
}
