const API_RESERVAS_DETALLE = "http://localhost:8080/pistaPadel/reservations";
const API_PISTAS_DETALLE = "http://localhost:8080/pistaPadel/courts";

const token = localStorage.getItem("token");

let reservaOriginal = null;
let listaPistas = [];

document.addEventListener("DOMContentLoaded", async () => {
    console.log("reserva_detalle.js cargado correctamente");

    configurarTextosPorRol();

    const idReserva = obtenerIdReservaDesdeURL();

    if (!idReserva) {
        alert("No se ha encontrado el id de la reserva.");
        window.location.href = "reservas.html";
        return;
    }

    await cargarPistas();
    await cargarReserva(idReserva);

    configurarEventosFormulario(idReserva);
    configurarBotonCancelar(idReserva);
});

function obtenerIdReservaDesdeURL() {
    const parametrosURL = new URLSearchParams(window.location.search);
    return parametrosURL.get("id");
}

function configurarTextosPorRol() {
    const rol = localStorage.getItem("rol");
    const esAdmin = rol === "ADMIN";

    const definicion = document.getElementById("detalle-definicion");
    const titulo = document.getElementById("detalle-titulo");
    const descripcion = document.getElementById("detalle-descripcion");

    if (esAdmin) {
        if (definicion) definicion.textContent = "Gestión";
        if (titulo) titulo.textContent = "Modificar reserva";
        if (descripcion) descripcion.textContent = "Consulta y modifica los datos de la reserva seleccionada.";
    } else {
        if (definicion) definicion.textContent = "Área personal";
        if (titulo) titulo.textContent = "Detalle de reserva";
        if (descripcion) descripcion.textContent = "Consulta la información de tu reserva y realiza acciones sobre ella.";
    }
}

async function cargarPistas() {
    const selectPista = document.getElementById("pista");

    try {
        const respuesta = await fetch(`${API_PISTAS_DETALLE}?active=true`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Basic " + token
            }
        });

        if (!respuesta.ok) {
            const errorTexto = await respuesta.text();
            console.error("Error al cargar pistas:", respuesta.status, errorTexto);
            alert("No se han podido cargar las pistas.");
            return;
        }

        listaPistas = await respuesta.json();

        selectPista.innerHTML = "";

        listaPistas.forEach((pista) => {
            const option = document.createElement("option");
            option.value = pista.idPista;
            option.textContent = pista.nombre;
            selectPista.appendChild(option);
        });

    } catch (error) {
        console.error("Error inesperado al cargar pistas:", error);
        alert("Error al cargar las pistas.");
    }
}

async function cargarReserva(idReserva) {
    try {
        const respuesta = await fetch(`${API_RESERVAS_DETALLE}/${idReserva}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Basic " + token
            }
        });

        if (!respuesta.ok) {
            const errorTexto = await respuesta.text();
            console.error("Error al cargar reserva:", respuesta.status, errorTexto);
            alert("No se ha podido cargar la reserva.");
            return;
        }

        reservaOriginal = await respuesta.json();
        console.log("Reserva cargada:", reservaOriginal);

        pintarReserva(reservaOriginal);

    } catch (error) {
        console.error("Error inesperado al cargar reserva:", error);
        alert("Error al cargar la reserva.");
    }
}

function pintarReserva(reserva) {
    const idReserva = reserva.idReserva || reserva.id || reserva.reservationId;

    const campoId = document.getElementById("reserva-id");
    const selectPista = document.getElementById("pista");
    const inputFecha = document.getElementById("fechaReserva");
    const inputHoraInicio = document.getElementById("horaInicio");
    const inputDuracion = document.getElementById("duracionMinutos");
    const campoEstado = document.getElementById("reserva-estado");

    if (campoId) {
        campoId.textContent = idReserva;
    }

    if (selectPista && reserva.pista) {
        selectPista.value = reserva.pista.idPista;
    }

    if (inputFecha) {
        inputFecha.value = reserva.fechaReserva;
    }

    if (inputHoraInicio && reserva.horaInicio) {
        inputHoraInicio.value = reserva.horaInicio.substring(0, 5);
    }

    if (inputDuracion) {
        inputDuracion.value = reserva.duracionMinutos || 60;
    }

    if (campoEstado) {
        campoEstado.textContent = reserva.estado || "Sin estado";
    }

    cargarHorariosDisponibles();
}

function configurarEventosFormulario(idReserva) {
    const formulario = document.getElementById("formulario-reserva-detalle");
    const selectPista = document.getElementById("pista");
    const inputFecha = document.getElementById("fechaReserva");

    if (!formulario) {
        console.error("No se ha encontrado el formulario #formulario-reserva-detalle");
        return;
    }

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault();
        await modificarReserva(idReserva);
    });

    if (selectPista) {
        selectPista.addEventListener("change", () => {
            document.getElementById("horaInicio").value = "";
            cargarHorariosDisponibles();
        });
    }

    if (inputFecha) {
        inputFecha.addEventListener("change", () => {
            document.getElementById("horaInicio").value = "";
            cargarHorariosDisponibles();
        });
    }
}

async function cargarHorariosDisponibles() {
    const selectPista = document.getElementById("pista");
    const inputFecha = document.getElementById("fechaReserva");
    const contenedorHorarios = document.getElementById("contenedor-horarios-detalle");

    if (!selectPista || !inputFecha || !contenedorHorarios) {
        return;
    }

    const idPista = selectPista.value;
    const fecha = inputFecha.value;

    if (!idPista || !fecha) {
        contenedorHorarios.innerHTML = "<p>Selecciona una pista y una fecha.</p>";
        return;
    }

    try {
        const respuesta = await fetch(`${API_PISTAS_DETALLE}/${idPista}/availability?date=${fecha}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Basic " + token
            }
        });

        if (!respuesta.ok) {
            const errorTexto = await respuesta.text();
            console.error("Error al cargar horarios:", respuesta.status, errorTexto);
            contenedorHorarios.innerHTML = "<p>No se han podido cargar los horarios.</p>";
            return;
        }

        const datos = await respuesta.json();

        pintarHorarios(datos.disponibilidad || []);

    } catch (error) {
        console.error("Error inesperado al cargar horarios:", error);
        contenedorHorarios.innerHTML = "<p>Error al cargar los horarios.</p>";
    }
}

