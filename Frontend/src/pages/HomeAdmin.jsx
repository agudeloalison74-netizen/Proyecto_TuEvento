import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';

export default function HomeAdmin() {
  const { data: usuarios } = useFetch('/usuarios');
  const { data: empresas } = useFetch('/empresas');
  const { data: eventos } = useFetch('/eventos');

  const [tab, setTab] = useState('usuarios');

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark">Panel Administrativo</h2>
          <p className="text-muted mb-0">Gestión global de usuarios, proveedores y eventos registrados.</p>
        </div>
        <span className="badge bg-danger px-3 py-2 fs-6">Modo Administrador</span>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card card-custom p-3 bg-white border-start border-4 border-primary">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted mb-1">Total Usuarios</h6>
                <h3 className="fw-bold mb-0">{usuarios?.length || 12}</h3>
              </div>
              <i className="bi bi-people-fill fs-1 text-primary"></i>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-custom p-3 bg-white border-start border-4 border-success">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted mb-1">Empresas / Proveedores</h6>
                <h3 className="fw-bold mb-0">{empresas?.length || 5}</h3>
              </div>
              <i className="bi bi-building-check fs-1 text-success"></i>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-custom p-3 bg-white border-start border-4 border-warning">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted mb-1">Eventos Totales</h6>
                <h3 className="fw-bold mb-0">{eventos?.length || 8}</h3>
              </div>
              <i className="bi bi-calendar-check-fill fs-1 text-warning"></i>
            </div>
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${tab === 'usuarios' ? 'active fw-bold' : ''}`} 
            onClick={() => setTab('usuarios')}
          >
            Usuarios Registrados
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${tab === 'empresas' ? 'active fw-bold' : ''}`} 
            onClick={() => setTab('empresas')}
          >
            Empresas Aliadas
          </button>
        </li>
      </ul>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            {tab === 'usuarios' ? (
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(usuarios || [
                    { id: 1, nombre: 'Leidy Bejarano', email: 'leidy@gmail.com', rol: 'admin' },
                    { id: 2, nombre: 'Carlos Mendoza', email: 'carlos@gmail.com', rol: 'cliente' },
                  ]).map((u) => (
                    <tr key={u.id}>
                      <td>#{u.id}</td>
                      <td className="fw-bold">{u.nombre}</td>
                      <td>{u.email}</td>
                      <td><span className="badge bg-info text-dark">{u.rol}</span></td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger me-1"><i className="bi bi-trash"></i></button>
                        <button className="btn btn-sm btn-outline-secondary"><i className="bi bi-pencil"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nombre Comercial</th>
                    <th>NIT</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(empresas || [
                    { id: 1, nombre: 'Eventos & Banquetes Bogotá', nit: '900123456-1', telefono: '3001234567' },
                  ]).map((emp) => (
                    <tr key={emp.id}>
                      <td>#{emp.id}</td>
                      <td className="fw-bold">{emp.nombre}</td>
                      <td>{emp.nit}</td>
                      <td>{emp.telefono}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-success me-1">Ver Servicios</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}