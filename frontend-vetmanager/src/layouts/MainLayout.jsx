import style from "./MainLayout.module.css";
import { useEffect } from "react";
import { useRaceStore } from "@s/races.store";
import { useSpeciesStore } from "@s/species.store";
import { useSessionStore } from "@s/session.store";
import { useSubscriptionStore } from "@s/subscriptions.store";
import clsx from "clsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Btn } from "../components/common/Btn";

export function MainLayout({ title, children }) {
	const logOut = useSessionStore((store) => store.logOut);
	const navigate = useNavigate();

	const subscriptionStatus = useSubscriptionStore((store) => store.status);
	const getSubscriptionStatus = useSubscriptionStore((store) => store.getStatus);

	useEffect(() => {
		getSubscriptionStatus();
	}, [getSubscriptionStatus]);

	const subscriptionExpired = subscriptionStatus && !subscriptionStatus.active;

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
			)}
		>
			<header className={clsx(style["main-layout__header"], "border-b border-gray-200 dark:border-gray-700")}>
				<h1 className={clsx("text-xl", "font-bold", "text-blue-800", "dark:text-blue-400", "whitespace-nowrap")}>
					Vet Manager
				</h1>

				<nav className={style["main-layout__nav"]}>
					<Btn outline onClick={() => navigate("/home")}>
						Inicio
					</Btn>
					<Btn outline onClick={() => navigate("/plans")}>
						Planes
					</Btn>
				</nav>

				<div className={style["main-layout__actions"]}>
					<Link
						to="/plans"
						title="Ver planes"
						className={clsx(
							"rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap shadow-sm transition-colors",
							subscriptionStatus
								? subscriptionStatus.active
									? "bg-blue-700 text-white hover:bg-blue-800"
									: "bg-red-600 text-white hover:bg-red-700"
								: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
						)}
					>
						{subscriptionStatus
							? subscriptionStatus.active
								? `${subscriptionStatus.is_trial ? "Prueba" : "Plan"}: ${subscriptionStatus.days_remaining} ${
										subscriptionStatus.days_remaining === 1 ? "día" : "días"
									}`
								: "Cuenta vencida"
							: "..."}
					</Link>
					<Btn outline onClick={handleLogOut}>
						Cerrar sesión
					</Btn>
				</div>
			</header>

			{subscriptionExpired && (
				<div className="mx-6 mt-4 rounded-md border-2 border-red-500 bg-red-50 text-red-700 p-3 text-sm dark:bg-red-950 dark:text-red-200">
					Tu cuenta venció y está en modo solo lectura.{" "}
					<Link to="/plans" className="underline font-semibold">
						Renovar plan
					</Link>
				</div>
			)}

			<div className={style["main-layout__body"]}>
				<h2 className={clsx("text-3xl", "font-bold", "mt-8")} data-cy="page-title">
					{title}
				</h2>

				<search className={style["main-layout__search"]} />

				<section className={style["main-layout__content"]}>{children}</section>
			</div>
		</main>
	);
}

