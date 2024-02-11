import { CardBase } from '../common/CardBase'


export default async function PetCard({ name }) {

    return (
        <CardBase>
            <h4 className="text-md my-2">
                {name}
            </h4>
        </CardBase>
    )
}