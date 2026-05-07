const API_PISTAS = "http://localhost:8080/pistaPadel/courts";

/* Primero esperamos a que se termine de cargar la página con el DOMContentLoaded */

console.log("JS cargado correctamente");

document.addEventListener("DOMContentLoaded", async () => {

    /* token del localStorage generado con login.js*/
    const token = localStorage.getItem('token');

    /* Buscamos el formulario con el querySelector */
    const formulario = document.querySelector(".formulario-admin-pista");

    /*Parámetros de la URL que provienen de pistas.js*/
    const parametrosURL = new URLSearchParams(window.location.search);
    const idPista = parametrosURL.get("id");

    /* Sin ID pista (se ha pulsado "Añadir pista") entonces no se añade nada a los campos */ 
    /* Puede venir con ID pista (se ha pulsado "modificar" en una pista) */
    if (idPista) {
        document.querySelector("h1").textContent = "Modificar pista";
        document.querySelector(".descripcion-admin-pista").textContent = "Actualiza los datos de la pista seleccionada.";
        document.querySelector(".boton-formulario").textContent = "Guardar cambios";

        /* Cogemos los datos del backend */
        try {
            const respuesta = await fetch(`${API_PISTAS}/${idPista}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Basic ' + token
                }
            });
            
            if (respuesta.ok) {
                const pista = await respuesta.json();

                /* Se rellenan los campos de la pista a modificar */ 
                document.getElementById("nombre").value = pista.nombre;
                document.getElementById("ubicacion").value = pista.ubicacion;
                document.getElementById("precioHora").value = pista.precioHora;
                document.getElementById("activa").value = pista.activa.toString();

                if (pista.fechaAlta) {
                    const fechaFormateada = pista.fechaAlta.substring(0, 16);
                    document.getElementById("fechaAlta").value = fechaFormateada;
                }
            } else {
                alert("Error al cargar los datos de la pista.");
            }
        } catch (error) {
            console.error("Error al cargar la pista: ", error);
        }
    }

    /* Formulario async await */
    formulario.addEventListener("submit", async (event) => {
        event.preventDefault(); /* Para evitar que se recargue la página automáticamente */

        const formData = new FormData(formulario);

        const nombre = formData.get("nombre");
        const ubicacion = formData.get("ubicacion");
        const precioHora = formData.get("precioHora");
        const activa = formData.get("activa");
        const fechaAlta = formData.get("fechaAlta");

        /* Se puede hacer tmb con los ids
        const nombre = document.getElementById("nombre").value.trim();
        const ubicacion = document.getElementById("ubicacion").value.trim();
        const precioHora = parseFloat(document.getElementById("precioHora").value);
        const activa = document.getElementById("activa").value;
        const fechaAlta = document.getElementById("fechaAlta").value;
        */

        if (!nombre || !ubicacion || isNaN(precioHora) || precioHora < 0 || activa === "" || !fechaAlta) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        const pista = {
            nombre: nombre,
            ubicacion: ubicacion,
            precioHora: precioHora,
            activa: activa === "true",   /* Cambiamos de texto a booleano */
            fechaAlta: fechaAlta
        };

        // Si hay ID usamos la ruta /courts/ID y el método PUT (actualizar)
        // Si NO hay ID usamos la ruta /courts y el método POST (crear)
        const url = idPista ? `${API_PISTAS}/${idPista}` : API_PISTAS;
        const metodo = idPista ? 'PATCH' : 'POST';

        try {
            const respuesta = await fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json', // Lo que estoy enviando es formato json
                    'Accept': 'application/json',  // Lo ponemos si queremos respuesta en formato json
                    'Authorization': 'Basic ' + token   // Autorización necesaria
                },
                body: JSON.stringify(pista)
            });

            if (!respuesta.ok) {
                throw new Error("Error al crear la pista");
            }

            alert(idPista ? "Pista modificada correctamente" : "Pista creada correctamente");
            formulario.reset();

            /* Se vuelve al listado de pistas */
            window.location.href = "pistas.html";

        } catch (error) {
            console.error(error);
            alert("No se pudo crear la pista.");
        }
    });
});