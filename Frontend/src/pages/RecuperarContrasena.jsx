import { useState } from "react";
import { Link } from "react-router-dom";

import { solicitarRecuperacion, verificarCodigoRecuperacion } from "../services/usuarioService";
import "../styles/login.css";


function RecuperarContrasena() {
    const [correo, setCorreo] = useState("");
    const [codigo, setCodigo] = useState("");
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

    const verificarCodigo = async (evento) => {
        evento.preventDefault();
        setError("");
        setCargando(true);

        try {
            const respuesta = await verificarCodigoRecuperacion(correo, codigo);
            setMensaje(respuesta.mensaje);
            setPaso("listo");
        } catch (errorVerificacion) {
            setError(
                errorVerificacion.response?.data?.detail ||
                (
                    errorVerificacion.response
                        ? "El servidor no pudo verificar el código. Revisa los registros del backend."
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
                        <div className="login-brand">Tu<span>Evento</span></div>
                        <div className="login-decoration">🔐</div>
                        <h1>Recupera el acceso a tu cuenta.</h1>
                        <p>
                            Verificaremos tu correo antes de enviarte una
                            contraseña temporal.
                        </p>
                    </div>
                </div>

                <div className="login-form-container">
                    <div className="login-form">
                        <div className="login-header">
                            <span className="login-label">RECUPERACIÓN DE CUENTA</span>
                            <h2>¿Olvidaste tu contraseña?</h2>
                            <p>
                                {paso === "correo" && "Te enviaremos un código de verificación."}
                                {paso === "codigo" && "Ingresa el código enviado a tu correo."}
                                {paso === "listo" && "Revisa tu correo para iniciar sesión."}
                            </p>
                        </div>

                        {paso === "correo" && (
                            <form onSubmit={enviarCodigo}>
                                <div className="form-group">
                                    <label htmlFor="correo-recuperacion">Correo electrónico</label>
                                    <input
                                        id="correo-recuperacion"
                                        type="email"
                                        autoComplete="email"
                                        value={correo}
                                        onChange={(evento) => setCorreo(evento.target.value)}
                                        required
                                    />
                                </div>
                                <button className="login-button" type="submit" disabled={cargando}>
                                    {cargando ? "Enviando..." : "Enviar código"}
                                </button>
                            </form>
                        )}

                        {paso === "codigo" && (
                            <form onSubmit={verificarCodigo}>
                                <p className="recovery-feedback" role="status">{mensaje}</p>
                                <div className="form-group">
                                    <label htmlFor="codigo-recuperacion">Código de 6 dígitos</label>
                                    <input
                                        id="codigo-recuperacion"
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        pattern="[0-9]{6}"
                                        maxLength="6"
                                        value={codigo}
                                        onChange={(evento) => setCodigo(evento.target.value)}
                                        required
                                    />
                                </div>
                                <button className="login-button" type="submit" disabled={cargando}>
                                    {cargando ? "Verificando..." : "Verificar y enviar contraseña"}
                                </button>
                            </form>
                        )}

                        {paso === "listo" && (
                            <p className="recovery-feedback" role="status">{mensaje}</p>
                        )}

                        {error && <p className="recovery-error" role="alert">{error}</p>}

                        <div className="register-question recovery-login">
                            <Link to="/login">Volver a iniciar sesión</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecuperarContrasena;
