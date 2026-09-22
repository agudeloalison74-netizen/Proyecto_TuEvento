import { useState } from "react";


function FormularioEmpresa({ ciudades, idUsuarioInicial, onRegistrar }) {

    const [nit, setNit] = useState("");
    const [nombreEmpresa, setNombreEmpresa] = useState("");
    const [descripcionEmpresa, setDescripcionEmpresa] = useState("");
    const [contactoEmpresa, setContactoEmpresa] = useState("");
    const [direccionEmpresa, setDireccionEmpresa] = useState("");
    const [idCiudad, setIdCiudad] = useState("");
    const [idUsuario, setIdUsuario] = useState(idUsuarioInicial || "");
    const [enviando, setEnviando] = useState(false);

    const limpiarFormulario = () => {
        setNit("");
        setNombreEmpresa("");
        setDescripcionEmpresa("");
        setContactoEmpresa("");
        setDireccionEmpresa("");
        setIdCiudad("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nit.trim() || !nombreEmpresa.trim() || !idCiudad || !idUsuario) {
            alert("NIT, nombre, ciudad y usuario son obligatorios.");
            return;
        }

        const nuevaEmpresa = {
            id_empresa: nit,
            nombre_empresa: nombreEmpresa,
            descripcion_empresa: descripcionEmpresa || null,
            contacto_empresa: contactoEmpresa || null,
            direccion_empresa: direccionEmpresa || null,
            id_ciudad: Number(idCiudad),
            id_usuario: Number(idUsuario),
        };

        try {
            setEnviando(true);

            // El padre es quien hace el POST y refresca la lista
            await onRegistrar(nuevaEmpresa);

            limpiarFormulario();

        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="gestion-card">
            <div className="gestion-card-title">
                <span className="icono"><i className="bi bi-plus-lg"></i></span>
                <h3>Registrar empresa</h3>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="gestion-fila-doble">
                    <div className="gestion-field">
                        <label>NIT</label>
                        <input
                            type="text"
                            value={nit}
                            onChange={(e) => setNit(e.target.value)}
                            placeholder="Ej: 900123456"
                            required
                        />
                    </div>

                    <div className="gestion-field">
                        <label>Nombre</label>
                        <input
                            type="text"
                            value={nombreEmpresa}
                            onChange={(e) => setNombreEmpresa(e.target.value)}
                            placeholder="Ej: Eventos Luna"
                            required
                        />
                    </div>
                </div>

                <div className="gestion-field">
                    <label>Descripción</label>
                    <input
                        type="text"
                        value={descripcionEmpresa}
                        onChange={(e) => setDescripcionEmpresa(e.target.value)}
                        placeholder="A qué se dedica la empresa (opcional)"
                    />
                </div>

                <div className="gestion-fila-doble">
                    <div className="gestion-field">
                        <label>Contacto</label>
                        <input
                            type="text"
                            value={contactoEmpresa}
                            onChange={(e) => setContactoEmpresa(e.target.value)}
                            placeholder="Teléfono o correo (opcional)"
                        />
                    </div>

                    <div className="gestion-field">
                        <label>Ciudad</label>
                        <select
                            value={idCiudad}
                            onChange={(e) => setIdCiudad(e.target.value)}
                            required
                        >
                            <option value="">Selecciona una ciudad</option>
                            {ciudades.map((c) => (
                                <option key={c.id_ciudad} value={c.id_ciudad}>
                                    {c.nombre_ciudad}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="gestion-field">
                    <label>Dirección</label>
                    <input
                        type="text"
                        value={direccionEmpresa}
                        onChange={(e) => setDireccionEmpresa(e.target.value)}
                        placeholder="Dirección (opcional)"
                    />
                </div>

                <div className="gestion-field">
                    <label>ID de usuario dueño</label>
                    <input
                        type="number"
                        value={idUsuario}
                        onChange={(e) => setIdUsuario(e.target.value)}
                        placeholder="Ej: 4"
                        required
                    />
                    <small className="gestion-hint">
                        {idUsuarioInicial
                            ? "Se autocompletó con tu usuario, pero puedes cambiarlo."
                            : "Debe ser el ID de un usuario ya registrado."}
                    </small>
                </div>

                <button
                    type="submit"
                    className="gestion-btn-submit"
                    disabled={enviando}
                >
                    {enviando ? "Guardando..." : "Registrar empresa"}
                </button>

            </form>
        </div>
    );
}

export default FormularioEmpresa;
