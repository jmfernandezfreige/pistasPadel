<p align="center">
  <img width="200" height="200" alt="logo_arena_padel_club" src="https://github.com/user-attachments/assets/4d5c741c-2ba4-4f87-af4f-055c1a53c81f" />
</p>
<h1 align="center">PistasPadel — Arena Padel Club</h1>


## Presentación del proyecto

Este documento recoge la descripción completa del proyecto **PistasPadel — Arena Padel Club**, una aplicación web desarrollada como práctica de la asignatura **Programación de Aplicaciones Telemáticas**.

A lo largo del README se detallan los objetivos de la práctica, la organización del equipo, la planificación por entregas, la arquitectura de la aplicación, las tecnologías utilizadas y las principales funcionalidades implementadas. También se incluye información sobre la base de datos inicial, el funcionamiento del backend, la interfaz frontend y la integración realizada mediante JavaScript.

A continuación, se explica el proyecto de forma estructurada, comenzando por una descripción general de la aplicación y de los perfiles de usuario disponibles.

---

> [!NOTE]
> **BASE DE DATOS INICIALIZADA**
>
> Al ejecutar el backend, la aplicación carga automáticamente una base de datos inicial con roles, usuarios, pistas y reservas de prueba.  
> Estos datos permiten probar rápidamente las funcionalidades principales de la aplicación sin tener que crearlos manualmente.
>
>## Datos iniciales de prueba
>
>### Roles iniciales
>
>| ID | Rol | Descripción |
>|---|---|---|
>| 1 | `USER` | Usuario estándar del sistema |
>| 2 | `ADMIN` | Administrador con control total |
>
>### Usuarios iniciales
>
>| ID | Rol | Nombre | Email | Contraseña | Teléfono | Estado |
>|---|---|---|---|---|---|---|
>| 1 | `ADMIN` | Pepe Fernández Freige | `pepe@gmail.com` | `1234` | `600111222` | Activo |
>| 2 | `USER` | Isabel Alonso Casas | `isabel@gmail.com` | `1234` | `600333444` | Activo |
>
>### Pistas iniciales
>
>| ID | Nombre | Ubicación | Precio/hora | Estado |
>|---|---|---|---|---|
>| 1 | Pista Central | Pabellón Norte - Interior | 15.50 € | Activa |
>| 2 | Pista 2 | Complejo Sur - Exterior | 10.00 € | Activa |
>| 3 | Pista 3 | Complejo Sur - Exterior | 10.00 € | Inactiva |
>
>### Reservas iniciales
>
>| ID | Usuario | Pista | Fecha | Hora inicio | Hora fin | Duración | Estado |
>|---|---|---|---|---|---|---|---|
>| 1 | Isabel Alonso Casas | Pista Central | 2026-03-20 | 10:00 | 11:30 | 90 min | Activa |
>| 2 | Isabel Alonso Casas | Pista 2 | 2026-03-22 | 18:00 | 19:00 | 60 min | Cancelada |

> [!IMPORTANT]
> Estos datos son únicamente datos de prueba para la práctica. Las contraseñas se han definido de forma sencilla para facilitar la ejecución local del proyecto y no deberían almacenarse así en un entorno real.

---

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

El proyecto se ha desarrollado en equipo, siguiendo una organización basada en pequeñas tareas repartidas por entregas. Para facilitar la coordinación, se aplicó una metodología inspirada en SCRUM, dividiendo el trabajo en fases: backend, frontend HTML/CSS e integración mediante JavaScript.

Esta forma de trabajo permitió avanzar de manera progresiva, revisar cada parte por separado y comprobar el funcionamiento de la aplicación antes de integrar todo el proyecto en el repositorio final.

### 2.1 Integrantes del grupo

| Integrante | Participación en el proyecto |
|---|---|
| Bibiana Dorado Mateos | Desarrollo técnico, coordinación de código y apoyo en la implementación |
| Pepe Fernández Freige | Análisis de errores, revisión de lógica y validación de todo el funcionamiento |
| Guillermo Fuentes González | Pruebas, control de calidad y revisión previa a entregas |
| Isabel Alonso Casas | Organización de tareas, planificación del trabajo y documentación |

