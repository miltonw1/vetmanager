import { TextInput } from "../common/inputs/TextInput";
import { useState, useEffect, useMemo } from "react";
import { useClientStore } from "@s/clients.store";
import { useNavigate  } from 'react-router-dom'


export function DebtModal({ client, onClose, onChange }) {
	const [debtAmount, setDebtAmount] = useState('');

    const navigate = useNavigate()

    const isEditing = !!client.debt;

	const update = useClientStore((store) => store.update);

    useEffect(() => {
        if (isEditing) {
			//Check if the client has a debt greater than 0, then set it as the initial value of the input field.
            if (client.debt > 0) {
                setDebtAmount(client.debt);
            }
        }
    }, [client, isEditing])

	const clientData = useMemo(() => ({
        ...client,
		debt: debtAmount
    }), [client, debtAmount])

	useEffect(() => {
        onChange(clientData)
    }, [clientData, onChange])

	function onSave(payload) {
        update(payload).then(() => {
			onClose();
		});
    }


	return (
		<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
			<div className="bg-cyan-800 h-[30%] w-[50%] p-5 rounded flex flex-col justify-between items-center gap-5 relative">
				<h1 className="text-3xl text-white">Modificar deuda de {client.name}</h1>
				<div>
					<TextInput
						value={debtAmount}
						onChange={event => setDebtAmount(event.target.value)}
						placeholder="Monto de deuda"
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
						onClick={() => onSave(clientData)}
						className="bg-green-500 text-white px-4 py-2 rounded"
					>
						{ isEditing ? 'Editar deuda' : 'Agregar deuda' }
					</button>
				</div>
			</div>
		</div>
	);
}