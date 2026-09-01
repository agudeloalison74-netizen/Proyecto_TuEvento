import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Por ahora solamente simulamos el inicio de sesión.
        // Después lo conectaremos con FastAPI.

        console.log("Correo:", correo);
        console.log("Contraseña:", contrasena);

        navigate("/cliente");
    };

    return (
        <div className="login-page">

            <div className="login-container">

                {/* LADO VISUAL */}
                <div className="login-visual">

                    <div className="login-visual-content">

                        <div className="login-brand">
                            Tu<span>Evento</span>
                        </div>

                        <div className="login-decoration">
                            ✨
                        </div>

                        <h1>
                            Tu próximo evento
                            <span> comienza aquí.</span>
                        </h1>

                        <p>
                            Encuentra empresas, servicios y todo lo que
                            necesitas para crear momentos inolvidables.
                        </p>

                    </div>

                </div>


                {/* FORMULARIO */}
                <div className="login-form-container">

                    <div className="login-form">

                        <div className="login-header">

                            <span className="login-label">
                                BIENVENIDO
                            </span>

                            <h2>
                                Iniciar sesión
                            </h2>

                            <p>
                                Ingresa a tu cuenta para continuar.
                            </p>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="form-group">

                                <label htmlFor="correo">
                                    Correo electrónico
                                </label>

                                <input
                                    id="correo"
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

                                <div className="password-label">

                                    <label htmlFor="contrasena">
                                        Contraseña
                                    </label>

                                    <a href="#">
                                        ¿Olvidaste tu contraseña?
                                    </a>

                                </div>

                                <input
                                    id="contrasena"
                                    type="password"
                                    placeholder="Ingresa tu contraseña"
                                    value={contrasena}
                                    onChange={(e) =>
                                        setContrasena(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <button
                                type="submit"
                                className="login-button"
                            >
                                Iniciar sesión
                            </button>

                        </form>


                        <div className="login-divider">
                            <span>o</span>
                        </div>


                        <div className="register-question">

                            <span>
                                ¿Todavía no tienes una cuenta?
                            </span>

                            <Link to="/registro">
                                Crear cuenta
                            </Link>

                        </div>


                        <div className="company-register">

                            <span>
                                ¿Eres una empresa?
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

export default Login;