import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools';
import * as usersService from '../services/users.services'

export const useUserStore = create((set) => {
    return {
        user: null,
        request: { idle: true },

        getById: async (id, token) => {
            set({ request: { idle: false, fetching: true } })

            const data = await usersService.getUserById(id, token)

            set({
                user: data,
                request: { idle: false, fetching: false }
            })
        },

        update: async (id, data, token) => {
            set({ request: { idle: false, fetching: true } })

            const response = await usersService.updateUser(id, data, token)

            set({ request: { idle: false, fetching: false } })

            if (response.statusCode >= 400) {
                throw new Error(response.message);
            }

            return response
        },

        updatePassword: async (id, data, token) => {
            set({ request: { idle: false, fetching: true } })

            const response = await usersService.updatePassword(id, data, token)

            set({ request: { idle: false, fetching: false } })

            if (response.statusCode >= 400) {
                throw new Error(response.message);
            }

            return response
        },
    }
})

if (process.env.NODE_ENV !== 'production') {
    mountStoreDevtool('Users', useUserStore)
}