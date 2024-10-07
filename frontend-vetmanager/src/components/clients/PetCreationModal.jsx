import { useSpeciesStore  } from  "@s/species.store";


export function PetCreationModal({ client, onClose }) {
	const species = useSpeciesStore((store) => store.species);


	return (
		<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
			<div className="bg-cyan-800 h-[60%] w-[30%] p-5 rounded flex flex-col justify-between items-center gap-5 relative">
				<h1 className="text-3xl text-white">Mascota nueva de {client.name}</h1>
				<div>
				</div>
				<div className="flex justify-center gap-4">
					<h1>Hola</h1>
				</div>
			</div>
		</div>
	);
};

