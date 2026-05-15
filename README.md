<p align="center">
  <img width="200" height="200" alt="logo_arena_padel_club" src="https://github.com/user-attachments/assets/4d5c741c-2ba4-4f87-af4f-055c1a53c81f" />
</p>
<h1 align="center">PistasPadel — Arena Padel Club</h1>

## 1. Descripción general del proyecto

### 1.1 Objetivo de la práctica

El objetivo de esta práctica es desarrollar una aplicación web completa para la gestión y reserva de pistas de pádel, integrando un backend con API REST y un frontend funcional conectado mediante JavaScript.

El proyecto se ha realizado de forma progresiva a lo largo de varias entregas, comenzando por la implementación del backend, continuando con la creación de la interfaz mediante HTML y CSS, y finalizando con la integración dinámica del frontend con el backend mediante JavaScript.

La aplicación busca simular el funcionamiento de un club de pádel real, permitiendo a los usuarios consultar pistas disponibles, registrarse, iniciar sesión y realizar reservas. Además, incluye funcionalidades específicas para administradores, orientadas a la gestión de usuarios, pistas y reservas.

### 1.2 Descripción de la aplicación

**PistasPadel — Arena Padel Club** es una aplicación web para la gestión de reservas de pistas de pádel.

La aplicación está dividida en dos partes principales:

- **Backend**, desarrollado con Spring Boot, encargado de gestionar los datos, la lógica de negocio, la seguridad, la persistencia y los endpoints REST.
- **Frontend**, desarrollado con HTML, CSS y JavaScript, encargado de mostrar la interfaz al usuario y comunicarse con el backend mediante peticiones `fetch`.

Desde el frontend, los usuarios pueden navegar por la página principal, consultar las pistas disponibles, registrarse e iniciar sesión . Una vez autenticados, pueden acceder a sus datos, modificarlos, consultar sus propias reservas, realizar nuevas reservas y modificarlas.

Por otro lado, los administradores disponen de funcionalidades adicionales para gestionar usuarios, pistas y reservas globales del sistema.

### 1.3 Perfiles de usuario: USER y ADMIN

La aplicación contempla dos tipos principales de usuario:

#### Usuario estándar — USER

El usuario con rol `USER` representa a un cliente del club de pádel. Sus funcionalidades principales son:

- Registrarse en la aplicación.
- Iniciar sesión.
- Consultar las pistas disponibles.
- Ver la disponibilidad de una pista en una fecha concreta.
- Crear nuevas reservas.
- Consultar sus propias reservas.
- Modificar o cancelar sus reservas.
- Consultar y modificar sus datos personales.

#### Administrador — ADMIN

El usuario con rol `ADMIN` representa al personal encargado de gestionar la aplicación. Además de poder acceder a funcionalidades generales, dispone de permisos especiales para:

- Consultar el listado de usuarios.
- Modificar usuarios.
- Dar de baja usuarios mediante baja lógica.
- Crear nuevas pistas.
- Modificar pistas existentes.
- Desactivar pistas.
- Consultar todas las reservas del sistema.
- Filtrar reservas por fecha, pista o usuario. y modificarlas

De esta forma, la aplicación diferencia claramente entre las acciones disponibles para un usuario normal y las acciones reservadas al administrador.

### 1.4 Funcionalidades principales

Las funcionalidades principales implementadas en el proyecto son:

- Registro de nuevos usuarios.
- Inicio de sesión mediante autenticación.
- Diferenciación entre usuarios normales y administradores.
- Consulta de pistas disponibles.
- Visualización de detalles de cada pista.
- Consulta de disponibilidad por pista y fecha.
- Creación de nuevas reservas.
- Consulta de reservas del usuario autenticado.
- Modificación y cancelación de reservas.
- Gestión de usuarios por parte del administrador.
- Gestión de pistas por parte del administrador.
- Consulta global de reservas por parte del administrador.
- Comunicación entre frontend y backend mediante `fetch`.
- Persistencia de datos mediante base de datos H2.
- Carga inicial de datos de prueba para usuarios, roles, pistas y reservas.
  
---

## 2. Equipo de trabajo y organización SCRUM

### 2.1 Integrantes del grupo
### 2.2 Roles del equipo
### 2.3 Organización mediante SCRUM
### 2.4 Reparto de tareas
### 2.5 Uso de GitHub

---

## 3. Planificación por entregas

### 3.1 Entrega 1 — Backend inicial
### 3.2 Entrega 2 — Backend con persistencia, seguridad y validaciones
### 3.3 Entrega 3 — Frontend HTML y CSS
### 3.4 Entrega 4 — JavaScript e integración frontend-backend

---

## 4. Tecnologías utilizadas

### 4.1 Backend
### 4.2 Frontend
### 4.3 Base de datos
### 4.4 Herramientas de desarrollo

