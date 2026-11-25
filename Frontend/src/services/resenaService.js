import api from "./api";

export const listarMisResenas = async () => {
    const response = await api.get("/resenas/mis-resenas");
    return response.data;
};

export const listarResenasEmpresa = async () => {
    const response = await api.get("/resenas/empresa");
    return response.data;
};

export const crearResena = async (datosResena) => {
    const response = await api.post("/resenas/", datosResena);
    return response.data;
};

export const responderResena = async (idResena, respuestaEmpresa) => {
    const response = await api.put(
        `/resenas/${idResena}/respuesta`,
        { respuesta_empresa: respuestaEmpresa }
    );
    return response.data;
};
