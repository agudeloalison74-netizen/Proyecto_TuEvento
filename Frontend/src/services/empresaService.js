import api from "./api";

// Registrar empresa
export const registrarEmpresa = async (datosEmpresa) => {
    const response = await api.post(
        "/empresas/",
        datosEmpresa
    );

    return response.data;
};

// Obtener todas las empresas
export const obtenerEmpresas = async () => {
    const response = await api.get(
        "/empresas/"
    );

    return response.data;
};

// Obtener una empresa por NIT
export const obtenerEmpresa = async (idEmpresa) => {
    const response = await api.get(
        `/empresas/${idEmpresa}`
    );

    return response.data;
};