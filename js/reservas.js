const API_RESERVAS = "http://localhost:8080/pistaPadel/reservations";
const API_RESERVAS_ADMIN = "http://localhost:8080/pistaPadel/admin/reservations";

const token = localStorage.getItem("token");

let todasLasReservas = [];

document.addEventListener("DOMContentLoaded", () => {
    console.log("reservas.js cargado correctamente");

    configurarVistaPorRol();
    cargarReservas();

    const buscador = document.querySelector(".buscador");
    if (buscador) {
        buscador.addEventListener("input", buscarReservas);
    }
});

function configurarVistaPorRol() {
    const rol = localStorage.getItem("rol");
    const esAdmin = rol === "ADMIN";

    const definicion = document.getElementById("reservas-definicion");
    const titulo = document.getElementById("reservas-titulo");
    const descripcion = document.getElementById("reservas-descripcion");
    const botonPrincipal = document.getElementById("boton-reserva-principal");

    if (esAdmin) {
        if (definicion) definicion.textContent = "Gestión";
        if (titulo) titulo.textContent = "Reservas";
        if (descripcion) descripcion.textContent = "Administra las reservas del sistema: crea, edita o cancela reservas.";

        if (botonPrincipal) {
            botonPrincipal.href = "reserva_nueva.html";
            botonPrincipal.textContent = "Añadir reserva";
        }
    } else {
        if (definicion) definicion.textContent = "Área personal";
        if (titulo) titulo.textContent = "Mis reservas";
        if (descripcion) descripcion.textContent = "Consulta las pistas que has reservado, la fecha, la hora y el estado de cada reserva.";

        if (botonPrincipal) {
            botonPrincipal.href = "reserva_nueva.html";
            botonPrincipal.textContent = "Reservar nueva pista";
        }
    }
}

async function cargarReservas() {
    const rol = localStorage.getItem("rol");
    const esAdmin = rol === "ADMIN";

    const url = esAdmin ? API_RESERVAS_ADMIN : API_RESERVAS;

    try {
        const respuesta = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Basic " + token
            }
        });

        if (respuesta.ok) {
            const datos = await respuesta.json();

            todasLasReservas = Array.isArray(datos) ? datos : datos.body;

            if (!Array.isArray(todasLasReservas)) {
                todasLasReservas = [];
            }

            // Ocultamos visualmente las reservas canceladas
            todasLasReservas = todasLasReservas.filter(reserva => reserva.estado !== "CANCELADA");

            console.log("Reservas recibidas:", todasLasReservas);

            pintarReservas(todasLasReservas);

        } else {
            const errorTexto = await respuesta.text();
            console.error("Error al cargar reservas:", respuesta.status, errorTexto);
            mostrarError("No se han podido cargar las reservas.");
        }

    } catch (error) {
        console.error("Error inesperado al cargar reservas:", error);
        mostrarError("No se han podido cargar las reservas por un error de conexión.");
    }
}

function pintarReservas(reservas) {
    const rol = localStorage.getItem("rol");
    const esAdmin = rol === "ADMIN";

    const contenedor = document.getElementById("listado-reservas");

    if (!contenedor) {
        console.error("No se ha encontrado el contenedor #listado-reservas");
        return;
    }

    let htmlContenido = `
        <div class="fila-dato cabecera-listado">
            <span>Pista</span>
            <span>Datos de la reserva</span>
            <span>Acciones</span>
        </div>
    `;

    if (reservas.length === 0) {
        htmlContenido += `
            <div class="fila-dato">
                <span>No hay reservas activas</span>
                <span></span>
                <span></span>
            </div>
        `;

        contenedor.innerHTML = htmlContenido;
        return;
    }

    reservas.forEach((reserva) => {
        const idReserva = obtenerIdReserva(reserva);
        const nombrePista = obtenerNombrePista(reserva);
        const nombreUsuario = obtenerNombreUsuario(reserva);
        const fecha = formatearFecha(reserva.fechaReserva);
        const hora = formatearHorario(reserva.horaInicio);
        const estado = reserva.estado || "Sin estado";

        if (esAdmin) {
            htmlContenido += `
                <div class="fila-dato">
                    <span>${nombrePista}</span>
                    <span>
                        <strong>${nombreUsuario}</strong>
                        <p>${fecha} - ${hora}</p>
                        <p>Estado: ${estado}</p>
                    </span>
                    <div>
                        <a href="reserva_detalle.html?id=${idReserva}" class="btn btn-claro btn-pequeno">
                            Modificar
                        </a>
                        <a href="#" class="btn btn-relleno btn-pequeno btn-borrar" data-id="${idReserva}">
                            Cancelar
                        </a>
                    </div>
                </div>
            `;
        } else {
            htmlContenido += `
                <div class="fila-dato">
                    <span>${nombrePista}</span>
                    <span>
                        <strong>${fecha} - ${hora}</strong>
                        <p>Estado: ${estado}</p>
                    </span>
                    <div>
                        <a href="reserva_detalle.html?id=${idReserva}" class="btn btn-claro btn-pequeno">
                            Ver detalle
                        </a>
                    </div>
                </div>
            `;
        }
    });

    contenedor.innerHTML = htmlContenido;

    if (esAdmin) {
        const botonesCancelar = document.querySelectorAll(".btn-borrar");

        botonesCancelar.forEach((boton) => {
            boton.addEventListener("click", function (event) {
                event.preventDefault();

                const idReserva = this.getAttribute("data-id");
                cancelarReserva(idReserva);
            });
        });
    }
}

