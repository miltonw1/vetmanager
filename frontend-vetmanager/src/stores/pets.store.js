import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import * as petServices from "../services/pets.services";

export const usePetStore = create((set) => {
	return {
		pets: [],

		getAll: async () => {
			const data = await petServices.getAll();

			set({ pets: data });
		},

		create: async (newPet) => {
			const data = await petServices.create(newPet);

			set((state) => ({ pets: [...state.pets, data] }));
		},

		update: async (payload) => {
			const data = await petServices.update(payload);

			set((state) => {
				const index = state.pet((x) => x.id === data.id);

				if (index !== -1) {
					return {
						pets: [...state.pets.slice(index), data, ...state.pets.slice(index + 1)],
					};
				}
			});
		},
	};
});

if (process.env.NODE_ENV !== "production") {
	mountStoreDevtool("Pets", usePetStore);
}
