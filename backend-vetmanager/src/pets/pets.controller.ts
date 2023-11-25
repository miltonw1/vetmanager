import { BadRequestException, Body, Controller, Delete, Get, Param, Put, Post } from "@nestjs/common";
import { Pet } from "@prisma/client";
import { CreatePetDto, PetDto, UpdatePetDto } from "./dto/pet.dto";
import { PetsService } from "./pets.service";

@Controller("pets")
export class PetsController {
	constructor(private readonly petsService: PetsService) {}

	@Post()
	create(@Body() data: CreatePetDto): Promise<PetDto> {
		return this.petsService.create(data as Pet);
	}

	@Get()
	findAll() {
		return this.petsService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.petsService.findOne(+id);
	}

	@Put(":id")
	update(@Param("id") id: string, @Body() data: UpdatePetDto) {
		return this.petsService.update(+id, data as Pet);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.petsService.remove(+id);
	}
}
