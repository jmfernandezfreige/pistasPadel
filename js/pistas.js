const API_PISTAS = "http://localhost:8080/pistaPadel/courts";


const tablaPistas = document.getElementById("listado-pistas");
const token = localStorage.getItem('token');


document.addEventListener("DOMContentLoaded", cargarPistas);

async function cargarPistas() {
    const rol = localStorage.getItem('rol');

    const botonPrincipal = document.querySelector(".barra-acciones .btn-relleno");
    if (botonPrincipal) {
        if (rol === "ADMIN") {
            botonPrincipal.href = "admin_pista_form.html";
            botonPrincipal.textContent = "Añadir pista";
        } else if (rol === "USER") {
            botonPrincipal.href = "usuario_reserva_nueva.html"; 
            botonPrincipal.textContent = "Reservar una pista";
        } else {
            botonPrincipal.href = "login.html";
            botonPrincipal.textContent = "Reservar una pista";
        }
    }

    try {
        let htmlContenido = `
            <div class="fila-dato cabecera-listado">
                <span>Nombre</span>
                <span>Precio por hora</span>
                <span>Acciones</span>
            </div>
        `;

        const respuesta = await fetch(API_PISTAS, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (respuesta.ok) {
            const listaPistas = await respuesta.json();

            if (rol === "ADMIN") {
                listaPistas.forEach((pista) => {
                    htmlContenido += `
                        <div class="fila-dato">
                            <span>${pista.nombre}</span>
                            <span>${pista.precioHora}€</span>
                            <div>
                                <a href="pista_detalle.html?id=${pista.idPista}" class="btn btn-claro btn-pequeno">Modificar</a>
                                <a href="#" class="btn btn-relleno btn-borrar" data-id="${pista.idPista}">Eliminar</a>
                            </div>
                        </div>
                    `;
                });
            } else {
                const urlReserva = (rol === "USER") ? "reserva_nueva.html" : "login.html";

                listaPistas.forEach((pista) => {
                    htmlContenido += `
                        <div class="fila-dato">
                            <span>${pista.nombre}</span>
                            <span>${pista.precioHora}€</span>
                            <div>
                                <a href="pista_detalle.html?id=${pista.idPista}" class="btn btn-claro btn-pequeno">Detalles</a>
                                <a href="${urlReserva}" class="btn btn-relleno btn-pequeno">Reservar</a>
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

        } else {
            console.log("Error al cargar las pistas");
            tablaPistas.innerHTML = htmlContenido + '<p>No se han podido cargar las pistas</p>';
        }
    } catch (error) {
        console.error("Error inesperado: ", error);
        tablaPistas.innerHTML = '<p>No se han podido cargar las pistas por un error de conexión</p>';
    }
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
};