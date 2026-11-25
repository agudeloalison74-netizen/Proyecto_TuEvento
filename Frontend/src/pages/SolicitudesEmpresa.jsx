import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
    actualizarEstadoReserva,
    listarSolicitudesEmpresa
} from "../services/reservaService";
import {
    listarResenasEmpresa,
    responderResena
} from "../services/resenaService";
import "../styles/actividad.css";

function SolicitudesEmpresa() {
    const [searchParams] = useSearchParams();
    const [seccion, setSeccion] = useState(
        searchParams.get("seccion") === "comentarios"
            ? "comentarios"
            : "solicitudes"
    );
    const [solicitudes, setSolicitudes] = useState([]);
    const [resenas, setResenas] = useState([]);
    const [respuestas, setRespuestas] = useState({});
    const [cargando, setCargando] = useState(true);
    const [accion, setAccion] = useState("");
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const cargarDatos = useCallback(async () => {
        setCargando(true);
        setError("");
        try {
            const [solicitudesEmpresa, resenasEmpresa] = await Promise.all([
                listarSolicitudesEmpresa(),
                listarResenasEmpresa()
            ]);
            setSolicitudes(solicitudesEmpresa);
            setResenas(resenasEmpresa);
            setRespuestas(Object.fromEntries(
                resenasEmpresa.map((resena) => [
                    resena.id_resena,
                    resena.respuesta_empresa || ""
                ])
            ));
        } catch (errorCarga) {
            setError(
                errorCarga.response?.data?.detail ||
                "No se pudo cargar la información de tu empresa."
            );
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargarDatos();
    }, [cargarDatos]);

    const handleEstado = async (solicitud, estado) => {
        setAccion(`reserva-${solicitud.id_reserva}`);
        setError("");
        setMensaje("");

        try {
            const actualizada = await actualizarEstadoReserva(
                solicitud.id_reserva,
                estado
            );
            setSolicitudes((actuales) => actuales.map((item) =>
                item.id_reserva === actualizada.id_reserva
                    ? { ...item, estado: actualizada.estado }
                    : item
            ));
            setMensaje(
                estado === "ACEPTADA"
                    ? "Aceptaste la solicitud del cliente."
                    : "Rechazaste la solicitud del cliente."
            );
        } catch (errorEstado) {
            setError(
                errorEstado.response?.data?.detail ||
                "No se pudo actualizar la solicitud."
            );
        } finally {
            setAccion("");
        }
    };

    const handleResponder = async (event, resena) => {
        event.preventDefault();
        setAccion(`resena-${resena.id_resena}`);
        setError("");
        setMensaje("");

        try {
            const actualizada = await responderResena(
                resena.id_resena,
                respuestas[resena.id_resena] || ""
            );
            setResenas((actuales) => actuales.map((item) =>
                item.id_resena === actualizada.id_resena ? actualizada : item
            ));
            setMensaje("Tu respuesta se publicó correctamente.");
        } catch (errorRespuesta) {
            setError(
                errorRespuesta.response?.data?.detail ||
                "No se pudo publicar la respuesta."
            );
        } finally {
            setAccion("");
        }
    };

    return (
        <main className="actividad-page">
            <header className="actividad-topbar">
                <Link className="actividad-brand" to="/empresa-home">
                    Tu<span>Evento</span>
                </Link>
                <Link className="actividad-back" to="/perfil">Volver al perfil</Link>
            </header>

            <div className="actividad-content">
                <span className="actividad-eyebrow">PORTAL EMPRESARIAL</span>
                <h1>Solicitudes de servicios</h1>
                <p className="actividad-description">
                    Responde las solicitudes recibidas y revisa los comentarios de cada servicio.
                </p>

                <nav className="actividad-filtros" aria-label="Gestión empresarial">
                    <button
                        type="button"
                        className={seccion === "solicitudes" ? "activo" : ""}
                        aria-pressed={seccion === "solicitudes"}
                        onClick={() => setSeccion("solicitudes")}
                    >
                        Solicitudes ({solicitudes.length})
                    </button>
                    <button
                        type="button"
                        className={seccion === "comentarios" ? "activo" : ""}
                        aria-pressed={seccion === "comentarios"}
                        onClick={() => setSeccion("comentarios")}
                    >
                        Comentarios ({resenas.length})
                    </button>
                </nav>

                {mensaje && <p className="actividad-success" role="status">{mensaje}</p>}
                {error && <p className="actividad-alert" role="alert">{error}</p>}
                {cargando && <p className="actividad-feedback" role="status">Cargando solicitudes y comentarios...</p>}

                {!cargando && !error && seccion === "solicitudes" && (
                    solicitudes.length === 0 ? (
                        <div className="actividad-empty">
                            <i className="bi bi-inbox" aria-hidden="true"></i>
                            <h2>No tienes solicitudes todavía</h2>
                            <p>Cuando un cliente solicite uno de tus servicios, aparecerá aquí.</p>
                        </div>
                    ) : (
                        <section className="actividad-lista" aria-label="Solicitudes recibidas">
                            {solicitudes.map((solicitud) => (
                                <article className="actividad-card" key={solicitud.id_reserva}>
                                    <div className="actividad-card-heading">
                                        <div>
                                            <span className="actividad-card-kicker">Solicitud #{solicitud.id_reserva}</span>
                                            <h2>{solicitud.nombre_servicio}</h2>
                                        </div>
                                        <span className={`actividad-estado estado-${solicitud.estado.toLowerCase()}`}>
                                            {solicitud.estado}
                                        </span>
                                    </div>
                                    <p className="actividad-card-description">{solicitud.descripcion_servicio}</p>
                                    <dl className="actividad-details">
                                        <div>
                                            <dt>Cliente</dt>
                                            <dd>{solicitud.nombre_cliente}</dd>
                                        </div>
                                        <div>
                                            <dt>Correo</dt>
                                            <dd>{solicitud.correo_cliente}</dd>
                                        </div>
                                        <div>
                                            <dt>Fecha solicitada</dt>
                                            <dd>{new Date(solicitud.fecha_hora).toLocaleString("es-CO", {
                                                dateStyle: "long",
                                                timeStyle: "short"
                                            })}</dd>
                                        </div>
                                        <div>
                                            <dt>Precio estimado</dt>
                                            <dd>${Number(solicitud.precio_total).toLocaleString("es-CO")}</dd>
                                        </div>
                                        {solicitud.tipo_evento && (
                                            <div>
                                                <dt>Tipo de evento</dt>
                                                <dd>{solicitud.tipo_evento}</dd>
                                            </div>
                                        )}
                                        {solicitud.cantidad_personas && (
                                            <div>
                                                <dt>Personas</dt>
                                                <dd>{solicitud.cantidad_personas}</dd>
                                            </div>
                                        )}
                                    </dl>
                                    {solicitud.mensaje && (
                                        <p className="actividad-request-message">
                                            <strong>Mensaje del cliente:</strong> {solicitud.mensaje}
                                        </p>
                                    )}
                                    {solicitud.estado.toUpperCase() === "PENDIENTE" && (
                                        <div className="actividad-actions">
                                            <button
                                                type="button"
                                                className="actividad-button"
                                                disabled={Boolean(accion)}
                                                onClick={() => handleEstado(solicitud, "ACEPTADA")}
                                            >
                                                {accion === `reserva-${solicitud.id_reserva}` ? "Actualizando..." : "Aceptar"}
                                            </button>
                                            <button
                                                type="button"
                                                className="actividad-button actividad-button-secondary"
                                                disabled={Boolean(accion)}
                                                onClick={() => handleEstado(solicitud, "RECHAZADA")}
                                            >
                                                Rechazar
                                            </button>
                                        </div>
                                    )}
                                </article>
                            ))}
                        </section>
                    )
                )}

                {!cargando && !error && seccion === "comentarios" && (
                    resenas.length === 0 ? (
                        <div className="actividad-empty">
                            <i className="bi bi-chat-heart" aria-hidden="true"></i>
                            <h2>Aún no hay comentarios</h2>
                            <p>Las opiniones de tus clientes aparecerán aquí.</p>
                        </div>
                    ) : (
                        <section className="actividad-lista" aria-label="Comentarios recibidos">
                            {resenas.map((resena) => (
                                <article className="actividad-card" key={resena.id_resena}>
                                    <div className="actividad-card-heading">
                                        <div>
                                            <span className="actividad-card-kicker">{resena.nombre_servicio}</span>
                                            <h2>{resena.nombre_cliente}</h2>
                                        </div>
                                        <span className="actividad-rating" aria-label={`${resena.calificacion || 0} de 5 estrellas`}>
                                            {"★".repeat(resena.calificacion || 0)}
                                            {"☆".repeat(5 - (resena.calificacion || 0))}
                                        </span>
                                    </div>
                                    <p className="actividad-review-text">{resena.descripcion_resena || "Sin comentario escrito."}</p>
                                    <small className="actividad-review-date">
                                        Servicio del {new Date(resena.fecha_hora).toLocaleDateString("es-CO")}
                                    </small>
                                    <form
                                        className="actividad-reply-form"
                                        onSubmit={(event) => handleResponder(event, resena)}
                                    >
                                        <label className="actividad-label" htmlFor={`respuesta-${resena.id_resena}`}>
                                            Respuesta de la empresa
                                        </label>
                                        <textarea
                                            id={`respuesta-${resena.id_resena}`}
                                            className="actividad-input"
                                            rows="3"
                                            maxLength="2000"
                                            required
                                            value={respuestas[resena.id_resena] || ""}
                                            onChange={(event) => setRespuestas((actuales) => ({
                                                ...actuales,
                                                [resena.id_resena]: event.target.value
                                            }))}
                                            placeholder="Agradece o responde el comentario del cliente."
                                        />
                                        <button
                                            type="submit"
                                            className="actividad-button"
                                            disabled={Boolean(accion)}
                                        >
                                            {accion === `resena-${resena.id_resena}`
                                                ? "Publicando..."
                                                : resena.respuesta_empresa
                                                    ? "Actualizar respuesta"
                                                    : "Responder"}
                                        </button>
                                    </form>
                                </article>
                            ))}
                        </section>
                    )
                )}
            </div>
        </main>
    );
}

export default SolicitudesEmpresa;
