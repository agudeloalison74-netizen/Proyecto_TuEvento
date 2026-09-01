import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-purple-header sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/">
          <i className="bi bi-calendar-event-fill fs-4"></i>
          <span>TuEvento</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Inicio</Link>
            </li>
            {user?.rol === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin">Panel Admin</Link>
              </li>
            )}
            {user?.rol === 'empresa' && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/empresa">Gestión Empresa</Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {user ? (
              <div className="dropdown">
                <button 
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center gap-2" 
                  type="button" 
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle"></i>
                  <span>{user.nombre || user.email}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li><span className="dropdown-item-text text-muted small">Rol: {user.rol}</span></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm px-3">
                  Iniciar Sesión
                </Link>
                <div className="dropdown">
                  <button className="btn btn-light btn-sm dropdown-toggle fw-bold" type="button" data-bs-toggle="dropdown">
                    Registrarse
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow">
                    <li><Link className="dropdown-item" to="/registro-usuario">Como Cliente</Link></li>
                    <li><Link className="dropdown-item" to="/registro-empresa">Como Empresa</Link></li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};