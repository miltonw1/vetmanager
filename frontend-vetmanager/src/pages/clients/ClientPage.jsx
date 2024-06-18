import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { usePetStore } from "@s/pets.store";
import { useClientStore } from "@s/clients.store";

import { MainLayout } from "@/layouts/MainLayout";
import { PetSection } from "../../components/clients/PetSection";

export default function ClientPage({ name, weight, age, children }) {
	const params = useParams();

	const clients = useClientStore((store) => store.clients);
	const clientsRequest = useClientStore((store) => store.request);
	const getAll = useClientStore((store) => store.getAll);
	const client = clients.find((x) => x.id === parseInt(params.id));

	const pets = usePetStore((store) => store.pets);
	const petsRequest = usePetStore((store) => store.request);
	const getAllPets = usePetStore((store) => store.getAll);
	const clientPets = client ? pets.filter((x) => x.client_id === parseInt(params.id)) : null;

	useEffect(() => {
		if (clients.length === 0) {
			getAll();
		}
	}, [clients, getAll]);

	useEffect(() => {
		if (pets.length === 0) {
			getAllPets();
		}
	}, [pets, getAllPets]);

	const isFetchingClients = clientsRequest.idle || clientsRequest.fetching;
	const isFetchingPets = petsRequest.idle || petsRequest.fetching;

	if (isFetchingClients || isFetchingPets) {
		return (
			<MainLayout title="Cliente">
				<p>Cargando...</p>
			</MainLayout>
		);
	}

	if (!client) {
		return (
			<MainLayout title="Cliente">
				<p>Cliente no encontrado</p>
			</MainLayout>
		);
	}


	return (
		<MainLayout title="Cliente">
			<div className="grid grid-col-2 space-y-4">
				<section className="h-[100%] space-y-2 p-4">
					<h3>Información del cliente</h3>
					{client?.debt && (
						<p className="text-red-500">
							<strong>Este cliente tiene una deuda ❗</strong>&nbsp;
						</p>
					)}

					<p>
						<strong>Nombre:</strong>&nbsp;
						{client?.name}
					</p>
					<p>
						<strong>Dirección:</strong>&nbsp;
						{client?.address}
					</p>
					<p>
						<strong>Teléfono:</strong>&nbsp;
						{client?.phone}
					</p>
					<p>
						<strong>Email:</strong>&nbsp;
						{client?.email}
					</p>
					<p>
						<strong>Ciudad:</strong>&nbsp;
						{client?.city}
					</p>
					{client?.debt && (
						<p className="text-red-500">
							<strong>Adeuda:</strong>&nbsp;
						</p>
					)}
				</section>

				<PetSection pets={clientPets}/>
			</div>
		</MainLayout>
	);
}
