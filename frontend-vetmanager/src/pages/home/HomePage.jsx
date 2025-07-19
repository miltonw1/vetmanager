import { useEffect, useMemo, useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { MenuCard } from '@/components/home/MenuCard'
import { Link } from "react-router-dom";

export default function HomePage () {


return(
<MainLayout title="Home">
<div className="grid grid-cols-2 gap-4"> {/* Opcional: para un layout de cuadrícula */}
                <MenuCard
                    linkName="👥 Clientes"
                    to="/clients"
                />
                <MenuCard
                    linkName="🐾 Especies"
                    to="/species"
                />
                <MenuCard
                    linkName="🐶 Razas"
                    to="/races"
                />
                <MenuCard
                    linkName="🔑 Usuarios"
                    to="/users"
                />
                <MenuCard
                    linkName="👤 Perfil"
                    to="/profile"
                />
            </div>
</MainLayout>

)
}