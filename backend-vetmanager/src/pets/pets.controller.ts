import { Body, Controller, Delete, Get, Param, Put, Post, NotFoundException, UseGuards } from "@nestjs/common";
import { Pet, Prisma } from "@prisma/client";
import { CreatePetDto, PetDto, UpdatePetDto } from "./dto/pet.dto";
import { PetsService } from "./pets.service";
import { JwtAuthGuard } from "../session/guards/jwt.guard";


function toSchema(data: CreatePetDto | UpdatePetDto) {
	return {
		...data,
		weight: data.weight ? new Prisma.Decimal(data.weight) : null,
	} as Pet;
}

function fromSchema(schema: Pet) {
	return {
		...schema,
		weight: schema.weight ? Number(schema.weight) : null,
	} as PetDto;
}

@UseGuards(JwtAuthGuard)
@Controller("pets")
export class PetsController {
	constructor(private readonly petsService: PetsService) {}

	@Post()
	create(@Body() data: CreatePetDto): Promise<PetDto> {
		return this.petsService.create(toSchema(data)).then(fromSchema);
	}

	@Get()
	findAll() {
		return this.petsService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id") id: string): Promise<PetDto> {
		try {
			return await this.petsService.findOne(Number(id)).then(fromSchema);
		} catch {
			throw new NotFoundException("Pet not found");
		}
	}

	@Put(":id")
	async update(@Param("id") id: string, @Body() data: UpdatePetDto): Promise<PetDto> {
		try {
			return await this.petsService.update(Number(id), toSchema(data)).then(fromSchema);
		} catch {
			throw new NotFoundException("Pet not found");
		}
	}

	@Delete(":id")
	async remove(@Param("id") id: string): Promise<PetDto> {
		try {
			return await this.petsService.remove(Number(id)).then(fromSchema);
		} catch {
			throw new NotFoundException("Pet not found");
		}
	}
}
