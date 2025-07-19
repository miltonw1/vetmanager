import style from "./MainLayout.module.css";
import { useEffect } from "react";
import { useRaceStore } from "@s/races.store";
import { useSpeciesStore } from "@s/species.store";
import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";

export function MainLayout({ title, children }) {


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
			</nav>

			<h2 className={clsx(style["main-layout__title"], "text-3xl", "font-bold", "mt-8")} data-cy="page-title">
				{title}
			</h2>

			<search className={style["main-layout__search"]} />

			<section className={style["main-layout__content"]}>{children}</section>
		</main>
	);
}

