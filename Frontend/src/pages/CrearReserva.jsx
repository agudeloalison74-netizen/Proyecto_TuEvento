import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "../styles/reserva.css";
import { crearReserva } from "../services/reservaService";


function CrearReserva() {

    const navigate = useNavigate();
    const location = useLocation();
    const servicio = location.state?.servicio;


    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [tipoEvento, setTipoEvento] = useState("");
    const [cantidadPersonas, setCantidadPersonas] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [errorEnvio, setErrorEnvio] = useState("");
    const [enviando, setEnviando] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrorEnvio("");

        const usuarioAutenticado = localStorage.getItem("usuarioAutenticado") === "true";


        if (!usuarioAutenticado) {

            navigate("/login");

            return;
        }

        if (!servicio?.id_servicio) {
            setErrorEnvio("Selecciona un servicio antes de enviar la solicitud.");
            return;
        }

        let usuario = null;
        try {
            usuario = JSON.parse(localStorage.getItem("usuario") || "null");
        } catch {
            usuario = null;
        }

        if (!usuario?.id_usuario) {
            navigate("/login");
            return;
        }

        setEnviando(true);
        try {
            const reserva = await crearReserva({
                id_usuario: usuario.id_usuario,
                id_servicio: servicio.id_servicio,
                fecha_hora: `${fecha}T${hora}:00`,
                estado: "PENDIENTE",
                precio_total: Number(servicio.precio_referencia || 0),
                tipo_evento: tipoEvento,
                cantidad_personas: Number(cantidadPersonas),
                mensaje
            });

            localStorage.setItem("eventoTemporal", JSON.stringify({
                servicios: [{ ...servicio, id_reserva: reserva.id_reserva }],
                fecha,
                hora,
                tipoEvento,
                cantidadPersonas,
                mensaje,
                total: Number(servicio.precio_referencia || 0),
                estado: reserva.estado
            }));

            navigate("/solicitud-enviada");
        } catch (error) {
            setErrorEnvio(
                error.response?.data?.detail ||
                "No se pudo enviar la solicitud. Intenta nuevamente."
            );
        } finally {
            setEnviando(false);
        }

    };

    if (!servicio) {
        return (
            <div className="reserva-page">
                <div className="container py-5">
                    <div className="reserva-card text-center">
                        <h1>Selecciona un servicio</h1>
                        <p>Debes elegir el servicio que quieres solicitar antes de continuar.</p>
                        <Link to="/" className="btn btn-primary">Explorar servicios</Link>
                    </div>
                </div>
            </div>
        );
    }


    return (

        <div className="reserva-page">


            <div className="container py-5">


                <div className="reserva-header">

                    <Link
                        to="/"
                        className="reserva-back"
                    >
                        ← Volver al inicio
                    </Link>


                    <span>
                        NUEVA RESERVA
                    </span>


                    <h1>
                        Cuéntanos sobre tu evento
                    </h1>


                    <p>
                        Completa la información para enviar
                        tu solicitud a {servicio.nombre_empresa || "la empresa"}.
                    </p>
                    <div className="reserva-info">
                        <strong>{servicio.nombre_servicio}</strong>
                        <span>
                            ${Number(servicio.precio_referencia || 0).toLocaleString("es-CO")}
                        </span>
                    </div>

                </div>



                <div className="row justify-content-center">


                    <div className="col-lg-8">


                        <div className="reserva-card">


                            <form onSubmit={handleSubmit}>


                                <div className="row">


                                    <div className="col-md-6">

                                        <div className="form-group">

                                            <label>
                                                Fecha del evento
                                            </label>

                                            <input
                                                type="date"
                                                value={fecha}
                                                onChange={(e) =>
                                                    setFecha(e.target.value)
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="form-group">

                                            <label>
                                                Hora del evento
                                            </label>

                                            <input
                                                type="time"
                                                value={hora}
                                                onChange={(e) =>
                                                    setHora(e.target.value)
                                                }
                                                required
                                            />

                                        </div>

                                    </div>

                                </div>



                                <div className="form-group">

                                    <label>
                                        Tipo de evento
                                    </label>

                                    <select
                                        value={tipoEvento}
                                        onChange={(e) =>
                                            setTipoEvento(e.target.value)
                                        }
                                        required
                                    >

                                        <option value="">
                                            Selecciona una opción
                                        </option>

                                        <option value="Matrimonio">
                                            Matrimonio
                                        </option>

                                        <option value="Cumpleaños">
                                            Cumpleaños
                                        </option>

                                        <option value="Quinceañero">
                                            Quinceañero
                                        </option>

                                        <option value="Fiesta">
                                            Fiesta
                                        </option>

                                        <option value="Graduación">
                                            Graduación
                                        </option>

                                        <option value="Baby shower">
                                            Baby shower
                                        </option>

                                        <option value="Evento empresarial">
                                            Evento empresarial
                                        </option>

                                        <option value="Conferencia">
                                            Conferencia
                                        </option>

                                        <option value="Otro">
                                            Otro
                                        </option>

                                    </select>

                                </div>



                                <div className="form-group">

                                    <label>
                                        Cantidad de personas
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Ej. 50"
                                        value={cantidadPersonas}
                                        onChange={(e) =>
                                            setCantidadPersonas(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>



                                <div className="form-group">

                                    <label>
                                        Cuéntanos más sobre tu evento
                                    </label>

                                    <textarea
                                        rows="5"
                                        placeholder="Describe lo que necesitas para tu evento..."
                                        value={mensaje}
                                        onChange={(e) =>
                                            setMensaje(e.target.value)
                                        }
                                    />

                                </div>



                                <div className="reserva-info">

                                    <span>
                                        🕐
                                    </span>

                                    <p>
                                        Tu solicitud quedará inicialmente
                                        en estado <strong>PENDIENTE</strong>.
                                        La empresa podrá revisar y responder
                                        a tu solicitud.
                                    </p>

                                </div>



                                {errorEnvio && (
                                    <p className="alert alert-danger" role="alert">
                                        {errorEnvio}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="btn-reserva-submit"
                                    disabled={enviando}
                                >
                                    {enviando ? "Enviando solicitud..." : "Enviar solicitud"}
                                </button>


                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default CrearReserva;