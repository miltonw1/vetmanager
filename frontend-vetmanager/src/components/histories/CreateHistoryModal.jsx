import { TextInput } from "../common/inputs/TextInput";

export function CreateHistoryModal({}) {
	return (
		<>
			<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
				<div className="bg-cyan-800 h-[70%] w-[30%] p-5 rounded flex flex-col justify-between items-center gap-5 relative">
						<h2 className="text-xl font-bold">Nueva historia para "nombre"</h2>
					<section className="flex flex-col gap-6 w-80">
						<TextInput
							label="Peso"
							className="w-full"
							//value={name}
							onChange={(event) => setName(event.target.value)}
						/>
						<TextInput
							label="Obervaciones"
							className="w-full"
							//value={name}
							onChange={(event) => setName(event.target.value)}
						/>
						<TextInput
							label="Diagnostico"
							className="w-full"
							//value={name}
							onChange={(event) => setName(event.target.value)}
						/>
					</section>
                    <div className="flex justify-between w-full">
					<button className="bg-blue-800 text-white p-2 rounded hover:bg-red-800">Crear historia</button>
					<button className="bg-gray-800 text-white p-2 rounded hover:bg-red-800">Cancelar</button>
                    </div>
				</div>
			</div>
		</>
	);
}
