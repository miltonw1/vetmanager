import { Controller, Get, Post, Body, Patch, Param, Delete, NotAcceptableException, UseGuards, Request, ForbiddenException, ParseIntPipe } from "@nestjs/common";
import { User } from "@prisma/client";
import { hash } from "bcrypt";

import { ConfigService } from "@nestjs/config";
import { UsersService } from "./services/users.service";
import { PasswordsService } from "./services/passwords.service";
import { CreateUserDto, UpdateUserDto, UserDto } from "./dto";
import { JwtAuthGuard } from "../session/guards/jwt.guard";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly passwordsService: PasswordsService,
		private readonly config: ConfigService,
	) {}

	@Post()
	async create(@Body() data: CreateUserDto) {
		const hashedPassword = await hash(data.password, this.config.get("hashSaltRounds"));

		const user = await this.usersService.create(data);

		const password = await this.passwordsService.create(user, hashedPassword);

		if (password) {
			return user as UserDto;
		}

		throw new NotAcceptableException("Wrong parameters");
	}

	@Get()
	findAll(): Promise<UserDto[]> {
		return this.usersService.findAll();
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number): Promise<UserDto> {
		return this.usersService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() data: UpdateUserDto, @Request() req): Promise<UserDto> {
		const userId = req.user.userId;

		if (userId !== Number(id)) {
			throw new ForbiddenException("You are not allowed to update this user");
		}

		return this.usersService.update(Number(id), data as User);
	}

	@Patch(":id/password")
	async updatePassword(@Param("id", ParseIntPipe) id: number, @Body() data: UpdatePasswordDto, @Request() req): Promise<UserDto> {
		const userId = req.user.userId;

		if (userId !== id) {
			throw new ForbiddenException("You are not allowed to update this user");
		}

		const user = await this.usersService.findOne(id);

		const password = await this.passwordsService.update(user, data.oldPassword, data.newPassword);

		if (password) {
			return user as UserDto;
		}

		throw new NotAcceptableException("Wrong parameters");
	}


	@Delete(":id")
	remove(@Param("id") id: string): Promise<UserDto> {
		return this.usersService.remove(Number(id));
	}
}
