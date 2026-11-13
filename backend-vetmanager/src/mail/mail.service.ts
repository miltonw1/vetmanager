import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";

export interface SendMailParams {
	to: string;
	subject: string;
	html: string;
	replyTo?: string;
}

@Injectable()
export class MailService {
	private readonly logger = new Logger(MailService.name);
	private client: Resend | null = null;

	constructor(private readonly config: ConfigService) {}

	async send({ to, subject, html, replyTo }: SendMailParams): Promise<boolean> {
		const client = this.getClient();

		if (!client) {
			this.logger.warn(`RESEND_API_KEY no configurada. Se omitió el mail a ${to} ("${subject}").`);
			return false;
		}

		const from = this.config.get<string>("resendFrom");

		if (!from) {
			this.logger.error("RESEND_FROM no configurada. Se omitió el envío del mail.");
			return false;
		}

		try {
			const { data, error } = await client.emails.send({ from, to, subject, html, replyTo });

			if (error) {
				this.logger.error(`No se pudo enviar el mail a ${to}: ${error.message}`);
				return false;
			}

			this.logger.log(`Mail enviado a ${to} (id: ${data?.id}).`);
			return true;
		} catch (error) {
			this.logger.error(`Error inesperado enviando mail a ${to}`, error as Error);
			return false;
		}
	}

	private getClient(): Resend | null {
		if (this.client) return this.client;

		const apiKey = this.config.get<string>("resendApiKey");

		if (!apiKey) return null;

		this.client = new Resend(apiKey);
		return this.client;
	}
}
