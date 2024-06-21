import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools';
import * as historiesServices from "../services/histories.services";


export const useHistoriesStore = create((set) => {
    return {
        histories: [],
        request: { idle: true },

        getAll: async (id) => {
            set({ request: { idle: false, fetching: true } })

            const data = await historiesServices.getAll(id)

            set({
                histories: data,
                request: { idle: false, fetching: false }
            });
        },


        create: async (newHistory) => {
            const data = await historiesService.create(newHistory)

            set((state) => ({ histories: [...state.histories, data] }))
        },

        update: async (payload) => {
            const data = await historiesService.update(payload)

            set((state) => {
                const index = state.history(x => x.id === data.id)

                if (index !== -1) {
                    return {
                        histories: [
                            ...state.histories.slice(index),
                            data,
                            ...state.histories.slice(index + 1)
                        ]
                    }
                }
            })
        },
    }
})

if (process.env.NODE_ENV !== 'production') {
    mountStoreDevtool('Histories', useHistoriesStore)
}