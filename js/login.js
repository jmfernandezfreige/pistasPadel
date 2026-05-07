const API_LOGIN = "http://localhost:8080/pistaPadel/auth/login";

const form = document.getElementById("formulario-login");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    iniciarSesion(event);
});

async function iniciarSesion(event) {
    const formData = new FormData(form);

    const correo = formData.get("correo");
    const contrasena = formData.get("contrasena");

    //Parámetros que necesita nuestra clase seguridad para el login
    const parametros = new URLSearchParams();
    parametros.append("username", correo);
    parametros.append("password", contrasena);

    try {
        const respuesta = await fetch(API_LOGIN, {
            method: 'POST',
            mode: 'cors',
            body: parametros,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include'
        });

        if (respuesta.ok) {
            console.log("Inicio de sesión exitoso")
            window.location.href = "index.html";
        } else {
            console.log("Credenciales incorrectos");
            //form.innerHTML +=  '<p class="aviso-form">Usuario y/o contraseña incorrectos</p>';
        }
    } catch (error) {
        console.log("Error inesperado: ", error);
        //form.innerHTML +=  '<p class="aviso-form">Usuario y/o contraseña incorrectos</p>';
    }
    
}