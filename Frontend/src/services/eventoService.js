import API from './api';

export const obtenerEventos = async () => {
  const response = await API.get('/eventos');
  return response.data;
};

export const crearEvento = async (datosEvento) => {
  const response = await API.post('/eventos', datosEvento);
  return response.data;
};

export const obtenerServicios = async () => {
  const response = await API.get('/servicios');
  return response.data;
};

export const crearReserva = async (datosReserva) => {
  const response = await API.post('/reservas', datosReserva);
  return response.data;
};