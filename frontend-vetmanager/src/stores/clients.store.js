import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools';
import * as clientServices from '../services/clients.services'

export const useClientStore = create((set) => {
    return {
        clients: [],

        getAll: async () => {
            const data = await clientServices.getAll()

            set({ clients: data })
        },


        create: async (newClient) => {
            const data = await clientServices.create(newClient)

            set((state) => ({ clients: [...state.clients, data] }))
        },

        update: async (payload) => {
            const data = await clientServices.update(payload)

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