---

## 5. Estructura del proyecto

### 5.1 Organización general del repositorio
### 5.2 Carpeta backend
### 5.3 Archivos HTML
### 5.4 Carpeta js
### 5.5 Carpeta img
### 5.6 Hoja de estilos CSS

---

## 6. Arquitectura de la aplicación

### 6.1 Separación entre backend y frontend
### 6.2 Comunicación mediante API REST
### 6.3 Flujo general de funcionamiento
### 6.4 Diferencias entre usuario y administrador

---

## 7. Backend

### 7.1 Estructura del backend con Spring Boot
### 7.2 Entidades principales
### 7.3 Repositorios JPA
### 7.4 Servicios
### 7.5 Controladores REST
### 7.6 Seguridad y autenticación
### 7.7 Base de datos H2
### 7.8 Gestión de errores

---

## 8. API REST

### 8.1 Endpoints de autenticación
### 8.2 Endpoints de usuarios
### 8.3 Endpoints de pistas
### 8.4 Endpoints de disponibilidad
### 8.5 Endpoints de reservas
### 8.6 Endpoints de administración

---

## 9. Frontend y capturas de la interfaz

### 9.1 Diseño general del frontend
### 9.2 Página principal

<!-- Captura de la página principal -->
<!-- ![Página principal](img/capturas/index.png) -->

### 9.3 Registro de usuario

<!-- Captura del registro -->
<!-- ![Registro](img/capturas/registro.png) -->

### 9.4 Inicio de sesión

<!-- Captura del login -->
<!-- ![Login](img/capturas/login.png) -->

### 9.5 Listado de pistas

<!-- Captura del listado de pistas -->
<!-- ![Listado de pistas](img/capturas/pistas.png) -->

### 9.6 Detalle de pista

<!-- Captura del detalle de pista -->
<!-- ![Detalle de pista](img/capturas/pista_detalle.png) -->

### 9.7 Nueva reserva

<!-- Captura de nueva reserva -->
<!-- ![Nueva reserva](img/capturas/reserva_nueva.png) -->

### 9.8 Mis reservas

<!-- Captura de reservas del usuario -->
<!-- ![Mis reservas](img/capturas/reservas.png) -->

### 9.9 Panel de administración de pistas

<!-- Captura de administración de pistas -->
<!-- ![Administración de pistas](img/capturas/admin_pistas.png) -->

### 9.10 Panel de administración de usuarios

<!-- Captura de administración de usuarios -->
<!-- ![Administración de usuarios](img/capturas/admin_usuarios.png) -->

### 9.11 Panel de administración de reservas

<!-- Captura de administración de reservas -->
<!-- ![Administración de reservas](img/capturas/admin_reservas.png) -->

---

## 10. JavaScript e integración con el backend

### 10.1 Registro de usuarios
### 10.2 Inicio de sesión
### 10.3 Gestión de sesión y roles
### 10.4 Carga dinámica de pistas
### 10.5 Creación de reservas
### 10.6 Funcionalidades de administrador
### 10.7 Uso de fetch y Basic Auth

---

## 11. Funcionalidades implementadas

### 11.1 Registro e inicio de sesión
### 11.2 Consulta de pistas
### 11.3 Consulta de disponibilidad
### 11.4 Creación de reservas
### 11.5 Consulta de reservas propias
### 11.6 Gestión de pistas
### 11.7 Gestión de usuarios
### 11.8 Gestión global de reservas

---

## 12. Instalación y ejecución

### 12.1 Requisitos previos
### 12.2 Clonar el repositorio
### 12.3 Ejecutar el backend
### 12.4 Acceder a H2
### 12.5 Abrir el frontend
### 12.6 Usuarios de prueba

---

## 13. Pruebas realizadas

### 13.1 Pruebas del backend
### 13.2 Pruebas de endpoints REST
### 13.3 Pruebas del frontend
### 13.4 Pruebas de integración

---

## 14. Problemas encontrados y soluciones

### 14.1 Seguridad y autenticación
### 14.2 CORS e integración con JavaScript
### 14.3 Persistencia y carga de datos
### 14.4 Organización de páginas HTML
### 14.5 Control de versiones con GitHub

---

## 15. Mejoras futuras

### 15.1 Mejoras funcionales
### 15.2 Mejoras visuales
### 15.3 Mejoras de seguridad
### 15.4 Despliegue de la aplicación

---

## 16. Conclusiones

### 16.1 Resultados obtenidos
### 16.2 Aprendizajes técnicos
### 16.3 Valoración del trabajo en equipo

---

## 17. Bibliografía y recursos

### 17.1 Documentación oficial
### 17.2 Material de clase
### 17.3 Herramientas de apoyo
