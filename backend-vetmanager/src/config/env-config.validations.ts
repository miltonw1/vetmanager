import { z } from "zod";

const envConfigValidationSchema = z.object({
	PORT: z.string(),
	DATABASE_URL: z.string(),
});

export const EnvConfigValidation = envConfigValidationSchema.parse;
