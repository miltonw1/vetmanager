import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools';
import * as clientsService from '../services/clients.services'

export const useClientStore = create((set) => {
    return {
        clients: [],
        request: { idle: true },

        getAll: async () => {
            set({ request: { idle: false, fetching: true } })

            const data = await clientsService.getAll()

            set({
                clients: data,
                request: { idle: false, fetching: false }
            })
        },


        create: async (newClient) => {
            const data = await clientsService.create(newClient)

            set((state) => ({ clients: [...state.clients, data] }))
        },

        update: async (payload) => {
            const data = await clientsService.update(payload)

            set((state) => {
                const index = state.client(x => x.id === data.id)

                if (index !== -1) {
                    return {
                        clients: [
                            ...state.clients.slice(index),
                            data,
                            ...state.clients.slice(index + 1)
                        ]
                    }
                }
            })
        },
    }
})

if (process.env.NODE_ENV !== 'production') {
    mountStoreDevtool('Clients', useClientStore)
}