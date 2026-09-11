import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/reserva.css";

import { crearReservasDeEvento } from "../services/reservaService";

function MiEvento() {

    const navigate = useNavigate();

    const [serviciosSeleccionados, setServiciosSeleccionados] =
        useState([]);

    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [tipoEvento, setTipoEvento] = useState("");
    const [cantidadPersonas, setCantidadPersonas] = useState("");
    const [mensaje, setMensaje] = useState("");

    const [enviando, setEnviando] = useState(false);
    const [errorEnvio, setErrorEnvio] = useState("");


    // =========================
    // CARGAR SERVICIOS
    // =========================

    useEffect(() => {

        try {

            const serviciosGuardados =
                JSON.parse(
                    localStorage.getItem(
                        "serviciosSeleccionados"
                    ) || "[]"
                );

            setServiciosSeleccionados(
                serviciosGuardados
            );

        } catch (error) {

            console.error(
                "Error al cargar servicios:",
                error
            );

            setServiciosSeleccionados([]);

        }

    }, []);


    // =========================
    // QUITAR SERVICIO
    // =========================

    const quitarServicio = (idServicio) => {

        const nuevosServicios =
            serviciosSeleccionados.filter(
                (servicio) =>
                    servicio.id_servicio !== idServicio
            );

        setServiciosSeleccionados(
            nuevosServicios
        );

        localStorage.setItem(
            "serviciosSeleccionados",
            JSON.stringify(nuevosServicios)
        );

    };


    // =========================
    // CALCULAR TOTAL
    // =========================

    const total =
        serviciosSeleccionados.reduce(
            (suma, servicio) =>
                suma +
                Number(
                    servicio.precio_referencia || 0
                ),
            0
        );


    // =========================
    // ENVIAR EVENTO
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setErrorEnvio("");


        const autenticado =
            localStorage.getItem(
                "usuarioAutenticado"
            ) === "true";


        if (!autenticado) {

            navigate("/login");

            return;

        }


        if (
            serviciosSeleccionados.length === 0
        ) {

            alert(
                "Debes agregar al menos un servicio a tu evento."
            );

            return;

        }


        // ==================================================
        // OBTENER EL USUARIO AUTENTICADO
        // ==================================================

        let usuario = null;

        try {

            usuario = JSON.parse(
                localStorage.getItem("usuario") || "null"
            );

        } catch (error) {

            usuario = null;

        }

        if (!usuario || !usuario.id_usuario) {

            setErrorEnvio(
                "No pudimos identificar tu usuario. Por favor inicia sesión de nuevo."
            );

            navigate("/login");

            return;

        }


        // ==================================================
        // CONSTRUIR LA FECHA Y HORA PARA LA RESERVA
        // ==================================================

        const fechaHoraISO =
            fecha && hora
                ? `${fecha}T${hora}:00`
                : new Date().toISOString();


        setEnviando(true);

        try {

            // ==================================================
            // GUARDAR CADA SERVICIO COMO UNA RESERVA EN LA BD
            // ==================================================

            const reservasCreadas =
                await crearReservasDeEvento(
                    serviciosSeleccionados,
                    {
                        id_usuario: usuario.id_usuario,
                        fecha_hora: fechaHoraISO,
                        estado: "PENDIENTE"
                    }
                );


            const evento = {

                servicios:
                    reservasCreadas,

                fecha:
                    fecha,

                hora:
                    hora,

                tipoEvento:
                    tipoEvento,

                cantidadPersonas:
                    cantidadPersonas,

                mensaje:
                    mensaje,

                total:
                    total,

                estado:
                    "PENDIENTE"

            };


            localStorage.setItem(
                "eventoTemporal",
                JSON.stringify(evento)
            );

            // Limpiamos el carrito porque ya quedó guardado en la BD
            localStorage.removeItem(
                "serviciosSeleccionados"
            );


            navigate(
                "/solicitud-enviada"
            );

        } catch (error) {

            console.error(
                "Error al guardar el evento en la base de datos:",
                error
            );

            const detalle =
                error.response?.data?.detail;

            setErrorEnvio(
                detalle ||
                "Ocurrió un error al guardar tu evento. Intenta nuevamente."
            );

        } finally {

            setEnviando(false);

        }

    };


    return (

        <div className="reserva-page">

            <div className="container py-5">


                {/* =========================
                    ENCABEZADO
                ========================= */}

                <div className="reserva-header">

                    <Link
                        to="/"
                        className="reserva-back"
                    >
                        ← Volver a empresas
                    </Link>

                    <span>
                        MI EVENTO
                    </span>

                    <h1>
                        Crea tu evento a tu medida
                    </h1>

                    <p>
                        Selecciona servicios de diferentes
                        empresas y crea el evento que tienes
                        en mente.
                    </p>

                </div>


                <div className="row g-4">


                    {/* =========================
                        SERVICIOS SELECCIONADOS
                    ========================= */}

                    <div className="col-lg-7">

                        <div className="reserva-card">

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <div>

                                    <h3 className="mb-1">
                                        Servicios seleccionados
                                    </h3>

                                    <p className="text-muted mb-0">
                                        {serviciosSeleccionados.length}
                                        {" "}
                                        {serviciosSeleccionados.length === 1
                                            ? "servicio"
                                            : "servicios"}
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    className="btn-carrito"
                                    title="Volver a empresas para agregar más servicios"
                                    onClick={() =>
                                        navigate("/")
                                    }
                                    style={{
                                        fontSize: "32px"
                                    }}
                                >
                                    🛒
                                </button>

                            </div>


                            {serviciosSeleccionados.length === 0 ? (

                                <div
                                    className="text-center py-5"
                                >

                                    <div
                                        style={{
                                            fontSize: "55px"
                                        }}
                                    >
                                        🎉
                                    </div>

                                    <h4 className="mt-3">
                                        Tu evento está vacío
                                    </h4>

                                    <p className="text-muted">
                                        Explora las empresas y agrega
                                        los servicios que quieras.
                                    </p>

                                    <Link
                                        to="/"
                                        className="btn btn-primary mt-2"
                                    >
                                        Explorar servicios
                                    </Link>

                                </div>

                            ) : (

                                <div>

                                    {serviciosSeleccionados.map(
                                        (servicio) => (

                                            <div
                                                key={
                                                    servicio.id_servicio
                                                }
                                                className="border rounded-4 p-3 mb-3"
                                            >

                                                <div className="d-flex justify-content-between gap-3">

                                                    <div>

                                                        <span
                                                            className="badge mb-2"
                                                            style={{
                                                                backgroundColor:
                                                                    "#E7D4FF",
                                                                color:
                                                                    "#6C2BD9"
                                                            }}
                                                        >
                                                            {servicio.nombre_empresa ||
                                                                "Empresa de eventos"}
                                                        </span>

                                                        <h5 className="mb-1">

                                                            {
                                                                servicio.nombre_servicio
                                                            }

                                                        </h5>

                                                        <p className="text-muted mb-2">

                                                            {
                                                                servicio.descripcion_servicio
                                                            }

                                                        </p>

                                                        <strong
                                                            style={{
                                                                color:
                                                                    "#6C2BD9"
                                                            }}
                                                        >

                                                            $
                                                            {Number(
                                                                servicio.precio_referencia ||
                                                                0
                                                            ).toLocaleString(
                                                                "es-CO"
                                                            )}

                                                        </strong>

                                                    </div>


                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger align-self-start"
                                                        onClick={() =>
                                                            quitarServicio(
                                                                servicio.id_servicio
                                                            )
                                                        }
                                                    >
                                                        ✕
                                                    </button>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}

                        </div>

                    </div>


                    {/* =========================
                        RESUMEN
                    ========================= */}

                    <div className="col-lg-5">

                        <div
                            className="reserva-card"
                            style={{
                                position: "sticky",
                                top: "100px"
                            }}
                        >

                            <h3 className="mb-4">
                                Resumen de tu evento
                            </h3>


                            <div
                                className="p-3 rounded-4 mb-4"
                                style={{
                                    backgroundColor:
                                        "#E7D4FF"
                                }}
                            >

                                <div className="d-flex justify-content-between">

                                    <span>
                                        Servicios
                                    </span>

                                    <strong>
                                        {
                                            serviciosSeleccionados.length
                                        }
                                    </strong>

                                </div>


                                <hr />


                                <div className="d-flex justify-content-between align-items-center">

                                    <span>
                                        Total estimado
                                    </span>

                                    <strong
                                        style={{
                                            color:
                                                "#6C2BD9",
                                            fontSize:
                                                "22px"
                                        }}
                                    >
                                        $
                                        {total.toLocaleString(
                                            "es-CO"
                                        )}
                                    </strong>

                                </div>

                            </div>


                            <form
                                onSubmit={
                                    handleSubmit
                                }
                            >


                                {/* FECHA */}

                                <div className="form-group mb-3">

                                    <label>
                                        Fecha del evento
                                    </label>

                                    <input
                                        type="date"
                                        value={fecha}
                                        onChange={(e) =>
                                            setFecha(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                {/* HORA */}

                                <div className="form-group mb-3">

                                    <label>
                                        Hora del evento
                                    </label>

                                    <input
                                        type="time"
                                        value={hora}
                                        onChange={(e) =>
                                            setHora(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                {/* TIPO */}

                                <div className="form-group mb-3">

                                    <label>
                                        Tipo de evento
                                    </label>

                                    <select
                                        value={tipoEvento}
                                        onChange={(e) =>
                                            setTipoEvento(
                                                e.target.value
                                            )
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


                                {/* PERSONAS */}

                                <div className="form-group mb-3">

                                    <label>
                                        Cantidad de personas
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Ej. 50"
                                        value={
                                            cantidadPersonas
                                        }
                                        onChange={(e) =>
                                            setCantidadPersonas(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                {/* MENSAJE */}

                                <div className="form-group mb-3">

                                    <label>
                                        Información adicional
                                    </label>

                                    <textarea
                                        rows="4"
                                        placeholder="Cuéntanos más sobre tu evento..."
                                        value={mensaje}
                                        onChange={(e) =>
                                            setMensaje(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* ESTADO */}

                                <div
                                    className="p-3 rounded-4 mb-3"
                                    style={{
                                        backgroundColor:
                                            "#F5F5F5"
                                    }}
                                >

                                    <small>
                                        🕐 Tu evento quedará
                                        inicialmente en estado
                                        <strong>
                                            {" "}PENDIENTE
                                        </strong>.
                                    </small>

                                </div>


                                {errorEnvio && (

                                    <div
                                        className="p-3 rounded-4 mb-3"
                                        style={{
                                            backgroundColor: "#FDE2E2",
                                            color: "#B42318"
                                        }}
                                    >
                                        <small>{errorEnvio}</small>
                                    </div>

                                )}

                                <button
                                    type="submit"
                                    className="btn-reserva-submit"
                                    disabled={
                                        serviciosSeleccionados.length === 0 ||
                                        !fecha ||
                                        !hora ||
                                        !tipoEvento ||
                                        !cantidadPersonas ||
                                        enviando
                                    }
                                >
                                    {enviando
                                        ? "Guardando tu evento..."
                                        : "Crear mi evento"}
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default MiEvento;
