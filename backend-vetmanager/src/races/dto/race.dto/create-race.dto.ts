import { IsInt, IsString } from "class-validator";

export class CreateRaceDto {
	@IsString()
	name: string;

	@IsInt()
	species_id: number;
}
