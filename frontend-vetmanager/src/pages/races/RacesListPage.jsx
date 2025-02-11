import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useRaceStore } from  "@s/races.store";
import { TextInput } from '../../components/common/inputs/TextInput'
import { MainLayout } from "@/layouts/MainLayout";
import { RacesCard } from '@/components/races/RacesCard'

export default function RacesListPage() {

    const [filterRaces, setFilterRaces] = useState('')


    const races = useRaceStore((store) => store.races)
    const getAllRaces = useRaceStore((store) => store.getAll)



    useEffect(() => {
        getAllRaces()
    }, [getAllRaces])




    let racesCards;

    if (filterRaces) {
        const filteredRaces = races.filter(races =>
            races.name.toLowerCase().includes(filterRaces.toLowerCase())
        );
        racesCards = filteredRaces.map(races => (
            <Link key={races.id} to={`/racess/${races.id}`}>
                <RacesCard {...races} />
            </Link>
        ));
    } else {
        racesCards = races.map(races => (
            <Link key={races.id} to={`/races/${races.id}`}>
                <RacesCard {...races} />
            </Link>
        ));
    }



    return (
        <MainLayout title="Razas">
            <div className="flex justify-between items-center">
                <TextInput
                    label="Filtrar raza"
                    className="w-35% my-2"
                    value={filterRaces}
                    onChange={event => setFilterRaces(event.target.value)}
                />
                <Link to={`/races/create`}>
                    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                    <button
                        className="rounded-lg border bg-violet-800 border-white-400 text-white h-12 w-60"
                    >
                        Nueva raza
                    </button>
                </Link>
            </div>
            <section className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, 360px)' }}>
                {racesCards}
            </section>
        </MainLayout>
    )
}