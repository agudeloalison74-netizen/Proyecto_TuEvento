export const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center text-md-start">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="fw-bold text-white d-flex align-items-center gap-2">
              <i className="bi bi-calendar-event"></i> TuEvento
            </h5>
            <p className="text-muted small">
              Plataforma integral para la gestión, cotización y reserva de servicios para eventos.
            </p>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h6>Enlaces Rápidos</h6>
            <ul className="list-unstyled small">
              <li><a href="/" className="text-decoration-none text-muted">Inicio</a></li>
              <li><a href="/registro-empresa" className="text-decoration-none text-muted">Ofrece tus Servicios</a></li>
              <li><a href="/recuperar" className="text-decoration-none text-muted">Ayuda y Soporte</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6>Contacto</h6>
            <p className="text-muted small mb-1"><i className="bi bi-envelope me-2"></i>soporte@tuevento.com</p>
            <p className="text-muted small"><i className="bi bi-geo-alt me-2"></i>Colombia</p>
          </div>
        </div>
        <hr className="my-3 border-secondary" />
        <div className="text-center text-muted small">
          © {new Date().getFullYear()} TuEvento. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};