import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { usePetStore } from "@s/pets.store";
import { useClientStore } from "@s/clients.store";
import { useSpeciesStore } from "@s/species.store"
import { useRaceStore } from "@s/races.store"

import { MainLayout } from "@/layouts/MainLayout";

export default function PetPage() {
	const params = useParams();

	const pets = usePetStore((store) => store.pets);
	const getAll = usePetStore((store) => store.getAll);
	const pet = pets.find((x) => x.id === parseInt(params.id));


	const clients = useClientStore((store) => store.clients);
	const getAllClients = useClientStore((store) => store.getAll);
	const client = pet ? clients.find((x) => x.id === parseInt(pet.client_id)) : null;

	// Variable called "allSpecies" since plural and singular share the same word
	const allSpecies = useSpeciesStore ((store) => store.species);
	const getAllSpecies = useSpeciesStore((store) => store.getAll);
	const species = pet ? allSpecies.find((x) => x.id === parseInt(pet.species_id)) : null;


	const races = useRaceStore((store) => store.races )
	const getAllRaces = useRaceStore((store) => store.getAll)
	const race = pet? races.find( (x)=> x.id === parseInt(pet.race_id)) : null;



	useEffect(() => {
		if (pets.length === 0) {
			getAll();
		}
	}, [pets, getAll]);

	useEffect(()=>{
		if (clients.length === 0) {
			getAllClients();
		}
	}, [clients, getAllClients])

	useEffect(()=>{
		if (allSpecies.length === 0) {
			getAllSpecies();
		}
	}, [allSpecies, getAllSpecies])

	useEffect(()=>{
		if (races.length === 0) {
			getAllRaces();
		}
	}, [races, getAllRaces])

	if (!pet || !client) {
		return(
			<p>Cargando...</p>
		)
	}


	return (
		<MainLayout title={pet?.name}>
        <section className="h-[100%] space-y-2 border border-violet-800 p-4">
			<p>
				<strong>Nombre:</strong>&nbsp;
				{pet?.name}
			</p>
			<p>
				<strong>Tutor:</strong>&nbsp;
				{client.name}
			</p>
            <p>
				<strong>Especie:</strong>&nbsp;
				{species?.name}
			</p>
            <p>
				<strong>Raza:</strong>&nbsp;
				{race?.name}
			</p>
            <p>
			<strong>Sexo:</strong>&nbsp;
                {pet?.genre === "FEMALE" ? "Hembra" : "Macho"}
			</p>
            <p>
				<strong>Peso:</strong>&nbsp;
				{pet?.weight === null ? "Dato no ingresado": pet?.weight}
			</p>
            <p>
			<strong>Edad:</strong>&nbsp;
				{pet?.birthday === null ? "Dato no ingresado": pet?.birthday}
			</p>
            <p>
            <strong>Tipo de sangre:</strong>&nbsp;
				{pet?.blood_type === null ? "Dato no ingresado": pet?.blood_type}
			</p>
            <p>
            <strong>Alergias:</strong>&nbsp;
				{pet?.allergies === null ? "Dato no ingresado": pet?.allergies}
			</p>

			<p>
			<Link to={`/pets/${pet?.id}/histories/`}>
				<strong> 📖 Ir a historia clínica</strong>
			</Link>
			</p>
        </section>
		</MainLayout>
	);
}
