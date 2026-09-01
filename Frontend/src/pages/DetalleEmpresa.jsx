import { Link, useLocation, useNavigate } from "react-router-dom";

import "../styles/empresas.css";


function DetalleEmpresa() {

    const location = useLocation();
    const navigate = useNavigate();


    const empresa = location.state?.empresa;


    if (!empresa) {

        return (

            <div className="container py-5">

                <h2>
                    Empresa no encontrada
                </h2>

                <Link
                    to="/"
                    className="btn btn-primary mt-3"
                >
                    Volver al inicio
                </Link>

            </div>

        );

    }


    const handleReservar = () => {

        const autenticado =
            localStorage.getItem("usuarioAutenticado") === "true";


        if (!autenticado) {

            navigate("/login");

            return;

        }


        navigate("/reserva");

    };


    return (

        <div className="empresa-detail-page">


            <div className="container py-5">


                <Link
                    to="/"
                    className="empresa-back"
                >
                    ← Volver a empresas
                </Link>



                <div className="empresa-detail-card mt-4">


                    <div className="row g-0">


                        <div className="col-lg-5">

                            <img
                                src={empresa.imagen}
                                alt={empresa.nombre}
                                className="empresa-detail-image"
                            />

                        </div>



                        <div className="col-lg-7">

                            <div className="empresa-detail-content">


                                <span className="company-category">
                                    {empresa.categoria}
                                </span>


                                <h1>
                                    {empresa.nombre}
                                </h1>


                                <p className="company-city">
                                    📍 {empresa.ciudad}
                                </p>


                                <p className="empresa-detail-description">
                                    {empresa.descripcion}
                                </p>


                                <hr />


                                <h3>
                                    Servicios disponibles
                                </h3>


                                <div className="services-list">

                                    {empresa.servicios.map(
                                        (servicio, index) => (

                                            <div
                                                className="service-item"
                                                key={index}
                                            >

                                                <span>
                                                    ✓
                                                </span>

                                                {servicio}

                                            </div>

                                        )
                                    )}

                                </div>


                                <button
                                    className="btn btn-primary btn-lg mt-4"
                                    onClick={handleReservar}
                                >
                                    Reservar servicio
                                </button>


                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}


export default DetalleEmpresa;