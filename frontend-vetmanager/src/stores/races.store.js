import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import * as racesServices from "../services/races.services";

export const useRaceStore = create((set) => {
	return {
		races: [],

		getAll: async () => {
			const data = await racesServices.getAll();

			set({ races: data });
		},

		create: async (newRace) => {
			const data = await racesServices.create(newRace);

			set((state) => ({ races: [...state.races, data] }));
		},

		update: async (payload) => {
			const data = await racesServices.update(payload);

			set((state) => {
				const index = state.race((x) => x.id === data.id);

				if (index !== -1) {
					return {
						clients: [...state.races.slice(index), data, ...state.races.slice(index + 1)],
					};
				}
			});
		},
	};
});

if (process.env.NODE_ENV !== 'production') {
    mountStoreDevtool('Races', useRaceStore)
}
