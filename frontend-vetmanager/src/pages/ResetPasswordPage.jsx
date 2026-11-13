import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LoginLayout } from '../layouts/LoginLayout';
import { PasswordInput } from '../components/common/inputs';
import { resetPassword } from '../services/session.services';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [requestError, setRequestError] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [success, setSuccess] = useState(false);

  const isDisabled = useMemo(
    () => isFetching || !password || !confirmPassword,
    [isFetching, password, confirmPassword]
  );

  function validate() {
    const newErrors = {};

    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar la contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setRequestError('');

    if (!validate()) return;
    if (!token) {
      setRequestError('El enlace no es válido. Solicitá uno nuevo.');
      return;
    }

    setIsFetching(true);

    try {
      const response = await resetPassword({ token, newPassword: password });

      if (!response.ok) {
        setRequestError(response.data?.message || 'El enlace es inválido o expiró.');
        return;
      }

      setSuccess(true);
    } catch {
      setRequestError('No se pudo conectar con el servidor. Intenta nuevamente.');
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center p-36">
        {success ? (
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="text-green-700 max-w-sm">
              Tu contraseña se actualizó correctamente. Ya podés iniciar sesión con la nueva contraseña.
            </p>
            <Link className="text-blue-800 underline" to="/login">
              Ir a iniciar sesión
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-6">
            <h2 className="text-xl font-semibold text-blue-800">Nueva contraseña</h2>

            {!token ? (
              <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-red-600 max-w-sm">
                  El enlace no es válido o está incompleto. Solicitá uno nuevo.
                </p>
                <Link className="text-blue-800 underline" to="/forgot-password">
                  Solicitar nuevo enlace
                </Link>
              </div>
            ) : (
              <>
                <PasswordInput
                  className="w-80"
                  data-cy="reset-password-field"
                  id="reset-password"
                  label="Nueva contraseña"
                  placeholder="Nueva contraseña"
                  value={password}
                  error={errors.password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                />
                <PasswordInput
                  className="w-80"
                  data-cy="reset-confirm-password-field"
                  id="reset-confirm-password"
                  label="Confirmar contraseña"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  error={errors.confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                  }}
                />

                <p className="text-red-600">{requestError}</p>

                <button
                  className="rounded-lg border bg-blue-700 hover:bg-blue-800 border-transparent text-white mt-12 h-12 w-60"
                  data-cy="reset-submit-button"
                  disabled={isDisabled}
                  type="submit"
                >
                  {isFetching ? '...' : 'Guardar contraseña'}
                </button>

                <Link className="text-blue-800 underline" to="/login">
                  Volver a iniciar sesión
                </Link>
              </>
            )}
          </form>
        )}
      </div>
    </LoginLayout>
  );
}
