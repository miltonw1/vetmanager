import { Injectable } from '@nestjs/common';
import { PetHistory } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PetHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: PetHistory): Promise<PetHistory> {
    return this.prisma.petHistory.create({
			data,
		});
  }

  findAll(petId: number): Promise<PetHistory[]> {
    return this.prisma.petHistory.findMany({
      where: { pet_id: petId }
    });
  }

  findOne(id: number): Promise<PetHistory> {
    return this.prisma.petHistory.findUniqueOrThrow({
			where: {
				id,
			},
		});
  }

  update(id: number, data: PetHistory): Promise<PetHistory> {
    return this.prisma.petHistory.update({
			where: {
				id,
			},
			data,
		});
  }

  remove(id: number): Promise<PetHistory> {
    return this.prisma.petHistory.delete({
			where: {
				id,
			},
		});
  }
}
