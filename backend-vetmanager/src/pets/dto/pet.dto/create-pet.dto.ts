import { IsString, IsInt, IsOptional, IsDate } from "class-validator";

export class CreatePetDto {
	@IsString()
	name: string;

	@IsString()
	@IsOptional()
	allergies: string;

	@IsString()
	@IsOptional()
	genre: string | null;

	@IsDate()
	@IsOptional()
	birthday: Date | null;

	@IsString()
	@IsOptional()
	blood_type: string | null;

	@IsString()
	life_status: string;

	@IsInt()
	race_id: number;

	@IsInt()
	client_id: number;
}
