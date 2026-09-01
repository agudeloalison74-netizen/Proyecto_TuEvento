import API from './api';

export const loginUsuario = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};

export const registrarCliente = async (datosCliente) => {
  const response = await API.post('/usuarios', datosCliente);
  return response.data;
};

export const registrarEmpresa = async (datosEmpresa) => {
  const response = await API.post('/empresas', datosEmpresa);
  return response.data;
};

export const obtenerPerfilActual = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};