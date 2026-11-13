export interface ResetPasswordTemplateParams {
	name?: string | null;
	resetUrl: string;
	expiresInMinutes: number;
}

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

export function resetPasswordTemplate({ name, resetUrl, expiresInMinutes }: ResetPasswordTemplateParams): string {
	const greeting = name ? `Hola ${escapeHtml(name)},` : "Hola,";
	const safeUrl = escapeHtml(resetUrl);

	return `<!DOCTYPE html>
<html lang="es">
	<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111827;">
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
			<tr>
				<td align="center">
					<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;padding:32px;">
						<tr>
							<td>
								<h1 style="margin:0 0 24px;font-size:22px;color:#1d4ed8;">Vet Manager</h1>
								<p style="margin:0 0 16px;font-size:16px;line-height:24px;">${greeting}</p>
								<p style="margin:0 0 24px;font-size:16px;line-height:24px;">
									Recibimos una solicitud para restablecer la contraseña de tu cuenta.
									Hacé clic en el siguiente botón para crear una nueva contraseña.
								</p>
								<p style="margin:0 0 24px;text-align:center;">
									<a href="${safeUrl}" style="display:inline-block;background-color:#1d4ed8;color:#ffffff;text-decoration:none;font-size:16px;font-weight:bold;padding:12px 32px;border-radius:8px;">
										Restablecer contraseña
									</a>
								</p>
								<p style="margin:0 0 16px;font-size:14px;line-height:22px;color:#374151;">
									Este enlace expira en ${expiresInMinutes} minutos y solo puede usarse una vez.
									Si no solicitaste el cambio, podés ignorar este mail.
								</p>
								<p style="margin:0 0 8px;font-size:12px;line-height:18px;color:#6b7280;">
									Si el botón no funciona, copiá y pegá este enlace en tu navegador:
								</p>
								<p style="margin:0;font-size:12px;line-height:18px;word-break:break-all;">
									<a href="${safeUrl}" style="color:#1d4ed8;">${safeUrl}</a>
								</p>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>`;
}
