const API_LOGIN = "http://localhost:8080/pistaPadel/auth/me";

const form = document.getElementById("formulario-login");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    iniciarSesion(event);
});

async function iniciarSesion(event) {
    const formData = new FormData(form);

    const correo = formData.get("correo");
    const contrasena = formData.get("contrasena");

    const credenciales = correo + ":" + contrasena;
    const tokenCreado = btoa(credenciales);

    try {
        const respuesta = await fetch(API_LOGIN, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + tokenCreado 
            }
        });

        if (respuesta.ok) {
            console.log("Inicio de sesión exitoso");

            localStorage.setItem('token', tokenCreado);

            window.location.href = "index.html";
        } else {
            console.log("Credenciales incorrectos");
            mostrarError();
        }
    } catch (error) {
        console.log("Error inesperado: ", error);
        mostrarError();
    }
}

function mostrarError() {
    const errorPrevio = document.querySelector(".aviso-form");
    if (errorPrevio) errorPrevio.remove();
    form.insertAdjacentHTML('beforeend', '<p class="aviso-form">Usuario y/o contraseña incorrectos</p>');
}