import { CreatePetDto } from "./create-pet.dto";
import { IsInt } from "class-validator";

export class UpdatePetDto extends CreatePetDto {
	@IsInt()
	id: number;
}
