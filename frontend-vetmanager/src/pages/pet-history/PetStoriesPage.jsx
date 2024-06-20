import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { usePetStore } from "@s/pets.store";
import { useStoriesStore } from "@s/stories.store";

import { MainLayout } from "@/layouts/MainLayout";



export default function PetStoriesPage() {
    const params = useParams();


    const pets = usePetStore((store) => store.pets);
	const getAllPets = usePetStore((store) => store.getAll);
	const pet = pets.find((x) => x.id === parseInt(params.id));

    const stories = useStoriesStore((store) => store.stories)
    const getAllStories = useStoriesStore((store) => store.getAll(params.id))
    const history = stories.find((x) => x.pet_id === parseInt(pet.id))


    useEffect(() => {
		if (pets.length === 0) {
			getAllPets();
		}
	}, [pets, getAllPets]);


    console.log(typeof(getAllStories))

    if (!pet || !getAllStories) {
		return(
			<p>Cargando...</p>
		)
	}

    return (
        <MainLayout title={`Historial de mascota: ${pet?.name}`}>
            <h1>xd</h1>
        </MainLayout>
    );

}