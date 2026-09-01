import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registrarUsuario } from "../services/authService";

function Registro() {

  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre_usuario: "",
    apellido_usuario: "",
    correo_usuario: "",
    telefono_usuario: "",
    contrasena_usuario: "",
    rol: "cliente",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMensaje("");
    setError("");

    try {

      await registrarUsuario(formulario);

      setMensaje(
        "Usuario registrado correctamente."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      console.error(error);

      setError(
        "No fue posible registrar el usuario."
      );

    }

  };

  return (

    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-7 col-lg-6">

          <div className="card shadow">

            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Crear cuenta
              </h2>

              {mensaje && (
                <div className="alert alert-success">
                  {mensaje}
                </div>
              )}

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Nombre
                    </label>

                    <input
                      type="text"
                      name="nombre_usuario"
                      className="form-control"
                      value={formulario.nombre_usuario}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Apellido
                    </label>

                    <input
                      type="text"
                      name="apellido_usuario"
                      className="form-control"
                      value={formulario.apellido_usuario}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Correo
                  </label>

                  <input
                    type="email"
                    name="correo_usuario"
                    className="form-control"
                    value={formulario.correo_usuario}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Teléfono
                  </label>

                  <input
                    type="text"
                    name="telefono_usuario"
                    className="form-control"
                    value={formulario.telefono_usuario}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Contraseña
                  </label>

                  <input
                    type="password"
                    name="contrasena_usuario"
                    className="form-control"
                    value={formulario.contrasena_usuario}
                    onChange={handleChange}
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    backgroundColor: "#6C2BD9",
                    color: "#FFFFFF",
                  }}
                >
                  Crear cuenta
                </button>

              </form>

              <p className="text-center mt-3">

                ¿Ya tienes una cuenta?{" "}

                <Link to="/login">
                  Inicia sesión
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Registro;