import api from "./api";

// Obtener todas las reservas
export const obtenerReservas = async () => {
    const response = await api.get("/reservas/");
    return response.data;
};

// Obtener una reserva por ID
export const obtenerReserva = async (idReserva) => {
    const response = await api.get(`/reservas/${idReserva}`);
    return response.data;
};

// Crear una reserva
export const crearReserva = async (reserva) => {
    const response = await api.post("/reservas/", reserva);
    return response.data;
};

// Eliminar una reserva
export const eliminarReserva = async (idReserva) => {
    await api.delete(`/reservas/${idReserva}`);
}; 