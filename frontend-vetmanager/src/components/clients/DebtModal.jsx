import { TextInput } from "../common/inputs/TextInput";
import { useState, useEffect } from "react";

export function DebtModal({ client, onClose }) {
	const [debtAmount, setDebtAmount] = useState('');

	const isEditing = !!client.debt

	useEffect(() => {
        if (isEditing) {
			setDebtAmount(client.debt);
        }
    }, [client, isEditing])


	return (
		<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
			<div className="bg-cyan-800 h-[30%] w-[50%] p-5 rounded flex flex-col justify-between items-center gap-5 relative">
				<h1 className="text-3xl text-white">{client.name}</h1>
				<div>
					<TextInput
						value={debtAmount}
						onChange={event => setDebtAmount(event.target.value)}
						placeholder="Monto deuda"
					/>
				</div>
				<div className="flex justify-center gap-4">
					<button
						onClick={onClose}
						className="bg-red-500 text-white px-4 py-2 rounded"
					>
						Cancelar
					</button>
					<button
						onClick={onClose}
						className="bg-green-500 text-white px-4 py-2 rounded"
					>
						{ isEditing ? 'Editar deuda' : 'Agregar deuda' }
					</button>
				</div>
			</div>
		</div>
	);
}