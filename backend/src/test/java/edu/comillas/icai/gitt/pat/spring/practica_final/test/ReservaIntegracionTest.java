package edu.comillas.icai.gitt.pat.spring.practica_final.test;

import edu.comillas.icai.gitt.pat.spring.practica_final.entidad.Pista;
import edu.comillas.icai.gitt.pat.spring.practica_final.entidad.Reserva;
import edu.comillas.icai.gitt.pat.spring.practica_final.entidad.Rol;
import edu.comillas.icai.gitt.pat.spring.practica_final.entidad.Usuario;
import edu.comillas.icai.gitt.pat.spring.practica_final.repositorio.RepoPista;
import edu.comillas.icai.gitt.pat.spring.practica_final.repositorio.RepoReserva;
import edu.comillas.icai.gitt.pat.spring.practica_final.repositorio.RepoRol;
import edu.comillas.icai.gitt.pat.spring.practica_final.repositorio.RepoUsuario;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.resttestclient.autoconfigure.AutoConfigureTestRestTemplate;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.resttestclient.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestRestTemplate
class ReservaIntegracionTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private RepoPista repoPista;

    @Autowired
    private RepoUsuario repoUsuario;

    @Autowired
    private RepoReserva repoReserva;

    @Autowired
    private RepoRol repoRol;

    @Test
    void cancelarReserva_devuelve204() {

        repoReserva.deleteAll();
        repoPista.deleteAll();
        repoUsuario.deleteAll();
        repoRol.deleteAll();

        // ROL
        Rol rol = repoRol.save(
                new Rol(Rol.NombreRol.USER, "Usuario normal")
        );

        // USUARIO
        Usuario usuario = new Usuario();
        usuario.setNombre("Juan");
        usuario.setApellidos("Perez");
        usuario.setEmail("juan@mail.com");
        usuario.setPassword("1234");
        usuario.setTelefono("666666666");
        usuario.setActivo(true);
        usuario.setRol(rol);

        repoUsuario.save(usuario);

        // PISTA
        Pista pista = new Pista();
        pista.setNombre("Pista Central");
        pista.setUbicacion("Madrid");
        pista.setPrecioHora(20.0);
        pista.setActiva(true);

        repoPista.save(pista);

        // AUTH
        TestRestTemplate authRestTemplate =
                restTemplate.withBasicAuth("juan@mail.com", "1234");

        // RESERVA
        String json = """
                {
                    "pista": {
                        "idPista": %d
                    },
                    "fechaReserva": "2026-06-01",
                    "horaInicio": "10:00:00",
                    "duracionMinutos": 90
                }
                """.formatted(pista.getIdPista());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // POST
        ResponseEntity<Reserva> respuestaCrear =
                authRestTemplate.exchange(
                        "/pistaPadel/reservations",
                        HttpMethod.POST,
                        new HttpEntity<>(json, headers),
                        Reserva.class
                );

        Assertions.assertEquals(HttpStatus.CREATED,
                respuestaCrear.getStatusCode());

        Assertions.assertNotNull(respuestaCrear.getBody());

        Long idReserva =
                respuestaCrear.getBody().getIdReserva();

        // DELETE
        ResponseEntity<Void> respuestaDelete =
                authRestTemplate.exchange(
                        "/pistaPadel/reservations/" + idReserva,
                        HttpMethod.DELETE,
                        new HttpEntity<>(headers),
                        Void.class
                );

        // ASSERT
        Assertions.assertEquals(HttpStatus.NO_CONTENT,
                respuestaDelete.getStatusCode());
    }
}
