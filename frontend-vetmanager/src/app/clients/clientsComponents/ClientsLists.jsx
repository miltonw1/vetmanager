import Link from 'next/link'

import ClientCard from './ClientCard'

const getData = () => {
    return fetch('http://localhost:3001/clients')
        .then(res => res.json())
}

export default async function ClientsList() {
    const clients = await getData()

    const parsedClients = clients
        .slice(0, 5)
        .map(client => <ClientCard key={client.id} {...client} />)

    return (
        <>
            <Link href="/clients/">
                <button className="flex justify-evenly items-center w-40 h-8 mt-8 bg-black rounded text-white">
                    <span>Registrar cliente</span>
                </button>
            </Link>
            <section className="grid gap-6 grid-cols-5 mt-8">
                {parsedClients}
            </section>
        </>
    )
}