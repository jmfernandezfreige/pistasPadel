document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token');
    const formulario = document.querySelector(".formulario-admin-pista");

    const parametrosURL = new URLSearchParams(window.location.search);
    const idUsuario = parametrosURL.get("id");

    const inputContrasena = document.getElementById("contrasena");
    const inputConfirmar = document.getElementById("confirmarContrasena");

    const respuestaMe = await fetch(`${API}/pistaPadel/auth/me`, {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Authorization": "Basic " + token
    }
    });

    const usuarioLogueado = await respuestaMe.json();
    const esAdmin = usuarioLogueado.rol?.nombreRol === "ADMIN";

    const bloqueRol = document.getElementById("rol").closest(".grupo-formulario");
    const bloqueEstado = document.getElementById("estado").closest(".grupo-formulario");

    if (!esAdmin) {
        bloqueRol.remove();
        bloqueEstado.remove();
    }

    // MODO EDICIÓN - PATCH
    if (idUsuario) {
        document.querySelector("h1").textContent = "Modificar usuario";
        document.querySelector(".descripcion-admin-pista").textContent = "Actualiza los datos del usuario seleccionado.";
        document.querySelector(".boton-formulario").textContent = "Guardar cambios";

        inputContrasena.removeAttribute("required");
        inputConfirmar.removeAttribute("required");

        try {
            const respuesta = await fetch(`${API}/pistaPadel/users/${idUsuario}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Basic ' + token
                }
            });
            
            if (respuesta.ok) {
                const usuario = await respuesta.json();

                // Se rellena el formulario con el usuario que se quiere modificar
                document.getElementById("nombre").value = usuario.nombre;
                document.getElementById("apellidos").value = usuario.apellidos;
                document.getElementById("email").value = usuario.email;
                document.getElementById("telefono").value = usuario.telefono;
                
                // Si tienes rol.nombre o rol.id, ajusta aquí. Suponemos que devuelve algo como "ADMIN" en su propiedad 'nombre'.
                // Si la base de datos devuelve directamente la enumeración/nombre, ajústalo según el JSON que devuelve.
                if (usuario.rol) {
                     document.getElementById("rol").value = usuario.rol.nombreRol || usuario.rol; 
                }
                
                document.getElementById("estado").value = usuario.activo.toString();
            } else {
                alert("Error al cargar los datos del usuario.");
            }
        } catch (error) {
            console.error("Error al cargar el usuario: ", error);
        }
    }

    // MODO CREACIÓN / GUARDAR CAMBIOS
    formulario.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const email = document.getElementById("email").value.trim();
        const contrasena = inputContrasena.value;
        const confirmarContrasena = inputConfirmar.value;
        const telefono = document.getElementById("telefono").value.trim();
        const rolSeleccionado = esAdmin ? document.getElementById("rol").value : usuarioLogueado.rol?.nombreRol;
        const activa = esAdmin ? document.getElementById("estado").value === "true" : usuarioLogueado.activo;

        if (contrasena && contrasena !== confirmarContrasena) {
            alert("Las contraseñas no coinciden. Por favor, revísalas.");
            return;
        }

        // Construimos el objeto EXACTAMENTE como lo espera la entidad Java
        const usuarioData = {
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            telefono: telefono,
            activo: activa
        };

        // En Java el campo se llama "password", por lo que la clave del JSON debe ser esa
        if (contrasena) {
            usuarioData.password = contrasena;
        }

        // --- GESTIÓN DEL ROL ---
        // Como 'Rol' es @ManyToOne, enviamos un objeto.
        // Si tu backend falla porque espera un ID, cambia esto a: { id: (rolSeleccionado === "ADMIN" ? 1 : 2) } 
        // asumiendo los IDs de tu tabla Rol.
        usuarioData.rol = { nombreRol: rolSeleccionado };

        const url = idUsuario ? `${API}/users/${idUsuario}` : `${API}/auth/register`;
        const metodo = idUsuario ? 'PATCH' : 'POST';

        try {
            const respuesta = await fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Basic ' + token
                },
                body: JSON.stringify(usuarioData)
            });

            if (!respuesta.ok) {
                // Si el backend lanza error de validación, lo capturamos
                throw new Error("Error al procesar la petición con el servidor");
            }

            alert(idUsuario ? "Usuario modificado correctamente" : "Usuario creado correctamente");
            formulario.reset();
            window.location.href = "admin_usuarios.html";

        } catch (error) {
            console.error(error);
            alert("No se pudo guardar el usuario. Revisa la consola para más detalles.");
        }
    });
});