### 2.2 Roles del equipo

Como el equipo estaba formado por cuatro personas, se repartieron los roles de la siguiente manera:

| Integrante | Rol asignado | Responsabilidad principal |
|---|---|---|
| Pepe Fernández Freige | Analista | Detección de errores, revisión de la lógica del proyecto y análisis del funcionamiento general |
| Bibiana Dorado Mateos | Program Manager | Coordinación de la parte técnica y apoyo en el desarrollo del código |
| Guillermo Fuentes González | Release Manager / QA | Realización de pruebas y comprobación del correcto funcionamiento antes de cada entrega |
| Isabel Alonso Casas | Scrum Master | Organización de tareas, planificación del trabajo y seguimiento de las entregas |

Esta división permitió que cada miembro tuviera una responsabilidad clara dentro del proyecto, evitando duplicar trabajo y facilitando la organización del equipo. Aunque todos los integrantes trabajaron de manera activa en todas las partes del proyecto sobretodo implementado código. 

### 2.3 Organización mediante SCRUM

La metodología de trabajo se basó en dividir el proyecto en tareas pequeñas y revisables. Cada entrega funcionó como una fase de desarrollo independiente, con objetivos concretos y comprobaciones antes de avanzar a la siguiente parte.

La organización seguida fue la siguiente:

| Fase | Objetivo principal | Resultado |
|---|---|---|
| Backend inicial | Definir la estructura básica del backend y los primeros endpoints | API REST inicial con records, controladores y pruebas en Postman |
| Backend avanzado | Añadir persistencia, seguridad, validaciones y lógica de negocio | Backend conectado a base de datos H2 con entidades, repositorios y servicios |
| Frontend HTML/CSS | Crear las páginas visuales de la aplicación | Interfaz completa estática para usuario y administrador |
| JavaScript e integración | Conectar el frontend con el backend | Aplicación funcional con peticiones `fetch`, autenticación y gestión dinámica de datos |

Para controlar el avance, se prepararon tablas de tareas por entrega, indicando qué había que implementar, dónde se localizaba cada parte y si estaba completada y comprobada.

### 2.4 Reparto de tareas

#### Entrega 1 — Backend inicial

En la primera entrega se desarrolló la base del backend, creando los modelos iniciales, los primeros endpoints REST, las restricciones principales y las pruebas con Postman.

