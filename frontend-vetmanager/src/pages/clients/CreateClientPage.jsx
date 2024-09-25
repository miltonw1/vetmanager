import { useState } from 'react'
import { useNavigate  } from 'react-router-dom'

import { useClientStore } from "@s/clients.store";
import { MainLayout } from "@/layouts/MainLayout";
import { ClientForm } from '../../components/clients/ClientForm';


export default function CreateClientPage() {
    const [newClient, setNewClient] = useState({})
	const create = useClientStore((store) => store.create);
    const navigate = useNavigate()

    function onSave() {
        create(newClient).then(() => {
            navigate("/clients")
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