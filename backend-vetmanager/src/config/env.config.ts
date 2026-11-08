export const EnvConfiguration = () => ({
	port: Number(process.env.PORT),
	dbURL: process.env.DATABASE_URL,
	hashSaltRounds: Number(process.env.HASH_SALT_ROUNDS),
	jwtSecret: process.env.JWT_SECRET,
	mode: process.env.MODE || 'development',
	mercadoPagoAccessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
	mpWebhookSecret: process.env.MP_WEBHOOK_SECRET,
	frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
	mpNotificationUrl: process.env.MP_NOTIFICATION_URL,
});
