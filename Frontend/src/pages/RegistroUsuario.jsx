import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/registro.css";

import logo from "../assets/img/logo.png";

import { registrarUsuario } from "../services/usuarioService";


function RegistroUsuario() {

    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");


const handleSubmit = async (e) => {
    e.preventDefault();

    if (contrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    try {
        const datosUsuario = {
            nombre_usuario: nombre,
            apellido_usuario: apellido,
            correo_usuario: correo,
            telefono_usuario: telefono,
            contrasena_usuario: contrasena,
            rol: "cliente"
        };

        await registrarUsuario(datosUsuario);

        alert("Cuenta creada correctamente. Ahora puedes iniciar sesión.");
 
        navigate("/login");

      } catch (error) {
            console.error("Error al registrar usuario:", error);

            if (error.response?.data?.detail) {
                alert(error.response.data.detail);
            } else {
                alert("No se pudo crear la cuenta. Verifica los datos e intenta nuevamente.");
            }
      }
    };


    return (

        <div className="registro-page">

            <div className="registro-container">


                <div className="registro-visual">


                    <Link
                        to="/"
                        className="registro-logo"
                    >

                        <img
                            src={logo}
                            alt="TuEvento"
                        />

                    </Link>


                    <div className="registro-visual-content">

                        <div className="registro-icon">
                            🎉
                        </div>


                        <h1>
                            Crea momentos
                            <span> inolvidables.</span>
                        </h1>


                        <p>
                            Regístrate en TuEvento y encuentra
                            las empresas y servicios ideales
                            para hacer realidad tu evento.
                        </p>

                    </div>

                </div>



                <div className="registro-form-container">


                    <div className="registro-form">


                        <div className="registro-header">

                            <span>
                                CREA TU CUENTA
                            </span>

                            <h2>
                                Registrarse
                            </h2>

                            <p>
                                Completa tus datos para comenzar.
                            </p>

                        </div>



                        <form onSubmit={handleSubmit}>


                            <div className="row">


                                <div className="col-md-6">

                                    <div className="form-group">

                                        <label>
                                            Nombre
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Tu nombre"
                                            value={nombre}
                                            onChange={(e) =>
                                                setNombre(e.target.value)
                                            }
                                            required
                                        />

                                    </div>

                                </div>



                                <div className="col-md-6">

                                    <div className="form-group">

                                        <label>
                                            Apellido
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Tu apellido"
                                            value={apellido}
                                            onChange={(e) =>
                                                setApellido(e.target.value)
                                            }
                                            required
                                        />

                                    </div>

                                </div>

                            </div>



                            <div className="form-group">

                                <label>
                                    Correo electrónico
                                </label>

                                <input
                                    type="email"
                                    placeholder="ejemplo@correo.com"
                                    value={correo}
                                    onChange={(e) =>
                                        setCorreo(e.target.value)
                                    }
                                    required
                                />

                            </div>



                            <div className="form-group">

                                <label>
                                    Teléfono
                                </label>

                                <input
                                    type="tel"
                                    placeholder="300 000 0000"
                                    value={telefono}
                                    onChange={(e) =>
                                        setTelefono(e.target.value)
                                    }
                                    required
                                />

                            </div>



                            <div className="form-group">

                                <label>
                                    Contraseña
                                </label>

                                <input
                                    type="password"
                                    placeholder="Crea una contraseña"
                                    value={contrasena}
                                    onChange={(e) =>
                                        setContrasena(e.target.value)
                                    }
                                    required
                                />

                            </div>



                            <div className="form-group">

                                <label>
                                    Confirmar contraseña
                                </label>

                                <input
                                    type="password"
                                    placeholder="Repite tu contraseña"
                                    value={confirmarContrasena}
                                    onChange={(e) =>
                                        setConfirmarContrasena(e.target.value)
                                    }
                                    required
                                />

                            </div>



                            <button
                                type="submit"
                                className="registro-button"
                            >
                                Crear mi cuenta
                            </button>


                        </form>



                        <div className="registro-login">

                            <span>
                                ¿Ya tienes una cuenta?
                            </span>

                            <Link to="/login">
                                Iniciar sesión
                            </Link>

                        </div>



                        <div className="registro-empresa">

                            <span>
                                ¿Tienes una empresa?
                            </span>

                            <Link to="/registro-empresa">
                                Registra tu empresa
                            </Link>

                        </div>


                    </div>

                </div>

            </div>

        </div>

    );

}


export default RegistroUsuario;
