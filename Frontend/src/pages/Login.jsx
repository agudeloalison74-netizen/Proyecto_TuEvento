import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

import { iniciarSesion } from "../services/usuarioService";

function Login() {
    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const datosLogin = {
                correo_usuario: correo,
                contrasena_usuario: contrasena
            };

            const respuesta = await iniciarSesion(datosLogin);

            console.log("Respuesta del login:", respuesta);

            // ==================================================
            // DECODIFICAR EL TOKEN JWT
            // El backend solo devuelve access_token y token_type,
            // así que extraemos id_usuario, rol y correo del propio
            // token (payload "sub", "rol", "correo").
            // ==================================================

            const token = respuesta.access_token;

            let datosUsuario = {};

            try {

                const payloadBase64 =
                    token.split(".")[1];

                const payloadJson =
                    decodeURIComponent(
                        atob(payloadBase64)
                            .split("")
                            .map((c) =>
                                "%" +
                                c
                                    .charCodeAt(0)
                                    .toString(16)
                                    .padStart(2, "0")
                            )
                            .join("")
                    );

                const payload = JSON.parse(payloadJson);

                datosUsuario = {
                    id_usuario: Number(payload.sub),
                    rol: payload.rol,
                    correo_usuario: payload.correo
                };

            } catch (error) {

                console.error(
                    "No se pudo decodificar el token:",
                    error
                );

            }


            // =========================
            // GUARDAR USUARIO Y TOKEN
            // =========================

            localStorage.setItem(
                "usuario",
                JSON.stringify(datosUsuario)
            );

            localStorage.setItem(
                "token",
                token
            );

            localStorage.setItem(
                "usuarioAutenticado",
                "true"
            );


            // =========================
            // OBTENER ROL
            // =========================

            const rol = datosUsuario.rol;

            if (rol) {
                localStorage.setItem(
                    "tipoUsuario",
                    rol
                );
            }


            // ==================================================
            // REVISAR SI HABÍA UN SERVICIO PENDIENTE
            // ==================================================

            const servicioPendiente =
                localStorage.getItem(
                    "servicioPendiente"
                );

            if (servicioPendiente) {

                try {

                    const servicio =
                        JSON.parse(
                            servicioPendiente
                        );


                    // ==========================================
                    // OBTENER SERVICIOS QUE YA ESTABAN AGREGADOS
                    // ==========================================

                    let serviciosSeleccionados = [];

                    try {

                        serviciosSeleccionados =
                            JSON.parse(
                                localStorage.getItem(
                                    "serviciosSeleccionados"
                                ) || "[]"
                            );

                    } catch (error) {

                        serviciosSeleccionados = [];

                    }


                    // ==========================================
                    // EVITAR SERVICIOS DUPLICADOS
                    // ==========================================

                    const yaExiste =
                        serviciosSeleccionados.some(
                            (servicioActual) =>
                                servicioActual.id_servicio ===
                                servicio.id_servicio
                        );


                    if (!yaExiste) {

                        serviciosSeleccionados = [
                            ...serviciosSeleccionados,
                            servicio
                        ];

                    }


                    // ==========================================
                    // GUARDAR SERVICIOS
                    // ==========================================

                    localStorage.setItem(
                        "serviciosSeleccionados",
                        JSON.stringify(
                            serviciosSeleccionados
                        )
                    );


                    // ==========================================
                    // ELIMINAR SERVICIO PENDIENTE
                    // ==========================================

                    localStorage.removeItem(
                        "servicioPendiente"
                    );


                    // ==========================================
                    // IR A MI EVENTO
                    // ==========================================

                    navigate("/mi-evento");

                    return;

                } catch (error) {

                    console.error(
                        "Error al procesar el servicio pendiente:",
                        error
                    );

                    localStorage.removeItem(
                        "servicioPendiente"
                    );

                }

            }


            // ==================================================
            // SI NO HABÍA SERVICIO PENDIENTE
            // REDIRIGIR SEGÚN EL ROL
            // ==================================================

            if (rol === "empresa") {

                navigate("/empresa-home");

            } else if (
                rol === "admin" ||
                rol === "administrador"
            ) {

                navigate("/admin");

            } else {

                navigate("/cliente");

            }

        } catch (error) {

            console.error(
                "Error al iniciar sesión:",
                error
            );

            if (error.response?.data?.detail) {

                alert(
                    error.response.data.detail
                );

            } else {

                alert(
                    "Correo o contraseña incorrectos."
                );

            }
        }
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
