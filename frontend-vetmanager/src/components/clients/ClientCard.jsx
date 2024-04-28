import { CardBase } from '../common/CardBase'


export function ClientCard({ id, name, phone, email, address, city, debt }) {

    return (
        <CardBase>
            <h4 className="text-md my-2 truncate">{name}</h4>
            <p className="text-sm my-2 truncate">{phone}</p>
            <p className="text-sm my-2 hidden sm:block truncate">{email}</p>
        </CardBase>
    )
}