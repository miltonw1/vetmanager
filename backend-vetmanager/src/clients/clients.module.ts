import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { ClientController } from "./clients.controller";
import { ClientService } from "./clients.service";

@Module({
	imports: [PrismaModule],
	controllers: [ClientController],
	providers: [ClientService],
})
export class ClientsModule {}
