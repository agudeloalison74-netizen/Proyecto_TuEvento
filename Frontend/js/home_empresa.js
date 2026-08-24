/* =========================================================
   TUEVENTO - HOME EMPRESA
   Versión visual con datos de prueba.
   Posteriormente se conectará con FastAPI.
========================================================= */


/* =========================================================
   DATOS DE PRUEBA
========================================================= */

let solicitudes = [

    {
        id: 1,
        cliente: "Cliente 1",
        evento: "Cumpleaños",
        fecha: "25/08/2026",
        lugar: "Bogotá",
        estado: "Pendiente"
    },

    {
        id: 2,
        cliente: "Cliente 2",
        evento: "Boda",
        fecha: "12/09/2026",
        lugar: "Bogotá",
        estado: "Pendiente"
    },

    {
        id: 3,
        cliente: "Cliente 3",
        evento: "Evento corporativo",
        fecha: "20/09/2026",
        lugar: "Bogotá",
        estado: "Aceptada"
    }

];


let servicios = [

    {
        id: 1,
        nombre: "Decoración de eventos",
        categoria: "Decoración",
        descripcion: "Decoración y ambientación personalizada para todo tipo de eventos.",
        precio: "$800.000",
        imagen: "../../img/evento1.jpg"
    },

    {
        id: 2,
        nombre: "Organización de bodas",
        categoria: "Bodas",
        descripcion: "Planeación y organización integral de bodas y celebraciones.",
        precio: "$1.500.000",
        imagen: "../../img/evento2.jpg"
    },

    {
        id: 3,
        nombre: "Eventos corporativos",
        categoria: "Corporativo",
        descripcion: "Planeación de eventos empresariales, reuniones y celebraciones.",
        precio: "$900.000",
        imagen: "../../img/evento3.jpg"
    },

    {
        id: 4,
        nombre: "Fiestas infantiles",
        categoria: "Infantil",
        descripcion: "Organización de fiestas infantiles con decoración y entretenimiento.",
        precio: "$650.000",
        imagen: "../../img/evento4.jpg"
    },

    {
        id: 5,
        nombre: "Eventos sociales",
        categoria: "Social",
        descripcion: "Organización de cumpleaños, aniversarios y celebraciones especiales.",
        precio: "$750.000",
        imagen: "../../img/evento5.jpg"
    },

    {
        id: 6,
        nombre: "Ambientación especial",
        categoria: "Ambientación",
        descripcion: "Diseño de espacios y ambientación temática para eventos.",
        precio: "$600.000",
        imagen: "../../img/evento6.jpg"
    }

];


let mensajes = [

    {
        id: 1,
        cliente: "Cliente 1",
        mensaje: "Hola, quisiera conocer más información sobre el servicio.",
        fecha: "Hoy"
    },

    {
        id: 2,
        cliente: "Cliente 2",
        mensaje: "¿El servicio de decoración está incluido?",
        fecha: "Ayer"
    },

    {
        id: 3,
        cliente: "Cliente 3",
        mensaje: "Me gustaría recibir una cotización para un evento.",
        fecha: "Hace 2 días"
    }

];


/* =========================================================
   ELEMENTOS
========================================================= */

const requestList =
    document.getElementById("requestList");

const serviceGrid =
    document.getElementById("serviceGrid");

const messageList =
    document.getElementById("messageList");

const userButton =
    document.getElementById("userButton");

const userMenu =
    document.getElementById("userMenu");

const logoutButton =
    document.getElementById("logoutButton");

const addServiceButton =
    document.getElementById("addServiceButton");

const addServiceHero =
    document.getElementById("addServiceHero");

const quickService =
    document.getElementById("quickService");

const editProfileButton =
    document.getElementById("editProfileButton");

const editProfileButton2 =
    document.getElementById("editProfileButton2");

const subscriptionButton =
    document.getElementById("subscriptionButton");


/* =========================================================
   MODALES
========================================================= */

const serviceModal =
    document.getElementById("serviceModal");

const profileModal =
    document.getElementById("profileModal");

const closeServiceModal =
    document.getElementById("closeServiceModal");

const cancelService =
    document.getElementById("cancelService");

const closeProfileModal =
    document.getElementById("closeProfileModal");

const cancelProfile =
    document.getElementById("cancelProfile");


/* =========================================================
   MOSTRAR SOLICITUDES
========================================================= */

