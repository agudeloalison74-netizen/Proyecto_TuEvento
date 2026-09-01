import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/registro.css";

import logo from "../assets/img/logo.png";


function RegistroEmpresa() {

    const navigate = useNavigate();


    const [nit, setNit] = useState("");
    const [nombreEmpresa, setNombreEmpresa] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [contacto, setContacto] = useState("");
    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");


    const handleSubmit = (e) => {

        e.preventDefault();


        if (contrasena !== confirmarContrasena) {

            alert("Las contraseñas no coinciden.");

            return;
        }


        localStorage.setItem(
            "usuarioAutenticado",
            "true"
        );

        localStorage.setItem(
            "tipoUsuario",
            "empresa"
        );


        navigate("/empresa-home");

    };


    return (

        <div className="registro-page">

            <div className="registro-container">


                <div className="registro-visual empresa-visual">


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
                            🏢
                        </div>


                        <h1>
                            Haz crecer tu
                            <span> empresa.</span>
                        </h1>


                        <p>
                            Registra tu empresa en TuEvento
                            y conecta tus servicios con personas
                            que están buscando hacer realidad
                            sus eventos.
                        </p>

                    </div>

                </div>



                <div className="registro-form-container">


                    <div className="registro-form">


                        <div className="registro-header">

                            <span>
                                REGISTRA TU EMPRESA
                            </span>

                            <h2>
                                Crear empresa
                            </h2>

                            <p>
                                Completa la información de tu empresa.
                            </p>

                        </div>



                        <form onSubmit={handleSubmit}>


                            <div className="form-group">

                                <label>
                                    NIT
                                </label>

                                <input
                                    type="text"
                                    placeholder="Ej. 900123456-7"
                                    value={nit}
                                    onChange={(e) =>
                                        setNit(e.target.value)
                                    }
                                    required
                                />

                            </div>



                            <div className="form-group">

                                <label>
                                    Nombre de la empresa
                                </label>

                                <input
                                    type="text"
                                    placeholder="Nombre completo de la empresa"
                                    value={nombreEmpresa}
                                    onChange={(e) =>
                                        setNombreEmpresa(e.target.value)
                                    }
                                    required
                                />

                            </div>



                            <div className="form-group">

                                <label>
                                    Descripción
                                </label>

                                <textarea
                                    rows="3"
                                    placeholder="Cuéntanos sobre tu empresa..."
                                    value={descripcion}
                                    onChange={(e) =>
                                        setDescripcion(e.target.value)
                                    }
                                />

                            </div>



                            <div className="row">


                                <div className="col-md-6">

                                    <div className="form-group">

                                        <label>
                                            Teléfono / contacto
                                        </label>

                                        <input
                                            type="tel"
                                            placeholder="300 000 0000"
                                            value={contacto}
                                            onChange={(e) =>
                                                setContacto(e.target.value)
                                            }
                                            required
                                        />

                                    </div>

                                </div>



                                <div className="col-md-6">

                                    <div className="form-group">

                                        <label>
                                            Ciudad
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Bogotá"
                                            value={ciudad}
                                            onChange={(e) =>
                                                setCiudad(e.target.value)
                                            }
                                            required
                                        />

                                    </div>

                                </div>

                            </div>



                            <div className="form-group">

                                <label>
                                    Dirección
                                </label>

                                <input
                                    type="text"
                                    placeholder="Dirección de la empresa"
                                    value={direccion}
                                    onChange={(e) =>
                                        setDireccion(e.target.value)
                                    }
                                    required
                                />

                            </div>



                            <div className="form-group">

                                <label>
                                    Correo electrónico
                                </label>

                                <input
                                    type="email"
                                    placeholder="empresa@correo.com"
                                    value={correo}
                                    onChange={(e) =>
                                        setCorreo(e.target.value)
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
                                Registrar empresa
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


                    </div>

                </div>

            </div>

        </div>

    );

}


export default RegistroEmpresa;
