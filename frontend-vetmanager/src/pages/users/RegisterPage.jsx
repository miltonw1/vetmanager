import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginLayout } from "../../layouts/LoginLayout";
import { TextInput, MailInput, PasswordInput } from "../../components/common/inputs";
import { useUserStore } from "@s/users.store";
import { useSessionStore } from "@s/session.store";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState('');

  const navigate = useNavigate();

  const create = useUserStore((store) => store.create);
  const getSession = useSessionStore((store) => store.getSession);
  const isAuthenticated = useSessionStore((store) => store.isAuthenticated);
  const isFetching = useUserStore((store) => store.request.fetching);

  const isDisabled = useMemo(
    () => isFetching || !name || !email || !password || !confirmPassword,
    [isFetching, name, email, password, confirmPassword]
  );

  function validate() {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'El formato del correo electrónico no es válido';
    }

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

  async function registerStore(event) {
    event.preventDefault();
    setRegisterError('');

    if (!validate()) return;

    try {
      await create({ name, email, password });

      await getSession({ email, password });

      if (isAuthenticated()) {
        navigate("/home");
      } else {
        setRegisterError("No se pudo iniciar sesión. Intenta ingresar manualmente.");
      }
    } catch (error) {
      setRegisterError(error.message || "No se pudo crear la cuenta.");
    }
  }

  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center p-36">
        <form onSubmit={registerStore} className="flex flex-col items-center justify-center gap-6">
          <TextInput
            className="w-80"
            data-cy="name-field"
            id="name"
            label="Nombre"
            placeholder="Nombre"
            value={name}
            error={errors.name}
            onChange={(event) => {
              setName(event.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
          />
          <MailInput
            className="w-80"
            data-cy="email-field"
            id="email"
            label="Correo electrónico"
            placeholder="Correo electrónico"
            value={email}
            error={errors.email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
            }}
          />
          <PasswordInput
            className="w-80"
            data-cy="password-field"
            id="password"
            label="Contraseña"
            placeholder="Contraseña"
            value={password}
            error={errors.password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
            }}
          />
          <PasswordInput
            className="w-80"
            data-cy="confirm-password-field"
            id="confirmPassword"
            label="Confirmar contraseña"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            error={errors.confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
            }}
          />

          <p className="text-red-600">{registerError}</p>

          <button
            className="rounded-lg border bg-violet-800 border-white-400 text-white mt-12 h-12 w-60"
            data-cy="register-button"
            disabled={isDisabled}
            type="submit"
          >
            {isFetching ? "..." : "Crear cuenta"}
          </button>

          <Link className="text-violet-800 underline" to="/login">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </form>
      </div>
    </LoginLayout>
  );
}
