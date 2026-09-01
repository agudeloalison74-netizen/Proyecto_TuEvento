import { useState } from "react";
import { Link } from "react-router-dom";

import "./App.css";

function App() {

    // =========================================
    // EMPRESAS
    // =========================================

    const empresas = [
        {
            id: 1,
            nombre: "Eventos Elegance",
            ciudad: "Bogotá",
            descripcion: "Organización y decoración para eventos especiales.",
            categoria: "Matrimonios",
            calificacion: "4.9",
            imagen:
                "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80"
        },
        {
            id: 2,
            nombre: "Momentos Mágicos",
            ciudad: "Bogotá",
            descripcion: "Creamos experiencias únicas para tus momentos.",
            categoria: "Fiestas",
            calificacion: "4.8",
            imagen:
                "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80"
        },
        {
            id: 3,
            nombre: "Celebraciones Plus",
            ciudad: "Medellín",
            descripcion: "Todo lo necesario para hacer realidad tu evento.",
            categoria: "Eventos empresariales",
            calificacion: "4.7",
            imagen:
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80"
        },
        {
            id: 4,
            nombre: "Dulce Celebración",
            ciudad: "Bogotá",
            descripcion: "Especialistas en cumpleaños y celebraciones familiares.",
            categoria: "Cumpleaños",
            calificacion: "4.8",
            imagen:
                "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=80"
        },
        {
            id: 5,
            nombre: "Eventos Royal",
            ciudad: "Cali",
            descripcion: "Creamos celebraciones elegantes y personalizadas.",
            categoria: "Quinceañeros",
            calificacion: "4.9",
            imagen:
                "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80"
        },
        {
            id: 6,
            nombre: "Momentos Corporativos",
            ciudad: "Barranquilla",
            descripcion: "Planeación profesional para eventos empresariales.",
            categoria: "Corporativos",
            calificacion: "4.7",
            imagen:
                "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80"
        }
    ];


    // =========================================
    // CATEGORÍAS
    // =========================================

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


    // =========================================
    // FAVORITOS
    // =========================================

    const [favoritos, setFavoritos] = useState([]);


    const toggleFavorito = (id) => {

        setFavoritos((favoritosActuales) => {

            if (favoritosActuales.includes(id)) {

                return favoritosActuales.filter(
                    (favorito) => favorito !== id
                );

            }

            return [...favoritosActuales, id];

        });
    };


    return (

        <div className="app">

            {/* =========================================
                NAVBAR
            ========================================= */}

            <nav className="navbar navbar-expand-lg navbar-tuevento sticky-top">

                <div className="container">

                    <Link
                        className="navbar-brand logo"
                        to="/"
                    >
                        Tu<span>Evento</span>
                    </Link>


                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTuEvento"
                        aria-controls="navbarTuEvento"
                        aria-expanded="false"
                        aria-label="Mostrar navegación"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div
                        className="collapse navbar-collapse"
                        id="navbarTuEvento"
                    >

                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    to="/"
                                >
                                    Inicio
                                </Link>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#empresas"
                                >
                                    Empresas
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#categorias"
                                >
                                    Categorías
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#nosotros"
                                >
                                    Nosotros
                                </a>
                            </li>

                        </ul>


                        <div className="navbar-buttons d-flex gap-2">

                            <Link
                                to="/login"
                                className="btn-login"
                            >
                                Iniciar sesión
                            </Link>

                            <Link
                                to="/registro"
                                className="btn-register"
                            >
                                Registrarse
                            </Link>

                        </div>

                    </div>

                </div>

            </nav>


            {/* =========================================
                HERO
            ========================================= */}

            <section className="hero">

                <div className="container">

                    <div className="row align-items-center hero-row">

                        <div className="col-lg-6">

                            <div className="hero-label">
                                ✨ TU EVENTO, A TU MANERA
                            </div>


                            <h1>
                                Encuentra la empresa perfecta
                                <span> para tu evento</span>
                            </h1>


                            <p>
                                Descubre empresas especializadas en eventos,
                                compara sus servicios y encuentra todo lo que
                                necesitas para crear momentos inolvidables.
                            </p>


                            <div className="hero-buttons">

                                <a
                                    href="#empresas"
                                    className="btn-main"
                                >
                                    Explorar empresas
                                    <span>→</span>
                                </a>


                                <a
                                    href="#categorias"
                                    className="btn-outline"
                                >
                                    Ver categorías
                                </a>

                            </div>


                            <div className="hero-stats">

                                <div>
                                    <strong>+100</strong>
                                    <span>Empresas</span>
                                </div>

                                <div>
                                    <strong>+500</strong>
                                    <span>Servicios</span>
                                </div>

                                <div>
                                    <strong>+1.000</strong>
                                    <span>Eventos</span>
                                </div>

                            </div>

                        </div>


                        {/* HERO VISUAL */}

                        <div className="col-lg-6">

                            <div className="hero-visual">

                                <div className="hero-photo-main">

                                    <img
                                        src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80"
                                        alt="Decoración de evento"
                                    />

                                    <div className="hero-photo-overlay">

                                        <span>
                                            ✨ Evento destacado
                                        </span>

                                        <strong>
                                            Momentos inolvidables
                                        </strong>

                                    </div>

                                </div>


                                <div className="floating-card card-one">

                                    <span>🎉</span>

                                    <div>
                                        <strong>Eventos</strong>
                                        <small>Inolvidables</small>
                                    </div>

                                </div>


                                <div className="floating-card card-two">

                                    <span>⭐</span>

                                    <div>
                                        <strong>4.9/5</strong>
                                        <small>Calificación</small>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================
                CATEGORÍAS
            ========================================= */}

            <section
                className="categorias-section"
                id="categorias"
            >

                <div className="container">

                    <div className="section-header centered">

                        <span className="section-label">
                            EXPLORA
                        </span>

                        <h2>
                            ¿Qué tipo de evento estás planeando?
                        </h2>

                        <p>
                            Encuentra empresas y servicios especializados
                            para cada ocasión.
                        </p>

                    </div>


                    <div className="row g-3">

                        {categorias.map((categoria, index) => (

                            <div
                                className="col-6 col-md-4 col-lg-3"
                                key={index}
                            >

                                <button className="categoria-card">

                                    <div className="categoria-icon">
                                        {categoria.icono}
                                    </div>

                                    <span>
                                        {categoria.nombre}
                                    </span>

                                    <small>
                                        Explorar →
                                    </small>

                                </button>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* =========================================
                EMPRESAS
            ========================================= */}

            <section
                className="empresas-section"
                id="empresas"
            >

                <div className="container">

                    <div className="section-header">

                        <div>

                            <span className="section-label">
                                DESCUBRE
                            </span>

                            <h2>
                                Empresas destacadas
                            </h2>

                            <p>
                                Encuentra profesionales que pueden hacer
                                realidad el evento que tienes en mente.
                            </p>

                        </div>


                        <button className="see-all">
                            Ver todas →
                        </button>

                    </div>


                    <div className="row g-4">

                        {empresas.map((empresa) => {

                            const esFavorito =
                                favoritos.includes(empresa.id);


                            return (

                                <div
                                    className="col-md-6 col-lg-4"
                                    key={empresa.id}
                                >

                                    <div className="empresa-card">

                                        {/* FOTO */}

                                        <div className="empresa-image">

                                            <img
                                                src={empresa.imagen}
                                                alt={empresa.nombre}
                                            />


                                            <div className="empresa-image-gradient"></div>


                                            <span className="empresa-category">
                                                {empresa.categoria}
                                            </span>


                                            {/* FAVORITO */}

                                            <button
                                                className={`favorite-button ${
                                                    esFavorito
                                                        ? "favorite-active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    toggleFavorito(
                                                        empresa.id
                                                    )
                                                }
                                                aria-label={
                                                    esFavorito
                                                        ? "Quitar de favoritos"
                                                        : "Agregar a favoritos"
                                                }
                                            >
                                                {esFavorito ? "♥" : "♡"}
                                            </button>

                                        </div>


                                        {/* INFORMACIÓN */}

                                        <div className="empresa-content">

                                            <div className="empresa-title-row">

                                                <h3>
                                                    {empresa.nombre}
                                                </h3>

                                                <span className="rating">
                                                    ⭐ {empresa.calificacion}
                                                </span>

                                            </div>


                                            <p className="empresa-location">
                                                📍 {empresa.ciudad}
                                            </p>


                                            <p className="empresa-description">
                                                {empresa.descripcion}
                                            </p>


                                            <div className="empresa-actions">

                                                <button className="btn-view">
                                                    Ver empresa
                                                </button>


                                                <button className="btn-reserve">
                                                    Reservar
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                </div>

            </section>


            {/* =========================================
                NOSOTROS
            ========================================= */}

            <section
                className="about-section"
                id="nosotros"
            >

                <div className="container">

                    <div className="about-box">

                        <div className="row align-items-center">

                            <div className="col-lg-7">

                                <span className="section-label">
                                    SOBRE TUEVENTO
                                </span>


                                <h2>
                                    Hacer realidad tu evento
                                    <span> nunca fue tan fácil.</span>
                                </h2>


                                <p>
                                    TuEvento conecta personas que quieren
                                    celebrar momentos especiales con empresas
                                    profesionales que ofrecen servicios para
                                    todo tipo de eventos.
                                </p>


                                <p>
                                    Compara opciones, descubre servicios y
                                    encuentra la empresa que mejor se adapte
                                    a lo que estás buscando.
                                </p>


                                <a
                                    href="#empresas"
                                    className="btn-main about-button"
                                >
                                    Explorar empresas →
                                </a>

                            </div>


                            <div className="col-lg-5">

                                <div className="about-visual">

                                    <div className="about-circle">
                                        💜
                                    </div>

                                    <div className="about-mini-card mini-one">
                                        🎂
                                    </div>

                                    <div className="about-mini-card mini-two">
                                        💍
                                    </div>

                                    <div className="about-mini-card mini-three">
                                        🎉
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================
                CTA
            ========================================= */}

            <section className="cta-section">

                <div className="container">

                    <div className="cta-box">

                        <div>

                            <span>
                                ¿LISTO PARA COMENZAR?
                            </span>

                            <h2>
                                Empieza a planear tu evento hoy.
                            </h2>

                            <p>
                                Regístrate y descubre empresas y servicios
                                para hacer realidad tus ideas.
                            </p>

                        </div>


                        <Link
                            to="/registro"
                            className="cta-button"
                        >
                            Crear mi cuenta →
                        </Link>

                    </div>

                </div>

            </section>


            {/* =========================================
                FOOTER
            ========================================= */}

            <footer className="footer">

                <div className="container">

                    <div className="row gy-4">

                        <div className="col-lg-5">

                            <div className="footer-logo">
                                Tu<span>Evento</span>
                            </div>

                            <p>
                                Conectamos tus ideas con las empresas que
                                pueden hacerlas realidad.
                            </p>

                        </div>


                        <div className="col-6 col-lg-2">

                            <h5>TuEvento</h5>

                            <a href="#">
                                Inicio
                            </a>

                            <a href="#empresas">
                                Empresas
                            </a>

                            <a href="#categorias">
                                Categorías
                            </a>

                        </div>


                        <div className="col-6 col-lg-2">

                            <h5>Ayuda</h5>

                            <a href="#">
                                Preguntas frecuentes
                            </a>

                            <a href="#">
                                Contacto
                            </a>

                            <a href="#">
                                Términos
                            </a>

                        </div>


                        <div className="col-lg-3">

                            <h5>Síguenos</h5>

                            <div className="social-buttons">

                                <button>
                                    f
                                </button>

                                <button>
                                    ◎
                                </button>

                                <button>
                                    in
                                </button>

                            </div>

                        </div>

                    </div>


                    <hr />


                    <div className="footer-bottom">

                        <span>
                            © 2026 TuEvento. Todos los derechos reservados.
                        </span>

                        <span>
                            Hecho para crear momentos increíbles 💜
                        </span>

                    </div>

                </div>

            </footer>

        </div>
    );
}

export default App;