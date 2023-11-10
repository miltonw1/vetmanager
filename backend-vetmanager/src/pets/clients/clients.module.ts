import { Module } from "@nestjs/common";
import { ClientService } from "./clients.service";
import { ClientController } from "./clients.controler";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [ClientController],
    providers: [ClientService],
})

export class ClientsModule {}