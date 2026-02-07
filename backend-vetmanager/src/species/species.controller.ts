import { Body, Controller, Delete, Get, Param, Put, Post, NotFoundException, UseGuards } from "@nestjs/common";
import { Species } from "@prisma/client";
import { CreateSpeciesDto, SpeciesDto, UpdateSpeciesDto } from "./dto/species.dto";
import { SpeciesService } from "./species.service";
import { JwtAuthGuard } from "../session/guards/jwt.guard";
import { User } from "../session/decorators/user.decorator";
import { ActiveUser } from "../session/interfaces/active-user.interface";


@UseGuards(JwtAuthGuard)
@Controller("species")
export class SpeciesController {
	constructor(private readonly speciesService: SpeciesService) {}

	@Post()
	create(@Body() data: CreateSpeciesDto, @User() user: ActiveUser): Promise<SpeciesDto> {
		return this.speciesService.create(data as Species, user.userId);
	}

	@Get()
	findAll(@User() user: ActiveUser) {
		return this.speciesService.findAll(user.userId);
	}

	@Get(":id")
	async findOne(@Param("id") id: string, @User() user: ActiveUser): Promise<SpeciesDto> {
		try {
			return await this.speciesService.findOne(Number(id), user.userId);
		} catch {
			throw new NotFoundException("Species not found");
		}
	}

	@Put(":id")
	async update(@Param("id") id: string, @Body() data: UpdateSpeciesDto, @User() user: ActiveUser): Promise<SpeciesDto> {
		try {
			return await this.speciesService.update(Number(id), data as Species, user.userId);
		} catch {
			throw new NotFoundException("Species not found");
		}
	}

	@Delete(":id")
	async remove(@Param("id") id: string, @User() user: ActiveUser): Promise<SpeciesDto> {
		try {
			return await this.speciesService.remove(Number(id), user.userId);
		} catch {
			throw new NotFoundException("Species not found");
		}
	}

	// @Post(":specieId/races")
	// createRace(@Param("speciedId") speciedId: string, @Body() data: CreateSpeciesDto): Promise<SpeciesDto> {
	// 	return this.speciesService.createRace(data as Species);
	// }

	@Get(":speciesId/races")
	findAllRaces(@Param("speciesId") speciesId: string, @User() user: ActiveUser) {
		return this.speciesService.racesFromSpecies(Number(speciesId), user.userId);
	}
}
