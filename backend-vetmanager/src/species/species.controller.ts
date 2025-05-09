import { Body, Controller, Delete, Get, Param, Put, Post, NotFoundException, UseGuards } from "@nestjs/common";
import { Species } from "@prisma/client";
import { CreateSpeciesDto, SpeciesDto, UpdateSpeciesDto } from "./dto/species.dto";
import { SpeciesService } from "./species.service";
import { JwtAuthGuard } from "../session/guards/jwt.guard";


@UseGuards(JwtAuthGuard)
@Controller("species")
export class SpeciesController {
	constructor(private readonly speciesService: SpeciesService) {}

	@Post()
	create(@Body() data: CreateSpeciesDto): Promise<SpeciesDto> {
		return this.speciesService.create(data as Species);
	}

	@Get()
	findAll() {
		return this.speciesService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id") id: string): Promise<SpeciesDto> {
		try {
			return await this.speciesService.findOne(Number(id));
		} catch {
			throw new NotFoundException("Species not found");
		}
	}

	@Put(":id")
	async update(@Param("id") id: string, @Body() data: UpdateSpeciesDto): Promise<SpeciesDto> {
		try {
			return await this.speciesService.update(Number(id), data as Species);
		} catch {
			throw new NotFoundException("Species not found");
		}
	}

	@Delete(":id")
	async remove(@Param("id") id: string): Promise<SpeciesDto> {
		try {
			return await this.speciesService.remove(Number(id));
		} catch {
			throw new NotFoundException("Species not found");
		}
	}

	// @Post(":specieId/races")
	// createRace(@Param("speciedId") speciedId: string, @Body() data: CreateSpeciesDto): Promise<SpeciesDto> {
	// 	return this.speciesService.createRace(data as Species);
	// }

	@Get(":speciesId/races")
	findAllRaces(@Param("speciesId") speciesId: string) {
		return this.speciesService.racesFromSpecies(Number(speciesId));
	}
}
