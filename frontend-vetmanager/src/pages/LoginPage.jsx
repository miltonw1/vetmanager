import { LoginLayout } from "../layouts/LoginLayout"


export default function LoginPage() {
  return (
    <LoginLayout>
      <div className="w-96 h-64 border-2 border-violet-800 flex flex-col items-center justify-center">
        <form className="flex flex-col items-center">
          <div className="my-2 flex flex-col">
            <label>Nombre de usuario</label>
            <input id="user-field"
              className="rounded-md border border-gray-300 text-white pl-2"
              placeholder="Usuario" />
          </div>
          <div className="my-2 flex flex-col">
            <label>Contraseña</label>
            <input id="password-field"
              type="password"
              className="rounded-md border border-gray-300 text-white pl-2"
              placeholder="Contraseña" />
          </div>
          <div className="my-2 flex flex-col">
            <button type="submit" className="p-1 w-32 rounded-lg border bg-violet-800 border-white-400">Login</button>
          </div>
        </form>
      </div>
    </LoginLayout>
  )
}
