import { CardBase } from '../common/CardBase'


export function SpeciesCard({ id, name }) {

    return (
        <CardBase>
            <h4 className="text-md my-2 truncate">{name}</h4>
        </CardBase>
    )
}