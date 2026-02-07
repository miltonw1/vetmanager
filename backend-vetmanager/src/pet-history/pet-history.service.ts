import { Injectable } from '@nestjs/common';
import { PetHistory } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PetHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: PetHistory, userId: number): Promise<PetHistory> {
    return this.prisma.petHistory.create({
			data: {
				...data,
				user_id: userId
			},
		});
  }

  findAll(petId: number, userId: number): Promise<PetHistory[]> {
    return this.prisma.petHistory.findMany({
      where: { 
				pet_id: petId,
				user_id: userId
			},
      include: {
        images: true
      }
    });
  }

  findOne(id: number, userId: number): Promise<PetHistory> {
    return this.prisma.petHistory.findFirstOrThrow({
			where: {
				id,
				user_id: userId
			},
		});
  }

  update(id: number, data: PetHistory, userId: number): Promise<PetHistory> {
    return this.prisma.petHistory.update({
			where: {
				id,
				user_id: userId
			},
			data: {
				...data,
				user_id: userId
			},
		});
  }

  remove(id: number, userId: number): Promise<PetHistory> {
    return this.prisma.petHistory.delete({
			where: {
				id,
				user_id: userId
			},
		});
  }
}
