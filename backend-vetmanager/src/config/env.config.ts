export const EnvConfiguration = () => ({
	port: Number(process.env.PORT),
	dbURL: process.env.DATABASE_URL,
	hashSaltRounds: Number(process.env.HASH_SALT_ROUNDS),
});
