import { LoginLayout } from "../layouts/LoginLayout"
import { TextInput, PasswordInput } from "../components/common/inputs"

export default function LoginPage() {
  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center p-36">

        <form className="flex flex-col items-center justify-center gap-6">
          <TextInput
            className="w-80"
            id="username"
            label="Nombre de usuario"
            placeholder="Usuario"
          />
          <PasswordInput
            className="w-80"
            id="password"
            label="Contraseña"
            placeholder="Contraseña"
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
