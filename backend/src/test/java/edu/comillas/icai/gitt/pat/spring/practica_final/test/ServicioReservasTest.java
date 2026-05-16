package edu.comillas.icai.gitt.pat.spring.practica_final.test;

import edu.comillas.icai.gitt.pat.spring.practica_final.entidad.Usuario;
import edu.comillas.icai.gitt.pat.spring.practica_final.repositorio.RepoReserva;
import edu.comillas.icai.gitt.pat.spring.practica_final.servicio.ServicioReservas;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ServicioReservasTest {

    @Mock
    private RepoReserva repoReserva;

    @InjectMocks
    private ServicioReservas servicioReservas;

    @Test
    void cancelarReserva_reservaNoExiste_lanza404() {

        // MOCK
        when(repoReserva.findById(999L))
                .thenReturn(Optional.empty());

        // ASSERT
        ResponseStatusException ex =
                assertThrows(
                        ResponseStatusException.class,
                        () -> servicioReservas.cancelarReserva(
                                999,
                                null
                        )
                );

        assertEquals(
                HttpStatus.NOT_FOUND,
                ex.getStatusCode()
        );
    }
}
