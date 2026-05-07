const API_PISTAS = "http://localhost:8080/pistaPadel/courts";
const API_DISPONIBILIDAD = "http://localhost:8080/pistaPadel/availability";

document.addEventListener("DOMContentLoaded", function(event) {
    event.preventDefault();
    cargarDetalles();
});

const token = localStorage.getItem('token');

function obtenerFechaHoy() {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${año}-${mes}-${dia}`;
}

async function cargarDetalles() {
    const parametrosURL = new URLSearchParams(window.location.search);
    const idPista = parametrosURL.get("id");

    if (!idPista) {
        alert("Pista no encontrada");
        window.location.href = "pistas.html";
        return;
    }

    try {
        const respuestaPista = await fetch(`${API_PISTAS}/${idPista}` , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic ' + token
            }
        });

        if (respuestaPista.ok) {
            const pista = await respuestaPista.json();

            document.getElementById("detalle-titulo").textContent = `Pista "${pista.nombre}"`;
            document.getElementById("detalle-nombre").textContent = `Pista "${pista.nombre}"`;
            document.getElementById("detalle-precio").textContent = `${pista.precioHora}€ / 60 min"`;
            
            const fechaHoy = obtenerFechaHoy();
            const respuestaDispo = await fetch(`${API_DISPONIBILIDAD}?date=${fechaHoy}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Basic ' + token
                }
            });

            let horasDisponibles = [];

            if (respuestaDispo.ok) {
                const arrayDisponibilidad = await respuestaDispo.json();

                const dispoPista = arrayDisponibilidad.find(d => d.nombre === pista.nombre);
                if (dispoPista) {
                    horasDisponibles = dispoPista.disponibilidad;
                }
            } else {
                console.warn("No se ha podido cargar la disponibilidad horaria");
            }

            generarHorarios(pista, horasDisponibles);

        } else {
            console.error("No se ha podido cargar la pista");
            document.getElementById("detalle-titulo").textContent = "Pista no disponible";
        }
    } catch (error) {
        console.error("Error inesperado: ", error);
        document.getElementById("detalle-titulo").textContent = "Error al cargar la pista";
    }    
}

function generarHorarios(pista, horasDisponibles) {
    const contenedorHorarios = document.getElementById("contenedor-horarios");
    const rol = localStorage.getItem('rol');

    const urlReserva = (rol === "USER") ? "reserva_nueva.html" : "login.html";

    const franjas  = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];
    let htmlHorarios = "";

    franjas.forEach(hora => {
        let estaDisponible = horasDisponibles.includes(hora);
        
        if(!estaDisponible) {
            htmlHorarios += `<div class="slot-horario ocupada">${hora}</div>`;
        } else {
            const id = pista.idPista;
            htmlHorarios += `<a href="${urlReserva}?idPista=${id}&hora=${hora}" class="slot-horario disponible">${hora}</a>`;
        }
    });

    contenedorHorarios.innerHTML = htmlHorarios;

}