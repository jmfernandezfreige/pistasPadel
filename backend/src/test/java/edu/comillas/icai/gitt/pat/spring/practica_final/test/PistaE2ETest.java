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
class PistaE2ETest {
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

    @LocalServerPort
    private int port;

    private String getBaseUrl() {
        return "http://localhost:" + port + "/pistaPadel/courts";
    }

    private String obtenerCookieLogin(String email, String password) {
        HttpHeaders loginHeaders = new HttpHeaders();
        loginHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        String loginBody = "username=" + email + "&password=" + password;

        ResponseEntity<String> loginResponse = restTemplate.exchange(
                "/pistaPadel/auth/login",
                HttpMethod.POST,
                new HttpEntity<>(loginBody, loginHeaders),
                String.class
        );
        return loginResponse.getHeaders().getFirst(HttpHeaders.SET_COOKIE);
    }

    @Test
    void listarPistas_sinFiltro_devuelveTodas() {
        repoReserva.deleteAll();
        repoPista.deleteAll();
        repoUsuario.deleteAll();
        repoRol.deleteAll();

        // Se crea un rol para el usuario
        Rol rol = repoRol.save(new Rol(Rol.NombreRol.USER, "Usuario normal"));

        // Usuario para el test
        Usuario usuario = new Usuario();
        usuario.setNombre("Gonzalo");
        usuario.setApellidos("García");
        usuario.setEmail("gonzalo@gmail.com");
        usuario.setPassword("1234");
        usuario.setTelefono("699000999");
        usuario.setRol(rol);
        usuario.setActivo(true);
        repoUsuario.save(usuario);

        Pista p1 = new Pista();
        p1.setNombre("Pista Test 1");
        p1.setUbicacion("Norte");
        p1.setPrecioHora(10.0);
        p1.setActiva(true);

        Pista p2 = new Pista();
        p2.setNombre("Pista Test 2");
        p2.setUbicacion("Sur");
        p2.setPrecioHora(12.0);
        p2.setActiva(false);

        repoPista.save(p1);
        repoPista.save(p2);

        String cookie = obtenerCookieLogin("gonzalo@gmail.com", "1234");

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.COOKIE, cookie);

        //GET
        ResponseEntity<Pista[]> response = restTemplate.exchange(
                getBaseUrl(),
                HttpMethod.GET,
                new HttpEntity<>(headers),
                Pista[].class
        );

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());
        Assertions.assertEquals(2, response.getBody().length);
    }

    @Test
    void listarPistas_filtrandoActivas() {
        // Arrange
        repoReserva.deleteAll();
        repoPista.deleteAll();
        repoUsuario.deleteAll();
        repoRol.deleteAll();

        // Se crea un rol para el usuario
        Rol rol = repoRol.save(new Rol(Rol.NombreRol.USER, "Usuario normal"));

        // Usuario para el test
        Usuario usuario = new Usuario();
        usuario.setNombre("Gonzalo");
        usuario.setApellidos("García");
        usuario.setEmail("bibi@gmail.com");
        usuario.setPassword("1234");
        usuario.setTelefono("699000999");
        usuario.setRol(rol);
        usuario.setActivo(true);
        repoUsuario.save(usuario);

        //Pistas
        Pista activa = new Pista();
        activa.setNombre("Pista Activa");
        activa.setUbicacion("Norte");
        activa.setPrecioHora(10.0);
        activa.setActiva(true);

        Pista inactiva = new Pista();
        inactiva.setNombre("Pista Inactiva");
        inactiva.setUbicacion("Sur");
        inactiva.setPrecioHora(12.0);
        inactiva.setActiva(false);

        repoPista.save(activa);
        repoPista.save(inactiva);

        //Cookie para la peticion
        String cookie = obtenerCookieLogin("bibi@gmail.com", "1234");

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.COOKIE, cookie);

        //GET con el filtro "?active=true"
        ResponseEntity<Pista[]> response = restTemplate.exchange(
                getBaseUrl() + "?active=true",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                Pista[].class
        );

        // Assert
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());
        Assertions.assertEquals(1, response.getBody().length);
        Assertions.assertTrue(response.getBody()[0].isActiva());
    }
}