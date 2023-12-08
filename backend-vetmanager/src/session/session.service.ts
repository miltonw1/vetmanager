import bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { User } from "@prisma/client";
import { UsersService } from "../users/services/users.service";
import { LoginDto } from "./dto";

@Injectable()
export class SessionService {
	constructor(private users: UsersService, private jwtService: JwtService) {}

	async validateUser({ email, password }: LoginDto) {
		const result = await this.users.findByEmail(email);

		if (!result) return null;

		const { passwords, ...user } = result;

		const isSamePassword = bcrypt.compare(password, passwords[0].body);

		return isSamePassword ? (user as User) : null;
	}

	createSession(user: User) {
		const payload = { username: user.email, sub: user.id };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
