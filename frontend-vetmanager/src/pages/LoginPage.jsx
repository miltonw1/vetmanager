import { LoginLayout } from "../layouts/LoginLayout"

export default function LoginPage() {
  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center p-36">

        <form className="flex flex-col items-center justify-center gap-6">
          <div>
            <label className="block">
              Nombre de usuario
            </label>

            <input
              id="username"
              className="rounded-md border border-gray-300 text-white pl-2 h-10 w-80"
              placeholder="Usuario"
            />
          </div>

          <div>
            <label className="block">
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              className="rounded-md border border-gray-300 text-white pl-2 h-10 w-80"
              placeholder="Contraseña"
            />
          </div>


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
