import { useState, useMemo } from 'react';
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
  const isAuthenticated = useSessionStore((store) => store.isAuthenticated);
  const isFetching = useSessionStore((store) => store.request.fetching);

  const isDisabled = useMemo(() => isFetching ||!email ||!password, [isFetching, email, password]);


  async function loginStore(event) {
    event.preventDefault();
    setloginError('');

    await getSession(loginData);

    if (isAuthenticated()) {
      navigate("/clients");
    }
    else {
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

          <p className="text-red-600">{loginError}</p>

          <button
            className="rounded-lg border bg-violet-800 border-white-400 text-white mt-12 h-12 w-60"
            data-cy="login-button"
            disabled={isDisabled}
            type="submit"
          >
            {isFetching ? "..." : "Login"}
          </button>
        </form>
      </div>
    </LoginLayout>
  );
}