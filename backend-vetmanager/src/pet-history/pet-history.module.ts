import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module'
import { PetHistoryController } from './pet-history.controller';
import { PetHistoryService } from './pet-history.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [PrismaModule,
        MulterModule.register({
			dest: './uploads',
		  })
    ],
    controllers: [PetHistoryController],
    providers: [PetHistoryService],
})
export class PetHistoryModule {}
