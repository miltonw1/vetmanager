import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LoginLayout } from '../layouts/LoginLayout';
import { MailInput } from '../components/common/inputs';
import { forgotPassword } from '../services/session.services';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const isDisabled = useMemo(() => isFetching || !email, [isFetching, email]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsFetching(true);

    try {
      const response = await forgotPassword({ email });

      if (!response.ok) {
        setError(response.data?.message || 'No se pudo enviar el correo. Intenta nuevamente.');
        return;
      }

      setSent(true);
    } catch {
      setError('No se pudo conectar con el servidor. Intenta nuevamente.');
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center p-36">
        {sent ? (
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="text-green-700 max-w-sm">
              Si el correo está registrado, te enviamos un enlace para restablecer tu contraseña.
              Revisá tu bandeja de entrada y la carpeta de spam.
            </p>
            <Link className="text-blue-800 underline" to="/login">
              Volver a iniciar sesión
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-6">
            <h2 className="text-xl font-semibold text-blue-800">Restablecer contraseña</h2>
            <p className="text-sm text-gray-600 max-w-sm text-center">
              Ingresá el correo de tu cuenta y te enviaremos un enlace para crear una nueva contraseña.
            </p>

            <MailInput
              className="w-80"
              data-cy="forgot-email-field"
              id="forgot-email"
              label="Correo electrónico"
              placeholder="Correo electrónico"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <p className="text-red-600">{error}</p>

            <button
              className="rounded-lg border bg-blue-700 hover:bg-blue-800 border-transparent text-white mt-12 h-12 w-60"
              data-cy="forgot-submit-button"
              disabled={isDisabled}
              type="submit"
            >
              {isFetching ? '...' : 'Enviar enlace'}
            </button>

            <Link className="text-blue-800 underline" to="/login">
              Volver a iniciar sesión
            </Link>
          </form>
        )}
      </div>
    </LoginLayout>
  );
}