async function cancelarReserva(idReserva) {
    const confirmacion = confirm("¿Estás seguro de que quieres cancelar esta reserva?");

    if (!confirmacion) {
        return;
    }

    try {
        const respuesta = await fetch(`${API_RESERVAS}/${idReserva}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": "Basic " + token
            }
        });

        if (respuesta.ok) {
            console.log(`Reserva ${idReserva} cancelada correctamente`);
            cargarReservas();
        } else {
            const errorTexto = await respuesta.text();
            console.error("Error al cancelar reserva:", respuesta.status, errorTexto);
            alert("No se ha podido cancelar la reserva.");
        }

    } catch (error) {
        console.error("Error inesperado al cancelar reserva:", error);
        alert("No se ha podido cancelar la reserva por un error inesperado.");
    }
}

function buscarReservas(event) {
    const texto = event.target.value.toLowerCase();

    const reservasFiltradas = todasLasReservas.filter((reserva) => {
        const nombrePista = obtenerNombrePista(reserva).toLowerCase();
        const nombreUsuario = obtenerNombreUsuario(reserva).toLowerCase();
        const fecha = reserva.fechaReserva ? reserva.fechaReserva.toString().toLowerCase() : "";
        const estado = reserva.estado ? reserva.estado.toLowerCase() : "";

        return (
            nombrePista.includes(texto) ||
            nombreUsuario.includes(texto) ||
            fecha.includes(texto) ||
            estado.includes(texto)
        );
    });

    pintarReservas(reservasFiltradas);
}

function obtenerIdReserva(reserva) {
    return reserva.idReserva || reserva.id || reserva.reservationId;
}

function obtenerNombrePista(reserva) {
    if (reserva.pista && reserva.pista.nombre) {
        return reserva.pista.nombre;
    }

    if (reserva.court && reserva.court.nombre) {
        return reserva.court.nombre;
    }

    if (reserva.nombrePista) {
        return reserva.nombrePista;
    }

    return "Pista sin nombre";
}

function obtenerNombreUsuario(reserva) {
    if (reserva.usuario) {
        const nombre = reserva.usuario.nombre || "";
        const apellidos = reserva.usuario.apellidos || "";
        return `${nombre} ${apellidos}`.trim();
    }

    if (reserva.user) {
        const nombre = reserva.user.nombre || "";
        const apellidos = reserva.user.apellidos || "";
        return `${nombre} ${apellidos}`.trim();
    }

    return "Usuario sin nombre";
}

function formatearFecha(fecha) {
    if (!fecha) {
        return "Sin fecha";
    }

    const partes = fecha.toString().split("-");

    if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    return fecha;
}

/*
    Forzamos visualmente franjas de 1 hora.

    Aunque una reserva antigua venga del backend como:
    horaInicio: 10:00
    horaFin: 11:30
    duracionMinutos: 90

    Aquí la mostramos como:
    10:00 - 11:00
*/
function formatearHorario(horaInicio) {
    if (!horaInicio) {
        return "Sin hora";
    }

    const inicio = horaInicio.substring(0, 5);
    const partes = inicio.split(":");

    const fecha = new Date();
    fecha.setHours(Number(partes[0]));
    fecha.setMinutes(Number(partes[1]));
    fecha.setSeconds(0);

    fecha.setMinutes(fecha.getMinutes() + 60);

    const horaFinal = String(fecha.getHours()).padStart(2, "0");
    const minutoFinal = String(fecha.getMinutes()).padStart(2, "0");

    return `${inicio} - ${horaFinal}:${minutoFinal}`;
}

function mostrarError(mensaje) {
    const contenedor = document.getElementById("listado-reservas");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = `
        <div class="fila-dato">
            <span>${mensaje}</span>
            <span></span>
            <span></span>
        </div>
    `;
}