import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { RaceController } from "./races.controller";
import { RaceService } from "./races.service";

@Module({
	imports: [PrismaModule],
	controllers: [RaceController],
	providers: [RaceService],
})
export class RaceModule {}
