import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSpeciesStore } from "@s/species.store";
import { useRaceStore } from "@s/races.store";
import { MainLayout } from "@/layouts/MainLayout";
import { RacesForm } from "@/components/races/RacesForm";
import Select from "react-select";


export default function CreateRacePage() {
    const [newRaces, setNewRaces] = useState({})
	const [selectedSpecies, setSelectedSpecies] = useState(null);
	const [filteredRaces, setFilteredRaces] = useState([]);
	const [selectedRace, setSelectedRace] = useState(null);
    const [racePayload, setRacePayload] = useState({});

	const species = useSpeciesStore((store) => store.species);
	const races = useRaceStore((store) => store.races);
    const create = useRaceStore((store) => store.create);
    const navigate = useNavigate()


    function onSave() {
        create(racePayload).then(() => {
            navigate("/races")
        })
    }

    useEffect(() => {
        setRacePayload({
            ...newRaces,
            species_id: selectedSpecies?.value || null,
        });
    }, [newRaces, selectedSpecies]);

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

    const speciesOptions = species.map((s) => ({
		value: s.id,
		label: s.name,
	}));

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


    return (
        <MainLayout title="Agregar una nueva raza">
            <Select
                value={selectedSpecies}
                onChange={setSelectedSpecies}
                options={speciesOptions}
                placeholder="Selecciona una especie"
                isClearable
                styles={customStyles}
            />
            <RacesForm
                onClick={onSave}
                onChange={setNewRaces}
            />
        </MainLayout>
    )
}