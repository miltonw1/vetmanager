import bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { User } from "@prisma/client"
import { UsersService } from "../users/services/users.service";
import { LoginDto } from "./dto";

@Injectable()
export class SessionService {
	constructor(private users: UsersService, private jwtService: JwtService) {}

	async validateUser({ email, password }: LoginDto) {
		const result = await this.users.findByEmail(email);

		if (!result) return null

		const { passwords, ...user } = result;

		const isSamePassword = bcrypt.compare(password, passwords[0].body);

		return isSamePassword
			? user as User
			: null
	}


	createSession(user: User) {
		const payload = { username: user.email, sub: user.id };
		//Se optiene cuando va a expirar el token sabiendo que va a durar 24 horas
		const expirationDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + 1);
		//Unix Timestamp esta basado en segundos y el getTime esta milisegundos. Vamos a enviar Unix Timestamp para ser mas uniformes por estandares
		const unixTimestamp = Math.floor(expirationDate.getTime() / 1000);
		const token =  this.jwtService.sign(payload)

		return {
			access_token: token,
			exp: unixTimestamp
		}
	}
}
