import { ClientCard } from "../../components/clients/ClientCard"

export default function ClientPage() {
    return (
        <>
            <h1>Client Name</h1>
            <div>
                <ClientCard
                    name="xd"
                    phone="2"
                    email="xd@gmail.com"
                />
            </div>
        </>
    )
}