import {
    BrowserRouter,
    Navigate,
    Routes,
    Route
} from "react-router-dom";


import App from "../App";

import Login from "../pages/Login";

import RecuperarContrasena from "../pages/RecuperarContrasena";

import EmpresaHome from "../pages/EmpresaHome";

import Perfil from "../pages/Perfil";

import RegistroUsuario from "../pages/RegistroUsuario";

import RegistroEmpresa from "../pages/RegistroEmpresa";

import CrearReserva from "../pages/CrearReserva";

import DetalleEmpresa from "../pages/DetalleEmpresa";

import DetalleEvento from "../pages/DetalleEvento";

import MiEvento from "../pages/MiEvento";

import SolicitudEnviada from "../pages/SolicitudEnviada";

import CategoriasPage from "../pages/CategoriasPage";

import DepartamentosPage from "../pages/DepartamentosPage";

import EmpresasPage from "../pages/EmpresasPage";
import AdminPage from "../pages/AdminPage";
import HistorialEventos from "../pages/HistorialEventos";
import ComentariosCliente from "../pages/ComentariosCliente";
import SolicitudesEmpresa from "../pages/SolicitudesEmpresa";

function InicioPorRol() {
    let usuario = null;
    try {
        usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    } catch {
        usuario = null;
    }

    if (usuario?.rol?.toLowerCase() === "empresa") {
        return <Navigate to="/empresa-home" replace />;
    }

    if (["admin", "administrador"].includes(usuario?.rol?.toLowerCase())) {
        return <Navigate to="/admin" replace />;
    }

    return <App />;
}

function AdminRoute() {
    let usuario = null;
    try {
        usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    } catch {
        usuario = null;
    }

    const autenticado =
        localStorage.getItem("usuarioAutenticado") === "true" &&
        Boolean(localStorage.getItem("token"));
    const esAdmin = ["admin", "administrador"].includes(
        usuario?.rol?.toLowerCase()
    );

    if (!autenticado) {
        return <Navigate to="/login" replace />;
    }

    if (!esAdmin) {
        return usuario?.rol?.toLowerCase() === "empresa"
            ? <Navigate to="/empresa-home" replace />
            : <Navigate to="/" replace />;
    }

    return <AdminPage />;
}

function RutaConRol({ rol, children }) {
    let usuario = null;
    try {
        usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    } catch {
        usuario = null;
    }

    const autenticado =
        localStorage.getItem("usuarioAutenticado") === "true" &&
        Boolean(localStorage.getItem("token"));
    const rolActual = usuario?.rol?.toLowerCase();

    if (!autenticado) {
        return <Navigate to="/login" replace />;
    }

    if (rolActual !== rol) {
        if (["admin", "administrador"].includes(rolActual)) {
            return <Navigate to="/admin" replace />;
        }
        return rolActual === "empresa"
            ? <Navigate to="/empresa-home" replace />
            : <Navigate to="/" replace />;
    }

    return children;
}

function RutaResenas() {
    let usuario = null;
    try {
        usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    } catch {
        usuario = null;
    }

    const rol = usuario?.rol?.toLowerCase();
    if (rol === "empresa") {
        return <Navigate to="/empresa/solicitudes?seccion=comentarios" replace />;
    }
    if (rol === "cliente") {
        return <Navigate to="/cliente/comentarios" replace />;
    }
    if (["admin", "administrador"].includes(rol)) {
        return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/login" replace />;
}


function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>


                {/* INICIO */}

                <Route
                    path="/"
                    element={<InicioPorRol />}
                />



                {/* AUTENTICACIÓN */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/recuperar-contrasena"
                    element={<RecuperarContrasena />}
                />

                <Route
                    path="/perfil"
                    element={<Perfil />}
                />

                <Route
                    path="/cliente/historial"
                    element={
                        <RutaConRol rol="cliente">
                            <HistorialEventos />
                        </RutaConRol>
                    }
                />

                <Route
                    path="/cliente/comentarios"
                    element={
                        <RutaConRol rol="cliente">
                            <ComentariosCliente />
                        </RutaConRol>
                    }
                />

                <Route
                    path="/empresa/solicitudes"
                    element={
                        <RutaConRol rol="empresa">
                            <SolicitudesEmpresa />
                        </RutaConRol>
                    }
                />

                <Route
                    path="/registro"
                    element={<RegistroUsuario />}
                />

                <Route
                    path="/registro-empresa"
                    element={<RegistroEmpresa />}
                />



                {/* EMPRESAS */}

                <Route
                    path="/empresa/:id"
                    element={<DetalleEmpresa />}
                />



                {/* DETALLE DE SERVICIOS / EVENTO */}

                <Route
                    path="/evento/:id"
                    element={<DetalleEvento />}
                />



                {/* MI EVENTO */}

                <Route
                    path="/mi-evento"
                    element={<MiEvento />}
                />



                {/* RESERVA */}

                <Route
                    path="/reserva"
                    element={<CrearReserva />}
                />



                {/* SOLICITUD ENVIADA */}

                <Route
                    path="/solicitud-enviada"
                    element={<SolicitudEnviada />}
                />



                {/* HOME CLIENTE */}

                <Route
                    path="/cliente"
                    element={
                        <div className="p-5">

                            <h1>
                                Home Cliente
                            </h1>

                            <p>
                                Página principal del cliente.
                            </p>

                        </div>
                    }
                />



                {/* HOME EMPRESA */}

                <Route
                    path="/empresa-home"
                    element={<EmpresaHome />}
                />

                <Route
                    path="/admin"
                    element={<AdminRoute />}
                />

                {/* EVIDENCIA: CATEGORÍAS */}

                <Route
                    path="/categorias"
                    element={<CategoriasPage />}
                />



                {/* EVIDENCIA: DEPARTAMENTOS */}

                <Route
                    path="/departamentos"
                    element={<DepartamentosPage />}
                />



                {/* EVIDENCIA: RESEÑAS */}

                <Route
                    path="/resenas"
                    element={<RutaResenas />}
                />



                {/* EVIDENCIA: EMPRESAS */}

                <Route
                    path="/empresas"
                    element={<EmpresasPage />}
                />

            </Routes>

        </BrowserRouter>

    );
}


export default AppRoutes;
