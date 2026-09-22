import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import App from "../App";

import Login from "../pages/Login";

import RegistroUsuario from "../pages/RegistroUsuario";

import RegistroEmpresa from "../pages/RegistroEmpresa";

import CrearReserva from "../pages/CrearReserva";

import DetalleEmpresa from "../pages/DetalleEmpresa";

import DetalleEvento from "../pages/DetalleEvento";

import MiEvento from "../pages/MiEvento";

import SolicitudEnviada from "../pages/SolicitudEnviada";

import CategoriasPage from "../pages/CategoriasPage";

import DepartamentosPage from "../pages/DepartamentosPage";

import ResenasPage from "../pages/ResenasPage";

import EmpresasPage from "../pages/EmpresasPage";


function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>


                {/* INICIO */}

                <Route
                    path="/"
                    element={<App />}
                />



                {/* AUTENTICACIÓN */}

                <Route
                    path="/login"
                    element={<Login />}
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
                    element={
                        <div className="p-5">

                            <h1>
                                Home Empresa
                            </h1>

                            <p>
                                Página principal de la empresa.
                            </p>

                        </div>
                    }
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
                    element={<ResenasPage />}
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
