import { useEffect } from 'react'

import { useClientStore } from "@s/clients.store";

import { MainLayout } from "@/layouts/MainLayout";
import { ClientCard } from '@/components/clients/ClientCard'

export default function ClientsListPage() {
    const clients = useClientStore((store) => store.clients)
    const getAll = useClientStore((store) => store.getAll)

    useEffect(() => {
        getAll()
    }, [])

    const clientCards = clients.map(client => <ClientCard key={client.id} {...client} />)

    return (
        <MainLayout title="Clients">
            {clientCards}
        </MainLayout>
    )
}