import { Link } from "react-router-dom";

export function PetSection({ pets }) {
	return (
		<section className="h-[100%] space-y-2 p-4">
			<h4 className="text-2xl">Mascotas</h4>

			<ul className="list-disc list-inside gap-4">
				{pets.map((pet) => (
					<li className="hover:font-semibold pt-2 last:pb-2" key={pet.id}>
						<Link  to={`/pets/${pet.id}`}>
							{pet.name}
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
