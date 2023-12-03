import bcrypt from "bcrypt";

import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/services/users.service";
import { LoginDto } from "./dto";

@Injectable()
export class SessionService {
	constructor(private users: UsersService) {}

	async validateCredentials({ email, password }: LoginDto) {
		const user = await this.users.findByEmail(email);

		const hashed = user.passwords[0];

		return bcrypt.compare(password, hashed.body);
	}

	async createSession({ email }) {
		// nuevo token
	}
}
