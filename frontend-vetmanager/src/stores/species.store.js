import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import * as speciesServices from "../services/species.services";

export const useSpeciesStore = create((set) => {
	return {
		species: [],
		request: { idle: true },


		getAll: async () => {
			set({ request: { idle: false, fetching: true } })

			const data = await speciesServices.getAll();

			set({
				species: data,
				request: { idle: false, fetching: false },
			});
		},

		create: async (newSpecies) => {
			const data = await speciesServices.create(newSpecies);

			set((state) => ({ species: [...state.species, data] }));
		},

		update: async (payload) => {
			const data = await speciesServices.update(payload);

			set((state) => {
				const index = state.species((x) => x.id === data.id);

				if (index !== -1) {
					return {
						species: [...state.species.slice(index), data, ...state.species.slice(index + 1)],
					};
				}
			});
		},
	};
});

if (process.env.NODE_ENV !== 'production') {
    mountStoreDevtool('Species', useSpeciesStore)
}