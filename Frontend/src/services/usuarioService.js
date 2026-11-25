import api from "./api";

export const cerrarSesion = () => {
    [
        "token",
        "usuario",
        "usuarioAutenticado",
        "tipoUsuario",
        "reservaPendiente",
        "reservaTemporal"
    ].forEach((clave) => localStorage.removeItem(clave));
};

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

export const solicitarRecuperacion = async (correoUsuario) => {
    const response = await api.post(
        "/usuarios/auth/recuperar-contrasena",
        { correo_usuario: correoUsuario }
    );

    return response.data;
};

export const restablecerContrasena = async (
    correoUsuario,
    codigo,
    contrasenaNueva
) => {
    const response = await api.post(
        "/usuarios/auth/restablecer-contrasena",
        {
            correo_usuario: correoUsuario,
            codigo: codigo,
            contrasena_nueva: contrasenaNueva
        }
    );

    return response.data;
};