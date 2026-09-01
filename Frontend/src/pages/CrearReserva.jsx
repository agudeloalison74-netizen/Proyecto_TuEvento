import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/reserva.css";


function CrearReserva() {

    const navigate = useNavigate();


    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [tipoEvento, setTipoEvento] = useState("");
    const [cantidadPersonas, setCantidadPersonas] = useState("");
    const [mensaje, setMensaje] = useState("");


    const handleSubmit = (e) => {

        e.preventDefault();


        const usuarioAutenticado =
            localStorage.getItem("usuarioAutenticado") === "true";


        if (!usuarioAutenticado) {

            navigate("/login");

            return;
        }


        // Por ahora guardamos la solicitud localmente.
        // Después la conectaremos con FastAPI.

        const reserva = {

            fecha,
            hora,
            tipoEvento,
            cantidadPersonas,
            mensaje,

            estado: "PENDIENTE"

        };


        localStorage.setItem(
            "reservaTemporal",
            JSON.stringify(reserva)
        );


        navigate("/solicitud-enviada");

    };


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
                        tu solicitud a la empresa.
                    </p>

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



                                <button
                                    type="submit"
                                    className="btn-reserva-submit"
                                >
                                    Enviar solicitud
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