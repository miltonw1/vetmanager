import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePetStore } from "@s/pets.store";
import { useClientStore } from "@s/clients.store";
import { useHistoriesStore } from "@s/histories.store";

import { MainLayout } from "@/layouts/MainLayout";
import { PetHistoryModal } from "../../components/histories/PetHistoryModal";

export default function PetHistoriesPage() {
	const params = useParams();
	const [modalShow, setModalShow] = useState(false);
	const [modalInfo, setModalInfo] = useState({});

	const openModal = (info) => {
		setModalInfo(info);
		setModalShow(true);
	};

	const closeModal = () => {
		setModalShow(false);
		setModalInfo({});
	};

	const pets = usePetStore((store) => store.pets);
	const petsRequest = usePetStore((store) => store.request);
	const getAllPets = usePetStore((store) => store.getAll);
	const pet = pets.find((x) => x.id === parseInt(params.id));

	const clients = useClientStore((store) => store.clients);
	const clientsRequest = useClientStore((store) => store.request);
	const getAll = useClientStore((store) => store.getAll);
	const client = pet ? clients.find((x) => x.id === parseInt(pet.client_id)) : null;

	const histories = useHistoriesStore((store) => store.histories);
	const historiesRequest = useHistoriesStore((store) => store.request);
	const getAllHistories = useHistoriesStore((store) => store.getAll);
	const history = histories.find((x) => x.id === parseInt(params.id));


	useEffect(() => {
		if (pets.length === 0) {
			getAllPets();
		}
	}, [pets, getAllPets]);

	useEffect(() => {
		if (clients.length === 0) {
			getAll();
		}
	}, [clients, getAll]);

	useEffect(() => {
		if (histories.length === 0) {
			getAllHistories(params.id);
		}
	}, [histories, getAllHistories, params.id]);

	const isFetchingClients = clientsRequest.idle || clientsRequest.fetching;
	const isFetchingPets = petsRequest.idle || petsRequest.fetching;
	const isFetchingHistories = historiesRequest.idle || historiesRequest.fetching;


	if (isFetchingHistories || isFetchingPets || isFetchingClients) {
		return (
			<MainLayout title={"Historia clínica de"}>
				<p>Cargando...</p>
			</MainLayout>
		);
	}

	return (
		<MainLayout title={`Historia clínica de ${pet.name}`}>
			<ul className="list-disc list-inside gap-4">
				{histories.map((history) => (
					<li
						className="hover:font-semibold pt-2 last:pb-2"
						key={history.id}
						onClick={() =>
							openModal({
								name: pet.name,
								tutor: client.name,
								weight: history.weight,
								diagnosis: history.diagnostic,
								observations: history.observation,
							})
						}
					>
						{new Date(history.created_at).toLocaleString()},
					</li>
				))}
			</ul>

			{modalShow && (
				<PetHistoryModal
					name={modalInfo.name}
					tutor={modalInfo.tutor}
					weight={modalInfo.weight}
					diagnosis={modalInfo.diagnosis}
					observations={modalInfo.observations}
					onClose={closeModal}
				/>
			)}

			{modalShow && <button onClick={closeModal}>Cerrar Modal</button>}
		</MainLayout>
	);
}