| Tarea | Localización | Estado | Comentario |
|---|---|---|---|
| Record `Usuario` | Carpeta records / modelo | Completado | Representación inicial del usuario |
| Record `Pista` | Carpeta records / modelo | Completado | Representación inicial de las pistas |
| Record `Reserva` | Carpeta records / modelo | Completado | Representación inicial de las reservas |
| Record `Disponibilidad` | Lógica de reservas | Completado | Finalmente se implementó mediante la lógica de disponibilidad de reservas |
| Record `Rol` | Carpeta records / modelo | Completado | Diferenciación entre usuario normal y administrador |
| Trazas | Backend | Completado | Utilizadas para comprobar el funcionamiento del servidor |
| Tareas programadas | Clase de tareas programadas | Completado | Envío o ejecución de tareas automáticas |
| Pruebas | Tests / Postman | Completado | Comprobación inicial de endpoints |
| `POST /pistaPadel/auth/register` | Controller | Completado | Registro de usuario |
| `POST /pistaPadel/auth/login` | Seguridad | Completado | Inicio de sesión |
| `POST /pistaPadel/auth/logout` | Seguridad | Completado | Cierre de sesión |
| `GET /pistaPadel/auth/me` | Controller | Completado | Consulta del usuario autenticado |
| `GET /pistaPadel/users` | Controller | Completado | Listado de usuarios |
| `GET /pistaPadel/users/{userId}` | Controller | Completado | Consulta de un usuario concreto |
| `PATCH /pistaPadel/users/{userId}` | Controller | Completado | Modificación de datos de usuario |
| `POST /pistaPadel/courts` | Controller | Completado | Creación de pistas |
| `GET /pistaPadel/courts` | Controller | Completado | Listado de pistas |
| `GET /pistaPadel/courts/{courtId}` | Controller | Completado | Detalle de una pista |
| `PATCH /pistaPadel/courts/{courtId}` | Controller | Completado | Modificación de pista |
| `DELETE /pistaPadel/courts/{courtId}` | Controller | Completado | Eliminación o desactivación de pista |
| `GET /pistaPadel/availability` | Controller | Completado | Consulta de disponibilidad |
| `GET /pistaPadel/courts/{courtId}/availability` | Controller | Completado | Disponibilidad de una pista concreta |
| `POST /pistaPadel/reservations` | Controller | Completado | Creación de reservas |
| `GET /pistaPadel/reservations` | Controller | Completado | Consulta de reservas del usuario |
| `GET /pistaPadel/reservations/{reservationId}` | Controller | Completado | Detalle de una reserva |
| `DELETE /pistaPadel/reservations/{reservationId}` | Controller | Completado | Cancelación de reserva |
| `PATCH /pistaPadel/reservations/{reservationId}` | Controller | Completado | Modificación de reserva |
| `GET /pistaPadel/admin/reservations` | Controller | Completado | Consulta global de reservas para administrador |
| Restricción: email único | Registro de usuario | Completado | Evita usuarios duplicados |
| Restricción: un usuario puede tener varias reservas | Usuario / Reserva | Completado | Relación usuario-reservas |
| Restricción: solo ADMIN gestiona pistas | Seguridad | Completado | Control mediante autorización |
| Restricción: nombre de pista único | Pista | Completado | Evita duplicar pistas |
| Restricción: una pista puede tener varias reservas | Pista / Reserva | Completado | Relación pista-reservas |
| Restricción: no reservar pista inactiva | Lógica de reservas | Completado | Evita reservas sobre pistas no disponibles |
| Restricción: evitar reservas solapadas | Lógica de reservas | Completado | Control de disponibilidad horaria |
| Restricción: usuario solo modifica o cancela sus reservas | Seguridad / Reservas | Completado | Control de permisos |
| Restricción: reserva asociada a usuario y pista | Reserva | Completado | Relación correcta entre entidades |

#### Entrega 2 — Backend con persistencia, seguridad y validaciones

En la segunda parte del backend se evolucionó la aplicación para trabajar con persistencia real, entidades JPA, repositorios, servicios, seguridad y una base de datos H2 inicializada con datos de prueba.

| Tarea | Localización | Estado | Comentario |
|---|---|---|---|
| Entidad `Usuario` | Backend / entidades | Completado | Usuario persistente en base de datos |
| Entidad `Rol` | Backend / entidades | Completado | Gestión de roles `USER` y `ADMIN` |
| Entidad `Pista` | Backend / entidades | Completado | Gestión de pistas persistentes |
| Entidad `Reserva` | Backend / entidades | Completado | Reservas asociadas a usuario y pista |
| Repositorio de usuarios | Backend / repositorios | Completado | Acceso a datos de usuarios |
| Repositorio de pistas | Backend / repositorios | Completado | Acceso a datos de pistas |
| Repositorio de reservas | Backend / repositorios | Completado | Acceso a datos de reservas |
| Servicios de lógica de negocio | Backend / servicios | Completado | Separación entre controlador y lógica |
| Controladores REST separados | Backend / controladores | Completado | Controladores de usuarios, pistas y reservas |
| Seguridad con roles | Configuración de seguridad | Completado | Diferenciación entre `USER` y `ADMIN` |
| Autenticación | Spring Security | Completado | Acceso protegido a endpoints privados |
| Base de datos H2 | `application.properties` | Completado | Persistencia local del proyecto |
| Carga inicial de datos | `data.sql` | Completado | Usuarios, roles, pistas y reservas de prueba |
| Validaciones | Entidades / controladores | Completado | Validación de datos enviados al backend |
| Control de errores | Backend | Completado | Respuestas controladas ante errores |
| Pruebas de endpoints | Postman / navegador | Completado | Comprobación del funcionamiento de la API |
| Pruebas | Tests / Postman | Completado | Comprobación mediante test end to end y otros |

