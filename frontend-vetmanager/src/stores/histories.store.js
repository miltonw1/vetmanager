import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import * as historiesServices from "../services/histories.services";
import format from "date-fns/format";

function basicSlug(history) {
	const date = new Date(history.created_at);

	return format(date, "yyyy-MM-dd");
}

function addSlugsToHistories(histories) {
	const order = histories.map(basicSlug);
	const grouped = Map.groupBy(histories, basicSlug);

	for (const inDate of grouped.values()) {
		inDate[0] = { ...inDate[0], slug: basicSlug(inDate[0]) };

		for (let i = 1; i < inDate.length; i++) {
			const slug = `${basicSlug(inDate[i])}-${i + 1}`;

			inDate[i] = { ...inDate[i], slug };
		}
	}

	const alreadyTaken = new Set();
	let rebuiltHistories = [];

	for (const date of order) {
		if (alreadyTaken.has(date)) continue;

		alreadyTaken.add(date);
		rebuiltHistories = [...rebuiltHistories, ...grouped.get(date)];
	}

	return rebuiltHistories;
}

export const useHistoriesStore = create((set) => {
	return {
		histories: [],
		request: { idle: true },

		getAll: async (petId) => {
			set({ request: { idle: false, fetching: true } });

			const data = await historiesServices.getAll(petId);

			set({
				histories: addSlugsToHistories(data),
				request: { idle: false, fetching: false },
			});
		},

		create: async (newHistory) => {
			const data = await historiesServices.create(newHistory);

			set((state) => ({ histories: [...state.histories, data] }));
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
					histories: addSlugsToHistories(data),
					request: { idle: false, fetching: false },
				});
			}
		},
	};
});

if (process.env.NODE_ENV !== "production") {
	mountStoreDevtool("Histories", useHistoriesStore);
}
