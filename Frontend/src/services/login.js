document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.querySelector("form");
    const tipoUsuario = document.getElementById("tipoUsuario");

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const usuario = tipoUsuario.value;

        if (usuario === "") {
            alert("Por favor, seleccione un tipo de usuario.");
            return;
        }

        if (usuario === "cliente") {
            window.location.href = "home_cliente.html";
        }

        else if (usuario === "empresa") {
            window.location.href = "home_empresa.html";
        }

        else if (usuario === "administrador") {
            window.location.href = "home_admin.html";
        }

    });

});