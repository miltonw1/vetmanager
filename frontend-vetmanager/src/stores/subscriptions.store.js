import { create } from "zustand";
import * as subscriptionsService from "../services/subscriptions.services";

export const useSubscriptionStore = create((set) => ({
	plans: [],
	status: null,
	request: { idle: true },

	getPlans: async () => {
		set({ request: { idle: false, fetching: true } });
		try {
			const data = await subscriptionsService.getPlans();
			set({ plans: Array.isArray(data) ? data : [], request: { idle: false, fetching: false } });
			return data;
		} catch {
			set({ request: { idle: false, fetching: false } });
		}
	},

	getStatus: async () => {
		try {
			const data = await subscriptionsService.getStatus();
			if (data && data.statusCode >= 400) {
				set({ status: null });
				return null;
			}
			set({ status: data });
			return data;
		} catch {
			set({ status: null });
			return null;
		}
	},

	createPreference: async (plan) => {
		const data = await subscriptionsService.createPreference(plan);

		if (!data || data.statusCode >= 400) {
			throw new Error(data?.message || "No se pudo iniciar el pago.");
		}

		return data;
	},

	verifyPayment: async (payload) => {
		const data = await subscriptionsService.verifyPayment(payload);
		if (data && !data.statusCode) {
			set({ status: data });
		}
		return data;
	},
}));
