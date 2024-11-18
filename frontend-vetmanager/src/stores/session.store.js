import { create } from "zustand";
import * as sessionServices from "../services/session.services";

export const useSessionStore = create((set) => ({
    session: null,
    request: { idle: true },

    getSession: async (credentials) => {
        set({ request: { idle: false, fetching: true } });

        try {
            const sessionData = await sessionServices.login(credentials);

            const { access_token: token, exp } = sessionData;

            if (token) {
                // Guarda el token y su expiración en localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("token expiration", exp);

                set({
                    session: { token, exp },
                    request: { idle: true, fetching: false },
                });
            } else {
                throw new Error("No se recibió el token.");
            }
        } catch (error) {
            console.error("Error en inicio de sesión:", error);
            set({ request: { idle: true, fetching: false } });
        }
    },

    isLoggedIn: () => !!localStorage.getItem("token"),
}));