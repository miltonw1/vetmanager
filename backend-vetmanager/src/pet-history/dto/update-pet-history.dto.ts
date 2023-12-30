import { PartialType } from '@nestjs/mapped-types';
import { CreatePetHistoryDto } from './create-pet-history.dto';
import { IsInt } from "class-validator";

export class UpdatePetHistoryDto extends PartialType(CreatePetHistoryDto) {
    @IsInt()
    id: number;
}
