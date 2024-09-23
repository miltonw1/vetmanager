import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { usePetStore } from "@s/pets.store";
import { useClientStore } from "@s/clients.store";

import { MainLayout } from "@/layouts/MainLayout";
import { PetCard } from "@/components/pets/PetCard.jsx";
import { DebtModal } from "@/components/clients/DebtModal";

export default function ClientPage() {
	const params = useParams();
	const [debtModalShow, setDebtModalShow] = useState(false);

	const clients = useClientStore((store) => store.clients);
	const getAll = useClientStore((store) => store.getAll);
	const client = clients.find((x) => x.id === parseInt(params.id));

	const pets = usePetStore((store) => store.pets);
	const getAllPets = usePetStore((store) => store.getAll);
	const clientPets = client ? pets.filter((x) => x.client_id === parseInt(params.id)) : null;

	const handleDebtModalShow = () => setDebtModalShow(true);

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

	if (!client || !clientPets) {
		return <p>Cargando...</p>;
	}


	const petCards = clientPets.map((pet) => (
		<Link key={pet.id} to={`/pets/${pet.id}`}>
			<PetCard name={pet.name} {...pet} />
		</Link>
	));
	//const clientCards = clients.map(client => (<Link to={`/clients/${client.id}`}><ClientCard key={client.id} {...client} /></Link>))
	console.log(debtModalShow)
	return (
		<MainLayout title="Cliente">
			<div className="grid grid-col-2 space-y-4">
				<section className="h-[100%] space-y-2 border border-violet-800 p-4">
					<h3>Información del cliente</h3>
					{client?.debt && (
						<p className="text-red-500">
							<strong>Este cliente tiene una deuda ❗</strong>&nbsp;
						</p>
					)}
					{client?.debt && (
						<p className="text-red-500">
							<strong>Adeuda: {client.debt}</strong>&nbsp;
							<button onClick={handleDebtModalShow} className="text-red-500 underline">
								Reducir/Cancelar deuda
							</button>
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
				{debtModalShow && (
					<DebtModal client={client} />
				)}
				</section>

				<section className="h-[100%] border border-violet-800">
					<h4>Mascotas</h4>
					<ul>
						{petCards}
					</ul>
				</section>
			</div>
		</MainLayout>
	);
}
