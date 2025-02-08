import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { usePetStore } from "@s/pets.store";
import { useClientStore } from "@s/clients.store";


import { MainLayout } from "@/layouts/MainLayout";
import { PetCard } from "@/components/pets/PetCard.jsx";
import { DebtModal } from "@/components/clients/DebtModal";
import { PetCreationModal } from "@/components/clients/PetCreationModal";

export default function ClientPage() {
	const params = useParams();
	const [debtModalShow, setDebtModalShow] = useState(false);
	const [petCreationModalShow, setPetCreationModalShow] = useState(false);
	const [editClient, setEditClient] = useState();


	const clients = useClientStore((store) => store.clients);
	const getAll = useClientStore((store) => store.getAll);
	const client = clients.find((x) => x.id === parseInt(params.id));
	const clientsRequest = useClientStore((store) => store.request);


	const pets = usePetStore((store) => store.pets);
	const getAllPets = usePetStore((store) => store.getAll);
	const clientPets = client ? pets.filter((x) => x.client_id === parseInt(params.id)) : null;
	const petsRequest = usePetStore((store) => store.request);



	const handleDebtModalShow = () => setDebtModalShow(true);
	const handlePetCreationModalShow = () => setPetCreationModalShow(true);


	useEffect(() => {
		if (clientsRequest.idle) {
			getAll();
		}
	}, [clientsRequest.idle, getAll]);

	useEffect(() => {
		if (petsRequest.idle) {
			getAllPets();
		}
	}, [petsRequest.idle, getAllPets]);

	if (!client || !clientPets) {
		return <p>Cargando...</p>;
	}

	const closeDebtCreationModal = () => {
		setDebtModalShow(false);
	};

	const closePetCreationModal = () => {
		setPetCreationModalShow(false);
	}

	const petCards = clientPets.map((pet) => (
		<Link key={pet.id} to={`/pets/${pet.id}`}>
			<PetCard name={pet.name} {...pet} />
		</Link>
	));


	return (
		<MainLayout title="Cliente">
			<div className="grid grid-col-2 space-y-4">
				<section className="h-[100%] space-y-2 border border-violet-800 p-4">
					<h3>Información del cliente</h3>
					{client?.debt && client.debt !== "0" ? (
						<div>
							<p className="text-red-500">
								<strong>Este cliente tiene una deuda ❗</strong>&nbsp;
							</p>
							<p className="text-red-500">
								<strong>Adeuda: {client.debt}</strong>&nbsp;-&nbsp;
								<button onClick={handleDebtModalShow} className="text-red-500 underline">
									Reducir/Cancelar deuda
								</button>
							</p>
						</div>
					) : null}
					{client?.debt === "0" && (
						<p className="text-red-500">
							{/* <strong>Adeuda: {client.debt}</strong>&nbsp; */}
							<button onClick={handleDebtModalShow} className="text-red-500 underline">
								Agregar deuda
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

					{debtModalShow &&
					//Debt Modal
					<DebtModal
					client={client}
					onClose={closeDebtCreationModal}
					onChange={setEditClient} />}

					{petCreationModalShow &&
					<PetCreationModal
					client={client}
					onClose={closePetCreationModal}/> }
				</section>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button onClick={handlePetCreationModalShow}
				className="rounded-lg border bg-violet-800 border-white-400 text-white mt-12 h-12 w-60">
					Agregar Mascota
				</button>

				<section className="h-[100%] border border-violet-800">
					<h4>Mascotas</h4>
					<ul>{petCards}</ul>
				</section>
			</div>
		</MainLayout>
	);
}