function mostrarSolicitudes() {

    requestList.innerHTML = "";

    solicitudes.forEach(solicitud => {

        const card =
            document.createElement("article");

        card.className = "request-card";


        let estadoClase = "pending";

        if (solicitud.estado === "Aceptada") {

            estadoClase = "accepted";

        }

        if (solicitud.estado === "Rechazada") {

            estadoClase = "rejected";

        }


        card.innerHTML = `

            <div class="request-icon">

                <i class="fa-solid fa-calendar-days"></i>

            </div>


            <div class="request-info">

                <h3>
                    ${solicitud.evento}
                </h3>

                <p>
                    ${solicitud.cliente}
                    · ${solicitud.fecha}
                    · ${solicitud.lugar}
                </p>

            </div>


            <span class="request-status ${estadoClase}">
                ${solicitud.estado}
            </span>


            ${
                solicitud.estado === "Pendiente"
                ?
                `

                <div class="request-actions">

                    <button
                        class="accept-button"
                        onclick="aceptarSolicitud(${solicitud.id})">

                        Aceptar

                    </button>


                    <button
                        class="reject-button"
                        onclick="rechazarSolicitud(${solicitud.id})">

                        Rechazar

                    </button>

                </div>

                `
                :
                ""
            }

        `;


        requestList.appendChild(card);

    });

}


/* =========================================================
   ACEPTAR SOLICITUD
========================================================= */

function aceptarSolicitud(id) {

    const solicitud =
        solicitudes.find(
            item => item.id === id
        );


    if (!solicitud) return;


    solicitud.estado = "Aceptada";


    mostrarSolicitudes();


    alert(
        "La solicitud fue aceptada correctamente."
    );

}


/* =========================================================
   RECHAZAR SOLICITUD
========================================================= */

function rechazarSolicitud(id) {

    const solicitud =
        solicitudes.find(
            item => item.id === id
        );


    if (!solicitud) return;


    const confirmar =
        confirm(
            "¿Deseas rechazar esta solicitud?"
        );


    if (!confirmar) return;


    solicitud.estado = "Rechazada";


    mostrarSolicitudes();


    alert(
        "La solicitud fue rechazada."
    );

}


/* =========================================================
   MOSTRAR SERVICIOS
========================================================= */

function mostrarServicios() {

    serviceGrid.innerHTML = "";


    servicios.forEach(servicio => {

        const card =
            document.createElement("article");

        card.className = "service-card";


        card.innerHTML = `

            <div class="service-image">

                <img
                    src="${servicio.imagen}"
                    alt="${servicio.nombre}">

                <span class="service-category">
                    ${servicio.categoria}
                </span>

            </div>


            <div class="service-body">

                <h3>
                    ${servicio.nombre}
                </h3>


                <p>
                    ${servicio.descripcion}
                </p>


                <div class="service-footer">

                    <span class="service-price">
                        ${servicio.precio}
                    </span>


                    <div class="service-actions">

                        <button
                            title="Editar"
                            onclick="editarServicio(${servicio.id})">

                            <i class="fa-solid fa-pen"></i>

                        </button>


                        <button
                            title="Eliminar"
                            onclick="eliminarServicio(${servicio.id})">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </div>

            </div>

        `;


        serviceGrid.appendChild(card);

    });


    actualizarContadorServicios();

}


/* =========================================================
   CONTADOR SERVICIOS
========================================================= */

function actualizarContadorServicios() {

    const contador =
        document.getElementById("serviceCount");


    if (contador) {

        contador.textContent =
            servicios.length;

    }

}


/* =========================================================
   ABRIR MODAL SERVICIO
========================================================= */

function abrirModalServicio() {

    serviceModal.classList.add("show");

}


/* =========================================================
   CERRAR MODAL SERVICIO
========================================================= */

function cerrarModalServicio() {

    serviceModal.classList.remove("show");

}


/* =========================================================
   BOTONES SERVICIO
========================================================= */

addServiceButton.addEventListener(
    "click",
    abrirModalServicio
);


addServiceHero.addEventListener(
    "click",
    abrirModalServicio
);


quickService.addEventListener(
    "click",
    abrirModalServicio
);


closeServiceModal.addEventListener(
    "click",
    cerrarModalServicio
);


cancelService.addEventListener(
    "click",
    cerrarModalServicio
);


/* =========================================================
   CREAR SERVICIO
========================================================= */

document
    .getElementById("serviceForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nombre =
                document.getElementById(
                    "serviceName"
                ).value;


            const descripcion =
                document.getElementById(
                    "serviceDescription"
                ).value;


            const precio =
                document.getElementById(
                    "servicePrice"
                ).value;


            const nuevoServicio = {

                id: Date.now(),

                nombre: nombre,

                categoria: "Nuevo servicio",

                descripcion: descripcion,

                precio: precio,

                imagen: "../../img/evento6.jpg"

            };


            servicios.push(
                nuevoServicio
            );


            mostrarServicios();


            document
                .getElementById("serviceForm")
                .reset();


            cerrarModalServicio();


            alert(
                "El servicio fue agregado correctamente."
            );

        }
    );


/* =========================================================
   EDITAR SERVICIO
========================================================= */

function editarServicio(id) {

    const servicio =
        servicios.find(
            item => item.id === id
        );


    if (!servicio) return;


    const nuevoNombre =
        prompt(
            "Nombre del servicio:",
            servicio.nombre
        );


    if (!nuevoNombre) return;


    servicio.nombre =
        nuevoNombre;


    mostrarServicios();

}


