import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registrarEmpresa } from '../services/authService';

export default function RegistroEmpresa() {
  const [formData, setFormData] = useState({
    nombre_empresa: '',
    nit: '',
    email: '',
    telefono: '',
    direccion: '',
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
      await registrarEmpresa(formData);
      setMensaje({ tipo: 'success', texto: 'Empresa registrada correctamente. Procede a iniciar sesión.' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: err.response?.data?.detail || 'Error al registrar la empresa' });
    }
  };

  return (
    <div className="row justify-content-center my-4">
      <div className="col-md-7">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4 p-md-5">
            <h3 className="fw-bold text-center mb-2">Registro de Empresa / Proveedor</h3>
            <p className="text-muted text-center small mb-4">Ofrece tus servicios de eventos a miles de clientes</p>

            {mensaje && <div className={`alert alert-${mensaje.tipo}`}>{mensaje.texto}</div>}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre Comercial</label>
                  <input type="text" name="nombre_empresa" className="form-control" required onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">NIT / Identificación Fiscal</label>
                  <input type="text" name="nit" className="form-control" required onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Correo Corporativo</label>
                  <input type="email" name="email" className="form-control" required onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Teléfono de Contacto</label>
                  <input type="text" name="telefono" className="form-control" required onChange={handleChange} />
                </div>
                <div className="col-12">
                  <label className="form-label">Dirección Física</label>
                  <input type="text" name="direccion" className="form-control" required onChange={handleChange} />
                </div>
                <div className="col-12">
                  <label className="form-label">Contraseña de Acceso</label>
                  <input type="password" name="password" className="form-control" required onChange={handleChange} />
                </div>
              </div>
              <button type="submit" className="btn btn-success w-100 py-2 fw-bold mt-4">
                Registrar Mi Empresa
              </button>
            </form>

            <div className="text-center mt-3 small">
              ¿Empresa registrada previamente? <Link to="/login" className="fw-bold">Iniciar Sesión</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}