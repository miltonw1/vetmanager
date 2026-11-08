import { z } from "zod";

const envConfigValidationSchema = z.object({
	PORT: z.string(),
	DATABASE_URL: z.string(),
	HASH_SALT_ROUNDS: z.string(),
	JWT_SECRET: z.string(),
	MODE: z.string(),
	MERCADO_PAGO_ACCESS_TOKEN: z.string(),
	MP_WEBHOOK_SECRET: z.string().optional(),
	FRONTEND_URL: z.string().optional(),
	MP_NOTIFICATION_URL: z.string().optional(),
});

export const EnvConfigValidation = envConfigValidationSchema.parse;