/* =========================================================
   ELIMINAR SERVICIO
========================================================= */

function eliminarServicio(id) {

    const confirmar =
        confirm(
            "¿Deseas eliminar este servicio?"
        );


    if (!confirmar) return;


    servicios =
        servicios.filter(
            servicio => servicio.id !== id
        );


    mostrarServicios();


    alert(
        "El servicio fue eliminado."
    );

}


/* =========================================================
   MOSTRAR MENSAJES
========================================================= */

function mostrarMensajes() {

    messageList.innerHTML = "";


    mensajes.forEach(mensaje => {

        const card =
            document.createElement("article");

        card.className = "message-card";


        card.innerHTML = `

            <div class="message-avatar">

                ${mensaje.cliente.charAt(0)}

            </div>


            <div class="message-content">

                <strong>
                    ${mensaje.cliente}
                </strong>


                <small>
                    ${mensaje.fecha}
                </small>


                <p>
                    ${mensaje.mensaje}
                </p>


                <button
                    class="reply-button"
                    onclick="responderMensaje(${mensaje.id})">

                    Responder

                </button>

            </div>

        `;


        messageList.appendChild(card);

    });

}


/* =========================================================
   RESPONDER MENSAJE
========================================================= */

function responderMensaje(id) {

    const mensaje =
        mensajes.find(
            item => item.id === id
        );


    if (!mensaje) return;


    const respuesta =
        prompt(
            `Responder a ${mensaje.cliente}:`
        );


    if (!respuesta) return;


    alert(
        "Mensaje preparado correctamente. " +
        "Posteriormente se enviará mediante FastAPI."
    );

}


/* =========================================================
   MENÚ USUARIO
========================================================= */

userButton.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();

        userMenu.classList.toggle("show");

    }
);


document.addEventListener(
    "click",
    function(event) {

        if (
            !userMenu.contains(event.target) &&
            !userButton.contains(event.target)
        ) {

            userMenu.classList.remove("show");

        }

    }
);


/* =========================================================
   PERFIL
========================================================= */

function abrirPerfil() {

    profileModal.classList.add("show");

}


function cerrarPerfil() {

    profileModal.classList.remove("show");

}


editProfileButton.addEventListener(
    "click",
    abrirPerfil
);


editProfileButton2.addEventListener(
    "click",
    abrirPerfil
);


closeProfileModal.addEventListener(
    "click",
    cerrarPerfil
);


cancelProfile.addEventListener(
    "click",
    cerrarPerfil
);


/* =========================================================
   GUARDAR PERFIL
========================================================= */

document
    .getElementById("profileForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nombre =
                document.getElementById(
                    "profileCompanyName"
                ).value;


            document
                .getElementById(
                    "companyName"
                )
                .textContent = nombre;


            document
                .getElementById(
                    "welcomeCompany"
                )
                .textContent = nombre;


            cerrarPerfil();


            alert(
                "La información empresarial fue actualizada."
            );

        }
    );


/* =========================================================
   SUSCRIPCIÓN
========================================================= */

subscriptionButton.addEventListener(
    "click",
    function() {

        alert(
            "Aquí posteriormente se conectará " +
            "el proceso de suscripción y pago."
        );

    }
);


/* =========================================================
   NOTIFICACIONES
========================================================= */

document
    .getElementById("notificationButton")
    .addEventListener(
        "click",
        function() {

            alert(
                "Tienes 3 notificaciones nuevas."
            );

        }
    );


/* =========================================================
   RECOMENDACIONES
========================================================= */

document
    .getElementById("recommendationButton")
    .addEventListener(
        "click",
        function() {

            alert(
                "Recomendaciones:\n\n" +
                "• Agrega más fotografías.\n" +
                "• Publica nuevos servicios.\n" +
                "• Completa la información empresarial.\n" +
                "• Mantén actualizados tus precios."
            );

        }
    );


/* =========================================================
   CERRAR SESIÓN
========================================================= */

logoutButton.addEventListener(
    "click",
    function() {

        const confirmar =
            confirm(
                "¿Deseas cerrar sesión?"
            );


        if (!confirmar) return;


        localStorage.removeItem(
            "usuario"
        );

        localStorage.removeItem(
            "token"
        );


        window.location.href =
            "login.html";

    }
);


/* =========================================================
   CERRAR MODALES AL HACER CLICK AFUERA
========================================================= */

window.addEventListener(
    "click",
    function(event) {

        if (event.target === serviceModal) {

            cerrarModalServicio();

        }


        if (event.target === profileModal) {

            cerrarPerfil();

        }

    }
);


/* =========================================================
   INICIO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        mostrarSolicitudes();

        mostrarServicios();

        mostrarMensajes();

        actualizarContadorServicios();

    }
);