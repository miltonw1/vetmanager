export function HistoriesCarousel({ images }) {
	return (
		<div className="w-full h-1/2 flex justify-center items-center">
			{images.map((image) => (
				<a href={image.image_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-32 h-32 flex-shrink-0 mr-2"
                >
					<img
						key={image.id}
						src={image.image_url}
						alt="placeholder"
						className="w-full h-full object-contain rounded-b"
					/>
				</a>
			))}
		</div>
	);
}
