import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { SpeciesController } from "./species.controller";
import { SpeciesService } from "./species.service";

@Module({
	imports: [PrismaModule],
	controllers: [SpeciesController],
	providers: [SpeciesService],
})

export class SpeciesModule {}