#### Entrega 3 — Frontend HTML y CSS

En esta entrega se diseñó la parte visual de la aplicación. Se crearon las páginas HTML necesarias para los distintos flujos de usuario y administrador, junto con una hoja de estilos común para mantener una estética uniforme.

| Página / archivo | Función | Estado |
|---|---|---|
| `index.html` | Página principal sin iniciar sesión | Completado |
| `login.html` | Formulario de inicio de sesión | Completado |
| `registro.html` | Formulario para registrar un nuevo usuario | Completado |
| `index_log_user.html` | Página principal con usuario logueado | Completado |
| `index_log_admin.html` | Página principal con administrador logueado | Completado |
| `pistas.html` | Listado general de pistas | Completado |
| `pista_detalle.html` | Vista de una pista concreta con información y disponibilidad | Completado |
| `usuario_detalle.html` | Página para que el usuario consulte y edite sus datos | Completado |
| `usuario_reservas.html` | Página donde el usuario ve sus reservas | Completado |
| `usuario_reserva_detalle.html` | Vista de una reserva concreta con opción de modificar o cancelar | Completado |
| `usuario_reserva_nueva.html` | Formulario para crear una nueva reserva | Completado |
| `admin_usuarios.html` | Listado completo de usuarios para administrador | Completado |
| `admin_usuario_detalle.html` | Vista de detalle/modificación de usuarios para administrador | Completado |
| `admin_pistas.html` | Listado de pistas para administrador | Completado |
| `admin_pista_detalle.html` | Detalle de pista con acciones de administrador | Completado |
| `admin_pista_form.html` | Formulario para crear o modificar pistas | Completado |
| `admin_reservas.html` | Página donde el administrador ve todas las reservas | Completado |
| `admin_reserva_detalle.html` | Vista detalle de una reserva desde el perfil administrador | Completado |
| `styles.css` | Hoja de estilos general de la aplicación | Completado |

En esta fase algunas páginas estaban separadas según el tipo de usuario. Posteriormente, durante la integración con JavaScript, varias de estas vistas se unificaron para evitar duplicidad y mostrar opciones diferentes según el rol autenticado.

#### Entrega 4 — JavaScript e integración frontend-backend

En la última entrega se conectó el frontend con el backend mediante JavaScript. El objetivo principal fue transformar las páginas estáticas en páginas dinámicas, capaces de consultar datos reales del backend y enviar formularios mediante peticiones `fetch`.

| Archivo JavaScript | Función principal | Estado |
|---|---|---|
| `sesion.js` | Gestiona la cabecera según el estado de sesión y el rol del usuario | Completado |
| `login.js` | Envía las credenciales al backend y guarda el token de autenticación | Completado |
| `registro.js` | Envía el formulario de registro al backend y valida que las contraseñas coincidan | Completado |
| `index.js` | Se decidió no crear JS específico, sino fusionar las páginas de inicio usando `sesion.js` | Completado |
| `usuario_detalle.js` | Unifica la vista de datos de usuario y administrador, permitiendo consultar y modificar información | Completado |
| `pista_detalle.js` | Unifica las vistas de detalle de pista y adapta las acciones según el rol | Completado |
| `pistas.js` | Carga dinámicamente las pistas y muestra acciones diferentes para usuario o administrador | Completado |
| `reservas.js` | Carga reservas del usuario o reservas globales para administrador según corresponda | Completado |
| `reserva_detalle.js` | Permite consultar, modificar o cancelar una reserva concreta | Completado |
| `reserva_nueva.js` | Carga pistas y horarios disponibles, y envía el POST para crear una nueva reserva | Completado |
| `admin_usuarios.js` | Carga todos los usuarios y los muestra dinámicamente en el HTML | Completado |
| `admin_usuario_form.js` | Gestiona el formulario de creación o modificación de usuarios | Completado |
| `admin_pista_form.js` | Gestiona la creación y modificación de pistas mediante POST o PATCH | Completado |

