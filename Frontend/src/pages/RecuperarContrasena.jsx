import { useState } from "react";
import { Link } from "react-router-dom";

import {
    solicitarRecuperacion,
    restablecerContrasena
} from "../services/usuarioService";

import "../styles/login.css";

function RecuperarContrasena() {
    const [correo, setCorreo] = useState("");
    const [codigo, setCodigo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");
    const [paso, setPaso] = useState("correo");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const enviarCodigo = async (evento) => {
        evento.preventDefault();
        setError("");
        setCargando(true);

        try {
            const respuesta = await solicitarRecuperacion(correo);
            setMensaje(respuesta.mensaje);
            setPaso("codigo");
        } catch (errorSolicitud) {
            setError(
                errorSolicitud.response?.data?.detail ||
                (
                    errorSolicitud.response
                        ? "El servidor no pudo completar la solicitud. Revisa los registros del backend."
                        : "No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose."
                )
            );
        } finally {
            setCargando(false);
        }
    };

    const cambiarContrasena = async (evento) => {
        evento.preventDefault();
        setError("");

        if (contrasena !== confirmarContrasena) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        if (contrasena.length < 8) {
            setError("La contraseña debe tener mínimo 8 caracteres.");
            return;
        }

        setCargando(true);

        try {
            const respuesta = await restablecerContrasena(
                correo,
                codigo,
                contrasena
            );

            setMensaje(respuesta.mensaje);
            setPaso("listo");
        } catch (errorCambio) {
            setError(
                errorCambio.response?.data?.detail ||
                (
                    errorCambio.response
                        ? "No se pudo cambiar la contraseña. Revisa los registros del backend."
                        : "No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose."
                )
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-visual">
                    <div className="login-visual-content">
                        <div className="login-brand">
                            Tu<span>Evento</span>
                        </div>

                        <div className="login-decoration">🔐</div>

                        <h1>Recupera el acceso a tu cuenta.</h1>

                        <p>
                            Verifica tu correo y crea una contraseña nueva
                            para volver a ingresar a TuEvento.
                        </p>
                    </div>
                </div>

                <div className="login-form-container">
                    <div className="login-form">
                        <div className="login-header">
                            <span className="login-label">
                                RECUPERACIÓN DE CUENTA
                            </span>

                            <h2>¿Olvidaste tu contraseña?</h2>

                            <p>
                                {paso === "correo" &&
                                    "Te enviaremos un código de verificación."}

                                {paso === "codigo" &&
                                    "Ingresa el código y crea tu nueva contraseña."}

                                {paso === "listo" &&
                                    "Tu contraseña se cambió correctamente."}
                            </p>
                        </div>

                        {paso === "correo" && (
                            <form onSubmit={enviarCodigo}>
                                <div className="form-group">
                                    <label htmlFor="correo-recuperacion">
                                        Correo electrónico
                                    </label>

                                    <input
                                        id="correo-recuperacion"
                                        type="email"
                                        autoComplete="email"
                                        value={correo}
                                        onChange={(evento) =>
                                            setCorreo(evento.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <button
                                    className="login-button"
                                    type="submit"
                                    disabled={cargando}
                                >
                                    {cargando ? "Enviando..." : "Enviar código"}
                                </button>
                            </form>
                        )}

                        {paso === "codigo" && (
                            <form onSubmit={cambiarContrasena}>
                                <p className="recovery-feedback" role="status">
                                    {mensaje}
                                </p>

                                <div className="form-group">
                                    <label htmlFor="codigo-recuperacion">
                                        Código de 6 dígitos
                                    </label>

                                    <input
                                        id="codigo-recuperacion"
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        pattern="[0-9]{6}"
                                        maxLength="6"
                                        value={codigo}
                                        onChange={(evento) =>
                                            setCodigo(evento.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="nueva-contrasena">
                                        Nueva contraseña
                                    </label>

                                    <input
                                        id="nueva-contrasena"
                                        type="password"
                                        autoComplete="new-password"
                                        minLength="8"
                                        value={contrasena}
                                        onChange={(evento) =>
                                            setContrasena(evento.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmar-contrasena">
                                        Confirmar nueva contraseña
                                    </label>

                                    <input
                                        id="confirmar-contrasena"
                                        type="password"
                                        autoComplete="new-password"
                                        minLength="8"
                                        value={confirmarContrasena}
                                        onChange={(evento) =>
                                            setConfirmarContrasena(
                                                evento.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <button
                                    className="login-button"
                                    type="submit"
                                    disabled={cargando}
                                >
                                    {cargando
                                        ? "Cambiando contraseña..."
                                        : "Cambiar contraseña"}
                                </button>
                            </form>
                        )}

                        {paso === "listo" && (
                            <p className="recovery-feedback" role="status">
                                {mensaje}
                            </p>
                        )}

                        {error && (
                            <p className="recovery-error" role="alert">
                                {error}
                            </p>
                        )}

                        <div className="register-question recovery-login">
                            <Link to="/login">
                                Volver a iniciar sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecuperarContrasena;