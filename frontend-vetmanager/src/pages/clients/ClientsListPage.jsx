import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useClientStore } from "@s/clients.store";

import { MainLayout } from "@/layouts/MainLayout";
import { ClientCard } from '@/components/clients/ClientCard'

export default function ClientsListPage() {
    const clients = useClientStore((store) => store.clients)
    const getAll = useClientStore((store) => store.getAll)

    useEffect(() => {
        getAll()
    }, [getAll])

    const clientCards = clients.map(client => (<Link to={`/clients/${client.id}`}><ClientCard key={client.id} {...client} /></Link>))

    return (
        <MainLayout title="Clients">
            <section className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min-content, 240px))' }}>
                {clientCards}
            </section>
        </MainLayout>
    )
}