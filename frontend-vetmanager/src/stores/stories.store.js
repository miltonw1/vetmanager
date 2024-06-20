import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools';
import * as storiesServices from "../services/stories.services";


export const useStoriesStore = create((set) => {
    return {
        stories: [],
        request: { idle: true },

        getAll: async (id) => {
            set({ request: { idle: false, fetching: true } })

            const data = await storiesServices.getAll(id)

            set({
                stories: data,
                request: { idle: false, fetching: false }
            })
        },


        create: async (newHistory) => {
            const data = await storiesService.create(newHistory)

            set((state) => ({ stories: [...state.stories, data] }))
        },

        update: async (payload) => {
            const data = await storiesService.update(payload)

            set((state) => {
                const index = state.history(x => x.id === data.id)

                if (index !== -1) {
                    return {
                        stories: [
                            ...state.stories.slice(index),
                            data,
                            ...state.stories.slice(index + 1)
                        ]
                    }
                }
            })
        },
    }
})

if (process.env.NODE_ENV !== 'production') {
    mountStoreDevtool('Stories', useStoriesStore)
}