import { IsInt, IsString } from "class-validator";

export class ClientDto {
    @IsString()
    name: string;
    @IsString()
    email: String;
    @IsString()
    address: String;
    @IsString()
    city: String;
}