import { IsInt, IsString, IsOptional } from "class-validator";

export class ClientDto {
	id: number;
	name: string;
	phone: string;
	email: string | null;
	address: string | null;
	city: string | null;
}
