const API_PISTAS = "http://localhost:8080/pistaPadel/courts";

const tablaPistas = document.getElementById("listado-pistas");
const token = localStorage.getItem('token');

let todasLasPistas = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarPistas();

    const buscador = document.querySelector(".buscador");
    if (buscador) {
        buscador.addEventListener("input", buscarPistas);
    }
});

async function cargarPistas() {
    const rol = localStorage.getItem('rol');

    const botonPrincipal = document.querySelector(".barra-acciones .btn-relleno");
    if (botonPrincipal) {
        if (rol === "ADMIN") {
            botonPrincipal.href = "admin_pista_form.html";
            botonPrincipal.textContent = "Añadir pista";
        } else if (rol === "USER") {
            botonPrincipal.href = "reserva_nueva.html"; 
            botonPrincipal.textContent = "Reservar una pista";
        } else {
            botonPrincipal.href = "login.html";
            botonPrincipal.textContent = "Reservar una pista";
        }
    }

    try {
        const respuesta = await fetch(API_PISTAS, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (respuesta.ok) {
            todasLasPistas = await respuesta.json();
            pintarPistas(todasLasPistas);
        } else {
            console.log("Error al cargar las pistas");
            tablaPistas.innerHTML = '<p>No se han podido cargar las pistas</p>';
        }
    } catch (error) {
        console.error("Error inesperado: ", error);
        tablaPistas.innerHTML = '<p>No se han podido cargar las pistas por un error de conexión</p>';
    }
}


function pintarPistas(pistas) {
    const rol = localStorage.getItem('rol');

    let htmlContenido = `
        <div class="fila-dato cabecera-listado">
            <span>Nombre</span>
            <span>Precio por hora</span>
            <span>Acciones</span>
        </div>
    `;

    // Mensaje si la búsqueda no da resultados
    if (pistas.length === 0) {
        htmlContenido += `
            <div class="fila-dato">
                <span>No se han encontrado pistas</span>
                <span></span>
                <span></span>
            </div>
        `;
        tablaPistas.innerHTML = htmlContenido;
        return;
    }

    if (rol === "ADMIN") {
        pistas.forEach((pista) => {
            htmlContenido += `
                <div class="fila-dato">
                    <span>${pista.nombre}</span>
                    <span>${pista.precioHora}€</span>
                    <div>
                        <a href="admin_pista_form.html?id=${pista.idPista}" class="btn btn-claro btn-pequeno">Modificar</a>
                        <a href="#" class="btn btn-relleno btn-borrar" data-id="${pista.idPista}">Eliminar</a>
                    </div>
                </div>
            `;
        });
    } else {
        const urlReserva = (rol === "USER") ? "reserva_nueva.html" : "login.html";

        pistas.forEach((pista) => {
            htmlContenido += `
                <div class="fila-dato">
                    <span>${pista.nombre}</span>
                    <span>${pista.precioHora}€</span>
                    <div>
                        <a href="pista_detalle.html?id=${pista.idPista}" class="btn btn-claro btn-pequeno">Detalles</a>
                        <a href="${urlReserva}?idPista=${pista.idPista}" class="btn btn-relleno btn-pequeno">Reservar</a>
                    </div>
                </div>
            `;
        });
    }

    tablaPistas.innerHTML = htmlContenido;

    if (rol === "ADMIN") {
        const botonesEliminar = document.querySelectorAll(".btn-borrar");
        
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", function(event) {
                event.preventDefault();
                const idPista = this.getAttribute("data-id"); 
                borrarPista(idPista);
            });
        });
    }
}

// Filtra el array global y repinta
function buscarPistas(event) {
    const textoBusqueda = event.target.value.toLowerCase();

    const pistasFiltradas = todasLasPistas.filter((pista) => {
        const nombre = pista.nombre ? pista.nombre.toLowerCase() : "";        
        return nombre.includes(textoBusqueda);
    });

    pintarPistas(pistasFiltradas);
}

async function borrarPista(idPista) {
    const confirmacion = confirm(`¿Estás seguro de que quieres borrar la pista?`);
    if (!confirmacion) {
        return
    };

    try {
        const respuesta = await fetch(`${API_PISTAS}/${idPista}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic ' + token
            }
        });

        if (respuesta.ok) {
            console.log(`Pista ${idPista} borrada correctamente`);
            cargarPistas();
        } else {
            console.log(`Error al borrar la pista ${idPista}`);
            alert("No se ha podido borrar la pista");
        }
    } catch (error) {
        console.error("Error inesperado: ", error);
        alert("No se ha podido borrar la pista por un error inesperado");
    }    
}