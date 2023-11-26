import { CreateSpeciesDto } from "./create-species.dto";
import { IsInt } from "class-validator";

export class UpdateSpeciesDto extends CreateSpeciesDto {
	@IsInt()
	id: number;
}
