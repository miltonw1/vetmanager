import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module'
import { PetHistoryController } from './pet-history.controller';
import { PetHistoryService } from './pet-history.service';
import { ImageHistoryService } from './image-history.service';

@Module({
    imports: [PrismaModule],
    controllers: [PetHistoryController],
    providers: [PetHistoryService, ImageHistoryService],
})
export class PetHistoryModule {}
