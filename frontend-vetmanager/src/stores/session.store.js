import { create } from "zustand";
import * as sessionServices from "../services/session.services";
import { jwtDecode } from "jwt-decode";

export const useSessionStore = create((set) => ({
    session: null,
    request: { idle: true },

    getSession: async (credentials) => {
        set({ request: { idle: false, fetching: true } });

        try {
            const sessionData = await sessionServices.login(credentials);

            if (sessionData.statusCode >= 400) {
                throw new Error("Usuario o contraseña incorrectos.");
            }

            const { access_token: token, exp } = sessionData;
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;

            localStorage.setItem("token", token);
            localStorage.setItem("token expiration", exp);

            set({
                session: { token, exp, id: userId },
                request: { idle: false, fetching: false },
            });

        } catch (error) {
            console.error("Error en inicio de sesión:", error);
            set({ request: { idle: true, fetching: false } });
        }
    },

    loadSession: () => {
        const token = localStorage.getItem('token');
        const expiration = localStorage.getItem('token expiration');

        if (token && expiration) {
            const now = new Date();
            const expirationDate = new Date(parseInt(expiration) * 1000);

            if (expirationDate > now) {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub;
                set({
                    session: { token, exp: expiration, id: userId },
                    request: { idle: false, fetching: false },
                });
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('token expiration');
                set({
                    session: null,
                    request: { idle: true, fetching: false },
                });
            }
        } else {
            set({
                session: null,
                request: { idle: true, fetching: false },
            });
        }
    },

    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        const expiration = localStorage.getItem('token expiration');

        if (!token || !expiration) {
            return false;
        }

        const now = new Date();
        const expirationDate = new Date(parseInt(expiration) * 1000);


        if (expirationDate <= now) {
            localStorage.removeItem('token');
            localStorage.removeItem('token expiration');
            return false;
        }

        return true;
    },

    logOut: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token expiration');
        set({
            session: null,
            request: { idle: true, fetching: false },
        });
    }
}));