Esta organización permitió implementar el proyecto mediante tareas pequeñas, claras y comprobables. Además, facilitó la integración final, ya que cada archivo JavaScript tenía una responsabilidad concreta dentro de la aplicación.

### 2.5 Uso de GitHub

Durante el desarrollo del proyecto se utilizó GitHub como herramienta principal de control de versiones y organización del código.

En las primeras entregas se trabajó con repositorios separados para evitar mezclar el backend con el frontend antes de que ambas partes estuvieran correctamente implementadas. De esta forma, el backend pudo desarrollarse y probarse de manera independiente, mientras que el frontend HTML/CSS se diseñó por separado.

Una vez que ambas partes estuvieron suficientemente avanzadas, en la última entrega se integró todo en un único repositorio final.

---

## 3. Tecnologías utilizadas

En el desarrollo del proyecto se han utilizado distintas tecnologías para separar correctamente la parte del backend, la interfaz frontend, la base de datos y las herramientas de trabajo. Esta separación ha permitido desarrollar cada parte de forma independiente y posteriormente integrarlas en una única aplicación funcional.

### 3.1 Backend
El backend se ha desarrollado en **Java** utilizando **Spring Boot** como framework principal. Esta parte de la aplicación se encarga de gestionar la lógica del sistema, los usuarios, las pistas, las reservas, la seguridad y la comunicación con la base de datos. Para programar y ejecutar el backend se ha utilizado **IntelliJ IDEA**.

### 3.2 Frontend
El frontend se ha desarrollado con **HTML**, **CSS** y **JavaScript**. HTML se ha utilizado para estructurar las páginas, CSS para definir el diseño visual de la aplicación y JavaScript para hacer que las páginas sean dinámicas y puedan comunicarse con el backend. Para esta parte se ha utilizado **Visual Studio Code**.

### 3.3 Base de datos
Como base de datos se ha utilizado **H2**, una base de datos ligera que permite trabajar de forma sencilla durante el desarrollo de la práctica. En ella se almacenan los usuarios, los roles, las pistas y las reservas. Además, se ha usado un archivo `data.sql` para cargar datos iniciales de prueba al arrancar la aplicación.

### 3.4 Herramientas de desarrollo
Para organizar el trabajo se ha utilizado **Git** como sistema de control de versiones y **GitHub** como repositorio remoto. También se ha usado **Postman** para probar los endpoints del backend y comprobar que las peticiones funcionaban correctamente antes de conectarlas con el frontend.

---

## 4. Estructura del proyecto

El proyecto está organizado separando las distintas partes de la aplicación: el backend, las páginas HTML, los archivos JavaScript, las imágenes y la hoja de estilos. Esta organización facilita el mantenimiento del código y permite diferenciar claramente la parte visual, la lógica del frontend y la lógica del servidor.


### 4.1 Organización general del repositorio
La estructura general del repositorio es la siguiente:

```text
pistasPadel/
│
├── backend/
│   └── Código del backend desarrollado con Java y Spring Boot
│
├── js/
│   └── Archivos JavaScript encargados de la lógica dinámica del frontend
│
├── img/
│   └── Imágenes utilizadas en la interfaz de la aplicación
│
├── index.html
├── login.html
├── registro.html
├── pistas.html
├── pista_detalle.html
├── reservas.html
├── reserva_detalle.html
├── reserva_nueva.html
├── admin_usuarios.html
├── admin_usuario_form.html
├── admin_pista_form.html
│
├── styles.css
└── README.md
```
De esta forma, el repositorio queda dividido en dos grandes bloques: por un lado, el backend, encargado de la lógica de negocio y la base de datos; y por otro lado, el frontend, formado por las páginas HTML, los estilos CSS, las imágenes y los archivos JavaScript.

