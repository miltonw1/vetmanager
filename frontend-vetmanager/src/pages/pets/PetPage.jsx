import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { usePetStore } from "@s/pets.store";
import { useClientStore } from "@s/clients.store";

import { MainLayout } from "@/layouts/MainLayout";

export default function PetPage() {
	const params = useParams();

	const pets = usePetStore((store) => store.pets);
	const getAll = usePetStore((store) => store.getAll);
	const pet = pets.find((x) => x.id === parseInt(params.id));


	const clients = useClientStore((store) => store.clients);
	const getAllClients = useClientStore((store) => store.getAll);
	const client = pet ? clients.find((x) => x.id === parseInt(pet.client_id)) : null;


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

	if (!pet || !client) {
		return(
			<p>Cargando...</p>
		)
	}

	console.log(client)

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
				{pet?.species_id}
			</p>
            <p>
				<strong>Raza:</strong>&nbsp;
				{pet?.race_id}
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


        </section>
		</MainLayout>
	);
}
