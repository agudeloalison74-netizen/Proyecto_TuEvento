import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RecuperarContrasena() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="row justify-content-center my-5">
      <div className="col-md-5">
        <div className="card shadow-lg border-0 rounded-4 p-4">
          <h4 className="fw-bold text-center mb-3">Recuperar Contraseña</h4>
          {enviado ? (
            <div className="alert alert-success text-center">
              Hemos enviado un enlace de recuperación a <strong>{email}</strong>. Por favor revisa tu bandeja de entrada.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="text-muted small">Ingresa tu correo registrado y te enviaremos instrucciones para restablecer tu contraseña.</p>
              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <input 
                  type="email" 
                  className="form-control" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary-custom w-100 fw-bold">Enviar Enlace</button>
            </form>
          )}
          <div className="text-center mt-3">
            <Link to="/login" className="small text-decoration-none">Volver al Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}