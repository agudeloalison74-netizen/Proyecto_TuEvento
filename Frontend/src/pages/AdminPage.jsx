import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { cerrarSesion } from "../services/usuarioService";
import "../styles/admin.css";

function AdminPage() {
    const navigate = useNavigate();
    const [seccion, setSeccion] = useState("usuarios");
    const [usuarios, setUsuarios] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [guardando, setGuardando] = useState(false);
    const [errorEdicion, setErrorEdicion] = useState("");
    const [idAdministrador, setIdAdministrador] = useState(null);

    useEffect(() => {
        try {
            const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
            setIdAdministrador(Number(usuario?.id_usuario) || null);
        } catch {
            setIdAdministrador(null);
        }
    }, []);

    const cargarDatos = async () => {
        setCargando(true);
        setError("");

        try {
            const [respuestaUsuarios, respuestaEmpresas] = await Promise.all([
                api.get("/usuarios/"),
                api.get("/empresas/")
            ]);

            setUsuarios(respuestaUsuarios.data);
            setEmpresas(respuestaEmpresas.data);
        } catch (errorCarga) {
            setError(
                errorCarga.response?.data?.detail ||
                "No se pudieron cargar los datos de administración."
            );
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleCerrarSesion = () => {
        cerrarSesion();
        navigate("/login");
    };

    const handleEliminarUsuario = async (usuario) => {
        if (!window.confirm(`¿Eliminar la cuenta de ${usuario.nombre_usuario} ${usuario.apellido_usuario}?`)) {
            return;
        }

        try {
            await api.delete(`/usuarios/${usuario.id_usuario}`);
            setUsuarios((actuales) =>
                actuales.filter((item) => item.id_usuario !== usuario.id_usuario)
            );
            setEmpresas((actuales) =>
                actuales.filter((empresa) => empresa.id_usuario !== usuario.id_usuario)
            );
            setError("");
        } catch (errorEliminar) {
            setError(
                errorEliminar.response?.data?.detail ||
                "No se pudo eliminar el usuario."
            );
        }
    };

    const handleEliminarEmpresa = async (empresa) => {
        if (!window.confirm(`¿Eliminar la empresa ${empresa.nombre_empresa}?`)) {
            return;
        }

        try {
            await api.delete(`/empresas/${encodeURIComponent(empresa.id_empresa)}`);
            setEmpresas((actuales) =>
                actuales.filter((item) => item.id_empresa !== empresa.id_empresa)
            );
            setError("");
        } catch (errorEliminar) {
            setError(
                errorEliminar.response?.data?.detail ||
                "No se pudo eliminar la empresa."
            );
        }
    };

    const handleEditarUsuario = (usuario) => {
        setUsuarioEditando({
            ...usuario,
            nombre_usuario: usuario.nombre_usuario || "",
            apellido_usuario: usuario.apellido_usuario || "",
            telefono_usuario: usuario.telefono_usuario || ""
        });
        setErrorEdicion("");
        setError("");
    };

    const handleGuardarUsuario = async (event) => {
        event.preventDefault();
        setGuardando(true);
        setErrorEdicion("");

        try {
            const respuesta = await api.put(
                `/usuarios/${usuarioEditando.id_usuario}`,
                {
                    nombre_usuario: usuarioEditando.nombre_usuario,
                    apellido_usuario: usuarioEditando.apellido_usuario,
                    telefono_usuario: usuarioEditando.telefono_usuario
                }
            );

            setUsuarios((actuales) =>
                actuales.map((usuario) =>
                    usuario.id_usuario === respuesta.data.id_usuario
                        ? respuesta.data
                        : usuario
                )
            );
            setUsuarioEditando(null);
        } catch (errorGuardar) {
            setErrorEdicion(
                errorGuardar.response?.data?.detail ||
                "No se pudieron guardar los cambios del usuario."
            );
        } finally {
            setGuardando(false);
        }
    };

    return (
        <main className="admin-page">
            <header className="admin-header">
                <a className="admin-brand" href="/">
                    Tu<span>Evento</span>
                    <small>Administración</small>
                </a>
                <button
                    type="button"
                    className="admin-logout"
                    onClick={handleCerrarSesion}
                >
                    <i className="bi bi-box-arrow-right" aria-hidden="true"></i>
                    Cerrar sesión
                </button>
            </header>

            <div className="admin-content">
                <section className="admin-welcome">
                    <span className="admin-eyebrow">CENTRO DE CONTROL</span>
                    <h1>Panel de administración</h1>
                    <p>Gestiona las cuentas y empresas registradas en TuEvento.</p>
                </section>

                <section className="admin-summary" aria-label="Resumen">
                    <article className="admin-summary-card">
                        <span className="admin-summary-icon"><i className="bi bi-people-fill"></i></span>
                        <div>
                            <strong>{usuarios.length}</strong>
                            <span>Usuarios registrados</span>
                        </div>
                    </article>
                    <article className="admin-summary-card">
                        <span className="admin-summary-icon"><i className="bi bi-building"></i></span>
                        <div>
                            <strong>{empresas.length}</strong>
                            <span>Empresas registradas</span>
                        </div>
                    </article>
                </section>

                <section className="admin-management">
                    <div className="admin-management-heading">
                        <div>
                            <span className="admin-eyebrow">GESTIÓN</span>
                            <h2>Directorio de TuEvento</h2>
                        </div>
                        <button
                            type="button"
                            className="admin-refresh"
                            onClick={cargarDatos}
                            disabled={cargando}
                        >
                            <i className="bi bi-arrow-clockwise" aria-hidden="true"></i>
                            Actualizar
                        </button>
                    </div>

                    <div className="admin-tabs" role="tablist" aria-label="Secciones de gestión">
                        <button
                            type="button"
                            role="tab"
                            aria-selected={seccion === "usuarios"}
                            className={seccion === "usuarios" ? "active" : ""}
                            onClick={() => setSeccion("usuarios")}
                        >
                            <i className="bi bi-people" aria-hidden="true"></i>
                            Gestión usuarios
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={seccion === "empresas"}
                            className={seccion === "empresas" ? "active" : ""}
                            onClick={() => setSeccion("empresas")}
                        >
                            <i className="bi bi-buildings" aria-hidden="true"></i>
                            Gestión empresas
                        </button>
                    </div>

                    {error && <p className="admin-message error" role="alert">{error}</p>}
                    {cargando ? (
                        <p className="admin-message" role="status">Cargando información...</p>
                    ) : (
                        <div className="admin-table-wrap">
                            {seccion === "usuarios" ? (
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Correo</th>
                                            <th>Rol</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuarios.map((usuario) => (
                                            <tr key={usuario.id_usuario}>
                                                <td>
                                                    {usuario.nombre_usuario} {usuario.apellido_usuario}
                                                </td>
                                                <td>{usuario.correo_usuario}</td>
                                                <td><span className="admin-role">{usuario.rol}</span></td>
                                                <td className="admin-actions">
                                                    <button
                                                        type="button"
                                                        className="admin-icon-button edit"
                                                        aria-label={`Editar ${usuario.nombre_usuario}`}
                                                        title="Editar usuario"
                                                        onClick={() => handleEditarUsuario(usuario)}
                                                    >
                                                        <i className="bi bi-pencil-square" aria-hidden="true"></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="admin-icon-button delete"
                                                        aria-label={`Eliminar ${usuario.nombre_usuario}`}
                                                        title="Eliminar usuario"
                                                        disabled={usuario.id_usuario === idAdministrador}
                                                        onClick={() => handleEliminarUsuario(usuario)}
                                                    >
                                                        <i className="bi bi-trash3" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {usuarios.length === 0 && (
                                            <tr><td colSpan="4" className="admin-empty">No hay usuarios registrados.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            ) : (
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Empresa</th>
                                            <th>NIT</th>
                                            <th>Contacto</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {empresas.map((empresa) => (
                                            <tr key={empresa.id_empresa}>
                                                <td>{empresa.nombre_empresa}</td>
                                                <td>{empresa.id_empresa}</td>
                                                <td>{empresa.contacto_empresa || "Sin contacto"}</td>
                                                <td className="admin-actions">
                                                    <button
                                                        type="button"
                                                        className="admin-icon-button delete"
                                                        aria-label={`Eliminar ${empresa.nombre_empresa}`}
                                                        title="Eliminar empresa"
                                                        onClick={() => handleEliminarEmpresa(empresa)}
                                                    >
                                                        <i className="bi bi-trash3" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {empresas.length === 0 && (
                                            <tr><td colSpan="4" className="admin-empty">No hay empresas registradas.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </section>
            </div>

            {usuarioEditando && (
                <div className="admin-modal-backdrop" onMouseDown={(event) => {
                    if (event.target === event.currentTarget && !guardando) {
                        setUsuarioEditando(null);
                    }
                }}>
                    <section
                        className="admin-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="admin-edit-title"
                    >
                        <button
                            type="button"
                            className="admin-modal-close"
                            aria-label="Cerrar"
                            onClick={() => setUsuarioEditando(null)}
                            disabled={guardando}
                        >
                            <i className="bi bi-x-lg" aria-hidden="true"></i>
                        </button>
                        <span className="admin-eyebrow">CUENTA DE USUARIO</span>
                        <h2 id="admin-edit-title">Editar usuario</h2>
                        {errorEdicion && (
                            <p className="admin-modal-error" role="alert">
                                {errorEdicion}
                            </p>
                        )}
                        <form onSubmit={handleGuardarUsuario}>
                            <label>
                                Nombre
                                <input
                                    required
                                    maxLength="100"
                                    value={usuarioEditando.nombre_usuario}
                                    onChange={(event) => setUsuarioEditando({
                                        ...usuarioEditando,
                                        nombre_usuario: event.target.value
                                    })}
                                />
                            </label>
                            <label>
                                Apellido
                                <input
                                    required
                                    maxLength="100"
                                    value={usuarioEditando.apellido_usuario}
                                    onChange={(event) => setUsuarioEditando({
                                        ...usuarioEditando,
                                        apellido_usuario: event.target.value
                                    })}
                                />
                            </label>
                            <label>
                                Teléfono
                                <input
                                    required
                                    maxLength="30"
                                    value={usuarioEditando.telefono_usuario}
                                    onChange={(event) => setUsuarioEditando({
                                        ...usuarioEditando,
                                        telefono_usuario: event.target.value
                                    })}
                                />
                            </label>
                            <label>
                                Correo
                                <input value={usuarioEditando.correo_usuario} disabled />
                            </label>
                            <div className="admin-modal-actions">
                                <button
                                    type="button"
                                    className="admin-cancel"
                                    onClick={() => setUsuarioEditando(null)}
                                    disabled={guardando}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="admin-save" disabled={guardando}>
                                    {guardando ? "Guardando..." : "Guardar cambios"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </main>
    );
}

export default AdminPage;
