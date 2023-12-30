import { IsString, IsOptional, IsNumber, IsInt } from "class-validator";

export class CreatePetHistoryDto {
    @IsInt()
    pet_id: number;

    @IsString()
    diagnostic: string;

    @IsOptional()
    @IsString()
    observation?: string;

    @IsOptional()
    @IsNumber()
    weight?: number;
}
