import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useClientStore } from "@s/clients.store";

import { MainLayout } from "@/layouts/MainLayout";
import { ClientCard} from '@/components/clients/ClientCard'
import { ClientForm } from '../../components/clients/ClientForm';


export default function CreateClientPage(){
    const [newClient, setNewClient] = useState()

	const create = useClientStore((store) => store.create);

    function onSave() {
        create(newClient)
            .then(() => {
                // redirect con react-router-dom
            })
    }

    return (
        <MainLayout title="Registrar cliente">
            <ClientForm
                onClick={onSave}
                onChange={setNewClient}
            />
        </MainLayout>
    )
}