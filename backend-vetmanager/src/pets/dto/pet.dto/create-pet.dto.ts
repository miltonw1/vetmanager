import { IsString, IsInt, IsOptional, IsDate, IsEnum, IsNumber } from "class-validator";
import { Genre, LifeStatus } from "../../types";

export class CreatePetDto {
	@IsString()
	name: string;

	@IsNumber()
	@IsOptional()
	weight?: number;

	@IsInt()
	species_id: number;

	@IsString()
	@IsOptional()
	allergies: string;

	@IsEnum(Genre)
	@IsOptional()
	genre: Genre;

	@IsDate()
	@IsOptional()
	birthday: Date | null;

	@IsString()
	@IsOptional()
	blood_type: string | null;

	@IsEnum(LifeStatus)
	@IsOptional()
	life_status: LifeStatus;

	@IsInt()
	@IsOptional()
	race_id?: number;

	@IsInt()
	client_id: number;
}
