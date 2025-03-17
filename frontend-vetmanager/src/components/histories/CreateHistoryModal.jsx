import { TextInput } from "../common/inputs/TextInput";
import { useHistoriesStore } from "@s/histories.store";
import { useState } from "react";

export function CreateHistoryModal({ pet, onClose }) {
	const [newHistory, setNewHistory] = useState({
		diagnostic: '',
		observation: '',
		weight: ''
	});

	const create = useHistoriesStore((store) => store.create);

	function onSave() {
		const payload = {
			...newHistory,
			pet_id: pet.id,
			weight: Number(newHistory.weight)
		};

		create(payload).then(onClose)
	}


	function handleChange(event, field) {
		const value = event.target.value;
		if (field === 'weight') {
			if (/^\d*(\.\d*)?$/.test(value)) {
				setNewHistory((prev) => ({
					...prev,
					[field]: value,
				}));
			}
		} else {
			setNewHistory((prev) => ({
				...prev,
				[field]: value,
			}));
		}
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
			<div className="bg-cyan-800 h-[70%] w-[30%] p-5 rounded flex flex-col justify-between items-center gap-5 relative">
				<h2 className="text-xl font-bold">Nueva historia para {pet.name}</h2>
				<section className="flex flex-col gap-6 w-80">
					<TextInput
						label="Peso"
						className="w-full"
						value={newHistory.weight}
						onChange={(event) => handleChange(event, 'weight')}
					/>
					<TextInput
						label="Observaciones"
						className="w-full"
						value={newHistory.observation}
						onChange={(event) => handleChange(event, 'observation')}
					/>
					<TextInput
						label="Diagnóstico"
						className="w-full"
						value={newHistory.diagnostic}
						onChange={(event) => handleChange(event, 'diagnostic')}
					/>
				</section>
				<div className="flex justify-between w-full">
					<button
						className="bg-blue-800 text-white p-2 rounded hover:bg-red-800"
						onClick={onSave}
					>
						Crear historia
					</button>
					<button className="bg-gray-800 text-white p-2 rounded hover:bg-red-800" onClick={onClose}>Cancelar</button>
				</div>
			</div>
		</div>
	);
}