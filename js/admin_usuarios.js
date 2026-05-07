const API = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", cargarUsuarios);

async function cargarUsuarios() {
    const listado = document.getElementById("listado-usuarios");

    try {
        const response = await fetch(`${API}/pistaPadel/users`, {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Error al cargar usuarios");
        }

        const usuarios = await response.json();

        listado.innerHTML = "";

        usuarios.forEach(usuario => {
            listado.innerHTML += `
                <div class="fila-dato">
                    <span>${usuario.nombre}</span>
                    <span>${usuario.email}</span>
                    <div>
                        <a href="admin_usuario_detalle.html?id=${usuario.id}" class="btn btn-claro btn-pequeno">Modificar</a>
                        <a href="#" class="btn btn-relleno btn-pequeno">Eliminar</a>
                    </div>
                </div>
            `;
        });

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