import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/registro.css";

import logo from "../assets/img/logo.png";

import { registrarUsuario } from "../services/usuarioService";
import { registrarEmpresa } from "../services/empresaService";
import api from "../services/api";

function RegistroEmpresa() {
    const navigate = useNavigate();

    const [nit, setNit] = useState("");
    const [nombreEmpresa, setNombreEmpresa] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [contacto, setContacto] = useState("");
    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");

    const [ciudades, setCiudades] = useState([]);

    // Obtener ciudades desde el backend
    useEffect(() => {
        const cargarCiudades = async () => {
            try {
                const response = await api.get("/ciudades/");
                setCiudades(response.data);
            } catch (error) {
                console.error(
                    "Error al cargar ciudades:",
                    error
                );

                alert(
                    "No se pudieron cargar las ciudades."
                );
            }
        };

        cargarCiudades();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar contraseñas
        if (contrasena !== confirmarContrasena) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Verificar ciudad
        const ciudadSeleccionada = ciudades.find(
            (ciudadItem) =>
                ciudadItem.id_ciudad === Number(ciudad)
        );

        if (!ciudadSeleccionada) {
            alert("Selecciona una ciudad válida.");
            return;
        }

        try {
            // 1. Crear usuario de la empresa
            const datosUsuario = {
                nombre_usuario: nombreEmpresa,
                apellido_usuario: "Empresa",
                correo_usuario: correo,
                telefono_usuario: contacto,
                contrasena_usuario: contrasena,
                rol: "empresa"
            };

            const usuarioCreado =
                await registrarUsuario(datosUsuario);

            console.log(
                "Usuario de empresa creado:",
                usuarioCreado
            );

            // 2. Obtener el ID del usuario creado
            const idUsuario =
                usuarioCreado?.id_usuario ||
                usuarioCreado?.usuario?.id_usuario ||
                usuarioCreado?.user?.id_usuario;

            if (!idUsuario) {
                throw new Error(
                    "No se recibió el id_usuario del backend."
                );
            }

            // 3. Crear la empresa
            const datosEmpresa = {
                id_empresa: nit,
                nombre_empresa: nombreEmpresa,
                descripcion_empresa: descripcion,
                contacto_empresa: contacto,
                direccion_empresa: direccion,
                id_ciudad: ciudadSeleccionada.id_ciudad,
                id_usuario: idUsuario
            };

            const empresaCreada =
                await registrarEmpresa(datosEmpresa);

            console.log(
                "Empresa creada:",
                empresaCreada
            );

            alert(
                "¡Empresa registrada correctamente! Ahora puedes iniciar sesión."
            );

            // 4. Ir al login
            navigate("/login");

        } catch (error) {
            console.error(
                "Error al registrar empresa:",
                error
            );

            if (error.response?.data?.detail) {
                alert(
                    error.response.data.detail
                );
            } else {
                alert(
                    "No se pudo registrar la empresa. Verifica los datos e intenta nuevamente."
                );
            }
        }
    };

    return (
        <div className="registro-page">
            <div className="registro-container">

                <div className="registro-visual empresa-visual">

                    <Link
                        to="/"
                        className="registro-logo"
                    >
                        <img
                            src={logo}
                            alt="TuEvento"
                        />
                    </Link>

                    <div className="registro-visual-content">

                        <div className="registro-icon">
                            🏢
                        </div>

                        <h1>
                            Haz crecer tu
                            <span> empresa.</span>
                        </h1>

                        <p>
                            Registra tu empresa en TuEvento
                            y conecta tus servicios con personas
                            que están buscando hacer realidad
                            sus eventos.
                        </p>

                    </div>

                </div>

                <div className="registro-form-container">

                    <div className="registro-form">

                        <div className="registro-header">

                            <span>
                                REGISTRA TU EMPRESA
                            </span>

                            <h2>
                                Crear empresa
                            </h2>

                            <p>
                                Completa la información de tu empresa.
                            </p>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="form-group">

                                <label>
                                    NIT
                                </label>

                                <input
                                    type="text"
                                    placeholder="Ej. 900123456-7"
                                    value={nit}
                                    onChange={(e) =>
                                        setNit(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Nombre de la empresa
                                </label>

                                <input
                                    type="text"
                                    placeholder="Nombre completo de la empresa"
                                    value={nombreEmpresa}
                                    onChange={(e) =>
                                        setNombreEmpresa(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Descripción
                                </label>

                                <textarea
                                    rows="3"
                                    placeholder="Cuéntanos sobre tu empresa..."
                                    value={descripcion}
                                    onChange={(e) =>
                                        setDescripcion(e.target.value)
                                    }
                                />

                            </div>

                            <div className="row">

                                <div className="col-md-6">

                                    <div className="form-group">

                                        <label>
                                            Teléfono / contacto
                                        </label>

                                        <input
                                            type="tel"
                                            placeholder="300 000 0000"
                                            value={contacto}
                                            onChange={(e) =>
                                                setContacto(e.target.value)
                                            }
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <div className="form-group">

                                        <label>
                                            Ciudad
                                        </label>

                                        <select
                                            value={ciudad}
                                            onChange={(e) =>
                                                setCiudad(e.target.value)
                                            }
                                            required
                                        >

                                            <option value="">
                                                Selecciona una ciudad
                                            </option>

                                            {ciudades.map(
                                                (ciudadItem) => (
                                                    <option
                                                        key={
                                                            ciudadItem.id_ciudad
                                                        }
                                                        value={
                                                            ciudadItem.id_ciudad
                                                        }
                                                    >
                                                        {
                                                            ciudadItem.nombre_ciudad
                                                        }
                                                    </option>
                                                )
                                            )}

                                        </select>

                                    </div>

                                </div>

                            </div>

                            <div className="form-group">

                                <label>
                                    Dirección
                                </label>

                                <input
                                    type="text"
                                    placeholder="Dirección de la empresa"
                                    value={direccion}
                                    onChange={(e) =>
                                        setDireccion(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Correo electrónico
                                </label>

                                <input
                                    type="email"
                                    placeholder="empresa@correo.com"
                                    value={correo}
                                    onChange={(e) =>
                                        setCorreo(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Contraseña
                                </label>

                                <input
                                    type="password"
                                    placeholder="Crea una contraseña"
                                    value={contrasena}
                                    onChange={(e) =>
                                        setContrasena(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Confirmar contraseña
                                </label>

                                <input
                                    type="password"
                                    placeholder="Repite tu contraseña"
                                    value={confirmarContrasena}
                                    onChange={(e) =>
                                        setConfirmarContrasena(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="registro-button"
                            >
                                Registrar empresa
                            </button>

                        </form>

                        <div className="registro-login">

                            <span>
                                ¿Ya tienes una cuenta?
                            </span>

                            <Link to="/login">
                                Iniciar sesión
                            </Link>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default RegistroEmpresa;