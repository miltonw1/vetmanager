import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginLayout } from "../layouts/LoginLayout";
import { TextInput, PasswordInput } from "../components/common/inputs";
import { useSessionStore } from "@s/session.store";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setloginError] = useState('');

  const navigate = useNavigate();

  const loginData = { email, password };

  const getSession = useSessionStore((store) => store.getSession);

  // @@@@@ Todo: mejorar los mensajes de errores aca y en el store de session
  async function loginStore(event) {
    event.preventDefault();
    setloginError('');

    const error = await getSession(loginData);

    if (error) {
        setloginError(error);
    } else if (localStorage.getItem("token")) {
        navigate("/clients");
    } else {
        setloginError("Usuario o contraseña incorrectos.");
    }
}

  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center p-36">
        <form onSubmit={loginStore} className="flex flex-col items-center justify-center gap-6">
          <TextInput
            className="w-80"
            data-cy="user-name-field"
            id="username"
            label="Nombre de usuario"
            placeholder="Usuario"
            onChange={(event) => setEmail(event.target.value)}
          />
          <PasswordInput
            className="w-80"
            data-cy="password-field"
            id="password"
            label="Contraseña"
            placeholder="Contraseña"
            onChange={(event) => setPassword(event.target.value)}
          />
          <p>Si olvidate la contrasenia sos un mono.</p>
          <p>Royale with cheese</p>
          {loginError && <p className="text-red-600">{loginError}</p>} {/* Mensaje de error */}

          <button
            className="rounded-lg border bg-violet-800 border-white-400 text-white mt-12 h-12 w-60"
            data-cy="login-button"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </LoginLayout>
  );
}