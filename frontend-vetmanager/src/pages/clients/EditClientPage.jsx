import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useClientStore } from "@s/clients.store";

import { MainLayout } from "@/layouts/MainLayout";
import { ClientCard } from "@/components/clients/ClientCard";
import { ClientForm } from "../../components/clients/ClientForm";

export default function EditClientPage() {
	const params = useParams();
	const [editClient, setEditClient] = useState();

	const clients = useClientStore((store) => store.clients);
	const getAll = useClientStore((store) => store.getAll);
	const client = clients.find((x) => x.id === parseInt(params.id));
	const requestClients = useClientStore((store) => store.request);

	const update = useClientStore((store) => store.update);

	useEffect(() => {
		if (requestClients.idle) {
			getAll();
		}
	}, [requestClients.idle, getAll]);

	function onSave() {

		update(client).then(() => {
			return redirect("/clients");
		});
	}

	return (
		<MainLayout title="Editar cliente">
			<ClientForm client={client} onClick={onSave} onChange={setEditClient} />
		</MainLayout>
	);
}
