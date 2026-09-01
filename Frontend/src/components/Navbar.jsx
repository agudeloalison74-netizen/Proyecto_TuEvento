import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { isAuthenticated, logout } = useAuth();

  return (

    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#6C2BD9",
      }}
    >

      <div className="container">

        <Link
          to="/"
          className="navbar-brand fw-bold text-white"
        >
          TuEvento
        </Link>

        <div className="d-flex align-items-center">

          {!isAuthenticated ? (

            <>
              <Link
                to="/login"
                className="btn btn-light me-2"
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
            </>

          ) : (

            <>

              <Link
                to="/reserva"
                className="btn btn-light me-2"
              >
                Reservar
              </Link>

              <button
                className="btn btn-outline-light"
                onClick={logout}
              >
                Cerrar sesión
              </button>

            </>

          )}

        </div>

      </div>

    </nav>

  );
}

export default Navbar;