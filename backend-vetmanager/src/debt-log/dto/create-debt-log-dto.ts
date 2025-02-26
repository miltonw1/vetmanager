import { IsString, IsInt, IsNotEmpty } from "class-validator";


export class CreateDebtLogDto {
    @IsInt()
    @IsNotEmpty()
    client_id: number;

    @IsInt()
    @IsNotEmpty()
    user_id: number;

    @IsString()
    @IsNotEmpty()
    new_debt: string;

    @IsString()
    @IsNotEmpty()
    previous_debt: string;
}