### 4.2 Carpeta `backend`

La carpeta `backend` contiene toda la parte del servidor de la aplicación. Está desarrollada en **Java** con **Spring Boot** y se encarga de gestionar la lógica de negocio, la seguridad, la base de datos y los endpoints REST utilizados por el frontend.

La estructura principal del backend es la siguiente:

```text
backend/
│
├── .mvn/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── edu.comillas.icai.gitt.pat.spring.practica_final/
│   │   │       │
│   │   │       ├── controlador/
│   │   │       │   ├── PistaControlador.java
│   │   │       │   ├── ReservasControlador.java
│   │   │       │   └── UsuarioControlador.java
│   │   │       │
│   │   │       ├── entidad/
│   │   │       │   ├── Pista.java
│   │   │       │   ├── Reserva.java
│   │   │       │   ├── Rol.java
│   │   │       │   └── Usuario.java
│   │   │       │
│   │   │       ├── repositorio/
│   │   │       │   ├── RepoPista.java
│   │   │       │   ├── RepoReserva.java
│   │   │       │   ├── RepoRol.java
│   │   │       │   └── RepoUsuario.java
│   │   │       │
│   │   │       ├── servicio/
│   │   │       │   ├── ServicioPistas.java
│   │   │       │   ├── ServicioReservas.java
│   │   │       │   └── ServicioUsuarios.java
│   │   │       │
│   │   │       ├── ConfiguracionSeguridad.java
│   │   │       ├── ControladorGlobalDeErrores.java
│   │   │       ├── ModeloError.java
│   │   │       ├── PracticaFinalApplication.java
│   │   │       └── TareasProgramadas.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql
│   │
│   └── test/
│
└── pom.xml
```

El backend está dividido en varias capas para separar responsabilidades y mantener el código organizado.

#### Controladores

Los controladores son las clases que reciben las peticiones HTTP del frontend y exponen los endpoints REST de la aplicación.

| Archivo | Función |
|---|---|
| `PistaControlador.java` | Gestiona los endpoints relacionados con pistas y disponibilidad |
| `ReservasControlador.java` | Gestiona los endpoints relacionados con reservas |
| `UsuarioControlador.java` | Gestiona los endpoints relacionados con usuarios y autenticación |

#### Entidades

Las entidades representan las tablas principales de la base de datos. Cada entidad se corresponde con un elemento importante del sistema.

| Archivo | Función |
|---|---|
| `Usuario.java` | Representa a los usuarios registrados en la aplicación |
| `Rol.java` | Representa los roles del sistema: `USER` y `ADMIN` |
| `Pista.java` | Representa las pistas de pádel disponibles en el club |
| `Reserva.java` | Representa las reservas realizadas por los usuarios |

#### Repositorios

Los repositorios permiten acceder a la base de datos mediante Spring Data JPA. Se encargan de realizar consultas, guardar datos, buscar registros o eliminarlos.

| Archivo | Función |
|---|---|
| `RepoUsuario.java` | Acceso a los datos de usuarios |
| `RepoRol.java` | Acceso a los datos de roles |
| `RepoPista.java` | Acceso a los datos de pistas |
| `RepoReserva.java` | Acceso a los datos de reservas |

#### Servicios

Los servicios contienen la lógica de negocio de la aplicación. En ellos se realizan comprobaciones como validar usuarios, comprobar disponibilidad, evitar reservas solapadas o controlar permisos.

| Archivo | Función |
|---|---|
| `ServicioUsuarios.java` | Lógica relacionada con usuarios, registro, consulta y modificación |
| `ServicioPistas.java` | Lógica relacionada con pistas y disponibilidad |
| `ServicioReservas.java` | Lógica relacionada con creación, consulta, modificación y cancelación de reservas |

#### Clases generales del backend

Además de las capas principales, el backend incluye otras clases necesarias para la configuración y funcionamiento global de la aplicación.

