import { CreateUserDto } from "./create-user.dto";
import { IsInt } from "class-validator";

export class UpdateUserDto extends CreateUserDto {
	@IsInt()
	id: number;
}
