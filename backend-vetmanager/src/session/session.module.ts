import { Module } from "@nestjs/common";
import { SessionService } from "./session.service";
import { SessionController } from "./session.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/services/users.service";

@Module({
	imports: [PrismaModule, UsersModule],
	controllers: [SessionController],
	providers: [SessionService, UsersService],
})
export class SessionModule {}
