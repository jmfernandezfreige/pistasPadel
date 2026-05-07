/* Primero esperamos a que se termine de cargar la página con el DOMContentLoaded */

console.log("JS cargado correctamente");

document.addEventListener("DOMContentLoaded", () => {

    /* Buscamos el formulario con el querySelector */
    const formulario = document.querySelector(".formulario-admin-pista");

    /* Formulario async await */
    formulario.addEventListener("submit", async (event) => {
        event.preventDefault(); /* Para evitar que se recargue la página automáticamente */

        const formData = new FormData(form);

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

        try {
            const respuesta = await fetch("http://localhost:8080/pistaPadel/courts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // Lo que estoy enviando es formato json
                    // ,"Accept-Type" : "application/json",    Lo ponemos si queremos respuesta en formato json
                    // "Authorization": "Bearer" + token    Token, para comprobar que eres tú
                },
                body: JSON.stringify(pista)
            });

            if (!respuesta.ok) {
                throw new Error("Error al crear la pista");
            }

            alert("Pista creada correctamente");
            formulario.reset();

            // Opcional:
            // window.location.href = "admin_pistas.html";

        } catch (error) {
            console.error(error);
            alert("No se pudo crear la pista.");
        }
    });
});