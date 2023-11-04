export default function LoginComponent() {
    return (
        <div className="w-96 h-64 border-2 border-blue-400 flex flex-col items-center justify-center">
            <form className="flex flex-col items-center">
                <div className="my-2 flex flex-col">
                    <label>Nombre de usuario</label>
                    <input className="rounded-md border border-gray-300 text-black" placeholder="Usuario"></input>
                </div>
                <div className="my-2 flex flex-col">
                    <label>Contraseña</label>
                    <input className="rounded-md border border-gray-300 text-black" placeholder="Contraseña"></input>
                </div>
                <div className="my-2 flex flex-col">
                    <button type="submit" className="p-1 w-32 rounded-md border border-blue-400">Login</button>
                </div>
            </form>
        </div>
    )
}