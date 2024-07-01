export function PetHistoryItem({ expanded, history, petName, tutor, openModal }) {
	const lastVisit = new Date(history.created_at).toLocaleString();

    const text = !expanded
		? lastVisit
		: <>
			<strong>Last visit:</strong> {lastVisit}<br/>
			<strong>Diagnosis: </strong> {history.diagnostic}
		</>;

    return (
		<li
			className="hover:font-semibold pt-2 last:pb-2"
			onClick={() =>
				openModal({
					name: petName,
					tutor: tutor,
					weight: history.weight,
					diagnosis: history.diagnostic,
					observations: history.observation,
				})
			}
		>
			{text}
		</li>
	);
}
