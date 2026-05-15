const API_USUARIOS = "http://localhost:8080/pistaPadel/users";
const API_AUTH = "http://localhost:8080/pistaPadel/auth";

console.log("admin_usuario_form.js cargado correctamente");

let usuarioOriginal = null;

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    const formulario = document.querySelector(".formulario-admin-pista");

    const parametrosURL = new URLSearchParams(window.location.search);
    const idUsuario = parametrosURL.get("id");

    const inputContrasena = document.getElementById("contrasena");
    const inputConfirmar = document.getElementById("confirmarContrasena");

    // MODO EDICIÓN
    if (idUsuario) {
        document.querySelector("h1").textContent = "Modificar usuario";
        document.querySelector(".descripcion-admin-pista").textContent = "Actualiza los datos del usuario seleccionado.";
        document.querySelector(".boton-formulario").textContent = "Guardar cambios";

        inputContrasena.removeAttribute("required");
        inputConfirmar.removeAttribute("required");

        try {
            const respuesta = await fetch(`${API_USUARIOS}/${idUsuario}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Basic " + token
                }
            });

            if (respuesta.ok) {
                const usuario = await respuesta.json();
                usuarioOriginal = usuario;

                console.log("Usuario cargado:", usuarioOriginal);

                document.getElementById("nombre").value = usuario.nombre;
                document.getElementById("apellidos").value = usuario.apellidos;
                document.getElementById("email").value = usuario.email;
                document.getElementById("telefono").value = usuario.telefono;

                if (usuario.rol) {
                    document.getElementById("rol").value = usuario.rol.nombreRol;
                }

                document.getElementById("estado").value = usuario.activo.toString();

            } else {
                alert("Error al cargar los datos del usuario.");
            }

        } catch (error) {
            console.error("Error al cargar el usuario:", error);
        }
    }

    // CREAR / GUARDAR CAMBIOS
    formulario.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const email = document.getElementById("email").value.trim();
        const contrasena = inputContrasena.value;
        const confirmarContrasena = inputConfirmar.value;
        const telefono = document.getElementById("telefono").value.trim();
        const rolSeleccionado = document.getElementById("rol").value;
        const activo = document.getElementById("estado").value === "true";

        if (!nombre || !apellidos || !email || !telefono || !rolSeleccionado) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        if (!idUsuario && !contrasena) {
            alert("La contraseña es obligatoria al crear un usuario.");
            return;
        }

        if (contrasena && contrasena !== confirmarContrasena) {
            alert("Las contraseñas no coinciden. Por favor, revísalas.");
            return;
        }

        const usuarioData = {
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            telefono: telefono,
            activo: activo,
            rol: {
                idRol: rolSeleccionado === "ADMIN" ? 2 : 1
            }
        };

        // Si estamos creando usuario, mandamos la contraseña escrita
        if (!idUsuario) {
            usuarioData.password = contrasena;
        }

        // Si estamos modificando usuario
        if (idUsuario) {
            // Si se escribe una contraseña nueva, usamos esa
            // Si no, mantenemos la contraseña original
            usuarioData.password = contrasena ? contrasena : usuarioOriginal.password;

            // El backend necesita fechaRegistro porque en actualizaUsuario() la vuelve a guardar
            usuarioData.fechaRegistro = usuarioOriginal.fechaRegistro;
        }

        console.log("Datos enviados al backend:", usuarioData);

        const url = idUsuario ? `${API_USUARIOS}/${idUsuario}` : `${API_AUTH}/register`;
        const metodo = idUsuario ? "PATCH" : "POST";

        try {
            const respuesta = await fetch(url, {
                method: metodo,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Basic " + token
                },
                body: JSON.stringify(usuarioData)
            });

            if (!respuesta.ok) {
                const errorTexto = await respuesta.text();
                console.error("Error del backend:", respuesta.status, errorTexto);
                throw new Error("Error al procesar la petición con el servidor");
            }

            alert(idUsuario ? "Usuario modificado correctamente" : "Usuario creado correctamente");
            formulario.reset();
            window.location.href = "admin_usuarios.html";

        } catch (error) {
            console.error("Error al guardar usuario:", error);
            alert("No se pudo guardar el usuario. Revisa la consola para más detalles.");
        }
    });
});