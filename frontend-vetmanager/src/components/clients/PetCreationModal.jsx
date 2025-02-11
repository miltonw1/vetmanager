import { useState, useEffect } from "react";
import { useSpeciesStore } from "@s/species.store";
import { usePetStore } from "@s/pets.store";
import { useRaceStore } from "@s/races.store";
import { TextInput } from "../common/inputs/TextInput";
import Select from "react-select";

export function PetCreationModal({ client, onClose }) {
	const [name, setName] = useState("");
	const [weight, setWeight] = useState("");
	const [selectedSpecies, setSelectedSpecies] = useState(null);
	const [selectedGender, setSelectedGender] = useState(null);
	const [selectedRace, setSelectedRace] = useState(null);
	const [filteredRaces, setFilteredRaces] = useState([]);

	//Get AllSpecies is called in MainLayout
	const species = useSpeciesStore((store) => store.species);

	//Get AllPets is called in Client Page
	const createPet = usePetStore((store) => store.create);

	const races = useRaceStore((store) => store.races);

	const speciesOptions = species.map((s) => ({
		value: s.id,
		label: s.name,
	}));

	const raceOptions = races.map((r) => ({
		value: r.id,
		label: r.name,
	}));

	const genderOptions = [
		{ value: "MALE", label: "Macho" },
		{ value: "FEMALE", label: "Hembra" },
	];

	const onSave = (payload) => {
		createPet(payload).then(() => {
			onClose();
		});
	};



	useEffect(() => {
		if (selectedSpecies) {
			const filtered = races.filter((race) => {
				// Aquí verificamos que el ID de la especie seleccionada coincida con el campo id de la raza
				return race.species_id === selectedSpecies.value;
			});
			setFilteredRaces(filtered);
			setSelectedRace(null); // Resetea la raza seleccionada cuando cambia la especie
		} else {
			setFilteredRaces([]); // Limpiar las razas si no hay especie seleccionada
		}
	}, [selectedSpecies, races]);


	const handleSubmit = () => {
		const payload = {
			name,
			weight: Number(weight),
			species_id: selectedSpecies?.value,
			race_id: selectedRace?.value,
			genre: selectedGender?.value,
			client_id: client.id,
		};

		onSave(payload);
	};
	const handleCancel = () => {
		onClose();
	};

	const customStyles = {
		control: (provided) => ({
			...provided,
			backgroundColor: "black",
			borderColor: "white",
			color: "white",
		}),
		singleValue: (provided) => ({
			...provided,
			color: "white",
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: "black",
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isFocused ? "#333" : "black",
			color: "white",
			cursor: "pointer",
		}),
		placeholder: (provided) => ({
			...provided,
			color: "white",
		}),
		input: (provided) => ({
			...provided,
			color: "white",
		}),
	};

	const handleWeightChange = (event) => {
		const value = event.target.value;
		const regex = /^[0-9]*\.?[0-9]*$/;
		if (regex.test(value) || value === "") {
			setWeight(value);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
			<div className="bg-cyan-800 h-[65%] w-[25%] p-5 rounded flex flex-col justify-between items-center gap-5 relative">
				<h1 className="text-3xl text-white">Mascota nueva para {client.name}</h1>
				<div>
					<TextInput label="Nombre" className="w-full" value={name} onChange={(event) => setName(event.target.value)} />
					<TextInput
						label="Peso"
						className="w-full"
						value={weight}
						onChange={handleWeightChange} // Usamos la función con regexp
					/>
					<label className="block">Género</label>
					<Select
						value={selectedGender}
						onChange={setSelectedGender}
						options={genderOptions}
						placeholder="Selecciona un género"
						isClearable
						styles={customStyles}
					/>
					<label className="block">Especie</label>
					<Select
						value={selectedSpecies}
						onChange={setSelectedSpecies}
						options={speciesOptions}
						placeholder="Selecciona una especie"
						isClearable
						styles={customStyles}
					/>
					<label className="block">Raza</label>
					<Select
						value={selectedRace}
						onChange={setSelectedRace}
						options={filteredRaces.map((r) => ({ value: r.id, label: r.name }))}
						placeholder="Selecciona una raza"
						isClearable
						isDisabled={!selectedSpecies}
						styles={customStyles}
					/>
				</div>
				<div className="w-full flex justify-between mt-auto">
					<button className="bg-red-500 text-white py-2 px-4 rounded" onClick={handleCancel}>
						Cancelar
					</button>
					<button className="bg-green-500 text-white py-2 px-4 rounded" onClick={handleSubmit}>
						Aceptar
					</button>
				</div>
			</div>
		</div>
	);
}
