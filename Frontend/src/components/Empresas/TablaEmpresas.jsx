

function TablaEmpresas({ empresas, ciudades, cargando, error }) {

    const nombreCiudad = (idCiudadEmpresa) => {
        const encontrada = ciudades.find(
            (c) => c.id_ciudad === idCiudadEmpresa
        );

        return encontrada ? encontrada.nombre_ciudad : idCiudadEmpresa;
    };

    return (
        <div className="gestion-card">
            <div className="gestion-list-header">
                <div className="gestion-card-title" style={{ marginBottom: 0 }}>
                    <span className="icono"><i className="bi bi-list-ul"></i></span>
                    <h3>Empresas registradas</h3>
                </div>

                {!cargando && !error && (
                    <span className="gestion-count">
                        {empresas.length}
                    </span>
                )}
            </div>

            {cargando && (
                <div className="gestion-estado">
                    <div className="gestion-spinner"></div>
                    <p>Cargando empresas...</p>
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

            {!cargando && !error && empresas.length === 0 && (
                <div className="gestion-estado">
                    <div className="gestion-estado-icono">
                        <i className="bi bi-inbox"></i>
                    </div>
                    <p>Todavía no hay empresas registradas.</p>
                </div>
            )}

            {!cargando && !error && empresas.length > 0 && (
                <div className="gestion-table-wrapper">
                    <table className="gestion-table">
                        <thead>
                            <tr>
                                <th>NIT</th>
                                <th>Nombre</th>
                                <th>Ciudad</th>
                                <th>Contacto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empresas.map((empresa) => (
                                <tr key={empresa.id_empresa}>
                                    <td>
                                        <span className="gestion-id-badge">
                                            {empresa.id_empresa}
                                        </span>
                                    </td>
                                    <td>{empresa.nombre_empresa}</td>
                                    <td>{nombreCiudad(empresa.id_ciudad)}</td>
                                    <td>{empresa.contacto_empresa || "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TablaEmpresas;
