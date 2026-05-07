const API = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", () => {
    cargarUsuarios();

    document
        .getElementById("listado-usuarios")
        .addEventListener("click", eliminarUsuario);

    document
        .querySelector(".buscador")
        .addEventListener("input", buscarUsuarios);
});

let todosLosUsuarios = [];

async function cargarUsuarios() {
    const listado = document.getElementById("listado-usuarios");

    try {
        const response = await fetch(`${API}/pistaPadel/users?activo=true`, {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Error al cargar usuarios");
        }

        todosLosUsuarios = await response.json();
        pintarUsuarios(todosLosUsuarios);

    } catch (error) {
        console.error(error);
        listado.innerHTML = `
      <div class="fila-dato">
        <span>Error cargando usuarios</span>
        <span></span>
        <span></span>
      </div>
    `;
    }
}

function pintarUsuarios(usuarios) {
    const listado = document.getElementById("listado-usuarios");
    listado.innerHTML = "";

    usuarios.forEach(usuario => {
        listado.innerHTML += `
      <div class="fila-dato">
        <span>${usuario.nombre} ${usuario.apellidos}</span>
        <span>${usuario.email}</span>
        <div>
          <a href="admin_usuario_detalle.html?id=${usuario.idUsuario}" class="btn btn-claro btn-pequeno">Modificar</a>
          <button 
            class="btn btn-relleno btn-pequeno btn-eliminar"
            data-id="${usuario.idUsuario}">
            Eliminar
          </button>
        </div>
      </div>
    `;
    });
}

async function eliminarUsuario(event) {
    if (!event.target.classList.contains("btn-eliminar")) return;

    const idUsuario = event.target.dataset.id;

    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;

    const usuario = todosLosUsuarios.find(u => u.idUsuario == idUsuario);

    const response = await fetch(`${API}/pistaPadel/users/${idUsuario}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...usuario,
            activo: false
        })
    });

    if (!response.ok) {
        alert("Error eliminando usuario");
        return;
    }

    cargarUsuarios();
}

function buscarUsuarios(event) {
    const texto = event.target.value.toLowerCase();

    const usuariosFiltrados = todosLosUsuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(texto) ||
        usuario.apellidos.toLowerCase().includes(texto) ||
        usuario.email.toLowerCase().includes(texto)
    );

    pintarUsuarios(usuariosFiltrados);
}