import style from "./MainLayout.module.css";
import { useEffect } from "react";
import { useRaceStore } from "@s/races.store";
import { useSpeciesStore } from "@s/species.store";
import clsx from "clsx";

export function MainLayout({ title, children }) {
	const races = useRaceStore((store) => store.races);
	const getAllRaces = useRaceStore((store) => store.getAll);

	useEffect(() => {
		if (races.length === 0) {
			getAllRaces();
		}
	}, [races, getAllRaces]);

	const species = useSpeciesStore((store) => store.species);
	const getAllSpecies = useSpeciesStore((store) => store.getAll);

	useEffect(() => {
		if (species.length === 0) {
			getAllSpecies();
		}
	}, [species, getAllSpecies]);

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
			<nav className={["main-layout__menu"]} />

			<h2 className={clsx(style["main-layout__title"], "text-3xl", "font-bold", "mt-8")}>{title}</h2>

			<search className={style["main-layout__search"]} />

			<section className={style["main-layout__content"]}>{children}</section>
		</main>
	);
}
