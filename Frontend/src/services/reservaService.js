import api from "./api";

// =========================================================
// CREAR UNA RESERVA (un servicio dentro del evento del cliente)
// =========================================================
export const crearReserva = async (datosReserva) => {
    const response = await api.post(
        "/reservas/",
        datosReserva
    );

    return response.data;
};

export const listarMisReservas = async () => {
    const response = await api.get("/reservas/mis-reservas");
    return response.data;
};

export const listarSolicitudesEmpresa = async () => {
    const response = await api.get("/reservas/solicitudes-empresa");
    return response.data;
};

export const actualizarEstadoReserva = async (idReserva, estado) => {
    const response = await api.patch(
        `/reservas/${idReserva}/estado`,
        { estado }
    );
    return response.data;
};

// =========================================================
// CREAR VARIAS RESERVAS (una por cada servicio seleccionado)
// Si alguna falla, se lanza el error para que el componente
// que llama pueda mostrar el mensaje adecuado.
// =========================================================
export const crearReservasDeEvento = async (serviciosSeleccionados, datosComunes) => {
    const reservasCreadas = [];

    for (const servicio of serviciosSeleccionados) {
        const payload = {
            id_usuario: datosComunes.id_usuario,
            id_servicio: servicio.id_servicio,
            fecha_hora: datosComunes.fecha_hora,
            estado: datosComunes.estado,
            precio_total: Number(servicio.precio_referencia || 0),
            tipo_evento: datosComunes.tipo_evento,
            cantidad_personas: datosComunes.cantidad_personas,
            mensaje: datosComunes.mensaje,
        };

        const reserva = await crearReserva(payload);

        reservasCreadas.push({
            ...servicio,
            id_reserva: reserva.id_reserva,
        });
    }

    return reservasCreadas;
};
