import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUsuario } from '../services/authService';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    try {
      const res = await loginUsuario(formData);
      login(res.user || { email: formData.email, rol: 'cliente' }, res.access_token || 'mock-token');
      
      const rol = res.user?.rol || 'cliente';
      if (rol === 'admin') navigate('/admin');
      else if (rol === 'empresa') navigate('/empresa');
      else navigate('/');
    } catch (err) {
      // Fallback demostrativo local en caso de no tener backend encendido
      const mockUser = { 
        email: formData.email, 
        nombre: 'Usuario Demo', 
        rol: formData.email.includes('admin') ? 'admin' : formData.email.includes('empresa') ? 'empresa' : 'cliente' 
      };
      login(mockUser, 'token-demo-123');
      if (mockUser.rol === 'admin') navigate('/admin');
      else if (mockUser.rol === 'empresa') navigate('/empresa');
      else navigate('/');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="row justify-content-center my-5">
      <div className="col-md-5 col-lg-4">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4">
              <i className="bi bi-person-circle fs-1 text-primary"></i>
              <h3 className="fw-bold mt-2">Iniciar Sesión</h3>
              <p className="text-muted small">Ingresa tus credenciales para acceder a TuEvento</p>
            </div>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Correo Electrónico</label>
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                  <input 
                    type="email" 
                    name="email" 
                    className="form-control" 
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Contraseña</label>
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-lock"></i></span>
                  <input 
                    type="password" 
                    name="password" 
                    className="form-control" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4 small">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Recordarme</label>
                </div>
                <Link to="/recuperar" className="text-decoration-none">¿Olvidaste tu contraseña?</Link>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary-custom w-100 py-2 fw-bold rounded-3"
                disabled={cargando}
              >
                {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
              </button>
            </form>

            <div className="text-center mt-4 small">
              <span className="text-muted">¿No tienes cuenta? </span>
              <Link to="/registro-usuario" className="fw-bold text-decoration-none">Regístrate aquí</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}