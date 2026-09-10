import style from "./MainLayout.module.css";
import { useEffect } from "react";
import { useRaceStore } from "@s/races.store";
import { useSpeciesStore } from "@s/species.store";
import { useSessionStore } from "@s/session.store";
import clsx from "clsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Btn } from "../components/common/Btn";

export function MainLayout({ title, children }) {
	const logOut = useSessionStore((store) => store.logOut);
	const navigate = useNavigate();

	function handleLogOut() {
		logOut();
		navigate("/login");
	}



	const {
		races,
		getAll: getAllRaces,
		request: racesRequest,
	} = useRaceStore();

	const {
		species: allSpecies,
		getAll: getAllSpecies,
		request: speciesRequest,
	} = useSpeciesStore();


	useEffect(() => {
		if (racesRequest.idle) {
			getAllRaces();
		}
	}, [racesRequest.idle, getAllRaces]);



	useEffect(() => {
		if (speciesRequest.idle) {
			getAllSpecies();
		}
	}, [speciesRequest.idle, getAllSpecies]);

	return (
		<main
			className={clsx(
				style["main-layout"],
				"bg-neutral-50",
				"dark:bg-gray-800",
				"text-neutral-800",
				"dark:text-white",
				"overflow-scroll",
			)}
		>
			<nav className={["main-layout__menu"]}>
				<h1 className={clsx("text-xl", "font-bold", "text-violet-800", "dark:text-violet-400", "p-4")}>
					Vet Manager
				</h1>
				<Btn outline className="mx-4 mt-2" onClick={() => navigate("/home")}>
					Inicio
				</Btn>
			</nav>

			<div className={style["main-layout__actions"]}>
				<Btn outline onClick={handleLogOut}>
					Cerrar sesión
				</Btn>
			</div>

			<h2 className={clsx(style["main-layout__title"], "text-3xl", "font-bold", "mt-8")} data-cy="page-title">
				{title}
			</h2>

			<search className={style["main-layout__search"]} />

			<section className={style["main-layout__content"]}>{children}</section>
		</main>
	);
}

