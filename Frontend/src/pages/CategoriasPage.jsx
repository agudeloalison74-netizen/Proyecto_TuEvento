import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import "../styles/gestion.css";


function CategoriasPage() {

    const navigate = useNavigate();

    // =========================
    // PROTEGER LA PÁGINA
    // =========================

    const autenticado =
        localStorage.getItem("usuarioAutenticado") === "true";

    useEffect(() => {
        if (!autenticado) {
            navigate("/login");
        }
    }, [autenticado, navigate]);

    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [nombreCategoria, setNombreCategoria] = useState("");
    const [descripcionCategoria, setDescripcionCategoria] = useState("");
    const [enviando, setEnviando] = useState(false);

    // =========================
    // LISTAR (useEffect -> API REST)
    // =========================

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            setCargando(true);
            setError("");

            const respuesta = await api.get("/categorias/");
            setCategorias(respuesta.data);

        } catch (err) {
            console.error("Error al cargar categorías:", err);
            setError("No se pudieron cargar las categorías.");

        } finally {
            setCargando(false);
        }
    };

    // =========================
    // REGISTRAR
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombreCategoria.trim()) {
            alert("El nombre de la categoría es obligatorio.");
            return;
        }

        try {
            setEnviando(true);

            await api.post("/categorias/", {
                nombre_categoria: nombreCategoria,
                descripcion_categoria: descripcionCategoria || null,
            });

            setNombreCategoria("");
            setDescripcionCategoria("");

            await cargarCategorias();

        } catch (err) {
            console.error("Error al registrar categoría:", err);

            if (err.response?.data?.detail) {
                alert(err.response.data.detail);
            } else {
                alert("No se pudo registrar la categoría.");
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
                    <span className="gestion-eyebrow">GESTIÓN DE CATÁLOGO</span>
                    <h1>
                        <span className="gestion-header-icon">
                            <i className="bi bi-tags-fill"></i>
                        </span>
                        Categorías
                    </h1>
                    <p>
                        Registra los tipos de evento disponibles en TuEvento
                        y consulta las categorías que ya existen.
                    </p>
                </div>

                <div className="gestion-grid">

                    {/* ========================= REGISTRAR ========================= */}

                    <div className="gestion-card">
                        <div className="gestion-card-title">
                            <span className="icono"><i className="bi bi-plus-lg"></i></span>
                            <h3>Registrar categoría</h3>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="gestion-field">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    value={nombreCategoria}
                                    onChange={(e) => setNombreCategoria(e.target.value)}
                                    placeholder="Ej: Matrimonios"
                                    required
                                />
                            </div>

                            <div className="gestion-field">
                                <label>Descripción</label>
                                <input
                                    type="text"
                                    value={descripcionCategoria}
                                    onChange={(e) => setDescripcionCategoria(e.target.value)}
                                    placeholder="Descripción (opcional)"
                                />
                            </div>

                            <button
                                type="submit"
                                className="gestion-btn-submit"
                                disabled={enviando}
                            >
                                {enviando ? "Guardando..." : "Registrar categoría"}
                            </button>

                        </form>
                    </div>

                    {/* ========================= LISTAR ========================= */}

                    <div className="gestion-card">
                        <div className="gestion-list-header">
                            <div className="gestion-card-title" style={{ marginBottom: 0 }}>
                                <span className="icono"><i className="bi bi-list-ul"></i></span>
                                <h3>Categorías registradas</h3>
                            </div>

                            {!cargando && !error && (
                                <span className="gestion-count">
                                    {categorias.length}
                                </span>
                            )}
                        </div>

                        {cargando && (
                            <div className="gestion-estado">
                                <div className="gestion-spinner"></div>
                                <p>Cargando categorías...</p>
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

                        {!cargando && !error && categorias.length === 0 && (
                            <div className="gestion-estado">
                                <div className="gestion-estado-icono">
                                    <i className="bi bi-inbox"></i>
                                </div>
                                <p>Todavía no hay categorías registradas.</p>
                            </div>
                        )}

                        {!cargando && !error && categorias.length > 0 && (
                            <div className="gestion-table-wrapper">
                                <table className="gestion-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Descripción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categorias.map((categoria) => (
                                            <tr key={categoria.id_categoria}>
                                                <td>
                                                    <span className="gestion-id-badge">
                                                        {categoria.id_categoria}
                                                    </span>
                                                </td>
                                                <td>{categoria.nombre_categoria}</td>
                                                <td>{categoria.descripcion_categoria || "—"}</td>
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

export default CategoriasPage;
