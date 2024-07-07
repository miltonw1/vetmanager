import { Injectable } from '@nestjs/common';
import { PetHistoryImage } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImageHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: PetHistoryImage): Promise<PetHistoryImage> {
    return this.prisma.petHistoryImage.create({
			data,
		});
  }

  findAll(pet_history_id: number): Promise<PetHistoryImage[]> {
    return this.prisma.petHistoryImage.findMany({
      where: { pet_history_id: pet_history_id },
    });
  }

}
