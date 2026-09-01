import api from "./api";

export const registrarUsuario = async (datos) => {
  const response = await api.post(
    "/usuarios/auth/registro",
    datos
  );

  return response.data;
};

export const iniciarSesion = async (datos) => {
  const response = await api.post(
    "/usuarios/auth/login",
    datos
  );

  return response.data;
};