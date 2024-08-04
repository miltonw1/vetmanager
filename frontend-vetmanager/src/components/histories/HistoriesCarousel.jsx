

export function HistoriesCarousel({images}) {

    return (
        <div className="w-full h-1/2 flex justify-center items-center">
            {images.map((image) => (
                <img key={image.id} src={image.image_url} alt="placeholder" className="w-full h-full object-contain rounded-b" />
            ))}
        </div >
    )

}