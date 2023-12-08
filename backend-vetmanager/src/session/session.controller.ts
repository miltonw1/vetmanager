import { Body, Controller, Get, Post, NotAcceptableException, UseGuards, Request } from "@nestjs/common";
import { SessionService } from "./session.service";
import { UsersService } from "../users/services/users.service";
import { LoginDto } from "./dto";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Controller("session")
export class SessionController {
	constructor(private readonly sessionService: SessionService, private readonly userService: UsersService) {}

	@Post("login")
	async login(@Body() data: LoginDto) {
		try {
			const user = await this.sessionService.validateUser(data);

			if (user) {
				return this.sessionService.createSession(user);
			}

			throw new NotAcceptableException("Wrong credentials");
		} catch {
			throw new NotAcceptableException("Wrong credentials");
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get("user")
	getCurrentUser(@Request() req) {
		return this.userService.findOne(req.user.userId)
	}
}
