import { Body, Controller, Delete, Get, Param, Put, Post, NotFoundException } from "@nestjs/common";
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
	async findOne(@Param("id") id: string): Promise<PetDto> {
		try {
			return await this.petsService.findOne(Number(id));
		} catch {
			throw new NotFoundException("Pet not found");
		}
	}

	@Put(":id")
	async update(@Param("id") id: string, @Body() data: UpdatePetDto): Promise<PetDto> {
		try{
		return await this.petsService.update(+id, data as Pet);
		} catch {
			throw new NotFoundException("Pet not found");
		}
	}

	@Delete(":id")
	async remove(@Param("id") id: string): Promise<PetDto> {
		try{
		return await this.petsService.remove(+id);
		} catch {
			throw new NotFoundException("Pet not found")

		}
	}
}
