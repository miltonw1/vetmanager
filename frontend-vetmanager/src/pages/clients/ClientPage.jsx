import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useClientStore } from "@s/clients.store";

import { MainLayout } from "@/layouts/MainLayout";
import { PetCard } from "@/components/pets/PetCard.jsx";

export default function ClientPage() {
	const params = useParams();

	const clients = useClientStore((store) => store.clients);
	const getAll = useClientStore((store) => store.getAll);
	const client = clients.find((x) => x.id === parseInt(params.id));
	console.log(client)

	useEffect(() => {
		if (clients.length === 0) {
			getAll();
		}
	}, [clients, getAll]);

	const pets = [];

	const petCards = pets.map((pet) => <PetCard key={pet.id} name="Bobby" />);

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
							{client.debt}
						</p>
					)}
				</section>

				<section className="h-[100%] border border-violet-800">
					<h4>Mascotas</h4>

					<div className="">{petCards}</div>
				</section>
			</div>
		</MainLayout>
	);
}
