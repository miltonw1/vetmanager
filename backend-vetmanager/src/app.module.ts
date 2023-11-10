import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PetsModule } from './pets/pets.module';
import { ClientsModule } from './pets/clients/clients.module';

@Module({
  imports: [PetsModule, ClientsModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
  ],
})
export class AppModule {}
