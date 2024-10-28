import { useState } from 'react'
import { useNavigate  } from 'react-router-dom'

import { useSpeciesStore } from "@s/species.store";
import { MainLayout } from "@/layouts/MainLayout";
import { SpeciesForm }  from  "@/components/species/SpeciesForm";


export default function CreateClientPage() {
    const [newSpecies, setNewSpecies] = useState({})


    const create = useSpeciesStore((store) => store.create);
    const navigate = useNavigate()


    function onSave() {
        create(newSpecies).then(() => {
            navigate("/species")
        })
    }


    return (
        <MainLayout title="Agregar una nueva especie">
            <SpeciesForm
                onClick={onSave}
                onChange={setNewSpecies}
            />
        </MainLayout>
    )
}