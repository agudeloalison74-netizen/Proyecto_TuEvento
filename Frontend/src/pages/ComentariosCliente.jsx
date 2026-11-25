import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { listarMisReservas } from "../services/reservaService";
import { crearResena, listarMisResenas } from "../services/resenaService";
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

function ComentariosCliente() {
    const [reservas, setReservas] = useState([]);
    const [resenas, setResenas] = useState([]);
    const [comentarios, setComentarios] = useState({});
    const [puntuaciones, setPuntuaciones] = useState({});
    const [enviandoId, setEnviandoId] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const cargarDatos = useCallback(async () => {
        setCargando(true);
        setError("");

        try {
            const [reservasCliente, resenasCliente] = await Promise.all([
                listarMisReservas(),
                listarMisResenas()
            ]);
            setReservas(reservasCliente);
            setResenas(resenasCliente);
        } catch (errorCarga) {
            setError(
                errorCarga.response?.data?.detail ||
                "No se pudieron cargar tus comentarios."
            );
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargarDatos();
    }, [cargarDatos]);

    const reservasParaComentar = useMemo(
        () => reservas.filter(
            (reserva) => eventoRealizado(reserva) && !reserva.id_resena
        ),
        [reservas]
    );

    const handleEnviar = async (event, reserva) => {
        event.preventDefault();
        setError("");
        setMensaje("");
        setEnviandoId(reserva.id_reserva);

        try {
            await crearResena({
                id_reserva: reserva.id_reserva,
                descripcion_resena: comentarios[reserva.id_reserva]?.trim(),
                calificacion: Number(puntuaciones[reserva.id_reserva])
            });
            setMensaje("Tu comentario y puntuación se guardaron correctamente.");
            setComentarios((actuales) => ({
                ...actuales,
                [reserva.id_reserva]: ""
            }));
            await cargarDatos();
        } catch (errorGuardar) {
            setError(
                errorGuardar.response?.data?.detail ||
                "No se pudo guardar tu comentario."
            );
        } finally {
            setEnviandoId(null);
        }
    };

    return (
        <main className="actividad-page">
            <header className="actividad-topbar">
                <Link className="actividad-brand" to="/perfil">
                    Tu<span>Evento</span>
                </Link>
                <Link className="actividad-back" to="/perfil">Volver al perfil</Link>
            </header>

            <div className="actividad-content">
                <span className="actividad-eyebrow">TU OPINIÓN</span>
                <h1>Comentarios hechos</h1>
                <p className="actividad-description">
                    Puntúa los servicios de eventos realizados y consulta las respuestas de las empresas.
                </p>

                {mensaje && <p className="actividad-success" role="status">{mensaje}</p>}
                {error && <p className="actividad-alert" role="alert">{error}</p>}
                {cargando && <p className="actividad-feedback" role="status">Cargando comentarios...</p>}

                {!cargando && !error && (
                    <>
                        <section className="actividad-section">
                            <div className="actividad-section-heading">
                                <div>
                                    <span className="actividad-card-kicker">SERVICIOS REALIZADOS</span>
                                    <h2>¿Cómo fue tu experiencia?</h2>
                                </div>
                            </div>
                            {reservasParaComentar.length === 0 ? (
                                <p className="actividad-empty-inline">
                                    No tienes servicios realizados pendientes de comentar.
                                </p>
                            ) : (
                                <div className="actividad-lista">
                                    {reservasParaComentar.map((reserva) => (
                                        <article className="actividad-card" key={reserva.id_reserva}>
                                            <span className="actividad-card-kicker">{reserva.nombre_empresa}</span>
                                            <h3>{reserva.nombre_servicio}</h3>
                                            <p className="actividad-card-description">
                                                {new Date(reserva.fecha_hora).toLocaleDateString("es-CO", {
                                                    dateStyle: "long"
                                                })}
                                            </p>
                                            <form onSubmit={(event) => handleEnviar(event, reserva)}>
                                                <label className="actividad-label" htmlFor={`puntuacion-${reserva.id_reserva}`}>
                                                    Puntuación
                                                </label>
                                                <select
                                                    id={`puntuacion-${reserva.id_reserva}`}
                                                    className="actividad-input"
                                                    required
                                                    value={puntuaciones[reserva.id_reserva] || ""}
                                                    onChange={(event) => setPuntuaciones((actuales) => ({
                                                        ...actuales,
                                                        [reserva.id_reserva]: event.target.value
                                                    }))}
                                                >
                                                    <option value="" disabled>Elige una puntuación</option>
                                                    <option value="5">★★★★★ — Excelente</option>
                                                    <option value="4">★★★★☆ — Muy bueno</option>
                                                    <option value="3">★★★☆☆ — Bueno</option>
                                                    <option value="2">★★☆☆☆ — Regular</option>
                                                    <option value="1">★☆☆☆☆ — Malo</option>
                                                </select>
                                                <label className="actividad-label" htmlFor={`comentario-${reserva.id_reserva}`}>
                                                    Tu comentario
                                                </label>
                                                <textarea
                                                    id={`comentario-${reserva.id_reserva}`}
                                                    className="actividad-input"
                                                    rows="3"
                                                    maxLength="2000"
                                                    required
                                                    value={comentarios[reserva.id_reserva] || ""}
                                                    onChange={(event) => setComentarios((actuales) => ({
                                                        ...actuales,
                                                        [reserva.id_reserva]: event.target.value
                                                    }))}
                                                    placeholder="Cuéntale a otras personas cómo fue el servicio."
                                                />
                                                <button
                                                    className="actividad-button"
                                                    type="submit"
                                                    disabled={enviandoId === reserva.id_reserva}
                                                >
                                                    {enviandoId === reserva.id_reserva
                                                        ? "Enviando..."
                                                        : "Publicar comentario"}
                                                </button>
                                            </form>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="actividad-section">
                            <div className="actividad-section-heading">
                                <div>
                                    <span className="actividad-card-kicker">TUS RESEÑAS</span>
                                    <h2>Comentarios publicados</h2>
                                </div>
                                <span className="actividad-count">{resenas.length}</span>
                            </div>
                            {resenas.length === 0 ? (
                                <p className="actividad-empty-inline">Todavía no has publicado comentarios.</p>
                            ) : (
                                <div className="actividad-lista">
                                    {resenas.map((resena) => (
                                        <article className="actividad-card" key={resena.id_resena}>
                                            <div className="actividad-card-heading">
                                                <div>
                                                    <span className="actividad-card-kicker">{resena.nombre_empresa}</span>
                                                    <h3>{resena.nombre_servicio}</h3>
                                                </div>
                                                <span className="actividad-rating" aria-label={`${resena.calificacion || 0} de 5 estrellas`}>
                                                    {"★".repeat(resena.calificacion || 0)}
                                                    {"☆".repeat(5 - (resena.calificacion || 0))}
                                                </span>
                                            </div>
                                            <p className="actividad-review-text">{resena.descripcion_resena || "Sin comentario escrito."}</p>
                                            <small className="actividad-review-date">
                                                Publicado el {new Date(`${resena.fecha_resena}T00:00:00`).toLocaleDateString("es-CO")}
                                            </small>
                                            {resena.respuesta_empresa && (
                                                <div className="actividad-reply">
                                                    <strong>Respuesta de {resena.nombre_empresa}</strong>
                                                    <p>{resena.respuesta_empresa}</p>
                                                </div>
                                            )}
                                        </article>
                                    ))}
                                </div>
                            )}
                        </section>
                    </>
                )}
            </div>
        </main>
    );
}

export default ComentariosCliente;
