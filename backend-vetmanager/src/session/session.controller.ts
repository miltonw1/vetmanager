import { Body, Controller, Get, Post, NotAcceptableException, UnauthorizedException, UseGuards, Request } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { hash } from "bcrypt";

import { JwtAuthGuard } from "./guards/jwt.guard";
import { LoginDto } from "./dto";
import { SessionService } from "./session.service";

import { CreateUserDto, UserDto } from "../users/dto";
import { UsersService } from "../users/services/users.service";
import { PasswordsService } from "../users/services/passwords.service";


async function waitTime (ms: number): Promise <void> {
	return new Promise((resolve) => setTimeout(() => resolve(), ms));
}


@Controller("session")
export class SessionController {
	constructor(
		private readonly sessionService: SessionService,
		private readonly usersService: UsersService,
		private readonly passwordsService: PasswordsService,
		private readonly config: ConfigService,
	) {}


	@Post("login")
	async login(@Body() data: LoginDto) {
		const user = await this.sessionService.validateUser(data);

		if (!user) {
			await waitTime(3000);
			throw new UnauthorizedException("Wrong credentials");
		}

		return this.sessionService.createSession(user);
	}

	@Post("create-admin")
	async createAdmin(@Body() data: CreateUserDto) {
		if (this.config.get("mode") === "production") {
			throw new NotAcceptableException("Not allowed in production mode");
		}
		const hashedPassword = await hash(data.password, this.config.get("hashSaltRounds"));

		const user = await this.usersService.create(data);

		const password = await this.passwordsService.create(user, hashedPassword);

		if (password) {
			return user as UserDto;
		}

		throw new NotAcceptableException("Wrong parameters");
	}

	@UseGuards(JwtAuthGuard)
	@Get("user")
	getCurrentUser(@Request() req) {
		return this.usersService.findOne(req.user.userId);
	}
}
