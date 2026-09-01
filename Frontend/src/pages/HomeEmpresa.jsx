import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';

export default function HomeEmpresa() {
  const { data: misServicios } = useFetch('/servicios/empresa');
  const [nuevoServicio, setNuevoServicio] = useState({ nombre: '', descripcion: '', precio: '' });

  const handleCrearServicio = (e) => {
    e.preventDefault();
    alert('Servicio agregado (Conectar con backend API)');
    setNuevoServicio({ nombre: '', descripcion: '', precio: '' });
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Gestión de Empresa</h2>
          <p className="text-muted mb-0">Publica nuevos servicios y administra las solicitudes de reservas.</p>
        </div>
        <button 
          className="btn btn-primary-custom px-4 rounded-pill"
          data-bs-toggle="modal" 
          data-bs-target="#modalServicio"
        >
          <i className="bi bi-plus-circle me-2"></i>Publicar Nuevo Servicio
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-8">
          <div className="card card-custom p-4">
            <h5 className="fw-bold mb-3">Mis Servicios Publicados</h5>
            <div className="list-group list-group-flush">
              {(misServicios || [
                { id: 1, nombre: 'Decoración Vintage para Bodas', precio: 500000, estado: 'Disponible' },
                { id: 2, nombre: 'Catering Premium 50 personas', precio: 1200000, estado: 'Disponible' },
              ]).map((s) => (
                <div key={s.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                  <div>
                    <h6 className="mb-1 fw-bold">{s.nombre}</h6>
                    <span className="text-muted small">${s.precio.toLocaleString('es-CO')} COP</span>
                  </div>
                  <div>
                    <span className="badge bg-success me-2">{s.estado}</span>
                    <button className="btn btn-sm btn-outline-secondary"><i className="bi bi-pencil"></i></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card card-custom p-4 bg-white">
            <h5 className="fw-bold mb-3">Solicitudes Pendientes</h5>
            <div className="alert alert-warning small">
              <i className="bi bi-exclamation-triangle me-2"></i>Tienes 2 solicitudes de cotización pendientes por respuesta.
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modalServicio" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Agregar Servicio</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <form onSubmit={handleCrearServicio}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre del Servicio</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    value={nuevoServicio.nombre}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea 
                    className="form-control" 
                    rows="3" 
                    required
                    value={nuevoServicio.descripcion}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, descripcion: e.target.value })}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio Estimado (COP)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    required 
                    value={nuevoServicio.precio}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, precio: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" className="btn btn-primary-custom" data-bs-dismiss="modal">Guardar Servicio</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}