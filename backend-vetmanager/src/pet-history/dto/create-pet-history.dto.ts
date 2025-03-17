import { IsString, IsOptional, IsNumber, IsInt, Min } from "class-validator";

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
    @Min(0)
    weight?: number;
}