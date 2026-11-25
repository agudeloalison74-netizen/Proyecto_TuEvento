import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import "../styles/perfil.css";


function Perfil() {
    const navigate = useNavigate();
    const [sesion, setSesion] = useState(null);
    const [perfil, setPerfil] = useState(null);
    const [empresa, setEmpresa] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [guardandoPerfil, setGuardandoPerfil] = useState(false);
    const [guardandoContrasena, setGuardandoContrasena] = useState(false);
    const [errorPerfil, setErrorPerfil] = useState("");
    const [errorEmpresa, setErrorEmpresa] = useState("");
    const [errorContrasena, setErrorContrasena] = useState("");
    const [mensajePerfil, setMensajePerfil] = useState("");
    const [mensajeContrasena, setMensajeContrasena] = useState("");
    const [contrasenaActual, setContrasenaActual] = useState("");
    const [contrasenaNueva, setContrasenaNueva] = useState("");
    const [confirmacion, setConfirmacion] = useState("");

    useEffect(() => {
        let activa = true;
        let datosSesion = null;

        try {
            datosSesion = JSON.parse(localStorage.getItem("usuario") || "null");
        } catch {
            datosSesion = null;
        }

        if (localStorage.getItem("usuarioAutenticado") !== "true" || !datosSesion) {
            navigate("/login", { replace: true });
            return undefined;
        }

        setSesion(datosSesion);

        const cargarPerfil = async () => {
            try {
                const respuesta = await api.get("/usuarios/me");
                if (activa) {
                    setPerfil({
                        nombre_usuario: respuesta.data.nombre_usuario,
                        apellido_usuario: respuesta.data.apellido_usuario,
                        correo_usuario: respuesta.data.correo_usuario,
                        telefono_usuario: respuesta.data.telefono_usuario,
                        rol: respuesta.data.rol
                    });
                }
            } catch (errorCarga) {
                if (activa) {
                    setErrorPerfil(
                        errorCarga.response?.data?.detail ||
                        "No se pudo cargar la información del perfil."
                    );
                }
            } finally {
                if (activa) {
                    setCargando(false);
                }
            }

            if (activa && datosSesion.rol?.toLowerCase() === "empresa") {
                try {
                    const respuestaEmpresa = await api.get("/empresas/mis-servicios");
                    if (activa) {
                        setEmpresa(respuestaEmpresa.data);
                    }
                } catch (errorCargaEmpresa) {
                    if (activa) {
                        setErrorEmpresa(
                            errorCargaEmpresa.response?.data?.detail ||
                            "No se pudo cargar la información de la empresa."
                        );
                    }
                }
            }
        };

        cargarPerfil();

        return () => {
            activa = false;
        };
    }, [navigate]);

    const esEmpresa = sesion?.rol?.toLowerCase() === "empresa";
    const esCliente = sesion?.rol?.toLowerCase() === "cliente";
    const paginaPrincipal = esEmpresa ? "/empresa-home" : "/";
    const nombreCompleto = perfil
        ? `${perfil.nombre_usuario} ${perfil.apellido_usuario}`.trim()
        : "Mi perfil";
    const iniciales = perfil
        ? `${perfil.nombre_usuario?.[0] || ""}${perfil.apellido_usuario?.[0] || ""}`.toUpperCase()
        : "TU";

    const actualizarCampo = (campo, valor) => {
        setPerfil((actual) => ({ ...actual, [campo]: valor }));
    };

    const guardarPerfil = async (evento) => {
        evento.preventDefault();
        setMensajePerfil("");
        setErrorPerfil("");
        setGuardandoPerfil(true);

        try {
            const respuesta = await api.put("/usuarios/me", {
                nombre_usuario: perfil.nombre_usuario,
                apellido_usuario: perfil.apellido_usuario,
                telefono_usuario: perfil.telefono_usuario
            });
            setPerfil((actual) => ({ ...actual, ...respuesta.data }));

            const usuarioGuardado = JSON.parse(
                localStorage.getItem("usuario") || "{}"
            );
            localStorage.setItem(
                "usuario",
                JSON.stringify({ ...usuarioGuardado, ...respuesta.data })
            );
            setMensajePerfil("Tu información se actualizó correctamente.");
        } catch (errorGuardar) {
            setErrorPerfil(
                errorGuardar.response?.data?.detail ||
                "No fue posible guardar los cambios del perfil."
            );
        } finally {
            setGuardandoPerfil(false);
        }
    };

    const actualizarContrasena = async (evento) => {
        evento.preventDefault();
        setMensajeContrasena("");
        setErrorContrasena("");

        if (contrasenaNueva !== confirmacion) {
            setErrorContrasena("La nueva contraseña y su confirmación no coinciden.");
            return;
        }

        setGuardandoContrasena(true);
        try {
            const respuesta = await api.put("/usuarios/me/contrasena", {
                contrasena_actual: contrasenaActual,
                contrasena_nueva: contrasenaNueva
            });
            setMensajeContrasena(respuesta.data.mensaje);
            setContrasenaActual("");
            setContrasenaNueva("");
            setConfirmacion("");
        } catch (errorCambio) {
            setErrorContrasena(
                errorCambio.response?.data?.detail ||
                "No fue posible cambiar la contraseña."
            );
        } finally {
            setGuardandoContrasena(false);
        }
    };

    return (
        <main className="perfil-page">
            <header className="perfil-topbar">
                <Link className="perfil-brand" to={paginaPrincipal}>
                    Tu<span>Evento</span>
                </Link>
                <Link className="perfil-back-link" to={paginaPrincipal}>
                    {esEmpresa ? "Volver al inicio empresarial" : "Volver a la página principal"}
                </Link>
            </header>

            <div className="perfil-content">
                <div className="perfil-page-heading">
                    <span className="perfil-eyebrow">CUENTA Y PREFERENCIAS</span>
                    <h1>Mi perfil</h1>
                    <p>Administra tu información personal y la seguridad de tu cuenta.</p>
                </div>

                {cargando && <p className="perfil-feedback" role="status">Cargando tu perfil...</p>}
                {errorPerfil && !perfil && (
                    <p className="perfil-alert" role="alert">{errorPerfil}</p>
                )}

                {!cargando && perfil && (
                    <>
                        <section className="perfil-summary">
                            <div className="perfil-avatar" aria-hidden="true">{iniciales}</div>
                            <div className="perfil-summary-copy">
                                <h2>{nombreCompleto}</h2>
                                <p>{perfil.correo_usuario}</p>
                            </div>
                            <span className="perfil-role">
                                {esEmpresa ? "Cuenta empresarial" : "Cuenta de cliente"}
                            </span>
                        </section>

                        <div className="perfil-grid">
                            <section className="perfil-card">
                                <div className="perfil-card-heading">
                                    <div>
                                        <span className="perfil-card-kicker">INFORMACIÓN PERSONAL</span>
                                        <h2>Datos de la cuenta</h2>
                                    </div>
                                    <span className="perfil-card-icon" aria-hidden="true">✎</span>
                                </div>

                                <form onSubmit={guardarPerfil}>
                                    <div className="perfil-fields">
                                        <div className="perfil-field">
                                            <label htmlFor="perfil-nombre">Nombre</label>
                                            <input
                                                id="perfil-nombre"
                                                autoComplete="given-name"
                                                value={perfil.nombre_usuario}
                                                onChange={(evento) => actualizarCampo("nombre_usuario", evento.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="perfil-field">
                                            <label htmlFor="perfil-apellido">Apellido</label>
                                            <input
                                                id="perfil-apellido"
                                                autoComplete="family-name"
                                                value={perfil.apellido_usuario}
                                                onChange={(evento) => actualizarCampo("apellido_usuario", evento.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="perfil-field">
                                            <label htmlFor="perfil-correo">Correo electrónico</label>
                                            <input
                                                id="perfil-correo"
                                                type="email"
                                                value={perfil.correo_usuario}
                                                readOnly
                                            />
                                            <small>Este correo se usa para iniciar sesión.</small>
                                        </div>
                                        <div className="perfil-field">
                                            <label htmlFor="perfil-telefono">Teléfono</label>
                                            <input
                                                id="perfil-telefono"
                                                type="tel"
                                                autoComplete="tel"
                                                value={perfil.telefono_usuario}
                                                onChange={(evento) => actualizarCampo("telefono_usuario", evento.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {mensajePerfil && <p className="perfil-success" role="status">{mensajePerfil}</p>}
                                    {errorPerfil && <p className="perfil-alert" role="alert">{errorPerfil}</p>}

                                    <button className="perfil-primary-button" type="submit" disabled={guardandoPerfil}>
                                        {guardandoPerfil ? "Guardando..." : "Guardar cambios"}
                                    </button>
                                </form>
                            </section>

                            <section className="perfil-card perfil-security-card">
                                <div className="perfil-card-heading">
                                    <div>
                                        <span className="perfil-card-kicker">SEGURIDAD</span>
                                        <h2>Cambiar contraseña</h2>
                                    </div>
                                    <span className="perfil-card-icon" aria-hidden="true">⌑</span>
                                </div>
                                <p className="perfil-card-description">
                                    Usa una contraseña segura que no utilices en otros sitios.
                                </p>

                                <form onSubmit={actualizarContrasena}>
                                    <div className="perfil-field">
                                        <label htmlFor="contrasena-actual">Contraseña actual</label>
                                        <input
                                            id="contrasena-actual"
                                            type="password"
                                            autoComplete="current-password"
                                            value={contrasenaActual}
                                            onChange={(evento) => setContrasenaActual(evento.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="perfil-field">
                                        <label htmlFor="contrasena-nueva">Nueva contraseña</label>
                                        <input
                                            id="contrasena-nueva"
                                            type="password"
                                            autoComplete="new-password"
                                            minLength="8"
                                            value={contrasenaNueva}
                                            onChange={(evento) => setContrasenaNueva(evento.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="perfil-field">
                                        <label htmlFor="confirmar-contrasena">Confirmar nueva contraseña</label>
                                        <input
                                            id="confirmar-contrasena"
                                            type="password"
                                            autoComplete="new-password"
                                            minLength="8"
                                            value={confirmacion}
                                            onChange={(evento) => setConfirmacion(evento.target.value)}
                                            required
                                        />
                                    </div>

                                    {mensajeContrasena && <p className="perfil-success" role="status">{mensajeContrasena}</p>}
                                    {errorContrasena && <p className="perfil-alert" role="alert">{errorContrasena}</p>}

                                    <button className="perfil-secondary-button" type="submit" disabled={guardandoContrasena}>
                                        {guardandoContrasena ? "Actualizando..." : "Actualizar contraseña"}
                                    </button>
                                </form>
                            </section>

                            {esEmpresa && (
                                <section className="perfil-card perfil-company-card">
                                    <div className="perfil-card-heading">
                                        <div>
                                            <span className="perfil-card-kicker">PERFIL EMPRESARIAL</span>
                                            <h2>Información de la empresa</h2>
                                        </div>
                                        <span className="perfil-card-icon" aria-hidden="true">⌂</span>
                                    </div>

                                    {errorEmpresa && <p className="perfil-alert" role="alert">{errorEmpresa}</p>}
                                    {!empresa && !errorEmpresa && <p className="perfil-feedback">Cargando información de empresa...</p>}
                                    {empresa && (
                                        <dl className="perfil-company-details">
                                            <div>
                                                <dt>Nombre</dt>
                                                <dd>{empresa.empresa.nombre_empresa}</dd>
                                            </div>
                                            <div>
                                                <dt>NIT</dt>
                                                <dd>{empresa.empresa.id_empresa}</dd>
                                            </div>
                                            <div>
                                                <dt>Teléfono de contacto</dt>
                                                <dd>{empresa.empresa.contacto_empresa || "Sin registrar"}</dd>
                                            </div>
                                            <div>
                                                <dt>Dirección</dt>
                                                <dd>{empresa.empresa.direccion_empresa || "Sin registrar"}</dd>
                                            </div>
                                            <div>
                                                <dt>Servicios publicados</dt>
                                                <dd>{empresa.servicios.length}</dd>
                                            </div>
                                        </dl>
                                    )}
                                    <Link className="perfil-text-link" to="/empresa-home">
                                        Administrar mis servicios
                                    </Link>
                                    <Link
                                        className="perfil-primary-button perfil-company-request-link"
                                        to="/empresa/solicitudes"
                                    >
                                        Solicitudes de servicios
                                    </Link>
                                </section>
                            )}

                            {esCliente && (
                                <section className="perfil-card perfil-activity-card">
                                    <div className="perfil-card-heading">
                                        <div>
                                            <span className="perfil-card-kicker">TU ACTIVIDAD</span>
                                            <h2>Eventos y comentarios</h2>
                                        </div>
                                        <span className="perfil-card-icon" aria-hidden="true">♡</span>
                                    </div>
                                    <div className="perfil-activity-actions">
                                        <Link to="/cliente/historial">
                                            Historial de eventos
                                        </Link>
                                        <Link to="/cliente/comentarios">
                                            Comentarios hechos
                                        </Link>
                                    </div>
                                </section>
                            )}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}

export default Perfil;
