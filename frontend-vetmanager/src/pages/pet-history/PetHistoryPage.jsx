import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { usePetStore } from "@s/pets.store";
import { useClientStore } from "@s/clients.store";
import { useHistoriesStore } from "@s/histories.store";

import { MainLayout } from "@/layouts/MainLayout";



export default function PetHistoryPage() {
	const params = useParams();
	const navigate = useNavigate();

	const pets = usePetStore((store) => store.pets);
	const petsRequest = usePetStore((store) => store.request);
	const getAllPets = usePetStore((store) => store.getAll);
	const pet = pets.find((x) => x.id === parseInt(params.petId));

	const histories = useHistoriesStore((store) => store.histories);
	const historiesRequest = useHistoriesStore((store) => store.request);
	const getAllHistories = useHistoriesStore((store) => store.getAll);
	const history = histories.find((x) => x.slug === parseInt(params.slug));

	useEffect(() => {
		if (pets.length === 0) {
			getAllPets();
		}
	}, [pets, getAllPets]);

	useEffect(() => {
		getAllHistories(params.petId);
	}, [getAllHistories, params.petId]);

	const isFetchingPets = petsRequest.idle || petsRequest.fetching;
	const isFetchingHistories = historiesRequest.idle || historiesRequest.fetching;

	if (isFetchingHistories || isFetchingPets) {
		return (
			<MainLayout title={"Historia clínica"}>
				<p>Cargando...</p>
			</MainLayout>
		);
	}

	if (!history) {
		navigate(`/pets/${params.petId}/histories`)
	}


    return(
        <MainLayout title={`Historia clínica de ${pet.name}`}>
                <section className="h-[100%] space-y-2 border border-violet-800 p-4">
			<p>
				<strong>Nombre:</strong>&nbsp;
				pichicho
			</p>
			<p>
				<strong>Tutor:</strong>&nbsp;
				moroso
			</p>
            <p>
				<strong>Ultimo pesaje:</strong>&nbsp;
				7 kg
			</p>
            <p>
				<strong>Diagnostico:</strong>&nbsp;
				moquillo
			</p>
            <p>
				<strong>Observaciones:</strong>&nbsp;
                es peludo
			</p>

        </section>
        </MainLayout>
    )
}