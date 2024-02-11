import { CardBase } from '../common/CardBase'


export function ClientCard({ id, name, phone, email, address, city, debt }) {

    return (
        <CardBase>
            <h4 className="text-md my-2">{name}</h4>
            <p className="text-sm my-2">{phone}</p>
            <p className="text-sm my-2">{email}</p>
        </CardBase>
    )
}