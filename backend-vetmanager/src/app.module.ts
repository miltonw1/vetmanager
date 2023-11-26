import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClientsModule } from "./clients/clients.module";
import { PetsModule } from "./pets/pets.module";
import { SpeciesModule } from "./species/Species.module";
import { PrismaService } from "./prisma/prisma.service";

@Module({
	imports: [PetsModule, ClientsModule, SpeciesModule],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
