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
        };

        const reserva = await crearReserva(payload);

        reservasCreadas.push({
            ...servicio,
            id_reserva: reserva.id_reserva,
        });
    }

    return reservasCreadas;
};
