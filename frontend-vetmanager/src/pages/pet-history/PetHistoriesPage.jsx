import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePetStore } from "@s/pets.store";
import { useHistoriesStore } from "@s/histories.store";

import { MainLayout } from "@/layouts/MainLayout";

export default function PetHistoriesPage() {
	const params = useParams();

	const pets = usePetStore((store) => store.pets);
	const petsRequest = usePetStore((store) => store.request);
	const getAllPets = usePetStore((store) => store.getAll);
	const pet = pets.find((x) => x.id === parseInt(params.id));

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
		if (histories.length === 0) {
			getAllHistories(params.id);
		}
	}, [histories, getAllHistories, params.id]);


	const isFetchingPets = petsRequest.idle || petsRequest.fetching;
	const isFetchingHistories = historiesRequest.idle || historiesRequest.fetching;

	if (isFetchingHistories || isFetchingPets) {
		return (
			<MainLayout title="Cliente">
				<p>Cargando...</p>
			</MainLayout>
		);
	}

	console.log(pet);
	return (
		<MainLayout title={`Historia clínica de ${pet.name}`}>
        <ul className="list-disc list-inside gap-4">
				{histories.map((history) => (
					<li className="hover:font-semibold pt-2 last:pb-2" key={pet.id}>
						<Link  to={`/pets/${params.id}/history/${history.id}`}>
						{new Date(history.created_at).toLocaleString()}
						</Link>
					</li>
				))}
			</ul>
		</MainLayout>
	);
}
