import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { usePetStore } from "@s/pets.store";
import { useClientStore } from "@s/clients.store";

import { MainLayout } from "@/layouts/MainLayout";



export default function PetStoriesPage() {
    const params = useParams();
    console.log(params)

    return(
        <MainLayout title={"xd"}>
            asklassdklasdakmlsdakmlasdkmlasdasdkmlasdkml!!!
        </MainLayout>
    )

}