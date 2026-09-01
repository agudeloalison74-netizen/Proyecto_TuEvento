import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';

export default function HomeCliente() {
  const { data: servicios, loading, error } = useFetch('/servicios');
  const { data: categorias } = useFetch('/categorias');
  const [categoriaSel, setCategoriaSel] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const serviciosFiltrados = servicios?.filter((item) => {
    const coincideNombre = item.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSel ? item.categoria_id === parseInt(categoriaSel) : true;
    return coincideNombre && coincideCategoria;
  });

  return (
    <div>
      <section className="hero-section text-center mb-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Organiza tu Evento Soñado</h1>
          <p className="lead mb-4">Encuentra y reserva los mejores proveedores de catering, sonido, lugares y decoración.</p>
          
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="input-group input-group-lg shadow-sm">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="¿Qué servicio estás buscando?"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <select 
                  className="form-select" 
                  style={{ maxWidth: '200px' }}
                  value={categoriaSel}
                  onChange={(e) => setCategoriaSel(e.target.value)}
                >
                  <option value="">Todas las Categorías</option>
                  {categorias?.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                  ))}
                </select>
                <button className="btn btn-warning fw-bold px-4" type="button">
                  <i className="bi bi-search me-1"></i> Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mb-5">
        <h3 className="fw-bold mb-4 d-flex align-items-center gap-2">
          <i className="bi bi-stars text-warning"></i> Servicios Destacados
        </h3>

        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Cargando servicios...</p>
          </div>
        )}

        <div className="row g-4">
          {(serviciosFiltrados && serviciosFiltrados.length > 0 ? serviciosFiltrados : [
            { id: 1, nombre: 'Banquetes & Catering Gourmet', descripcion: 'Servicio completo de cena de 3 tiempos para bodas y eventos corporativos.', precio: 450000, categoria: 'Catering' },
            { id: 2, nombre: 'Sonido e Iluminación Profesional', descripcion: 'Equipos de alta fidelidad, DJs y luces robóticas para todo tipo de celebración.', precio: 600000, categoria: 'Audiovisual' },
            { id: 3, nombre: 'Fotografía & Video 4K', descripcion: 'Cobertura completa del evento con entrega digital y álbum impreso.', precio: 800000, categoria: 'Fotografía' },
          ]).map((servicio) => (
            <div key={servicio.id} className="col-md-4">
              <div className="card h-100 card-custom">
                <div className="card-body d-flex flex-column">
                  <span className="badge badge-custom w-auto align-self-start mb-2">
                    {servicio.categoria || 'Servicio General'}
                  </span>
                  <h5 className="card-title fw-bold">{servicio.nombre}</h5>
                  <p className="card-text text-muted flex-grow-1">{servicio.descripcion}</p>
                  <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                    <span className="fw-bold fs-5 text-primary">
                      ${servicio.precio?.toLocaleString('es-CO')} COP
                    </span>
                    <button className="btn btn-outline-primary btn-sm rounded-pill px-3">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}