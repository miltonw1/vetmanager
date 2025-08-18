import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useClientStore } from "../../stores/clients.store";

import { MainLayout } from "../../layouts/MainLayout";
import { ClientForm } from "../../components/clients/ClientForm";

export default function EditClientPage() {
	const params = useParams();
	const navigate = useNavigate();
	const { clients, getAll, update } = useClientStore();
	const [client, setClient] = useState(null);

	useEffect(() => {
		getAll();
	}, [getAll]);

	useEffect(() => {
		if (params.id && clients.length > 0) {
			const clientFound = clients.find((x) => x.id === parseInt(params.id));
			setClient(clientFound);
		}
	}, [params.id, clients]);

	function onSave(data) {
		update(data).then(() => {
			navigate("/clients");
		});
	}

	return (
		<MainLayout title="Editar cliente">
			{client && <ClientForm client={client} onSave={onSave} />}
		</MainLayout>
	);
}
