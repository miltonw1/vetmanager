import { IsString, IsOptional, IsEmail, IsNumberString } from "class-validator";

export class CreateClientDto {
	@IsString({message: "Nombre debe ser un string"})
	name: string;

	@IsNumberString()
	phone: string;

	@IsEmail()
	@IsOptional()
	email: string;

	@IsString()
	@IsOptional()
	address: string;

	@IsString()
	@IsOptional()
	city: string;

	@IsString({message: "Deuda debe ser un string"})
	@IsOptional()
	debt: string;
}
