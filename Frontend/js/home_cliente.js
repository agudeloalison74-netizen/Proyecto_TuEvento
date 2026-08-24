/* =====================================================
   TUEVENTO - HOME CLIENTE
   ===================================================== */


/* =====================================================
   PERFIL
   ===================================================== */

const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");

if (profileBtn) {

    profileBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        profileMenu.classList.toggle("show");

    });

}


/* Cerrar menú al hacer clic fuera */

document.addEventListener("click", function (event) {

    if (
        profileMenu &&
        !profileMenu.contains(event.target) &&
        !profileBtn.contains(event.target)
    ) {

        profileMenu.classList.remove("show");

    }

});


/* =====================================================
   CERRAR SESIÓN
   ===================================================== */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        const confirmar = confirm(
            "¿Estás segura de que quieres cerrar sesión?"
        );

        if (confirmar) {

            /*
                Por ahora no existe backend ni sesión real.

                Cuando conectemos Python/FastAPI,
                aquí podremos eliminar el token
                y redireccionar al login.
            */

            window.location.href = "login.html";

        }

    });

}


/* =====================================================
   CARRUSEL / CAMBIO DE IMAGEN DEL HERO
   ===================================================== */

const heroImage = document.getElementById("heroImage");

const heroImages = [
    "../../img/evento1.jpg",
    "../../img/evento2.jpg",
    "../../img/evento3.jpg",
    "../../img/evento4.jpg",
    "../../img/evento5.jpg",
    "../../img/evento6.jpg"
];

let currentImage = 0;

if (heroImage) {

    setInterval(function () {

        currentImage++;

        if (currentImage >= heroImages.length) {
            currentImage = 0;
        }

        heroImage.style.opacity = "0";

        setTimeout(function () {

            heroImage.src = heroImages[currentImage];

            heroImage.style.opacity = "1";

        }, 250);

    }, 5000);

}


/* =====================================================
   BUSCADOR
   ===================================================== */

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function realizarBusqueda() {

    if (!searchInput) {
        return;
    }

    const texto = searchInput.value.trim();

    if (texto === "") {

        alert(
            "Escribe algo para buscar empresas, servicios o eventos."
        );

        searchInput.focus();

        return;
    }

    /*
        Por ahora mostramos el mensaje.

        Después conectaremos esta búsqueda
        con el backend de Python/FastAPI.
    */

    alert(
        `Buscando opciones relacionadas con: "${texto}"`
    );

}


if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        realizarBusqueda
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "keypress",
        function (event) {

            if (event.key === "Enter") {

                realizarBusqueda();

            }

        }
    );

}


/* =====================================================
   CATEGORÍAS
   ===================================================== */

const categoryCards =
    document.querySelectorAll(".category-card");

categoryCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const category =
            card.getAttribute("data-category");

        /*
            Más adelante esto puede llevar
            a una página de resultados.

            Ejemplo:

            eventos.html?categoria=Bodas
        */

        alert(
            `Mostrando empresas y servicios para: ${category}`
        );

    });

});


/* =====================================================
   FAVORITOS
   ===================================================== */

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");

favoriteButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        if (button.textContent.trim() === "♡") {

            button.textContent = "♥";

            button.style.color = "#e05285";

        } else {

            button.textContent = "♡";

            button.style.color = "#6c2bd9";

        }

    });

});


/* =====================================================
   ANIMACIÓN AL HACER SCROLL
   ===================================================== */

const animatedElements =
    document.querySelectorAll(
        ".category-card, .company-card, .step, .gallery-card"
    );


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


animatedElements.forEach(function (element) {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});


/* =====================================================
   NAVEGACIÓN ACTIVA
   ===================================================== */

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        if (
            window.scrollY >= sectionTop
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (
            href === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});