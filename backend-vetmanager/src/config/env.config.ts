export const EnvConfiguration = () => ({
	port: Number(process.env.PORT),
	dbURL: process.env.DATABASE_URL,
});
