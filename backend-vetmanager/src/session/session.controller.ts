import { Body, Controller, Get, Post, HttpCode, HttpStatus, NotAcceptableException, UnauthorizedException, UseGuards, Request } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { hash } from "bcrypt";

import { JwtAuthGuard } from "./guards/jwt.guard";
import { ForgotPasswordDto, LoginDto, ResetPasswordDto } from "./dto";
import { SessionService } from "./session.service";
import { PasswordResetService } from "./password-reset.service";

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
		private readonly passwordResetService: PasswordResetService,
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

	@Post("forgot-password")
	@HttpCode(HttpStatus.OK)
	async forgotPassword(@Body() data: ForgotPasswordDto) {
		await this.passwordResetService.requestReset(data.email);

		return {
			message: "Si el correo está registrado, te enviamos un enlace para restablecer tu contraseña.",
		};
	}

	@Post("reset-password")
	@HttpCode(HttpStatus.OK)
	async resetPassword(@Body() data: ResetPasswordDto) {
		await this.passwordResetService.resetPassword(data.token, data.newPassword);

		return { message: "Tu contraseña se actualizó correctamente." };
	}

	@UseGuards(JwtAuthGuard)
	@Get("user")
	getCurrentUser(@Request() req) {
		return this.usersService.findOne(req.user.userId);
	}
}
