import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { EnvConfiguration } from "./config/env.config";
import { EnvConfigValidation } from "./config/env-config.validations";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClientsModule } from "./clients/clients.module";
import { PetsModule } from "./pets/pets.module";
import { SpeciesModule } from "./species/Species.module";
import { PrismaService } from "./prisma/prisma.service";
import { RaceModule } from "./races/races.module";
import { UsersModule } from "./users/users.module";
import { SessionModule } from "./session/session.module";
import { PetHistoryModule } from './pet-history/pet-history.module';


@Module({
	imports: [
		ConfigModule.forRoot({
			load: [EnvConfiguration],
			isGlobal: true,
			validate: EnvConfigValidation,
		}),
		PetsModule,
		PetHistoryModule,
		ClientsModule,
		SpeciesModule,
		RaceModule,
		UsersModule,
		SessionModule,
	],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
