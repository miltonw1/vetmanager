import { useNavigate  } from 'react-router-dom'

import { useClientStore } from "@s/clients.store";
import { MainLayout } from "@/layouts/MainLayout";
import { ClientForm } from '../../components/clients/ClientForm';


export default function CreateClientPage() {
    const create = useClientStore((store) => store.create);
    const navigate = useNavigate()


    function handleSave(data) {
        create(data).then(() => {
            navigate("/clients")
        })
    }

    return (
        <MainLayout title="Registrar cliente">
            <ClientForm
                onSave={handleSave}
            />
        </MainLayout>
    )
}
