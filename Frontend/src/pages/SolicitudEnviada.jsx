import { Link } from "react-router-dom";


function SolicitudEnviada() {

    return (

        <div
            className="container d-flex align-items-center justify-content-center"
            style={{
                minHeight: "100vh"
            }}
        >

            <div
                className="text-center"
                style={{
                    maxWidth: "600px"
                }}
            >

                <div
                    style={{
                        fontSize: "70px"
                    }}
                >
                    🎉
                </div>


                <h1 className="mt-3">
                    ¡Solicitud enviada!
                </h1>


                <p className="lead">

                    Tu solicitud fue registrada correctamente.

                </p>


                <div
                    className="p-4 rounded-4 my-4"
                    style={{
                        backgroundColor: "#E7D4FF"
                    }}
                >

                    <h4>
                        Estado de la solicitud
                    </h4>

                    <span
                        className="badge"
                        style={{
                            backgroundColor: "#6C2BD9",
                            fontSize: "15px",
                            padding: "10px 20px"
                        }}
                    >
                        PENDIENTE
                    </span>

                </div>


                <p>
                    La empresa podrá revisar tu solicitud
                    y posteriormente responderte.
                </p>


                <Link
                    to="/"
                    className="btn btn-primary"
                >
                    Volver al inicio
                </Link>

            </div>

        </div>

    );
}


export default SolicitudEnviada;