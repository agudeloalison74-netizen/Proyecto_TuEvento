import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import "../styles/gestion.css";

import FormularioEmpresa from "../components/Empresas/FormularioEmpresa";
import TablaEmpresas from "../components/Empresas/TablaEmpresas";



function EmpresasPage() {

    const navigate = useNavigate();

    const autenticado =
        localStorage.getItem("usuarioAutenticado") === "true";

    useEffect(() => {
        if (!autenticado) {
            navigate("/login");
        }
    }, [autenticado, navigate]);

    // Usuario logueado (para autocompletar el dueño de la empresa)
    let usuarioSesion = null;

    try {
        usuarioSesion = JSON.parse(localStorage.getItem("usuario"));
    } catch (error) {
        usuarioSesion = null;
    }

    const [empresas, setEmpresas] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");


    // LISTAR (useEffect)

    useEffect(() => {
        cargarEmpresas();
        cargarCiudades();
    }, []);

    const cargarEmpresas = async () => {
        try {
            setCargando(true);
            setError("");

            const respuesta = await api.get("/empresas/");
            setEmpresas(respuesta.data);

        } catch (err) {
            console.error("Error al cargar empresas:", err);
            setError("No se pudieron cargar las empresas.");

        } finally {
            setCargando(false);
        }
    };

    const cargarCiudades = async () => {
        try {
            const respuesta = await api.get("/ciudades/");
            setCiudades(respuesta.data);

        } catch (err) {
            console.error("Error al cargar ciudades:", err);
        }
    };

    // REGISTRAR

    const registrarEmpresa = async (nuevaEmpresa) => {
        try {
            await api.post("/empresas/", nuevaEmpresa);

            // Refrescar la lista desde la API tras registrar
            await cargarEmpresas();

        } catch (err) {
            console.error("Error al registrar empresa:", err);

            if (err.response?.data?.detail) {
                alert(err.response.data.detail);
            } else {
                alert("No se pudo registrar la empresa.");
            }
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
                    <span className="gestion-eyebrow">GESTIÓN DE ALIADOS</span>
                    <h1>
                        <span className="gestion-header-icon">
                            <i className="bi bi-building-fill"></i>
                        </span>
                        Empresas
                    </h1>
                    <p>
                        Registra las empresas aliadas de TuEvento y consulta
                        las que ya están vinculadas a la plataforma.
                    </p>
                </div>

                <div className="gestion-grid">

                    <FormularioEmpresa
                        ciudades={ciudades}
                        idUsuarioInicial={
                            usuarioSesion?.id_usuario
                                ? String(usuarioSesion.id_usuario)
                                : ""
                        }
                        onRegistrar={registrarEmpresa}
                    />

                    <TablaEmpresas
                        empresas={empresas}
                        ciudades={ciudades}
                        cargando={cargando}
                        error={error}
                    />

                </div>
            </div>
        </div>
    );
}

export default EmpresasPage;
