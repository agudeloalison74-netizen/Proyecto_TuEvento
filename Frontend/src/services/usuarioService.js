import api from "./api";

// Registrar usuario
export const registrarUsuario = async (datosUsuario) => {
    const response = await api.post(
        "/usuarios/auth/registro",
        datosUsuario
    );

    return response.data;
};

// Iniciar sesión
export const iniciarSesion = async (datosLogin) => {
    const response = await api.post(
        "/usuarios/auth/login",
        datosLogin
    );

    return response.data;
};