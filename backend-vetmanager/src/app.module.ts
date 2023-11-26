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

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [EnvConfiguration],
			isGlobal: true,
			validate: EnvConfigValidation,
		}),
		PetsModule,
		ClientsModule,
		SpeciesModule,
	],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
