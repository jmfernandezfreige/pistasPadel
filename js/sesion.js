const API = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", cargarSesion);

async function cargarSesion() {
    const contenedor = document.getElementById("contenedor-sesion");

    const token = localStorage.getItem('token');

    if (!token) {
        pintarMenuNoLogueado(contenedor);
        localStorage.removeItem('rol');
        return;
    }

    try {
        const respuesta = await fetch(`${API}/pistaPadel/auth/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': "Basic " + token
            },
        });

        if (!respuesta.ok) {
            localStorage.removeItem('token');
            pintarMenuNoLogueado(contenedor);
            return;
        }

        const textoCrudo = await respuesta.text();
        
        let usuario;
        try {
            usuario = JSON.parse(textoCrudo);
        } catch (e) {
            pintarMenuNoLogueado(contenedor);
            return;
        }

        const rol = usuario.rol?.nombreRol;
        localStorage.setItem('rol', rol);

        if (rol === "ADMIN") {
            pintarMenuAdmin(contenedor);
        } else {
            pintarMenuUsuario(contenedor, usuario);
        }

    } catch (error) {
        console.error("Error cargando sesión:", error);
        pintarMenuNoLogueado(contenedor);
    }
}

function pintarMenuNoLogueado(contenedor) {
    contenedor.innerHTML = `
        <div class="registro-login">
            <a href="registro.html" class="btn btn-claro">Registrarse</a>
            <a href="login.html" class="btn btn-relleno">Iniciar sesión</a>
        </div>
    `;
}

function pintarMenuUsuario(contenedor, usuario) {
    contenedor.innerHTML = `
        <div class="menu-usuario">
            <button class="btn btn-claro usuario-activador">
                Hola, ${usuario.nombre}
            </button>

            <div class="desplegable-usuario">
                <a href="usuario_detalle.html">Mis datos</a>
                <a href="usuario_reservas.html">Mis reservas</a>
                <a href="usuario_reserva_nueva.html">Nueva reserva</a>
                <a href="#" class="cerrar-sesion">Cerrar Sesión</a>
            </div>
        </div>
    `;

    activarLogout();
}

function pintarMenuAdmin(contenedor) {
    contenedor.innerHTML = `
        <div class="menu-usuario">
            <button class="btn btn-claro usuario-activador">
                Hola, ADMINISTRADOR
            </button>

            <div class="desplegable-usuario">
                <a href="admin_usuario_detalle.html">Mis datos</a>
                <a href="admin_usuarios.html">Gestionar Usuarios</a>
                <a href="admin_pistas.html">Gestionar Pistas</a>
                <a href="admin_reservas.html">Gestionar Reservas</a>
                <a href="#" class="cerrar-sesion">Cerrar Sesión</a>
            </div>
        </div>
    `;

    activarLogout();
}

function activarLogout() {
    const botonCerrarSesion = document.querySelector(".cerrar-sesion");

    botonCerrarSesion.addEventListener("click", async function (event) {
        event.preventDefault();

        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        fetch(`${API}/pistaPadel/auth/logout`, { method: "POST" });

        window.location.href = "index.html";
    });
}