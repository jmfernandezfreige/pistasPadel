const API_RESERVA_NUEVA = "http://localhost:8080/pistaPadel";

document.addEventListener("DOMContentLoaded", function () {

    // Elementos del HTML
    const formulario = document.querySelector(".formulario-usuario-reserva-nueva");
    const contenedorPistas = document.querySelector(".grupo-opciones-pista");
    const contenedorHorarios = document.querySelector(".rejilla-horarios-formulario");

    const inputPista = document.getElementById("pista");
    const inputFecha = document.getElementById("fecha");
    const inputHora = document.getElementById("hora");

    // Token guardado en el login
    const token = localStorage.getItem('token');

    // pista seleccionada
    let pistaSeleccionada = null;

    // Leer la URL para ver si viene con hora y con pista
    const parametrosURL = new URLSearchParams(window.location.search);
    const idPistaURL = parametrosURL.get("idPista");
    let horaURL = parametrosURL.get("hora");

    // Si viene con una hora, rellenamos la fecha de hoy automáticamente
    if (horaURL) {
        const hoy = new Date();
        const año = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
        inputFecha.value = `${año}-${mes}-${dia}`;
    }

    // Cargamos las pistas al entrar en la página
    cargarPistas();

    // Cuando cambia la fecha, cargamos horarios
    inputFecha.addEventListener("change", cargarHorarios);

    // Cuando se pulsa confirmar reserva
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        crearReserva();
    });


    // Carga las pistas desde el backend
    async function cargarPistas() {
        try {
            const respuesta = await fetch(API_RESERVA_NUEVA + "/courts?active=true");

            if (!respuesta.ok) {
                alert("Error al cargar pistas. Código: " + respuesta.status);
                return;
            }

            const pistas = await respuesta.json();

            // Borramos las pistas 
            contenedorPistas.innerHTML = "";

            // Pintamos cada pista en un botón
            pistas.forEach(function (pista) {
                const boton = document.createElement("button");

                boton.type = "button";
                boton.className = "opcion-pista";
                boton.textContent = pista.nombre;

                boton.addEventListener("click", function () {
                    seleccionarPista(pista, boton);
                });

                contenedorPistas.appendChild(boton);

                if (idPistaURL && pista.idPista == idPistaURL) {
                    seleccionarPista(pista, boton);
                }
            });

            // Borramos las horas
            contenedorHorarios.innerHTML = "<p>Selecciona una pista y una fecha.</p>";

        } catch (error) {
            console.error("Error cargando pistas:", error);
            alert("Error al cargar las pistas. Comprueba que el backend está encendido.");
        }
    }


    // Selecciona una pista
    function seleccionarPista(pista, boton) {
        pistaSeleccionada = pista;

        // Guardamos el id de la pista
        inputPista.value = pista.idPista;

        // Al cambiar de pista, borramos la hora seleccionada
        inputHora.value = "";

        // Quitamos la selección anterior
        document.querySelectorAll(".opcion-pista").forEach(function (b) {
            b.classList.remove("seleccionada");
        });

        // Marcamos la pista actual
        boton.classList.add("seleccionada");

        // Si ya hay fecha elegida, cargamos horarios
        cargarHorarios();
    }


    // Carga los horarios disponibles
    async function cargarHorarios() {
        if (!pistaSeleccionada || !inputFecha.value) {
            return;
        }

        try {
            const url = API_RESERVA_NUEVA +
                "/courts/" +
                pistaSeleccionada.idPista +
                "/availability?date=" +
                inputFecha.value;

            const respuesta = await fetch(url, {
                headers: {
                    "Authorization": "Basic " + token
                }
            });

            if (!respuesta.ok) {
                alert("Error al cargar horarios. Código: " + respuesta.status);
                return;
            }

            const datos = await respuesta.json();

            pintarHorarios(datos.disponibilidad);

        } catch (error) {
            console.error("Error cargando horarios:", error);
            alert("Error al cargar los horarios.");
        }
    }


    // Pinta las franjas horarias
    function pintarHorarios(horarios) {
        contenedorHorarios.innerHTML = "";
        inputHora.value = "";

        if (!horarios || horarios.length === 0) {
            contenedorHorarios.innerHTML = "<p>No hay horarios disponibles.</p>";
            return;
        }

        horarios.forEach(function (hora) {
            const boton = document.createElement("button");

            boton.type = "button";
            boton.className = "slot-horario-form disponible";
            boton.textContent = pintarRangoHora(hora);

            boton.addEventListener("click", function () {
                seleccionarHora(hora, boton);
            });

            contenedorHorarios.appendChild(boton);

            // Si la hora coincide con la URL, la autoseleccionamos
            if (horaURL && hora.substring(0, 5) === horaURL.substring(0, 5)) {
                seleccionarHora(hora, boton);
                
                // Borramos la hora de la URL internamente para que si el usuario 
                // luego cambia a otro día manualmente, no se vuelva a autoseleccionar sola
                horaURL = null; 
            }
        });
    }


    // Selecciona una hora
    function seleccionarHora(hora, boton) {
        inputHora.value = hora;

        document.querySelectorAll(".slot-horario-form").forEach(function (b) {
            b.classList.remove("seleccionada");
        });

        boton.classList.add("seleccionada");
    }


    // Crea la reserva
    async function crearReserva() {
        if (!token) {
            alert("Debes iniciar sesión para reservar.");
            window.location.href = "login.html";
            return;
        }

        if (!inputPista.value || !inputFecha.value || !inputHora.value) {
            alert("Selecciona pista, fecha y hora.");
            return;
        }

        const reserva = {
            pista: {
                idPista: Number(inputPista.value)
            },
            fechaReserva: inputFecha.value,
            horaInicio: normalizarHora(inputHora.value),
            duracionMinutos: 60
        };

        try {
            const respuesta = await fetch(API_RESERVA_NUEVA + "/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + token
                },
                body: JSON.stringify(reserva)
            });

            if (!respuesta.ok) {
                alert("Error al crear reserva. Código: " + respuesta.status);
                return;
            }

            alert("Reserva creada correctamente.");
            window.location.href = "reservas.html";

        } catch (error) {
            console.error("Error creando reserva:", error);
            alert("Error al crear la reserva.");
        }
    }


    // Convierte 09:00 en 09:00:00
    function normalizarHora(hora) {
        if (hora.length === 5) {
            return hora + ":00";
        }

        return hora;
    }


    // Convierte 09:00 en 09:00 - 10:00 para verlo mejor
    function pintarRangoHora(hora) {
        const inicio = hora.substring(0, 5);
        const partes = inicio.split(":");

        const fecha = new Date();
        fecha.setHours(Number(partes[0]));
        fecha.setMinutes(Number(partes[1]));
        fecha.setSeconds(0);

        fecha.setHours(fecha.getHours() + 1);

        const horaFin = String(fecha.getHours()).padStart(2, "0");
        const minutoFin = String(fecha.getMinutes()).padStart(2, "0");

        return inicio + " - " + horaFin + ":" + minutoFin;
    }
});