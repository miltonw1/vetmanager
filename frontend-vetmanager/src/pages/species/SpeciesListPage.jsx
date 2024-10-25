import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useSpeciesStore } from  "@s/species.store";
import { TextInput } from '../../components/common/inputs/TextInput'
import { MainLayout } from "@/layouts/MainLayout";
import { SpeciesCard } from '@/components/species/SpeciesCard'

export default function SpeciesListPage() {

    const [filterSpecies, setFilterSpecies] = useState('')


    const species = useSpeciesStore((store) => store.species)
    const getAllSpecies = useSpeciesStore((store) => store.getAll)



    useEffect(() => {
        getAllSpecies()
    }, [getAllSpecies])




    let speciesCards;

    if (filterSpecies) {
        const filteredSpecies = species.filter(species =>
            species.name.toLowerCase().includes(filterSpecies.toLowerCase())
        );
        speciesCards = filteredSpecies.map(species => (
            <Link key={species.id} to={`/speciess/${species.id}`}>
                <SpeciesCard {...species} />
            </Link>
        ));
    } else {
        speciesCards = species.map(species => (
            <Link key={species.id} to={`/species/${species.id}`}>
                <SpeciesCard {...species} />
            </Link>
        ));
    }



    return (
        <MainLayout title="Especies">
            <div className="flex justify-between items-center">
                <TextInput
                    label="Filtrar especie"
                    className="w-35% my-2"
                    value={filterSpecies}
                    onChange={event => setFilterSpecies(event.target.value)}
                />
                <Link to={`/species/create`}>
                    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                    <button
                        className="rounded-lg border bg-violet-800 border-white-400 text-white h-12 w-60"
                    >
                        Nueva especie
                    </button>
                </Link>
            </div>
            <section className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, 360px)' }}>
                {speciesCards}
            </section>
        </MainLayout>
    )
}