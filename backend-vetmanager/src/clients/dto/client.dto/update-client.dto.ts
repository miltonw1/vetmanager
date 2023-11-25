import { IsInt } from "class-validator";
import { CreateClientDto } from "./create-client.dto";

export class UpdateClientDto extends CreateClientDto {
	@IsInt()
	id: number;
}
