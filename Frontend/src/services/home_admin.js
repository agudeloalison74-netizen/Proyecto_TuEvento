/* =========================================================
   TUEVENTO
   HOME ADMINISTRADOR
========================================================= */


/* ================= ELEMENTOS ================= */

const userButton =
    document.getElementById("userButton");

const userMenu =
    document.getElementById("userMenu");

const logoutButton =
    document.getElementById("logoutButton");

const reportButton =
    document.getElementById("reportButton");

const categoryButton =
    document.getElementById("categoryButton");


/* =========================================================
   MENÚ DE ADMINISTRADOR
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
   SCROLL
========================================================= */

function irA(id) {

    const elemento =
        document.getElementById(id);

    if (!elemento) {
        return;
    }

    elemento.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   NOTIFICACIONES
========================================================= */

function mostrarNotificaciones() {

    alert(
        "🔔 NOTIFICACIONES\n\n" +

        "• 2 contenidos reportados\n" +
        "• 1 empresa pendiente de revisión\n" +
        "• 1 usuario pendiente\n\n" +

        "Aquí posteriormente se mostrarán " +
        "las notificaciones reales del sistema."
    );

}


/* =========================================================
   USUARIOS
========================================================= */

function gestionarUsuario(id) {

    const opcion =
        prompt(
            "GESTIÓN DE USUARIO\n\n" +

            "Usuario ID: #" + id + "\n\n" +

            "1. Bloquear usuario\n" +
            "2. Desbloquear usuario\n" +
            "3. Eliminar usuario\n" +
            "4. Ver información\n\n" +

            "Selecciona una opción:"
        );


    if (!opcion) {
        return;
    }


    if (opcion === "1") {

        alert(
            "✓ El usuario #" +
            id +
            " ha sido bloqueado."
        );

    }

    else if (opcion === "2") {

        alert(
            "✓ El usuario #" +
            id +
            " ha sido desbloqueado."
        );

    }

    else if (opcion === "3") {

        const confirmar =
            confirm(
                "¿Realmente deseas eliminar " +
                "el usuario #" + id + "?"
            );

        if (confirmar) {

            alert(
                "✓ Usuario eliminado correctamente."
            );

        }

    }

    else if (opcion === "4") {

        alert(
            "INFORMACIÓN DEL USUARIO\n\n" +

            "ID: #" + id + "\n" +
            "Rol: Usuario\n" +
            "Estado: Activo\n" +
            "Eventos registrados: 3\n" +
            "Fecha de registro: 2026"
        );

    }

    else {

        alert(
            "La opción seleccionada no es válida."
        );

    }

}


/* =========================================================
   MODERACIÓN
========================================================= */

function revisarResenas() {

    alert(
        "📝 RESEÑAS\n\n" +

        "Actualmente hay 12 reseñas " +
        "pendientes de supervisión.\n\n" +

        "Este módulo posteriormente " +
        "se conectará con FastAPI."
    );

}


function revisarImagenes() {

    alert(
        "🖼️ IMÁGENES\n\n" +

        "Actualmente hay 7 imágenes " +
        "pendientes de aprobación.\n\n" +

        "Aquí posteriormente aparecerá " +
        "la galería de moderación."
    );

}


function revisarContenido() {

    alert(
        "⚠️ CONTENIDO REPORTADO\n\n" +

        "Hay 4 elementos reportados " +
        "por usuarios.\n\n" +

        "Aquí posteriormente aparecerá " +
        "el listado para aprobar o rechazar."
    );

}


/* =========================================================
   REPORTES
========================================================= */

reportButton.addEventListener(
    "click",
    function() {

        const confirmar =
            confirm(
                "¿Deseas generar el reporte administrativo?"
            );


        if (!confirmar) {
            return;
        }


        alert(
            "✓ REPORTE GENERADO\n\n" +

            "El sistema preparará posteriormente " +
            "un archivo PDF o Excel con:\n\n" +

            "• Usuarios\n" +
            "• Empresas\n" +
            "• Servicios\n" +
            "• Eventos\n" +
            "• Actividad"
        );

    }
);


/* =========================================================
   CATEGORÍAS
========================================================= */

categoryButton.addEventListener(
    "click",
    function() {

        alert(
            "📂 CATEGORÍAS\n\n" +

            "Desde este módulo podrás:\n\n" +

            "• Crear categorías\n" +
            "• Modificar categorías\n" +
            "• Eliminar categorías\n" +
            "• Consultar servicios por categoría"
        );

    }
);


/* =========================================================
   SEGURIDAD
========================================================= */

function gestionarPermisos() {

    alert(
        "🔑 PERMISOS\n\n" +

        "Aquí posteriormente podrás " +
        "administrar los permisos de cada rol."
    );

}


function monitorearAccesos() {

    alert(
        "🕐 HISTORIAL DE ACCESOS\n\n" +

        "Aquí aparecerá posteriormente " +
        "el historial de accesos al sistema."
    );

}


function revisarSeguridad() {

    alert(
        "🛡️ SEGURIDAD\n\n" +

        "Estado actual: Sistema protegido\n" +
        "Nivel de seguridad: 98%\n\n" +

        "Aquí posteriormente se mostrarán " +
        "las configuraciones y alertas."
    );

}


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


        if (!confirmar) {
            return;
        }


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