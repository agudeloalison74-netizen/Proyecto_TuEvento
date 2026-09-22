import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";


function ResenasPage() {

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

    const [resenas, setResenas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [fechaResena, setFechaResena] = useState("");
    const [descripcionResena, setDescripcionResena] = useState("");
    const [idReserva, setIdReserva] = useState("");
    const [enviando, setEnviando] = useState(false);

    // =========================
    // LISTAR (useEffect -> API REST)
    // =========================

    useEffect(() => {
        cargarResenas();
    }, []);

    const cargarResenas = async () => {
        try {
            setCargando(true);
            setError("");

            const respuesta = await api.get("/resenas/");
            setResenas(respuesta.data);

        } catch (err) {
            console.error("Error al cargar reseñas:", err);
            setError("No se pudieron cargar las reseñas.");

        } finally {
            setCargando(false);
        }
    };

    // =========================
    // REGISTRAR
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fechaResena || !idReserva) {
            alert("La fecha y el ID de la reserva son obligatorios.");
            return;
        }

        try {
            setEnviando(true);

            await api.post("/resenas/", {
                fecha_resena: fechaResena,
                descripcion_resena: descripcionResena || null,
                id_reserva: Number(idReserva),
            });

            setFechaResena("");
            setDescripcionResena("");
            setIdReserva("");

            // Refrescar la lista desde la API tras registrar
            await cargarResenas();

        } catch (err) {
            console.error("Error al registrar reseña:", err);

            if (err.response?.data?.detail) {
                alert(err.response.data.detail);
            } else {
                alert("No se pudo registrar la reseña.");
            }

        } finally {
            setEnviando(false);
        }
    };

    if (!autenticado) {
        return null;
    }

    return (
        <div className="container py-5">

            <Link to="/" className="btn btn-outline-primary mb-4">
                ← Volver al inicio
            </Link>

            <h1 className="mb-4">Reseñas</h1>

            {/* ========================= REGISTRAR ========================= */}

            <div className="card p-4 mb-5">
                <h3 className="mb-3">Registrar nueva reseña</h3>

                <form onSubmit={handleSubmit} className="row g-3">

                    <div className="col-md-3">
                        <label className="form-label">Fecha</label>
                        <input
                            type="date"
                            className="form-control"
                            value={fechaResena}
                            onChange={(e) => setFechaResena(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-md-5">
                        <label className="form-label">Descripción</label>
                        <input
                            type="text"
                            className="form-control"
                            value={descripcionResena}
                            onChange={(e) => setDescripcionResena(e.target.value)}
                            placeholder="Comentario de la reseña"
                        />
                    </div>

                    <div className="col-md-2">
                        <label className="form-label">ID Reserva</label>
                        <input
                            type="number"
                            className="form-control"
                            value={idReserva}
                            onChange={(e) => setIdReserva(e.target.value)}
                            placeholder="Ej: 1"
                            required
                        />
                    </div>

                    <div className="col-md-2 d-flex align-items-end">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={enviando}
                        >
                            {enviando ? "Guardando..." : "Registrar"}
                        </button>
                    </div>

                </form>
            </div>

            {/* ========================= LISTAR ========================= */}

            <div className="card p-4">
                <h3 className="mb-3">Reseñas registradas</h3>

                {cargando && <p>Cargando reseñas...</p>}

                {!cargando && error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                {!cargando && !error && resenas.length === 0 && (
                    <div className="alert alert-info">
                        Todavía no hay reseñas registradas.
                    </div>
                )}

                {!cargando && !error && resenas.length > 0 && (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Descripción</th>
                                <th>ID Reserva</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resenas.map((resena) => (
                                <tr key={resena.id_resena}>
                                    <td>{resena.id_resena}</td>
                                    <td>{resena.fecha_resena}</td>
                                    <td>{resena.descripcion_resena || "-"}</td>
                                    <td>{resena.id_reserva}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
}

export default ResenasPage;
