import { IsString, IsOptional } from "class-validator";

export class CreateClientDto {
	@IsString()
	name: string;

	@IsString()
	phone: string;

	@IsString()
	@IsOptional()
	email: string;

	@IsString()
	@IsOptional()
	address: string;

	@IsString()
	@IsOptional()
	city: string;
}
