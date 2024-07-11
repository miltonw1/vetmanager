

export function PetHistoryModal({ name, tutor, weight, diagnosis, observations, images, onClose }) {
	return (
		<>
			<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
				<div className="bg-cyan-800 h-[60%] w-[55%] p-5 rounded flex flex-col justify-between items-center gap-5 relative">
					<div className="w-full">
						<div className="flex justify-between w-full">
							<h2 className="text-xl font-bold">Detalles de la Historia Clínica de {name}</h2>
							<button onClick={onClose} className="bg-gray-800 text-white p-2 rounded hover:bg-red-800">
								Cerrar
							</button>
						</div>
						<p>
							<strong>Nombre:</strong>&nbsp;
							{name}
						</p>
						<p>
							<strong>Tutor:</strong>&nbsp;
							{tutor}
						</p>
						<p>
							<strong>Ultimo pesaje:</strong>&nbsp;
							{weight}
						</p>
						<p>
							<strong>Diagnostico:</strong>&nbsp;
							{diagnosis}
						</p>
						<p>
							<strong>Observaciones:</strong>&nbsp;
							{observations}
						</p>
					</div>
					<div className="w-full h-1/2 flex justify-center items-center">
					{images.map((image) => (
							<img key={image.id} src={image.image_url} alt="placeholder" className="w-full h-full object-contain rounded-b" />
						))}
					</div>
				</div>
			</div>
		</>
	);
}
