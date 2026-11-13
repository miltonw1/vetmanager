import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";

import { MailService } from "./mail.service";

jest.mock("resend", () => ({
	Resend: jest.fn(),
}));

const ResendMock = Resend as jest.MockedClass<typeof Resend>;

function createConfig(values: Record<string, string | undefined>): ConfigService {
	return {
		get: (key: string) => values[key],
	} as unknown as ConfigService;
}

describe("MailService", () => {
	let mockSend: jest.Mock;

	beforeEach(() => {
		mockSend = jest.fn();
		ResendMock.mockReset();
		ResendMock.mockImplementation(() => ({ emails: { send: mockSend } }) as unknown as Resend);
	});

	it("omite el envío cuando no hay API key", async () => {
		const service = new MailService(createConfig({}));

		const result = await service.send({ to: "a@b.com", subject: "Test", html: "<p>hi</p>" });

		expect(result).toBe(false);
		expect(ResendMock).not.toHaveBeenCalled();
		expect(mockSend).not.toHaveBeenCalled();
	});

	it("envía usando el remitente configurado", async () => {
		mockSend.mockResolvedValue({ data: { id: "mail_1" }, error: null });
		const service = new MailService(
			createConfig({ resendApiKey: "re_test", resendFrom: "Vet <no-reply@kaitech.com.ar>" }),
		);

		const result = await service.send({ to: "a@b.com", subject: "Test", html: "<p>hi</p>" });

		expect(result).toBe(true);
		expect(ResendMock).toHaveBeenCalledWith("re_test");
		expect(mockSend).toHaveBeenCalledWith({
			from: "Vet <no-reply@kaitech.com.ar>",
			to: "a@b.com",
			subject: "Test",
			html: "<p>hi</p>",
			replyTo: undefined,
		});
	});

	it("devuelve false si Resend responde con error", async () => {
		mockSend.mockResolvedValue({ data: null, error: { message: "invalid" } });
		const service = new MailService(createConfig({ resendApiKey: "re_test", resendFrom: "from@test.com" }));

		const result = await service.send({ to: "a@b.com", subject: "Test", html: "<p>hi</p>" });

		expect(result).toBe(false);
	});

	it("devuelve false si la llamada lanza una excepción", async () => {
		mockSend.mockRejectedValue(new Error("boom"));
		const service = new MailService(createConfig({ resendApiKey: "re_test", resendFrom: "from@test.com" }));

		const result = await service.send({ to: "a@b.com", subject: "Test", html: "<p>hi</p>" });

		expect(result).toBe(false);
	});
});
