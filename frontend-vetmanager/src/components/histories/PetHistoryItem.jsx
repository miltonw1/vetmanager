export function PetHistoryItem({ expanded, history, petName, tutor, openModal }) {
	const lastVisit = new Date(history.created_at).toLocaleString();

	const text = !expanded ? (
		lastVisit
	) : (
		<>
			<strong>Last visit:</strong> {lastVisit}
			<br />
			<strong>Diagnosis: </strong> {history.diagnostic}
		</>
	);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<li
			className="hover:font-semibold pt-2 last:pb-2"
			onClick={() =>
				openModal({
					petId: history.pet_id,
					historyId: history.id,
					name: petName,
					tutor: tutor,
					weight: history.weight,
					diagnosis: history.diagnostic,
					observations: history.observation,
					images: history.images,
				})
			}
		>
			{text}
		</li>
	);
}
