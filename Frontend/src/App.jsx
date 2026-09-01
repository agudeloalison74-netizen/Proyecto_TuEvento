import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./App.css";

import logo from "./assets/img/logo.png";
import evento1 from "./assets/img/evento1.jpg";
import evento2 from "./assets/img/evento2.jpg";
import evento3 from "./assets/img/evento3.jpg";
import evento4 from "./assets/img/evento4.jpg";
import evento5 from "./assets/img/evento5.jpg";
import evento6 from "./assets/img/evento6.jpg";


function App() {

    const navigate = useNavigate();

    const [favoritos, setFavoritos] = useState([]);


    // =========================
    // EMPRESAS
    // =========================

    const empresas = [
        {
            id: 1,
            nombre: "Eventos Elegance",
            categoria: "Matrimonios y celebraciones",
            ciudad: "Bogotá",
            imagen: evento1,
            descripcion:
                "Creamos celebraciones elegantes y personalizadas para convertir tus momentos especiales en recuerdos inolvidables.",
            servicios: [
                "Decoración",
                "Organización de eventos",
                "Catering",
                "Fotografía"
            ]
        },
        {
            id: 2,
            nombre: "Momentos Mágicos",
            categoria: "Cumpleaños y quinceañeros",
            ciudad: "Bogotá",
            imagen: evento2,
            descripcion:
                "Nos especializamos en crear experiencias únicas para cumpleaños, quince años y celebraciones familiares.",
            servicios: [
                "Decoración temática",
                "Mesa de dulces",
                "Fotografía",
                "Animación"
            ]
        },
        {
            id: 3,
            nombre: "Eventos Corporativos",
            categoria: "Eventos empresariales",
            ciudad: "Bogotá",
            imagen: evento3,
            descripcion:
                "Organizamos eventos empresariales, conferencias y reuniones profesionales con atención a cada detalle.",
            servicios: [
                "Conferencias",
                "Montaje",
                "Sonido",
                "Catering"
            ]
        },
        {
            id: 4,
            nombre: "Celebraciones & Co.",
            categoria: "Fiestas y celebraciones",
            ciudad: "Bogotá",
            imagen: evento4,
            descripcion:
                "Diseñamos fiestas y celebraciones personalizadas para todo tipo de ocasiones.",
            servicios: [
                "Decoración",
                "Música",
                "Iluminación",
                "Catering"
            ]
        },
        {
            id: 5,
            nombre: "Dream Events",
            categoria: "Eventos especiales",
            ciudad: "Bogotá",
            imagen: evento5,
            descripcion:
                "Transformamos tus ideas en eventos especiales llenos de creatividad, elegancia y diversión.",
            servicios: [
                "Planeación",
                "Decoración",
                "Fotografía",
                "DJ"
            ]
        },
        {
            id: 6,
            nombre: "Experiencias Únicas",
            categoria: "Eventos y celebraciones",
            ciudad: "Bogotá",
            imagen: evento6,
            descripcion:
                "Una empresa dedicada a crear experiencias memorables para cada tipo de celebración.",
            servicios: [
                "Organización",
                "Decoración",
                "Catering",
                "Entretenimiento"
            ]
        }
    ];


    // =========================
    // CATEGORÍAS
    // =========================

    const categorias = [
        {
            nombre: "Matrimonios",
            icono: "💍"
        },
        {
            nombre: "Cumpleaños",
            icono: "🎂"
        },
        {
            nombre: "Quinceañeros",
            icono: "👑"
        },
        {
            nombre: "Fiestas",
            icono: "🎉"
        },
        {
            nombre: "Graduaciones",
            icono: "🎓"
        },
        {
            nombre: "Baby showers",
            icono: "👶"
        },
        {
            nombre: "Eventos empresariales",
            icono: "💼"
        },
        {
            nombre: "Conferencias",
            icono: "🎤"
        },
        {
            nombre: "Decoración",
            icono: "✨"
        },
        {
            nombre: "Catering",
            icono: "🍽️"
        },
        {
            nombre: "Fotografía",
            icono: "📸"
        },
        {
            nombre: "Música y DJ",
            icono: "🎧"
        }
    ];


    // =========================
    // FAVORITOS
    // =========================

    const toggleFavorito = (id) => {

        if (favoritos.includes(id)) {

            setFavoritos(
                favoritos.filter(
                    favorito => favorito !== id
                )
            );

        } else {

            setFavoritos([
                ...favoritos,
                id
            ]);

        }
    };


    // =========================
    // RESERVAR
    // =========================

    const handleReservar = () => {

        const autenticado =
            localStorage.getItem("usuarioAutenticado") === "true";

        if (!autenticado) {

            navigate("/login");

            return;
        }

        navigate("/reserva");
    };


    // =========================
    // RENDER
    // =========================

    return (

        <div className="tuevento-page">


            {/* =========================
                NAVBAR
            ========================= */}

            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">

                <div className="container">

                    <Link
                        to="/"
                        className="navbar-brand"
                    >
                        <img
                            src={logo}
                            alt="TuEvento"
                            style={{
                                height: "48px",
                                width: "auto"
                            }}
                        />
                    </Link>


                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTuEvento"
                    >

                        <span className="navbar-toggler-icon"></span>

                    </button>


                    <div
                        className="collapse navbar-collapse"
                        id="navbarTuEvento"
                    >

                        <ul className="navbar-nav mx-auto">

                            <li className="nav-item">

                                <a
                                    href="#inicio"
                                    className="nav-link"
                                >
                                    Inicio
                                </a>

                            </li>

                            <li className="nav-item">

                                <a
                                    href="#empresas"
                                    className="nav-link"
                                >
                                    Empresas
                                </a>

                            </li>

                            <li className="nav-item">

                                <a
                                    href="#categorias"
                                    className="nav-link"
                                >
                                    Categorías
                                </a>

                            </li>

                            <li className="nav-item">

                                <a
                                    href="#destacado"
                                    className="nav-link"
                                >
                                    Evento destacado
                                </a>

                            </li>

                        </ul>


                        <div className="d-flex gap-2">

                            <Link
                                to="/login"
                                className="btn btn-outline-primary"
                            >
                                Iniciar sesión
                            </Link>

                            <Link
                                to="/registro"
                                className="btn btn-primary"
                            >
                                Registrarse
                            </Link>

                        </div>

                    </div>

                </div>

            </nav>



            {/* =========================
                HERO + CARRUSEL
            ========================= */}

            <section
                id="inicio"
                className="hero-section"
            >

                <div className="container">

                    <div className="row align-items-center g-5">


                        <div className="col-lg-6">

                            <span className="hero-label">
                                ✨ TODO PARA TU EVENTO
                            </span>


                            <h1 className="hero-title">

                                Haz de tu evento

                                <span>
                                    {" "}un momento inolvidable.
                                </span>

                            </h1>


                            <p className="hero-text">

                                Encuentra empresas, servicios y
                                experiencias para crear el evento
                                que siempre has imaginado.

                            </p>


                            <div className="d-flex gap-3 flex-wrap">

                                <a
                                    href="#empresas"
                                    className="btn btn-primary btn-lg"
                                >
                                    Explorar empresas
                                </a>

                                <a
                                    href="#categorias"
                                    className="btn btn-outline-secondary btn-lg"
                                >
                                    Ver categorías
                                </a>

                            </div>


                            <div className="hero-stats mt-5">

                                <div>

                                    <strong>
                                        +100
                                    </strong>

                                    <span>
                                        Empresas
                                    </span>

                                </div>

                                <div>

                                    <strong>
                                        +500
                                    </strong>

                                    <span>
                                        Servicios
                                    </span>

                                </div>

                                <div>

                                    <strong>
                                        32
                                    </strong>

                                    <span>
                                        Categorías
                                    </span>

                                </div>

                            </div>

                        </div>



                        <div className="col-lg-6">

                            <div
                                id="carruselEventos"
                                className="carousel slide carousel-fade shadow-lg rounded-4 overflow-hidden"
                                data-bs-ride="carousel"
                            >

                                <div className="carousel-indicators">

                                    <button
                                        type="button"
                                        data-bs-target="#carruselEventos"
                                        data-bs-slide-to="0"
                                        className="active"
                                    ></button>

                                    <button
                                        type="button"
                                        data-bs-target="#carruselEventos"
                                        data-bs-slide-to="1"
                                    ></button>

                                    <button
                                        type="button"
                                        data-bs-target="#carruselEventos"
                                        data-bs-slide-to="2"
                                    ></button>

                                </div>


                                <div className="carousel-inner">


                                    <div className="carousel-item active">

                                        <img
                                            src={evento1}
                                            className="d-block w-100"
                                            alt="Evento"
                                        />

                                        <div className="carousel-caption">

                                            <h5>
                                                Momentos inolvidables
                                            </h5>

                                            <p>
                                                Haz realidad el evento de tus sueños.
                                            </p>

                                        </div>

                                    </div>


                                    <div className="carousel-item">

                                        <img
                                            src={evento2}
                                            className="d-block w-100"
                                            alt="Celebración"
                                        />

                                        <div className="carousel-caption">

                                            <h5>
                                                Celebra a lo grande
                                            </h5>

                                            <p>
                                                Encuentra los mejores servicios.
                                            </p>

                                        </div>

                                    </div>


                                    <div className="carousel-item">

                                        <img
                                            src={evento3}
                                            className="d-block w-100"
                                            alt="Evento empresarial"
                                        />

                                        <div className="carousel-caption">

                                            <h5>
                                                Todo en un solo lugar
                                            </h5>

                                            <p>
                                                Empresas preparadas para tu evento.
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#carruselEventos"
                                    data-bs-slide="prev"
                                >

                                    <span className="carousel-control-prev-icon"></span>

                                </button>


                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#carruselEventos"
                                    data-bs-slide="next"
                                >

                                    <span className="carousel-control-next-icon"></span>

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>



            {/* =========================
                CATEGORÍAS
            ========================= */}

            <section
                id="categorias"
                className="categories-section py-5"
            >

                <div className="container">

                    <div className="section-heading text-center">

                        <span>
                            EXPLORA
                        </span>

                        <h2>
                            ¿Qué tipo de evento estás planeando?
                        </h2>

                        <p>
                            Encuentra exactamente lo que necesitas.
                        </p>

                    </div>


                    <div className="row g-3 mt-4">

                        {categorias.map((categoria, index) => (

                            <div
                                className="col-6 col-md-4 col-lg-3"
                                key={index}
                            >

                                <div className="category-card">

                                    <div className="category-icon">
                                        {categoria.icono}
                                    </div>

                                    <h5>
                                        {categoria.nombre}
                                    </h5>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>



            {/* =========================
                EMPRESAS
            ========================= */}

            <section
                id="empresas"
                className="companies-section py-5"
            >

                <div className="container">

                    <div className="section-heading">

                        <span>
                            EMPRESAS DESTACADAS
                        </span>

                        <h2>
                            Encuentra la empresa perfecta
                        </h2>

                        <p>
                            Conoce empresas y descubre todos los
                            servicios que tienen para ofrecerte.
                        </p>

                    </div>


                    <div className="row g-4 mt-3">

                        {empresas.map((empresa) => (

                            <div
                                className="col-md-6 col-lg-4"
                                key={empresa.id}
                            >

                                <div className="company-card">


                                    <div className="company-image">

                                        <img
                                            src={empresa.imagen}
                                            alt={empresa.nombre}
                                        />


                                        <button
                                            className="favorite-button"
                                            onClick={() =>
                                                toggleFavorito(empresa.id)
                                            }
                                        >

                                            {favoritos.includes(empresa.id)
                                                ? "♥"
                                                : "♡"
                                            }

                                        </button>

                                    </div>


                                    <div className="company-content">

                                        <span className="company-category">
                                            {empresa.categoria}
                                        </span>


                                        <h3>
                                            {empresa.nombre}
                                        </h3>


                                        <p className="company-city">
                                            📍 {empresa.ciudad}
                                        </p>


                                        <p className="company-description">
                                            {empresa.descripcion}
                                        </p>


                                        <div className="company-buttons">

                                            <Link
                                                to={`/empresa/${empresa.id}`}
                                                className="btn btn-outline-primary"
                                                state={{
                                                    empresa: empresa
                                                }}
                                            >
                                                Ver empresa
                                            </Link>


                                            <Link
                                                to={`/evento/${empresa.id}`}
                                                className="btn btn-primary"
                                                state={{
                                                    empresa: empresa
                                                }}
                                            >
                                                Ver detalles
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>



            {/* =========================
                EVENTO DESTACADO
            ========================= */}

            <section
                id="destacado"
                className="featured-section py-5"
            >

                <div className="container">

                    <div className="row align-items-center g-5">


                        <div className="col-lg-6">

                            <img
                                src={evento4}
                                alt="Evento destacado"
                                className="featured-image"
                            />

                        </div>


                        <div className="col-lg-6">

                            <span className="featured-label">
                                ✨ EVENTO DESTACADO
                            </span>


                            <h2>
                                Momentos inolvidables
                            </h2>


                            <p>
                                Cada evento tiene una historia diferente.
                                En TuEvento queremos ayudarte a encontrar
                                las empresas y servicios que hagan realidad
                                esa historia.
                            </p>


                            <p>
                                Explora diferentes opciones, conoce sus
                                servicios y elige la alternativa que mejor
                                se adapte a lo que estás buscando.
                            </p>


                            <button
                                className="btn btn-primary btn-lg"
                                onClick={handleReservar}
                            >
                                Quiero reservar
                            </button>

                        </div>

                    </div>

                </div>

            </section>



            {/* =========================
                SOBRE TUEVENTO
            ========================= */}

            <section className="about-section py-5">

                <div className="container">

                    <div className="row align-items-center">


                        <div className="col-lg-7">

                            <span>
                                SOBRE TUEVENTO
                            </span>

                            <h2>
                                Todo lo que necesitas para
                                crear tu evento.
                            </h2>

                            <p>
                                TuEvento conecta personas que quieren
                                organizar un evento con empresas
                                especializadas en diferentes tipos de
                                celebraciones.
                            </p>

                            <p>
                                Desde decoración y catering hasta
                                fotografía, música y organización,
                                encontrarás diferentes opciones
                                para hacer realidad tu idea.
                            </p>

                        </div>


                        <div className="col-lg-5">

                            <div className="about-box">

                                <div>
                                    🎉
                                </div>

                                <h4>
                                    Tu evento comienza aquí.
                                </h4>

                                <p>
                                    Explora, compara y encuentra
                                    todo en un solo lugar.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>



            {/* =========================
                CTA
            ========================= */}

            <section className="cta-section py-5">

                <div className="container">

                    <div className="cta-box text-center">

                        <h2>
                            ¿Listo para crear tu próximo evento?
                        </h2>

                        <p>
                            Encuentra las mejores empresas y
                            empieza a planearlo hoy.
                        </p>

                        <Link
                            to="/registro"
                            className="btn btn-light btn-lg"
                        >
                            Crear mi cuenta
                        </Link>

                    </div>

                </div>

            </section>



            {/* =========================
                FOOTER
            ========================= */}

            <footer className="footer">

                <div className="container">

                    <div className="row g-4">


                        <div className="col-md-6">

                            <img
                                src={logo}
                                alt="TuEvento"
                                style={{
                                    height: "50px",
                                    width: "auto"
                                }}
                            />

                            <p className="mt-3">
                                Conectamos tus ideas con las empresas
                                que harán realidad tu evento.
                            </p>

                        </div>


                        <div className="col-md-3">

                            <h5>
                                TuEvento
                            </h5>

                            <a href="#inicio">
                                Inicio
                            </a>

                            <a href="#empresas">
                                Empresas
                            </a>

                            <a href="#categorias">
                                Categorías
                            </a>

                        </div>


                        <div className="col-md-3">

                            <h5>
                                Cuenta
                            </h5>

                            <Link to="/login">
                                Iniciar sesión
                            </Link>

                            <Link to="/registro">
                                Registrarse
                            </Link>

                            <Link to="/registro-empresa">
                                Registrar empresa
                            </Link>

                        </div>

                    </div>


                    <hr />


                    <p className="text-center mb-0">
                        © 2026 TuEvento. Todos los derechos reservados.
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default App;