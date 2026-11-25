import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { listarMisReservas } from "../services/reservaService";
import "../styles/actividad.css";

function eventoRealizado(reserva) {
    const fechaEvento = new Date(reserva.fecha_hora);
    return (
        ["ACEPTADA", "CONFIRMADA", "REALIZADA"].includes(
            reserva.estado?.toUpperCase()
        ) &&
        !Number.isNaN(fechaEvento.getTime()) &&
        fechaEvento <= new Date()
    );
}

function etiquetaEstado(reserva) {
    if (eventoRealizado(reserva)) {
        return "Realizado";
    }

    return {
        PENDIENTE: "Pendiente",
        ACEPTADA: "Aceptada",
        CONFIRMADA: "Confirmada",
        RECHAZADA: "Rechazada"
    }[reserva.estado?.toUpperCase()] || reserva.estado;
}

function HistorialEventos() {
    const [reservas, setReservas] = useState([]);
    const [filtro, setFiltro] = useState("todos");
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let activa = true;

        listarMisReservas()
            .then((datos) => {
                if (activa) {
                    setReservas(datos);
                }
            })
            .catch((errorCarga) => {
                if (activa) {
                    setError(
                        errorCarga.response?.data?.detail ||
                        "No se pudo cargar tu historial de eventos."
                    );
                }
            })
            .finally(() => {
                if (activa) {
                    setCargando(false);
                }
            });

        return () => {
            activa = false;
        };
    }, []);

    const reservasFiltradas = useMemo(() => reservas.filter((reserva) => {
        const realizado = eventoRealizado(reserva);
        if (filtro === "realizados") {
            return realizado;
        }
        if (filtro === "pendientes") {
            return reserva.estado?.toUpperCase() === "PENDIENTE";
        }
        if (filtro === "rechazados") {
            return reserva.estado?.toUpperCase() === "RECHAZADA";
        }
        return true;
    }), [filtro, reservas]);

    return (
        <main className="actividad-page">
            <header className="actividad-topbar">
                <Link className="actividad-brand" to="/perfil">
                    Tu<span>Evento</span>
                </Link>
                <Link className="actividad-back" to="/perfil">Volver al perfil</Link>
            </header>

            <div className="actividad-content">
                <span className="actividad-eyebrow">TU ACTIVIDAD</span>
                <h1>Historial de eventos</h1>
                <p className="actividad-description">
                    Consulta los servicios que solicitaste, su estado y los eventos que ya se realizaron.
                </p>

                <nav className="actividad-filtros" aria-label="Filtrar eventos">
                    {[
                        ["todos", "Todos"],
                        ["pendientes", "Pendientes"],
                        ["realizados", "Realizados"],
                        ["rechazados", "Rechazados"]
                    ].map(([valor, texto]) => (
                        <button
                            type="button"
                            key={valor}
                            className={filtro === valor ? "activo" : ""}
                            aria-pressed={filtro === valor}
                            onClick={() => setFiltro(valor)}
                        >
                            {texto}
                        </button>
                    ))}
                </nav>

                {cargando && <p className="actividad-feedback" role="status">Cargando tus solicitudes...</p>}
                {error && <p className="actividad-alert" role="alert">{error}</p>}
                {!cargando && !error && reservasFiltradas.length === 0 && (
                    <div className="actividad-empty">
                        <i className="bi bi-calendar2-heart" aria-hidden="true"></i>
                        <h2>No hay eventos en esta categoría</h2>
                        <p>Cuando solicites un servicio, aparecerá aquí con su estado.</p>
                        <Link className="actividad-button" to="/">Explorar servicios</Link>
                    </div>
                )}

                {!cargando && !error && reservasFiltradas.length > 0 && (
                    <section className="actividad-lista" aria-label="Tus eventos">
                        {reservasFiltradas.map((reserva) => (
                            <article className="actividad-card" key={reserva.id_reserva}>
                                <div className="actividad-card-heading">
                                    <div>
                                        <span className="actividad-card-kicker">{reserva.nombre_empresa}</span>
                                        <h2>{reserva.nombre_servicio}</h2>
                                    </div>
                                    <span className={`actividad-estado estado-${eventoRealizado(reserva) ? "realizado" : reserva.estado?.toLowerCase()}`}>
                                        {etiquetaEstado(reserva)}
                                    </span>
                                </div>
                                <p className="actividad-card-description">{reserva.descripcion_servicio}</p>
                                <dl className="actividad-details">
                                    <div>
                                        <dt>Fecha del evento</dt>
                                        <dd>{new Date(reserva.fecha_hora).toLocaleString("es-CO", {
                                            dateStyle: "long",
                                            timeStyle: "short"
                                        })}</dd>
                                    </div>
                                    <div>
                                        <dt>Servicio</dt>
                                        <dd>{reserva.nombre_servicio}</dd>
                                    </div>
                                    {reserva.tipo_evento && (
                                        <div>
                                            <dt>Tipo de evento</dt>
                                            <dd>{reserva.tipo_evento}</dd>
                                        </div>
                                    )}
                                    {reserva.cantidad_personas && (
                                        <div>
                                            <dt>Personas</dt>
                                            <dd>{reserva.cantidad_personas}</dd>
                                        </div>
                                    )}
                                    <div>
                                        <dt>Precio registrado</dt>
                                        <dd>${Number(reserva.precio_total).toLocaleString("es-CO")}</dd>
                                    </div>
                                </dl>
                                {reserva.mensaje && (
                                    <p className="actividad-request-message">
                                        <strong>Información que enviaste:</strong> {reserva.mensaje}
                                    </p>
                                )}
                                {eventoRealizado(reserva) && (
                                    <Link
                                        className="actividad-text-link"
                                        to="/cliente/comentarios"
                                    >
                                        {reserva.id_resena
                                            ? `Ver comentario (${reserva.calificacion || "sin puntuación"}/5)`
                                            : "Comentar y puntuar este servicio"}
                                    </Link>
                                )}
                            </article>
                        ))}
                    </section>
                )}
            </div>
        </main>
    );
}

export default HistorialEventos;
