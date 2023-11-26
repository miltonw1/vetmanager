import { Body, Controller, Delete, Get, Param, Put, Post, NotFoundException } from "@nestjs/common";
import { Species } from "@prisma/client";
import { CreateSpeciesDto, SpeciesDto, UpdateSpeciesDto } from "./dto/species.dto";
import { SpeciesService } from "./species.service";

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
			return await this.speciesService.update(+id, data as Species);
		} catch {
			throw new NotFoundException("Species not found");
		}
	}

	@Delete(":id")
	async remove(@Param("id") id: string): Promise<SpeciesDto> {
		try {
			return await this.speciesService.remove(+id);
		} catch {
			throw new NotFoundException("Species not found");
		}
	}
}
