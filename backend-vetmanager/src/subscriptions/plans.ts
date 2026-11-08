export interface Plan {
	id: "30d" | "60d" | "1y";
	days: number;
	title: string;
	description: string;
	price: number;
	currency: "ARS";
}

export const PLANS: Plan[] = [
	{
		id: "30d",
		days: 30,
		title: "30 días",
		description: "Un mes de acceso completo",
		price: 10000,
		currency: "ARS",
	},
	{
		id: "60d",
		days: 60,
		title: "60 días",
		description: "Dos meses con 10% de descuento",
		price: 18000,
		currency: "ARS",
	},
	{
		id: "1y",
		days: 365,
		title: "1 año",
		description: "Doce meses con 20% de descuento",
		price: 96000,
		currency: "ARS",
	},
];

export function findPlan(id: string): Plan | undefined {
	return PLANS.find((plan) => plan.id === id);
}
