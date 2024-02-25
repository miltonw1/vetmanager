import { useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { useClientStore } from "@s/clients.store";

import { MainLayout } from "@/layouts/MainLayout";
import { PetCard } from '@/components/pets/PetCard.jsx';

export default function ClientPage() {
    const params = useParams()

    const clients = useClientStore((store) => store.clients)
    const getAll = useClientStore((store) => store.getAll)
    const client = clients.find(x => x.id === parseInt(params.id))

    useEffect(() => {
        if (clients.length === 0) {
            getAll()
        }
    }, [clients, getAll])

    const pets = []

    const petCards = pets.map((pet) => <PetCard key={pet.id} name="Bobby" />)

    return (
        <MainLayout title="Client">
            <div className='grid grid-col-2'>
                <section className='h-[100%]'>
                    <h3>Information</h3>

                    <p>
                        <strong>name:</strong>
                        {client?.name}
                    </p>
                    <p>
                        <strong>address:</strong>
                        {client?.address}
                    </p>
                    <p>
                        <strong>phone:</strong>
                        {client?.phone}
                    </p>
                    <p>
                        <strong>email:</strong>
                        {client?.email}
                    </p>
                    <p>
                        <strong>city:</strong>
                        {client?.city}
                    </p>
                    <p>
                        <strong>debt:</strong>
                        {client?.debt}
                    </p>
                </section>
                <section className='h-[100%]'>
                    <h4>Pets</h4>

                    <div className=''>
                        {petCards}
                    </div>

                </section>
            </div>

        </MainLayout>
    )
}