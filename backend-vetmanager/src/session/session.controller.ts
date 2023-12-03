import { Body, Controller, Get, Post, NotAcceptableException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SessionService } from "./session.service";
import { LoginDto } from "./dto";

@Controller("session")
export class SessionController {
	constructor(private readonly sessionService: SessionService, private readonly config: ConfigService) {}

	@Post("login")
	async login(@Body() data: LoginDto) {
		try {
			const available = await this.sessionService.validateCredentials(data);

			if (available) {
				return this.sessionService.createSession(data);
			}

			throw new NotAcceptableException("Wrong credentials");
		} catch {
			throw new NotAcceptableException("Wrong credentials");
		}
	}

	@Get("user")
	getCurrentUser() {}
}
