const API_REGISTRO = "http://localhost:8080/pistaPadel/auth/register"

const form = document.getElementById("formulario-registro");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    registrarUsuario(event);
});

async function registrarUsuario(event) {
    const formData = new FormData(form);

    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password != confirmPassword) {
        alert("Las contraseñas no coinciden")
        return
    }

    const nombre = formData.get("nombre");
    const appellido = formData.get("apellido");
    const email = formData.get("email");
    const telefono = formData.get("telefono");

    try {
        const respuesta = await fetch(API_REGISTRO, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                appellidos: appellido,
                email: email,
                password: password,
                telefono: telefono,
                fechaRegistro: Date.now(),
                rol: { idRol: 2 },
                activo: true
            })
        });

        if (respuesta.ok) {
            console.log("Usuario registrado con éxito, inicie sesión ahora")
            window.location.href = "login.html"
        } else {
            console.log("Registro fallido");
            form.innerHTML += '<p class="aviso-form">Registro fallido, pruebe de nuevo</p>';
        }
    } catch (error) {
        console.error('Error inesperado: ', error);
        form.innerHTML += '<p class="aviso-form">Registro fallido por un error inesperado</p>';
    }
}