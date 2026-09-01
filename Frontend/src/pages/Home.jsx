import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container py-5">

      <div className="text-center">

        <h1 className="fw-bold">
          Bienvenido a TuEvento
        </h1>

        <p className="mt-3">
          Encuentra los servicios ideales para tu evento.
        </p>

        <div className="mt-4">

          <Link
            to="/login"
            className="btn me-2"
            style={{
              backgroundColor: "#6C2BD9",
              color: "#FFFFFF",
            }}
          >
            Iniciar sesión
          </Link>

          <Link
            to="/registro"
            className="btn"
            style={{
              backgroundColor: "#A970E8",
              color: "#FFFFFF",
            }}
          >
            Registrarse
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;