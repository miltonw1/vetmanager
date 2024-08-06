import { HistoriesCarousel } from "./HistoriesCarousel";
import { useHistoriesStore } from "../../stores/histories.store";
import { useRef } from "react";

export function PetHistoryModal({ petId, historyId, name, tutor, weight, diagnosis, observations, images, onClose }) {
	const uploadRef = useRef(null);
	const cameraRef = useRef(null);

	const uploadImage = useHistoriesStore((store) => store.uploadImage);

	function handleUpload() {
		uploadRef?.current?.click();
	}
	function handleCamera() {
		cameraRef?.current?.click();
	}

	function handleInputChange(event) {
		const file = event.target.files[0];
		uploadImage(petId, historyId, file);
	}

	return (
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
				<div className="flex w-full h-full justify-center overflow-hidden">
					<div id="carousel-container" className="flex-1 overflow-x-scroll whitespace-nowrap">
						<HistoriesCarousel images={images} />
					</div>
					<div className="flex flex-col items-center gap-2 ml-4">
						<button onClick={handleUpload} className="bg-gray-800 text-white p-4 rounded hover:bg-red-800">
							<img
								src="/icons/folder_open_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
								alt="Subir archivo"
								className="w-6 h-6"
							/>
						</button>
						<input
							ref={uploadRef}
							onChange={handleInputChange}
							className="hidden"
							name="Upload"
							type="file"
							format="image/*"
						/>
						<button onClick={handleCamera} className="bg-gray-800 text-white p-4 rounded hover:bg-red-800">
							<img
								src="/icons/photo_camera_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
								alt="Subir archivo"
								className="w-6 h-6"
							/>
						</button>
						<input
							ref={cameraRef}
							onChange={handleInputChange}
							capture="environment"
							className="hidden"
							name="cameraUpload"
							type="file"
							format="image/*"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
