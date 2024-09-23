import { TextInput } from "../common/inputs/TextInput";
import { useState } from "react";

export function DebtModal({ client, onCancel, onReduce }) {
	const [debtReduction, setDebtReduction] = useState(client.debt); // Para manejar el monto a reducir
	console.log(debtReduction)
	return (
		<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
			<div className="bg-cyan-800 h-[30%] w-[50%] p-5 rounded flex flex-col justify-between items-center gap-5 relative">
				<h1 className="text-3xl text-white">{client.name}</h1>
				<div>
					<TextInput
						value={debtReduction}
						onChange={(e) => setDebtReduction(Number(e.target.value))} // Actualiza el valor del input
						placeholder="Monto a reducir"
					/>
				</div>
				<div className="flex justify-center gap-4">
					<button
						onClick={onCancel}
						className="bg-red-500 text-white px-4 py-2 rounded"
					>
						Cancelar
					</button>
					<button
						onClick={() => onReduce(debtReduction)}
						className="bg-green-500 text-white px-4 py-2 rounded"
					>
						Reducir deuda
					</button>
				</div>
			</div>
		</div>
	);
}