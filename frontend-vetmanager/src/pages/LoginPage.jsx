import { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import { LoginLayout } from "../layouts/LoginLayout"
import { TextInput, PasswordInput } from "../components/common/inputs"
import * as sessionService from '../services/session.services'

export default function LoginPage() {
  const [ email, setEmail ] = useState('')
  const  [ password, setPassword ] = useState('')
  const navigate = useNavigate()

  const loginData = {
    email,
    password
  }

  function login(event) {
    event.preventDefault();
    sessionService.login(loginData)
      .then(response => {
        const token = response.access_token;
        const exp = response.exp;
        localStorage.setItem("token", token);
        localStorage.setItem("token expiration", exp)

        if (localStorage.getItem("token")) {
          navigate("/clients");
        } else {
          console.error("Error: Token no guardado correctamente.");
        }
      })
      .catch(error => {
        console.error("Error al iniciar sesión:", error);
      });
  }

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/clients");
  //   }
  // }, []);

  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center p-36">

        <form onSubmit={login}  className="flex flex-col items-center justify-center gap-6">
          <TextInput
            className="w-80"
            data-cy="user-name-field"
            id="username"
            label="Nombre de usuario"
            placeholder="Usuario"
            onChange = {event => setEmail(event.target.value)}
          />
          <PasswordInput
            className="w-80"
            data-cy="password-field"
            id="password"
            label="Contraseña"
            placeholder="Contraseña"
            onChange = {event => setPassword(event.target.value)}
          />
          <p>Si olvidate la contrasenia sos un mono.</p>
          <p>Royale with cheese</p>
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
  )
}
