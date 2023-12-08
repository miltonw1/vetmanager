import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { PrismaModule } from "../prisma/prisma.module";
import { UsersModule } from "../users/users.module";

import { SessionService } from "./session.service";
import { UsersService } from "../users/services/users.service";

import { SessionController } from "./session.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
	imports: [
		PrismaModule,
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '24h' },
		}),
	],
	controllers: [SessionController],
	providers: [
		SessionService,
		UsersService,
		JwtStrategy,
	],
})
export class SessionModule {}
