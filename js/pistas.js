const API_PISTAS = "http://localhost:8080/pistaPadel/courts";
const tablaPistas = document.getElementById("listado-pistas");

document.addEventListener("DOMContentLoaded", cargarPistas);

async function cargarPistas() {
    const rol = localStorage.getItem('rol');

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
                                <a href="pista_detalle.html?id=${pista.id}" class="btn btn-claro btn-pequeno">Modificar</a>
                                <a href="login.html" class="btn btn-relleno btn-pequeno" id="borrar-pista">Eliminar</a>
                            </div>
                        </div>
                    `;
                });
            } else {
                listaPistas.forEach((pista) => {
                    htmlContenido += `
                        <div class="fila-dato">
                            <span>${pista.nombre}</span>
                            <span>${pista.precioHora}€</span>
                            <div>
                                <a href="pista_detalle.html?id=${pista.id}" class="btn btn-claro btn-pequeno">Detalles</a>
                                <a href="login.html" class="btn btn-relleno btn-pequeno">Reservar</a>
                            </div>
                        </div>
                    `;
                });
            }

            tablaPistas.innerHTML = htmlContenido;

        } else {
            console.log("Error al cargar las pistas");
            tablaPistas.innerHTML = htmlContenido + '<p>No se han podido cargar las pistas</p>';
        }
    } catch (error) {
        console.error("Error inesperado: ", error);
        tablaPistas.innerHTML = '<p>No se han podido cargar las pistas por un error de conexión</p>';
    }
}