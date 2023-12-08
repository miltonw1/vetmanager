import { z } from "zod";

const envConfigValidationSchema = z.object({
	PORT: z.string(),
	DATABASE_URL: z.string(),
	HASH_SALT_ROUNDS: z.string(),
	JWT_SECRET: z.string(),
});

export const EnvConfigValidation = envConfigValidationSchema.parse;
