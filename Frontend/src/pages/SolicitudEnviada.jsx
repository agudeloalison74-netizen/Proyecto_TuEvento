import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/reserva.css";

function SolicitudEnviada() {

    const [evento, setEvento] = useState(null);

    useEffect(() => {

        try {

            const eventoGuardado =
                JSON.parse(
                    localStorage.getItem(
                        "eventoTemporal"
                    ) || "null"
                );

            setEvento(eventoGuardado);

        } catch (error) {

            console.error(
                "Error al cargar el evento:",
                error
            );

            setEvento(null);

        }

    }, []);


    // =========================
    // SI NO HAY EVENTO
    // =========================

    if (!evento) {

        return (

            <div className="reserva-page">

                <div className="container py-5">

                    <div
                        className="reserva-card text-center"
                        style={{
                            maxWidth: "700px",
                            margin: "0 auto"
                        }}
                    >

                        <div
                            style={{
                                fontSize: "70px"
                            }}
                        >
                            📄
                        </div>

                        <h2 className="mt-3">
                            No encontramos tu evento
                        </h2>

                        <p className="text-muted">
                            Parece que todavía no has creado
                            un evento.
                        </p>

                        <Link
                            to="/"
                            className="btn btn-primary mt-3"
                        >
                            Volver al inicio
                        </Link>

                    </div>

                </div>

            </div>

        );

    }


    // =========================
    // SERVICIOS
    // =========================

    const servicios =
        evento.servicios || [];


    // =========================
    // TOTAL
    // =========================

    const total =
        Number(evento.total || 0);


    return (

        <div className="reserva-page">

            <div className="container py-5">

                {/* =========================
                    ENCABEZADO
                ========================= */}

                <div
                    className="text-center mb-5"
                >

                    <div
                        style={{
                            fontSize: "65px"
                        }}
                    >
                        🎉
                    </div>

                    <span
                        style={{
                            color: "#6C2BD9",
                            fontWeight: "700",
                            letterSpacing: "2px"
                        }}
                    >
                        TUEVENTO
                    </span>

                    <h1 className="mt-2">
                        ¡Solicitud enviada!
                    </h1>

                    <p className="text-muted">
                        Tu solicitud fue creada correctamente.
                    </p>

                </div>


                <div
                    className="row g-4"
                >

                    {/* ==================================================
                        INFORMACIÓN DEL EVENTO
                    ================================================== */}

                    <div className="col-lg-7">

                        <div className="reserva-card">

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <div>

                                    <h3 className="mb-1">
                                        Comprobante de tu evento
                                    </h3>

                                    <p className="text-muted mb-0">
                                        Estado de la solicitud
                                    </p>

                                </div>

                                <span
                                    className="badge"
                                    style={{
                                        backgroundColor:
                                            "#E7D4FF",
                                        color:
                                            "#6C2BD9",
                                        fontSize:
                                            "14px",
                                        padding:
                                            "10px 14px"
                                    }}
                                >
                                    {evento.estado ||
                                        "PENDIENTE"}
                                </span>

                            </div>


                            {/* =========================
                                DATOS DEL EVENTO
                            ========================= */}

                            <div
                                className="p-4 rounded-4 mb-4"
                                style={{
                                    backgroundColor:
                                        "#F5F5F5"
                                }}
                            >

                                <h5 className="mb-3">
                                    📅 Información del evento
                                </h5>


                                <div className="row g-3">

                                    <div className="col-md-6">

                                        <small className="text-muted">
                                            Fecha
                                        </small>

                                        <div>
                                            <strong>
                                                {evento.fecha ||
                                                    "No especificada"}
                                            </strong>
                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <small className="text-muted">
                                            Hora
                                        </small>

                                        <div>
                                            <strong>
                                                {evento.hora ||
                                                    "No especificada"}
                                            </strong>
                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <small className="text-muted">
                                            Tipo de evento
                                        </small>

                                        <div>
                                            <strong>
                                                {evento.tipoEvento ||
                                                    "No especificado"}
                                            </strong>
                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <small className="text-muted">
                                            Cantidad de personas
                                        </small>

                                        <div>
                                            <strong>
                                                {evento.cantidadPersonas ||
                                                    "No especificada"}
                                            </strong>
                                        </div>

                                    </div>

                                </div>


                                {evento.mensaje && (

                                    <div className="mt-4">

                                        <small className="text-muted">
                                            Información adicional
                                        </small>

                                        <p className="mb-0 mt-1">
                                            {evento.mensaje}
                                        </p>

                                    </div>

                                )}

                            </div>


                            {/* ==================================================
                                SERVICIOS SELECCIONADOS
                            ================================================== */}

                            <div>

                                <div className="d-flex justify-content-between align-items-center mb-3">

                                    <div>

                                        <h4 className="mb-1">
                                            Servicios seleccionados
                                        </h4>

                                        <p className="text-muted mb-0">
                                            {servicios.length}
                                            {" "}
                                            {servicios.length === 1
                                                ? "servicio"
                                                : "servicios"}
                                        </p>

                                    </div>

                                    <span
                                        style={{
                                            fontSize:
                                                "32px"
                                        }}
                                    >
                                        🛍️
                                    </span>

                                </div>


                                {servicios.length > 0 ? (

                                    <div>

                                        {servicios.map(
                                            (
                                                servicio,
                                                index
                                            ) => (

                                                <div
                                                    key={
                                                        servicio.id_servicio ||
                                                        index
                                                    }
                                                    className="border rounded-4 p-3 mb-3"
                                                >

                                                    <div className="d-flex justify-content-between align-items-start gap-3">

                                                        <div>

                                                            {/* EMPRESA */}

                                                            <span
                                                                className="badge mb-2"
                                                                style={{
                                                                    backgroundColor:
                                                                        "#E7D4FF",
                                                                    color:
                                                                        "#6C2BD9",
                                                                    padding:
                                                                        "8px 11px"
                                                                }}
                                                            >
                                                                🏢{" "}
                                                                {servicio.nombre_empresa ||
                                                                    "Empresa de eventos"}
                                                            </span>


                                                            {/* SERVICIO */}

                                                            <h5 className="mb-1">
                                                                {servicio.nombre_servicio ||
                                                                    "Servicio"}
                                                            </h5>


                                                            {/* DESCRIPCIÓN */}

                                                            {servicio.descripcion_servicio && (

                                                                <p className="text-muted mb-2">
                                                                    {
                                                                        servicio.descripcion_servicio
                                                                    }
                                                                </p>

                                                            )}

                                                        </div>


                                                        {/* PRECIO */}

                                                        <strong
                                                            style={{
                                                                color:
                                                                    "#6C2BD9",
                                                                fontSize:
                                                                    "18px",
                                                                whiteSpace:
                                                                    "nowrap"
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

                                                </div>

                                            )
                                        )}

                                    </div>

                                ) : (

                                    <div
                                        className="text-center p-4 rounded-4"
                                        style={{
                                            backgroundColor:
                                                "#F5F5F5"
                                        }}
                                    >
                                        <p className="text-muted mb-0">
                                            No hay servicios seleccionados.
                                        </p>
                                    </div>

                                )}

                            </div>

                        </div>

                    </div>


                    {/* ==================================================
                        RESUMEN Y TOTAL
                    ================================================== */}

                    <div className="col-lg-5">

                        <div
                            className="reserva-card"
                            style={{
                                position: "sticky",
                                top: "100px"
                            }}
                        >

                            <h3 className="mb-4">
                                Resumen
                            </h3>


                            {/* CANTIDAD */}

                            <div
                                className="d-flex justify-content-between mb-3"
                            >

                                <span>
                                    Servicios
                                </span>

                                <strong>
                                    {servicios.length}
                                </strong>

                            </div>


                            <hr />


                            {/* LISTA RESUMIDA */}

                            <div className="mb-4">

                                {servicios.map(
                                    (
                                        servicio,
                                        index
                                    ) => (

                                        <div
                                            key={
                                                servicio.id_servicio ||
                                                index
                                            }
                                            className="d-flex justify-content-between gap-3 mb-2"
                                        >

                                            <span
                                                className="text-muted"
                                                style={{
                                                    fontSize:
                                                        "14px"
                                                }}
                                            >
                                                {servicio.nombre_servicio ||
                                                    "Servicio"}
                                            </span>

                                            <span
                                                style={{
                                                    fontSize:
                                                        "14px",
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >
                                                $
                                                {Number(
                                                    servicio.precio_referencia ||
                                                    0
                                                ).toLocaleString(
                                                    "es-CO"
                                                )}
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>


                            {/* TOTAL */}

                            <div
                                className="p-4 rounded-4"
                                style={{
                                    backgroundColor:
                                        "#E7D4FF"
                                }}
                            >

                                <div className="d-flex justify-content-between align-items-center">

                                    <span>
                                        <strong>
                                            Total estimado
                                        </strong>
                                    </span>

                                    <strong
                                        style={{
                                            color:
                                                "#6C2BD9",
                                            fontSize:
                                                "25px"
                                        }}
                                    >
                                        $
                                        {total.toLocaleString(
                                            "es-CO"
                                        )}
                                    </strong>

                                </div>

                            </div>


                            {/* ESTADO */}

                            <div
                                className="p-3 rounded-4 mt-3"
                                style={{
                                    backgroundColor:
                                        "#F5F5F5"
                                }}
                            >

                                <small>
                                    🕐 Tu solicitud se encuentra
                                    actualmente en estado{" "}
                                    <strong>
                                        {evento.estado ||
                                            "PENDIENTE"}
                                    </strong>
                                    .
                                </small>

                            </div>


                            {/* BOTONES */}

                            <div className="d-grid gap-2 mt-4">

                                <Link
                                    to="/"
                                    className="btn btn-primary"
                                >
                                    Explorar más empresas
                                </Link>

                                <Link
                                    to="/mi-evento"
                                    className="btn btn-outline-primary"
                                >
                                    Volver a mi evento
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    MENSAJE FINAL
                ========================= */}

                <div
                    className="text-center mt-5"
                >

                    <p className="text-muted mb-0">
                        Gracias por confiar en{" "}
                        <strong
                            style={{
                                color: "#6C2BD9"
                            }}
                        >
                            TuEvento
                        </strong>
                        . 💜
                    </p>

                </div>

            </div>

        </div>

    );
}

export default SolicitudEnviada;
