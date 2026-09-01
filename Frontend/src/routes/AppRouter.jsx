import { Routes, Route, Navigate } from 'react-router-dom';
import HomeCliente from '../pages/HomeCliente';
import HomeAdmin from '../pages/HomeAdmin';
import HomeEmpresa from '../pages/HomeEmpresa';
import Login from '../pages/Login';
import RegistroUsuario from '../pages/RegistroUsuario';
import RegistroEmpresa from '../pages/RegistroEmpresa';
import RecuperarContrasena from '../pages/RecuperarContrasena';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeCliente />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro-usuario" element={<RegistroUsuario />} />
      <Route path="/registro-empresa" element={<RegistroEmpresa />} />
      <Route path="/recuperar" element={<RecuperarContrasena />} />
      
      {/* Rutas protegidas por Rol */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <HomeAdmin />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/empresa" 
        element={
          <ProtectedRoute allowedRoles={['empresa']}>
            <HomeEmpresa />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};