| Archivo | Función |
|---|---|
| `PracticaFinalApplication.java` | Clase principal que arranca la aplicación Spring Boot |
| `ConfiguracionSeguridad.java` | Configura la seguridad, autenticación, autorización, CORS y Basic Auth |
| `ControladorGlobalDeErrores.java` | Gestiona los errores globales de la aplicación |
| `ModeloError.java` | Modelo utilizado para devolver errores de forma estructurada |
| `TareasProgramadas.java` | Contiene tareas automáticas programadas |

#### Recursos del backend

La carpeta `resources` contiene archivos de configuración y datos iniciales.

| Archivo | Función |
|---|---|
| `application.properties` | Configuración de Spring Boot, H2, JPA y otros parámetros del backend |
| `data.sql` | Inserta datos iniciales de prueba en la base de datos |

Por último, el archivo `pom.xml` contiene la configuración de Maven y las dependencias necesarias para ejecutar el backend, como Spring Boot, Spring Web, Spring Data JPA, Spring Security, H2 y las herramientas de validación.

### 4.3 Archivos HTML

Los archivos HTML forman la estructura visual de la aplicación. Cada archivo representa una pantalla o vista concreta del sistema.

En un primer momento se crearon varias páginas separadas para usuario y administrador. Posteriormente, con la integración de JavaScript, algunas vistas se unificaron para evitar duplicidad y mostrar contenido diferente según el rol del usuario autenticado.

| Archivo HTML | Función |
|---|---|
| `index.html` | Página principal de la aplicación |
| `login.html` | Formulario de inicio de sesión |
| `registro.html` | Formulario para crear una nueva cuenta |
| `pistas.html` | Listado general de pistas |
| `pista_detalle.html` | Vista detallada de una pista concreta |
| `reservas.html` | Listado de reservas del usuario o del administrador |
| `reserva_detalle.html` | Vista de detalle de una reserva concreta |
| `reserva_nueva.html` | Formulario para crear una nueva reserva |
| `admin_usuarios.html` | Listado de usuarios para el administrador |
| `admin_usuario_form.html` | Formulario para consultar o modificar usuarios |
| `admin_pista_form.html` | Formulario para crear o modificar pistas |

Gracias a estos archivos se construye toda la parte visible de la aplicación, que después se completa con estilos CSS y funcionalidad JavaScript.

### 4.4 Carpeta js

La carpeta `js` contiene los archivos JavaScript que permiten conectar el frontend con el backend y hacer que las páginas sean dinámicas.

Estos archivos se encargan de capturar formularios, realizar peticiones `fetch`, guardar datos de sesión, cargar información desde el backend y modificar el contenido HTML según el rol del usuario.

| Archivo JavaScript | Función |
|---|---|
| `sesion.js` | Gestiona la cabecera según si el usuario está logueado y según su rol |
| `login.js` | Gestiona el inicio de sesión |
| `registro.js` | Gestiona el registro de nuevos usuarios |
| `pistas.js` | Carga dinámicamente el listado de pistas |
| `pista_detalle.js` | Muestra la información de una pista concreta |
| `reservas.js` | Carga las reservas del usuario o las reservas globales del administrador |
| `reserva_detalle.js` | Gestiona el detalle, modificación o cancelación de una reserva |
| `reserva_nueva.js` | Carga pistas y horarios disponibles, y permite crear una nueva reserva |
| `admin_usuarios.js` | Carga y muestra el listado de usuarios para el administrador |
| `admin_usuario_form.js` | Gestiona la modificación de datos de usuarios |
| `admin_pista_form.js` | Gestiona la creación y modificación de pistas |

Esta carpeta es fundamental en la última fase del proyecto, ya que permite que el frontend deje de ser estático y pase a trabajar con datos reales obtenidos del backend.

### 4.5 Carpeta img

### 4.6 Hoja de estilos CSS

---

## 5. Arquitectura de la aplicación

### 5.1 Separación entre backend y frontend
### 5.2 Comunicación mediante API REST
### 5.3 Flujo general de funcionamiento
### 5.4 Diferencias entre usuario y administrador

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
