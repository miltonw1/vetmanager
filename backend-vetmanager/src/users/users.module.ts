import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./services/users.service";
import { PasswordsService } from "./services/passwords.service";

@Module({
	imports: [PrismaModule],
	controllers: [UsersController],
	providers: [UsersService, PasswordsService],
})
export class UsersModule {}
