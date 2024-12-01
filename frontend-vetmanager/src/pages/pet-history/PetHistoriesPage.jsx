import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { usePetStore } from "@s/pets.store";
import { useClientStore } from "@s/clients.store";
import { useHistoriesStore } from "@s/histories.store";

import { MainLayout } from "@/layouts/MainLayout";
import { PetHistoryModal } from "../../components/histories/PetHistoryModal";
import { PetHistoryItem } from "../../components/histories/PetHistoryItem";
import { CreateHistoryModal } from "../../components/histories/CreateHistoryModal";

export default function PetHistoriesPage() {
	const params = useParams();
	const [modalInfo, setModalInfo] = useState(null);
	const [creationModalShow, setCreationModalShow] = useState(false);

	const [petsFetchAttempted, setPetsFetchAttempted] = useState(false);
	const [clientsFetchAttempted, setClientsFetchAttempted] = useState(false);
	const [historiesFetchAttempted, setHistoriesFetchAttempted] = useState(false);

	const openModal = (info) => {
		setModalInfo(info);
	};

	const modalShow = useMemo(() => {
		return !!modalInfo;
	}, [modalInfo]);

	const closeModal = () => {
		setModalInfo(null);
	};

	const openCreationModal = () => {
		setCreationModalShow(true);
	};

	const closeCreationModal = () => {
		setCreationModalShow(false);
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


	const title = useMemo(() => pet?.name ? `Historia clínica de ${pet.name}` : "Historia clínica", [pet]);

	// Fetch de mascotas
	useEffect(() => {
		if (pets.length === 0 && !petsFetchAttempted) {
			getAllPets();
			setPetsFetchAttempted(true);
		}
	}, [pets, getAllPets, petsFetchAttempted]);

	// Fetch de clientes
	useEffect(() => {
		if (clients.length === 0 && !clientsFetchAttempted) {
			getAll();
			setClientsFetchAttempted(true);
		}
	}, [clients, getAll, clientsFetchAttempted]);

	// Fetch de historias
	useEffect(() => {
		if (!historiesFetchAttempted) {
			getAllHistories(params.id);
			setHistoriesFetchAttempted(true);
		}
	}, [histories, getAllHistories, params.id, historiesFetchAttempted]);

	const isFetchingClients = clientsRequest.fetching;
	const isFetchingPets = petsRequest.fetching;
	const isFetchingHistories = historiesRequest.fetching;

	if (isFetchingHistories || isFetchingPets || isFetchingClients || !pet) {
		return (
			<MainLayout title={title}>
				<p>Cargando...</p>
			</MainLayout>
		);
	}

	const openModalBtn = (
		<button className="bg-cyan-800 text-white p-2 rounded hover:bg-red-800" onClick={openCreationModal}>
			Nueva historia
		</button>
	);

	if (histories.length === 0) {
		return (
			<MainLayout title={title}>
				{openModalBtn}
				<h1>{pet.name} no posee ninguna historia creada</h1>
				{creationModalShow && (
				<CreateHistoryModal
					pet={pet}
					onClose={closeCreationModal}
				/>
			)}
			</MainLayout>
		);
	}

	return (
		<MainLayout title={title}>
			{openModalBtn}
			<ul className="list-disc list-inside gap-4">
				{histories.map((history, index) => (
					<PetHistoryItem
						key={history.id}
						expanded={index === 0}
						history={history}
						petName={pet.name}
						tutor={client.name}
						openModal={openModal}
					/>
				))}
			</ul>

			{modalShow && (
				<PetHistoryModal
					petId={modalInfo.petId}
					historyId={modalInfo.historyId}
					name={modalInfo.name}
					tutor={modalInfo.tutor}
					weight={modalInfo.weight}
					diagnosis={modalInfo.diagnosis}
					observations={modalInfo.observations}
					images={modalInfo.images || []}
					onClose={closeModal}
				/>
			)}

			{creationModalShow && (
				<CreateHistoryModal
					pet={pet}
					onClose={closeCreationModal}
				/>
			)}
		</MainLayout>
	);
}
