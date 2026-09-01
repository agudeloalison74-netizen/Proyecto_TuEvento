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

import SolicitudEnviada from "../pages/SolicitudEnviada";


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



                {/* DETALLE DEL EVENTO */}

                <Route
                    path="/evento/:id"
                    element={<DetalleEvento />}
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

            </Routes>

        </BrowserRouter>

    );
}


export default AppRoutes;