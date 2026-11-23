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

export const solicitarRecuperacion = async (correoUsuario) => {
    const response = await api.post(
        "/usuarios/auth/recuperar-contrasena",
        { correo_usuario: correoUsuario }
    );

    return response.data;
};

export const verificarCodigoRecuperacion = async (correoUsuario, codigo) => {
    const response = await api.post(
        "/usuarios/auth/verificar-codigo",
        {
            correo_usuario: correoUsuario,
            codigo
        }
    );

    return response.data;
};