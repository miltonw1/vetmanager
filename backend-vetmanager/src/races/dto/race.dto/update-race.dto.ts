import { IsInt } from "class-validator";
import { CreateRaceDto } from "./create-race.dto";

export class UpdateRaceDto extends CreateRaceDto {
	@IsInt()
	id: number;
}