function pintarHorarios(horarios) {
    const contenedorHorarios = document.getElementById("contenedor-horarios-detalle");
    const inputHoraInicio = document.getElementById("horaInicio");
    const inputDuracion = document.getElementById("duracionMinutos");

    contenedorHorarios.innerHTML = "";

    const horaActualReserva = reservaOriginal && reservaOriginal.horaInicio
        ? reservaOriginal.horaInicio.substring(0, 5)
        : null;

    let horariosFinales = horarios.map(hora => hora.substring(0, 5));

    // Añadimos la hora actual aunque no venga como disponible,
    // porque esa franja está ocupada por esta misma reserva.
    if (horaActualReserva && !horariosFinales.includes(horaActualReserva)) {
        horariosFinales.unshift(horaActualReserva);
    }

    if (!horariosFinales || horariosFinales.length === 0) {
        contenedorHorarios.innerHTML = "<p>No hay horarios disponibles.</p>";
        inputHoraInicio.value = "";
        return;
    }

    horariosFinales.forEach((hora) => {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "slot-horario-form disponible";
        boton.textContent = pintarRangoHora(hora);

        if (horaActualReserva && hora === horaActualReserva) {
            boton.classList.add("seleccionada");
            inputHoraInicio.value = hora;
            inputDuracion.value = reservaOriginal.duracionMinutos || 60;
        }

        boton.addEventListener("click", function () {
            seleccionarHora(hora, boton);
        });

        contenedorHorarios.appendChild(boton);
    });
}

function seleccionarHora(hora, boton) {
    const inputHoraInicio = document.getElementById("horaInicio");
    const inputDuracion = document.getElementById("duracionMinutos");

    inputHoraInicio.value = hora;
    inputDuracion.value = 60;

    document.querySelectorAll(".slot-horario-form").forEach((b) => {
        b.classList.remove("seleccionada");
    });

    boton.classList.add("seleccionada");
}

async function modificarReserva(idReserva) {
    if (!reservaOriginal) {
        alert("No se ha cargado la reserva original.");
        return;
    }

    const idPista = document.getElementById("pista").value;
    const fechaReserva = document.getElementById("fechaReserva").value;
    const horaInicio = document.getElementById("horaInicio").value;
    const duracionMinutos = document.getElementById("duracionMinutos").value;

    if (!idPista || !fechaReserva || !horaInicio || !duracionMinutos) {
        alert("Completa pista, fecha y franja horaria.");
        return;
    }

    const reservaData = {
        pista: {
            idPista: Number(idPista)
        },
        fechaReserva: fechaReserva,
        horaInicio: normalizarHora(horaInicio),
        duracionMinutos: Number(duracionMinutos)
    };

    console.log("Datos enviados al backend:", reservaData);

    try {
        const respuesta = await fetch(`${API_RESERVAS_DETALLE}/${idReserva}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Basic " + token
            },
            body: JSON.stringify(reservaData)
        });

        if (respuesta.ok) {
            alert("Reserva modificada correctamente.");
            window.location.href = "reservas.html";
        } else {
            const errorTexto = await respuesta.text();
            console.error("Error al modificar reserva:", respuesta.status, errorTexto);
            alert("No se ha podido modificar la reserva.");
        }

    } catch (error) {
        console.error("Error inesperado al modificar reserva:", error);
        alert("No se ha podido modificar la reserva por un error inesperado.");
    }
}

function configurarBotonCancelar(idReserva) {
    const botonCancelar = document.getElementById("btn-cancelar-reserva");

    if (!botonCancelar) {
        console.warn("No se ha encontrado el botón #btn-cancelar-reserva");
        return;
    }

    botonCancelar.addEventListener("click", async (event) => {
        event.preventDefault();

        const confirmacion = confirm("¿Estás seguro de que quieres cancelar esta reserva?");

        if (!confirmacion) {
            return;
        }

        await cancelarReserva(idReserva);
    });
}

async function cancelarReserva(idReserva) {
    try {
        const respuesta = await fetch(`${API_RESERVAS_DETALLE}/${idReserva}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": "Basic " + token
            }
        });

        if (respuesta.ok) {
            alert("Reserva cancelada correctamente.");
            window.location.href = "reservas.html";
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

function normalizarHora(hora) {
    if (!hora) {
        return hora;
    }

    if (hora.length === 5) {
        return hora + ":00";
    }

    return hora;
}

function pintarRangoHora(hora) {
    const inicio = hora.substring(0, 5);
    const partes = inicio.split(":");

    const fecha = new Date();
    fecha.setHours(Number(partes[0]));
    fecha.setMinutes(Number(partes[1]));
    fecha.setSeconds(0);

    fecha.setMinutes(fecha.getMinutes() + 60);

    const horaFin = String(fecha.getHours()).padStart(2, "0");
    const minutoFin = String(fecha.getMinutes()).padStart(2, "0");

    return inicio + " - " + horaFin + ":" + minutoFin;
}