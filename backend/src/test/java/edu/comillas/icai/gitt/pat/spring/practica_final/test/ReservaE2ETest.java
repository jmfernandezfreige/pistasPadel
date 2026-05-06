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
class ReservaE2ETest {
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

	@Test
	public void crearYobtenerReserva() throws Exception {
		// Se vacían los repositorios
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

		// Pista para el test
		Pista pista = new Pista();
		pista.setNombre("Pista Test");
		pista.setUbicacion("Zona alta sur");
		pista.setPrecioHora(10.0);
		pista.setActiva(true);
		repoPista.save(pista);

		// Se autentica el usuario
		TestRestTemplate authrestTemplate = restTemplate.withBasicAuth("gonzalo@gmail.com", "1234");

		// Se construye el JSON para el POST de Reserva
		String json = "{" +
				"\"pista\": {\"idPista\": " + pista.getIdPista() + "}, " +
				"\"fechaReserva\":\"2026-05-06\"," +
				"\"horaInicio\":\"10:00:00\"," +
				"\"duracionMinutos\": 90" +
				"}";

		// LOGIN
		HttpHeaders loginHeaders = new HttpHeaders();
		loginHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		String loginBody = "username=bibi@gmail.com&password=1234";

		ResponseEntity<String> loginResponse = restTemplate.exchange(
				"/pistaPadel/auth/login",
				HttpMethod.POST,
				new HttpEntity<>(loginBody, loginHeaders),
				String.class
		);

		String cookie = loginResponse.getHeaders().getFirst(HttpHeaders.SET_COOKIE);

		// POST reserva usando la cookie
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set(HttpHeaders.COOKIE, cookie);

		ResponseEntity<Reserva> responseCreate = restTemplate.exchange(
				"/pistaPadel/reservations",
				HttpMethod.POST,
				new HttpEntity<>(json, headers),
				Reserva.class);

		System.out.println("STATUS POST = " + responseCreate.getStatusCode());
		System.out.println("BODY POST = " + responseCreate.getBody());

		Long idReserva = responseCreate.getBody().getIdReserva();

		// ASSERTS para verificar el POST
		Assertions.assertEquals(HttpStatus.CREATED, responseCreate.getStatusCode());
		Assertions.assertNotNull(responseCreate.getBody());
		// Assertions.assertFalse(responseCreate.getBody().isBlank());


		// Ahora se hace el GET usando el ID real
		ResponseEntity<String> responseGet = authrestTemplate.exchange(
				"/pistaPadel/reservations/" + idReserva,
				HttpMethod.GET,
				new HttpEntity<>(headers),
				String.class);

		System.out.println("STATUS POST = " + responseGet.getStatusCode());
		System.out.println("BODY POST = " + responseGet.getBody());

		// Se verifica el codigo de estado de la respuesta
		Assertions.assertEquals(HttpStatus.OK, responseGet.getStatusCode());
		Assertions.assertNotNull(responseGet.getBody());
		Assertions.assertFalse(responseGet.getBody().isBlank());
		Assertions.assertTrue(responseGet.getBody().contains("2026-05-06"));
	}
}