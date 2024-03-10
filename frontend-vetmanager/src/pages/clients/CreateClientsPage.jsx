import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useClientStore } from "@s/clients.store";

import { MainLayout } from "@/layouts/MainLayout";
import { ClientCard} from '@/components/clients/ClientCard'
import { ClientForm } from '../../components/clients/ClientForm';


export default function CreateClientsPage(){

    return (
        <MainLayout title="Registrar cliente">
            <ClientForm>

            </ClientForm>
        </MainLayout>
    )

}