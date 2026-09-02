import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "../styles/empresas.css";


function DetalleEvento() {

    const location = useLocation();
    const navigate = useNavigate();

    const empresa = location.state?.empresa;


    // =========================
    // SERVICIOS SELECCIONADOS
    // =========================

    const [serviciosSeleccionados, setServiciosSeleccionados] =
        useState([]);


    // =========================
    // CARGAR SERVICIOS GUARDADOS
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
                "Error al cargar servicios seleccionados:",
                error
            );

            setServiciosSeleccionados([]);

        }

    }, []);


    // =========================
    // RESERVAR / AGREGAR SERVICIO
    // =========================

    const reservarServicio = (servicio) => {

        // ==========================================
        // COMPROBAR SI EL USUARIO YA INICIÓ SESIÓN
        // ==========================================

        const autenticado =
            localStorage.getItem(
                "usuarioAutenticado"
            ) === "true";


        // ==========================================
        // SI NO ESTÁ AUTENTICADO
        // ==========================================

        if (!autenticado) {

            // Guardamos temporalmente el servicio
            // que quería reservar.

            localStorage.setItem(
                "servicioPendiente",
                JSON.stringify({
                    ...servicio,
                    nombre_empresa:
                        empresa.nombre
                })
            );

            // Lo enviamos al login.

            navigate("/login");

            return;
        }


        // ==========================================
        // SI YA ESTÁ AUTENTICADO
        // ==========================================

        const servicioYaAgregado =
            serviciosSeleccionados.some(
                (servicioActual) =>
                    servicioActual.id_servicio ===
                    servicio.id_servicio
            );


        // ==========================================
        // EVITAR DUPLICADOS
        // ==========================================

        if (servicioYaAgregado) {

            return;

        }


        // ==========================================
        // CREAR SERVICIO CON NOMBRE DE EMPRESA
        // ==========================================

        const nuevoServicio = {

            ...servicio,

            nombre_empresa:
                empresa.nombre

        };


        // ==========================================
        // AGREGAR A LA LISTA
        // ==========================================

        const nuevosServicios = [

            ...serviciosSeleccionados,

            nuevoServicio

        ];


        setServiciosSeleccionados(
            nuevosServicios
        );


        // ==========================================
        // GUARDAR EN LOCALSTORAGE
        // ==========================================

        localStorage.setItem(
            "serviciosSeleccionados",
            JSON.stringify(
                nuevosServicios
            )
        );

    };


    // =========================
    // SABER SI ESTÁ AGREGADO
    // =========================

    const estaAgregado = (idServicio) => {

        return serviciosSeleccionados.some(
            (servicio) =>
                servicio.id_servicio ===
                idServicio
        );

    };


    // =========================
    // EMPRESA NO ENCONTRADA
    // =========================

    if (!empresa) {

        return (

            <div className="container py-5">

                <h2>
                    Empresa no encontrada
                </h2>

                <Link
                    to="/"
                    className="btn btn-primary mt-3"
                >
                    Volver al inicio
                </Link>

            </div>

        );

    }


    return (

        <div className="evento-detail-page">


            {/* =========================
                BOTÓN MI EVENTO
            ========================= */}

            <div
                style={{
                    position: "fixed",
                    top: "90px",
                    right: "25px",
                    zIndex: 1000
                }}
            >

                <Link
                    to="/mi-evento"
                    className="btn btn-primary shadow"
                    style={{
                        borderRadius: "30px",
                        padding: "12px 20px"
                    }}
                >
                    🛒 Mi evento
                    {" "}
                    ({serviciosSeleccionados.length})
                </Link>

            </div>


            <div className="container py-5">


                {/* =========================
                    VOLVER
                ========================= */}

                <Link
                    to="/"
                    className="empresa-back"
                >
                    ← Volver a empresas
                </Link>


                {/* =========================
                    INFORMACIÓN EMPRESA
                ========================= */}

                <div className="evento-detail-card mt-4">


                    <img
                        src={empresa.imagen}
                        alt={empresa.nombre}
                        className="evento-detail-image"
                    />


                    <div className="evento-detail-content">


                        <span>
                            ✨ EMPRESA DE EVENTOS
                        </span>


                        <h1>
                            {empresa.nombre}
                        </h1>


                        <h3>
                            {empresa.categoria}
                        </h3>


                        <p>
                            {empresa.descripcion}
                        </p>


                        <p>
                            Explora los servicios disponibles
                            y agrega los que quieras utilizar
                            para crear tu propio evento.
                        </p>


                        {/* =========================
                            SERVICIOS
                        ========================= */}

                        <div className="d-flex justify-content-between align-items-center mt-4 mb-3">

                            <h4 className="mb-0">
                                Servicios disponibles
                            </h4>


                            {serviciosSeleccionados.length > 0 && (

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
                                            "9px 13px"
                                    }}
                                >
                                    {serviciosSeleccionados.length}
                                    {" "}
                                    seleccionados
                                </span>

                            )}

                        </div>


                        <div className="servicios-lista">


                            {empresa.servicios &&
                            empresa.servicios.length > 0 ? (

                                empresa.servicios.map(
                                    (servicio) => {

                                        const agregado =
                                            estaAgregado(
                                                servicio.id_servicio
                                            );


                                        return (

                                            <div
                                                className="servicio-item"
                                                key={
                                                    servicio.id_servicio
                                                }
                                            >


                                                <div>

                                                    <h5>
                                                        {
                                                            servicio.nombre_servicio
                                                        }
                                                    </h5>


                                                    <p>
                                                        {
                                                            servicio.descripcion_servicio
                                                        }
                                                    </p>


                                                    <strong>
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
                                                    className={
                                                        agregado
                                                            ? "btn btn-success"
                                                            : "btn btn-primary"
                                                    }
                                                    onClick={() =>
                                                        reservarServicio(
                                                            servicio
                                                        )
                                                    }
                                                >

                                                    {agregado
                                                        ? "✓ Agregado"
                                                        : "＋ Reservar"}

                                                </button>


                                            </div>

                                        );

                                    }
                                )

                            ) : (

                                <p>
                                    Esta empresa todavía no tiene
                                    servicios registrados.
                                </p>

                            )}

                        </div>


                        {/* =========================
                            IR A MI EVENTO
                        ========================= */}

                        {serviciosSeleccionados.length > 0 && (

                            <div
                                className="mt-4 p-4 rounded-4 text-center"
                                style={{
                                    backgroundColor:
                                        "#E7D4FF"
                                }}
                            >

                                <h5>
                                    🎉 ¡Ya tienes servicios para tu evento!
                                </h5>


                                <p className="mb-3">
                                    Puedes seguir explorando otras empresas
                                    y agregar más servicios.
                                </p>


                                <Link
                                    to="/mi-evento"
                                    className="btn btn-primary"
                                >
                                    Ver mi evento
                                </Link>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}


export default DetalleEvento;
