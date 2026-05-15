const API_USUARIOS = "http://localhost:8080/pistaPadel/users";
const token = localStorage.getItem('token');

// Variable global para almacenar los usuarios y que el buscador funcione
let todosLosUsuarios = [];

// Inicializamos la carga y el buscador cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    cargarUsuarios();
    
    // Asignar el evento al buscador
    document.querySelector(".buscador").addEventListener("input", buscarUsuarios);
});

async function cargarUsuarios() {
    // Lo buscamos justo cuando lo necesitamos
    const tablaUsuarios = document.getElementById("listado-usuarios"); 
    
    try {
        const respuesta = await fetch(`${API_USUARIOS}?activo=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic ' + token
            }
        });

        if (respuesta.ok) {
            todosLosUsuarios = await respuesta.json();
            pintarUsuarios(todosLosUsuarios);
        } else {
            console.log("Error al cargar los usuarios");
            tablaUsuarios.innerHTML = '<p class="fila-dato">No se han podido cargar los usuarios</p>';
        }
    } catch (error) {
        console.error("Error inesperado: ", error);
        tablaUsuarios.innerHTML = '<p class="fila-dato">No se han podido cargar los usuarios por un error de conexión</p>';
    }
}

function pintarUsuarios(usuarios) {
    // También lo buscamos aquí
    const tablaUsuarios = document.getElementById("listado-usuarios");
    let htmlContenido = "";

    usuarios.forEach((usuario) => {
        htmlContenido += `
            <div class="fila-dato">
                <span>${usuario.nombre} ${usuario.apellidos}</span>
                <span>${usuario.email}</span>
                <div>
                    <a href="admin_usuario_form.html?id=${usuario.idUsuario}" class="btn btn-claro btn-pequeno">Modificar</a>
                    <a href="#" class="btn btn-relleno btn-borrar btn-pequeno" data-id="${usuario.idUsuario}">Eliminar</a>
                </div>
            </div>
        `;
    });

    tablaUsuarios.innerHTML = htmlContenido;


    // Añadimos los eventos a los botones DESPUÉS de inyectar el HTML
    const botonesEliminar = document.querySelectorAll(".btn-borrar");
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", function(event) {
            event.preventDefault(); // Evita que el <a> nos lleve arriba de la página
            const idUsuario = this.getAttribute("data-id"); 
            borrarUsuario(idUsuario);
        });
    });
}

async function borrarUsuario(idUsuario) {
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar este usuario?");
    if (!confirmacion) {
        return;
    }

    // Buscamos el usuario completo en nuestra lista para enviarlo en el PATCH
    const usuario = todosLosUsuarios.find(u => u.idUsuario == idUsuario);

    try {
        const respuesta = await fetch(`${API_USUARIOS}/${idUsuario}`, {
            method: 'PATCH', // Usamos PATCH para el soft-delete (baja lógica)
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + token
            },
            body: JSON.stringify({
                ...usuario,
                activo: false // Cambiamos el estado a inactivo
            })
        });

        if (respuesta.ok) {
            console.log(`Usuario ${idUsuario} eliminado correctamente`);
            cargarUsuarios(); // Recargamos la lista actualizada
        } else {
            console.log(`Error al eliminar el usuario ${idUsuario}`);
            alert("No se ha podido eliminar el usuario");
        }
    } catch (error) {
        console.error("Error inesperado: ", error);
        alert("No se ha podido eliminar el usuario por un error inesperado");
    }    
}

// Buscador
function buscarUsuarios(event) {
    const texto = event.target.value.toLowerCase();

    // Filtramos el array original basándonos en nombre, apellidos o email
    const usuariosFiltrados = todosLosUsuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(texto) ||
        usuario.apellidos.toLowerCase().includes(texto) ||
        usuario.email.toLowerCase().includes(texto)
    );

    // Pintamos solo los que coinciden
    pintarUsuarios(usuariosFiltrados);
}