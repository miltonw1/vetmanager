import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { usePetStore } from "@s/pets.store";
import { useClientStore } from "@s/clients.store";
import { useHistoriesStore } from "@s/histories.store";

import { MainLayout } from "@/layouts/MainLayout";



export default function PetHistoryPage() {
	const params = useParams();


	const histories = useHistoriesStore((store) => store.histories);
	const getAllHistories = useHistoriesStore((store) => store.getAll);
	const history = histories.find((x) => x.id === parseInt(params.id));



    return(
        <MainLayout title={"xd"}>
                <section className="h-[100%] space-y-2 border border-violet-800 p-4">
			<p>
				<strong>Nombre:</strong>&nbsp;
				pichicho
			</p>
			<p>
				<strong>Tutor:</strong>&nbsp;
				moroso
			</p>
            <p>
				<strong>Ultimo pesaje:</strong>&nbsp;
				7 kg
			</p>
            <p>
				<strong>Diagnostico:</strong>&nbsp;
				moquillo
			</p>
            <p>
				<strong>Observaciones:</strong>&nbsp;
                es peludo
			</p>

        </section>
        </MainLayout>
    )
}