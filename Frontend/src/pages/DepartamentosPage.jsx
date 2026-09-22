import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import "../styles/gestion.css";


function DepartamentosPage() {

    const navigate = useNavigate();

    const autenticado =
        localStorage.getItem("usuarioAutenticado") === "true";

    useEffect(() => {
        if (!autenticado) {
            navigate("/login");
        }
    }, [autenticado, navigate]);

    const [departamentos, setDepartamentos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [nombreDepartamento, setNombreDepartamento] = useState("");
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        cargarDepartamentos();
    }, []);

    const cargarDepartamentos = async () => {
        try {
            setCargando(true);
            setError("");

            const respuesta = await api.get("/departamentos/");
            setDepartamentos(respuesta.data);

        } catch (err) {
            console.error("Error al cargar departamentos:", err);
            setError("No se pudieron cargar los departamentos.");

        } finally {
            setCargando(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombreDepartamento.trim()) {
            alert("El nombre del departamento es obligatorio.");
            return;
        }

        try {
            setEnviando(true);

            await api.post("/departamentos/", {
                nombre_departamento: nombreDepartamento,
            });

            setNombreDepartamento("");

            await cargarDepartamentos();

        } catch (err) {
            console.error("Error al registrar departamento:", err);

            if (err.response?.data?.detail) {
                alert(err.response.data.detail);
            } else {
                alert("No se pudo registrar el departamento.");
            }

        } finally {
            setEnviando(false);
        }
    };

    if (!autenticado) {
        return null;
    }

    return (
        <div className="gestion-page">
            <div className="container">

                <Link to="/" className="gestion-back">
                    <i className="bi bi-arrow-left"></i> Volver al inicio
                </Link>

                <div className="gestion-header">
                    <span className="gestion-eyebrow">GESTIÓN DE UBICACIONES</span>
                    <h1>
                        <span className="gestion-header-icon">
                            <i className="bi bi-map-fill"></i>
                        </span>
                        Departamentos
                    </h1>
                    <p>
                        Registra los departamentos donde TuEvento tiene
                        presencia y consulta los que ya están dados de alta.
                    </p>
                </div>

                <div className="gestion-grid">

                    <div className="gestion-card">
                        <div className="gestion-card-title">
                            <span className="icono"><i className="bi bi-plus-lg"></i></span>
                            <h3>Registrar departamento</h3>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="gestion-field">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    value={nombreDepartamento}
                                    onChange={(e) => setNombreDepartamento(e.target.value)}
                                    placeholder="Ej: Cundinamarca"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="gestion-btn-submit"
                                disabled={enviando}
                            >
                                {enviando ? "Guardando..." : "Registrar departamento"}
                            </button>

                        </form>
                    </div>

                    <div className="gestion-card">
                        <div className="gestion-list-header">
                            <div className="gestion-card-title" style={{ marginBottom: 0 }}>
                                <span className="icono"><i className="bi bi-list-ul"></i></span>
                                <h3>Departamentos registrados</h3>
                            </div>

                            {!cargando && !error && (
                                <span className="gestion-count">
                                    {departamentos.length}
                                </span>
                            )}
                        </div>

                        {cargando && (
                            <div className="gestion-estado">
                                <div className="gestion-spinner"></div>
                                <p>Cargando departamentos...</p>
                            </div>
                        )}

                        {!cargando && error && (
                            <div className="gestion-estado gestion-estado-error">
                                <div className="gestion-estado-icono">
                                    <i className="bi bi-exclamation-triangle"></i>
                                </div>
                                <p>{error}</p>
                            </div>
                        )}

                        {!cargando && !error && departamentos.length === 0 && (
                            <div className="gestion-estado">
                                <div className="gestion-estado-icono">
                                    <i className="bi bi-inbox"></i>
                                </div>
                                <p>Todavía no hay departamentos registrados.</p>
                            </div>
                        )}

                        {!cargando && !error && departamentos.length > 0 && (
                            <div className="gestion-table-wrapper">
                                <table className="gestion-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {departamentos.map((departamento) => (
                                            <tr key={departamento.id_departamento}>
                                                <td>
                                                    <span className="gestion-id-badge">
                                                        {departamento.id_departamento}
                                                    </span>
                                                </td>
                                                <td>{departamento.nombre_departamento}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DepartamentosPage;
