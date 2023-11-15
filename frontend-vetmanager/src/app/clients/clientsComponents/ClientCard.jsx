import Link from 'next/link'


export default async function ClientCard({ id, name, phone, email, address, city, debt }) {

    return (
        <Link href={`/clients/}`}>
            <div className="p-4 rounded border border-violet-800 border-solid" style={{'boder-color': 'var(--foreground-color)'}}>
                <div className="w-20 h-20 bg-white" />
                <h4 className="text-md my-2">{name}</h4>
                <p className="text-sm my-2">{phone}</p>
                <p className="text-sm my-2">{email}</p>
            </div>
        </Link>
    )
}