import { Controller, Get, Post, Body, Patch, Param, Delete, NotAcceptableException } from "@nestjs/common";
import { User } from "@prisma/client";
import { hash } from "bcrypt";

import { ConfigService } from "@nestjs/config";
import { UsersService } from "./services/users.service";
import { PasswordsService } from "./services/passwords.service";
import { CreateUserDto, UpdateUserDto, UserDto } from "./dto";

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
	findOne(@Param("id") id: string): Promise<UserDto> {
		return this.usersService.findOne(Number(id));
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() data: UpdateUserDto): Promise<UserDto> {
		return this.usersService.update(Number(id), data as User);
	}

	@Delete(":id")
	remove(@Param("id") id: string): Promise<UserDto> {
		return this.usersService.remove(Number(id));
	}
}
