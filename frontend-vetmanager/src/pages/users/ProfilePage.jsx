import { MainLayout } from "@/layouts/MainLayout";
import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/users.store";
import { useSessionStore } from "@/stores/session.store";

export default function ProfilePage() {
    const { user, getById, update, updatePassword } = useUserStore();
    const { session, request: sessionRequest } = useSessionStore();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
    });

    const [showUserSuccess, setShowUserSuccess] = useState(false);
    const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
    const [userError, setUserError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        if (session && !sessionRequest.fetching) {
            getById(session.id, session.token);
        }
    }, [session, sessionRequest.fetching, getById]);

    useEffect(() => {
        if (user) {
            setUserData({
                name: user.name || "",
                email: user.email || "",
            });
        }
    }, [user]);

    const handleUserChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        setUserError(""); // Limpiar error al cambiar input
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
        setPasswordError(""); // Limpiar error al cambiar input
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setUserError(""); // Limpiar errores anteriores
        setShowUserSuccess(false); // Limpiar éxito anterior

        if (!userData.name || !userData.email) {
            setUserError("Nombre y email son obligatorios.");
            return;
        }

        try {
            const response = await update(session.id, userData, session.token);
            if (response) {
                setShowUserSuccess(true);
                setTimeout(() => setShowUserSuccess(false), 5000);
            } else {
                setUserError("Error al actualizar los datos.");
            }
        } catch (error) {
            setUserError(error.message || "Error al actualizar los datos.");
        }
    };

    const onPasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordError(""); // Limpiar errores anteriores
        setShowPasswordSuccess(false); // Limpiar éxito anterior

        if (!passwordData.oldPassword || !passwordData.newPassword) {
            setPasswordError("Ambos campos de contraseña son obligatorios.");
            return;
        }

        try {
            const response = await updatePassword(session.id, passwordData, session.token);
            if (response) {
                setShowPasswordSuccess(true);
                setTimeout(() => setShowPasswordSuccess(false), 5000);
                setPasswordData({ oldPassword: "", newPassword: "" }); // Limpiar campos de contraseña
            } else {
                setPasswordError("Error al cambiar la contraseña.");
            }
        } catch (error) {
            setPasswordError(error.message || "Error al cambiar la contraseña.");
        }
    };

    if (sessionRequest.fetching || !session) {
        return (
            <MainLayout title="Cargando perfil...">
                <div className="flex justify-center items-center h-full">
                    <p>Cargando información del usuario...</p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout title="Perfil">
            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-md relative">
                        <h2 className="text-xl font-bold mb-4">Actualizar datos</h2>
                        <form onSubmit={onSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleUserChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleUserChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Actualizar
                            </button>
                            {showUserSuccess && (
                                <p className="text-green-500 text-sm mt-2 transition-opacity duration-500 opacity-100 animate-fade-out">
                                    Datos actualizados!
                                </p>
                            )}
                            {userError && (
                                <p className="text-red-500 text-sm mt-2">
                                    {userError}
                                </p>
                            )}
                        </form>
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-md relative">
                        <h2 className="text-xl font-bold mb-4">Cambiar contraseña</h2>
                        <form onSubmit={onPasswordSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Contraseña actual</label>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    value={passwordData.oldPassword}
                                    onChange={handlePasswordChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nueva contraseña</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cambiar contraseña
                            </button>
                            {showPasswordSuccess && (
                                <p className="text-green-500 text-sm mt-2 transition-opacity duration-500 opacity-100 animate-fade-out">
                                    Contraseña actualizada!
                                </p>
                            )}
                            {passwordError && (
                                <p className="text-red-500 text-sm mt-2">
                                    {passwordError}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}