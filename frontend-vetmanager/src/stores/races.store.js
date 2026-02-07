import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import * as racesServices from "../services/races.services";

export const useRaceStore = create((set) => {
	return {
		races: [],
		request: { idle: true },

		getAll: async () => {
			set({ request: { idle: false, fetching: true } })

			const data = await racesServices.getAll();

			set({
				races: data,
				request: { idle: false, fetching: false },
			});
		},

		create: async (newRace) => {
			const data = await racesServices.create(newRace);

			set((state) => ({ races: [...state.races, data] }));
		},

		update: async (payload) => {
			const data = await racesServices.update(payload);

			set((state) => {
				const index = state.races.findIndex((x) => x.id === data.id);

				if (index !== -1) {
					return {
						races: [...state.races.slice(0, index), data, ...state.races.slice(index + 1)],
					};
				}
				return state;
			});
		},
	};
});

if (process.env.NODE_ENV !== 'production') {
    mountStoreDevtool('Races', useRaceStore)
}
