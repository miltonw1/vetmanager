import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import * as historiesServices from "../services/histories.services";
import compareDesc from "date-fns/compareDesc";

function orderCriteria (historyA, historyB) {
	return compareDesc(new Date(historyA.created_at), new Date(historyB.created_at))
}

export const useHistoriesStore = create((set) => {
	return {
		histories: [],
		request: { idle: true },

		getAll: async (petId) => {
			set({ request: { idle: false, fetching: true } });

			const data = await historiesServices.getAll(petId);

			set({
				histories: data.toSorted(orderCriteria),
				request: { idle: false, fetching: false },
			});
		},

		create: async (newHistory) => {
			const data = await historiesServices.create(newHistory);

			set((state) => ({ histories: [...state.histories, data].toSorted(orderCriteria) }));
		},

		update: async (payload) => {
			const data = await historiesServices.update(payload);

			set((state) => {
				const index = state.history((x) => x.id === data.id);

				if (index !== -1) {
					return {
						histories: [...state.histories.slice(index), data, ...state.histories.slice(index + 1)],
					};
				}
			});
		},

		uploadImage: async (petId, historyId, payload) => {
			const ok = await historiesServices.uploadImage(petId, historyId, payload);
			if (ok) {
				set({ request: { idle: false, fetching: true } });

				const data = await historiesServices.getAll(petId);

				set({
					histories: data.toSorted(orderCriteria),
					request: { idle: false, fetching: false },
				});
			}
		},
	};
});

if (process.env.NODE_ENV !== "production") {
	mountStoreDevtool("Histories", useHistoriesStore);
}
