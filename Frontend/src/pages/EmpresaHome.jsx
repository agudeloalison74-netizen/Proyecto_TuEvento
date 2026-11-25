import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { cerrarSesion } from "../services/usuarioService";
import "../styles/empresaHome.css";


function EmpresaHome() {
    const navigate = useNavigate();
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const handleCerrarSesion = () => {
        cerrarSesion();
        navigate("/");
    };

    useEffect(() => {
        let activa = true;

        const cargarServicios = async () => {
            try {
                const respuesta = await api.get("/empresas/mis-servicios");
                if (activa) {
                    setDatos(respuesta.data);
                }
            } catch (errorCarga) {
                if (activa) {
                    setError(
                        errorCarga.response?.data?.detail ||
                        "No se pudieron cargar los servicios de la empresa."
                    );
                }
            } finally {
                if (activa) {
                    setCargando(false);
                }
            }
        };

        cargarServicios();
        return () => {
            activa = false;
        };
    }, []);

    return (
        <main className="empresa-home">
            <header className="empresa-home-header">
                <div>
                    <span className="empresa-home-label">PORTAL EMPRESARIAL</span>
                    <h1>{datos?.empresa.nombre_empresa || "Mis servicios"}</h1>
                    <p>
                        Consulta los servicios publicados por tu empresa.
                    </p>
                </div>
                <div className="empresa-home-actions">
                    <Link to="/perfil" className="empresa-home-link">
                        Mi perfil
                    </Link>
                    <Link to="/empresa-home#servicios" className="empresa-home-link">
                        Mis servicios
                    </Link>
                    <Link to="/empresa/solicitudes" className="empresa-home-link">
                        Solicitudes de servicios
                    </Link>
                    <button
                        type="button"
                        className="empresa-home-logout"
                        onClick={handleCerrarSesion}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </header>

            {cargando && <p role="status">Cargando servicios...</p>}
            {!cargando && error && (
                <p className="empresa-home-message" role="alert">{error}</p>
            )}

            {!cargando && !error && (
                <section className="empresa-servicios" id="servicios">
                    {datos.servicios.length === 0 ? (
                        <p className="empresa-home-message">
                            Tu empresa todavía no tiene servicios publicados.
                        </p>
                    ) : (
                        datos.servicios.map((servicio) => (
                            <article
                                className="empresa-servicio-card"
                                key={servicio.id_servicio}
                            >
                                <h2>{servicio.nombre_servicio}</h2>
                                <p>{servicio.descripcion_servicio}</p>
                                {servicio.precio_referencia !== null && (
                                    <strong>
                                        Precio de referencia: $
                                        {Number(servicio.precio_referencia).toLocaleString("es-CO")}
                                    </strong>
                                )}
                            </article>
                        ))
                    )}
                </section>
            )}
        </main>
    );
}

export default EmpresaHome;
