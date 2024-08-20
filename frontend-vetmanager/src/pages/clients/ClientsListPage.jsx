import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useClientStore } from "@s/clients.store";
import { TextInput } from '../../components/common/inputs/TextInput'
import { MainLayout } from "@/layouts/MainLayout";
import { ClientCard } from '@/components/clients/ClientCard'

export default function ClientsListPage() {
    const clients = useClientStore((store) => store.clients)
    const getAll = useClientStore((store) => store.getAll)
    const [filterClient, setFilterClient] = useState('')

    useEffect(() => {
        getAll()
    }, [getAll])
    console.log(filterClient)


    let clientCards;

    if (filterClient) {
        const filteredClients = clients.filter(client =>
            client.name.toLowerCase().includes(filterClient.toLowerCase())
        );
        clientCards = filteredClients.map(client => (
            <Link key={client.id} to={`/clients/${client.id}`}>
                <ClientCard {...client} />
            </Link>
        ));
    } else {
        clientCards = clients.map(client => (
            <Link key={client.id} to={`/clients/${client.id}`}>
                <ClientCard {...client} />
            </Link>
        ));
    }


    return (
        <MainLayout title="Clientes">
            <TextInput
                label="Filtrar cliente"
                className="w-35% my-2"
                value={filterClient}
                onChange={event => setFilterClient(event.target.value)}
            />
            <section className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, 360px)' }}>
                {clientCards}
            </section>
        </MainLayout>
    )
}