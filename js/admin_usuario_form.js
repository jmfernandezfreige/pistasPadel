const API_USUARIOS = "http://localhost:8080/pistaPadel/users";
const API_AUTH = "http://localhost:8080/pistaPadel/auth";

console.log("admin_usuario_form.js cargado correctamente");

let usuarioOriginal = null;

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    const rolUsuarioLogueado = localStorage.getItem("rol"); // Obtenemos quién está mirando la pantalla
    const formulario = document.querySelector(".formulario-admin-pista");

    const parametrosURL = new URLSearchParams(window.location.search);
    const idUsuario = parametrosURL.get("id");

    // Si es USER y no hay ID, lo echamos
    if (rolUsuarioLogueado === "USER" && !idUsuario) {
        alert("No tienes permisos para crear usuarios nuevos.");
        window.location.href = "index.html";
        return;
    }

    const inputContrasena = document.getElementById("contrasena");
    const inputConfirmar = document.getElementById("confirmarContrasena");
    const inputRol = document.getElementById("rol");
    const inputEstado = document.getElementById("estado");

    // Se ocultamos Rol y Estado si es un usuario normal
    if (rolUsuarioLogueado === "USER") {
        inputRol.closest(".grupo-formulario").style.display = "none";
        inputEstado.closest(".grupo-formulario").style.display = "none";
    }

    // MODO EDICIÓN
    if (idUsuario) {
        
        // Texto según rol
        if (rolUsuarioLogueado === "USER") {
            document.querySelector("h1").textContent = "Mis datos personales";
            document.querySelector(".descripcion-admin-pista").textContent = "Actualiza tu información personal y de contacto.";
        } else {
            document.querySelector("h1").textContent = "Modificar usuario";
            document.querySelector(".descripcion-admin-pista").textContent = "Actualiza los datos del usuario seleccionado.";
        }
        
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

                document.getElementById("nombre").value = usuario.nombre;
                document.getElementById("apellidos").value = usuario.apellidos;
                document.getElementById("email").value = usuario.email;
                document.getElementById("telefono").value = usuario.telefono;

                if (usuario.rol) {
                    inputRol.value = usuario.rol.nombreRol;
                }
                inputEstado.value = usuario.activo.toString();

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
        
        let rolSeleccionado = inputRol.value;
        let activo = inputEstado.value === "true";

        // Si es un usuario normal, forzamos que se envíe 
        // lo que ya tenía originalmente (por si modifica el HTML para hacerse admin)
        if (rolUsuarioLogueado === "USER" && usuarioOriginal) {
            rolSeleccionado = usuarioOriginal.rol.nombreRol;
            activo = usuarioOriginal.activo;
        }

        if (!nombre || !apellidos || !email || !telefono) {
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

        if (!idUsuario) {
            usuarioData.password = contrasena;
        }

        if (idUsuario) {
            usuarioData.password = contrasena ? contrasena : usuarioOriginal.password;
            usuarioData.fechaRegistro = usuarioOriginal.fechaRegistro;
        }

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
                throw new Error("Error al procesar la petición con el servidor");
            }

            alert(idUsuario ? "Datos modificados correctamente" : "Usuario creado correctamente");
            
            // Si es admin va al listado, si es usuario va al inicio
            if (rolUsuarioLogueado === "USER") {
                window.location.href = "index.html"; 
            } else {
                window.location.href = "admin_usuarios.html";
            }

        } catch (error) {
            console.error("Error al guardar usuario:", error);
            alert("No se pudo guardar la información.");
        }
    });
});