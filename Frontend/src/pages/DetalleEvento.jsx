import { Link, useLocation, useNavigate } from "react-router-dom";

import "../styles/empresas.css";


function DetalleEvento() {

    const location = useLocation();
    const navigate = useNavigate();


    const empresa = location.state?.empresa;


    if (!empresa) {

        return (

            <div className="container py-5">

                <h2>
                    Evento no encontrado
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

        <div className="evento-detail-page">


            <div className="container py-5">


                <Link
                    to="/"
                    className="empresa-back"
                >
                    ← Volver a empresas
                </Link>



                <div className="evento-detail-card mt-4">


                    <img
                        src={empresa.imagen}
                        alt={empresa.nombre}
                        className="evento-detail-image"
                    />


                    <div className="evento-detail-content">


                        <span>
                            ✨ EVENTO DESTACADO
                        </span>


                        <h1>
                            {empresa.nombre}
                        </h1>


                        <h3>
                            {empresa.categoria}
                        </h3>


                        <p>
                            {empresa.descripcion}
                        </p>


                        <p>
                            En TuEvento podrás encontrar diferentes
                            empresas especializadas para ayudarte a
                            organizar este tipo de celebración.
                        </p>


                        <h4>
                            ¿Qué puedes encontrar?
                        </h4>


                        <ul>

                            {empresa.servicios.map(
                                (servicio, index) => (

                                    <li key={index}>
                                        {servicio}
                                    </li>

                                )
                            )}

                        </ul>


                        <button
                            className="btn btn-primary btn-lg"
                            onClick={handleReservar}
                        >
                            Reservar
                        </button>


                    </div>

                </div>

            </div>

        </div>

    );
}


export default DetalleEvento;