import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registrarCliente } from '../services/authService';

export default function RegistroUsuario() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: ''
  });
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrarCliente(formData);
      setMensaje({ tipo: 'success', texto: 'Registro completado con éxito. Redirigiendo...' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: err.response?.data?.detail || 'Error en el registro' });
    }
  };

  return (
    <div className="row justify-content-center my-4">
      <div className="col-md-6">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4 p-md-5">
            <h3 className="fw-bold text-center mb-2">Registro de Cliente</h3>
            <p className="text-muted text-center small mb-4">Crea tu cuenta para planificar y cotizar tus eventos</p>

            {mensaje && <div className={`alert alert-${mensaje.tipo}`}>{mensaje.texto}</div>}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre</label>
                  <input type="text" name="nombre" className="form-control" required onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Apellido</label>
                  <input type="text" name="apellido" className="form-control" required onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Correo Electrónico</label>
                  <input type="email" name="email" className="form-control" required onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Teléfono</label>
                  <input type="text" name="telefono" className="form-control" required onChange={handleChange} />
                </div>
                <div className="col-12">
                  <label className="form-label">Contraseña</label>
                  <input type="password" name="password" className="form-control" required onChange={handleChange} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary-custom w-100 py-2 fw-bold mt-4">
                Registrarse como Cliente
              </button>
            </form>

            <div className="text-center mt-3 small">
              ¿Ya tienes cuenta? <Link to="/login" className="fw-bold">Inicia Sesión</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}