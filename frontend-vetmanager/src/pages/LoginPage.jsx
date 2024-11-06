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
        localStorage.setItem("token", token);

        navigate("/clients");
      })
      .catch(error => {
        console.error("Error al iniciar sesión:", error);
      });
  }


  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center p-36">

        <form onSubmit={login}  className="flex flex-col items-center justify-center gap-6">
          <TextInput
            className="w-80"
            id="username"
            label="Nombre de usuario"
            placeholder="Usuario"
            onChange = {event => setEmail(event.target.value)}
          />
          <PasswordInput
            className="w-80"
            id="password"
            label="Contraseña"
            placeholder="Contraseña"
            onChange = {event => setPassword(event.target.value)}
          />
          <p>Si olvidate la contrasenia sos un mono.</p>
          <p>Royale with cheese</p>
          <button
            type="submit"
            className="rounded-lg border bg-violet-800 border-white-400 text-white mt-12 h-12 w-60"
          >
            Login
          </button>
        </form>
      </div>
    </LoginLayout>
  )
}
