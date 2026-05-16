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
>| 1 | Isabel Alonso Casas | Pista Central | 2026-03-20 | 10:00 | 11:00 | 60 min | Activa |
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

La carpeta `img` contiene las imágenes utilizadas en la interfaz de la aplicación, como el logotipo del club y otros recursos visuales.

### 4.6 Hoja de estilos CSS

El archivo `styles.css` contiene los estilos generales de la aplicación.

En esta hoja se definen los colores, tipografías, botones, formularios, cabecera, pie de página, listados, tarjetas, secciones y diseño responsive. Gracias a este archivo, todas las páginas mantienen una estética común y coherente.

El uso de una única hoja de estilos principal permite reutilizar clases CSS en distintas páginas y evita repetir estilos en cada archivo HTML.

---

## 5. Arquitectura de la aplicación

La aplicación sigue una arquitectura separada entre **frontend** y **backend**. El frontend se encarga de mostrar la interfaz al usuario y recoger sus acciones, mientras que el backend gestiona la lógica de negocio, la seguridad, la base de datos y las respuestas a las peticiones.

Esta separación permite que cada parte tenga una responsabilidad clara y que la comunicación entre ambas se realice mediante una API REST.

### 5.1 Separación entre backend y frontend

El proyecto está dividido en dos partes principales:

| Parte | Función |
|---|---|
| Backend | Gestiona usuarios, pistas, reservas, seguridad, validaciones y base de datos |
| Frontend | Muestra la interfaz, recoge datos de formularios y realiza peticiones al backend |

El backend no genera directamente las páginas HTML, sino que devuelve datos en formato JSON. El frontend recibe esos datos y los muestra dinámicamente en la interfaz mediante JavaScript.

### 5.2 Comunicación mediante API REST

La comunicación entre frontend y backend se realiza mediante peticiones HTTP a los endpoints definidos en el backend.

Desde JavaScript se utiliza `fetch` para realizar operaciones como:

- Registrar usuarios.
- Iniciar sesión.
- Consultar pistas.
- Consultar disponibilidad.
- Crear reservas.
- Modificar usuarios, pistas o reservas.
- Eliminar o desactivar elementos desde el perfil administrador.

Las respuestas del backend se reciben normalmente en formato JSON y se utilizan para actualizar el contenido de las páginas HTML.


### 5.3 Flujo general de funcionamiento

El funcionamiento general de la aplicación es el siguiente:

1. El usuario accede al frontend desde el navegador.
2. El frontend muestra la interfaz inicial.
3. Si el usuario realiza una acción, JavaScript envía una petición al backend.
4. El backend procesa la petición, aplica la lógica correspondiente y consulta la base de datos si es necesario.
5. El backend devuelve una respuesta.
6. El frontend interpreta esa respuesta y actualiza la página.

Por ejemplo, al crear una reserva, el usuario selecciona pista, fecha y hora en el frontend. Después, JavaScript envía esos datos al backend, que comprueba si la pista existe, si el horario está disponible y si el usuario tiene permisos para realizar la reserva.


### 5.4 Diferencias entre usuario y administrador

La aplicación diferencia entre usuarios normales y administradores mediante roles.

| Rol | Funcionalidades principales |
|---|---|
| `USER` | Consultar pistas, crear reservas, ver sus reservas y modificar sus datos |
| `ADMIN` | Gestionar usuarios, pistas y reservas globales del sistema |

Esta diferencia se aplica en dos niveles:

- En el **backend**, mediante seguridad y control de permisos.
- En el **frontend**, mostrando botones, menús y páginas diferentes según el rol del usuario autenticado.

De esta forma, un usuario normal solo puede acceder a sus propias funcionalidades, mientras que el administrador dispone de opciones adicionales de gestión.

---

## 6. Backend

El backend de la aplicación está desarrollado con **Java** y **Spring Boot**. Su función principal es recibir las peticiones del frontend, aplicar la lógica de negocio, comprobar la seguridad, acceder a la base de datos y devolver respuestas en formato JSON.

La aplicación no genera las páginas HTML desde el backend, sino que funciona como una **API REST**. Por tanto, el frontend se comunica con el servidor mediante peticiones HTTP realizadas con JavaScript.


### 6.1 Estructura del backend con Spring Boot

El backend está organizado por capas, separando las responsabilidades principales del proyecto. Esta estructura permite que el código sea más claro, mantenible y fácil de ampliar.

```text
backend/
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

El flujo general del backend es el siguiente:

```text
Frontend
   │
   │ Petición HTTP con fetch
   ▼
Spring Security
   │
   │ Comprueba autenticación y permisos
   ▼
Controlador REST
   │
   │ Recibe la petición y llama al servicio correspondiente
   ▼
Servicio
   │
   │ Aplica la lógica de negocio
   ▼
Repositorio JPA
   │
   │ Consulta o modifica la base de datos
   ▼
Base de datos H2
   │
   │ Devuelve los datos solicitados
   ▼
Servicio
   │
   │ Procesa el resultado
   ▼
Controlador REST
   │
   │ Devuelve la respuesta JSON
   ▼
Frontend
```

De esta forma, cada parte del backend tiene una responsabilidad concreta:

| Capa | Función |
|---|---|
| Controladores | Reciben las peticiones HTTP y devuelven respuestas |
| Servicios | Contienen la lógica de negocio |
| Repositorios | Acceden a la base de datos |
| Entidades | Representan las tablas de la base de datos |
| Seguridad | Controla autenticación, roles y permisos |
| Gestión de errores | Devuelve errores claros y estructurados |


### 6.2 Entidades principales

Las entidades representan los elementos principales de la aplicación y se corresponden con las tablas de la base de datos.

| Entidad | Descripción |
|---|---|
| `Usuario` | Representa a los usuarios registrados en la aplicación |
| `Rol` | Representa el tipo de usuario: `USER` o `ADMIN` |
| `Pista` | Representa una pista de pádel del club |
| `Reserva` | Representa una reserva realizada por un usuario sobre una pista |

La entidad `Usuario` almacena los datos personales del usuario, como nombre, apellidos, email, contraseña, teléfono, estado activo y rol asociado.

La entidad `Rol` permite diferenciar entre usuarios normales y administradores. Esta diferencia es importante porque no todos los usuarios tienen los mismos permisos dentro de la aplicación.

La entidad `Pista` contiene la información de cada pista de pádel, como su nombre, ubicación, precio por hora, estado activo y fecha de alta.

La entidad `Reserva` relaciona un usuario con una pista en una fecha y hora concreta. Además, guarda la duración, la hora de inicio, la hora de fin, el estado de la reserva y la fecha de creación.

Las relaciones principales entre entidades son:

| Relación | Explicación |
|---|---|
| Un usuario tiene un rol | Cada usuario puede ser `USER` o `ADMIN` |
| Un usuario puede tener muchas reservas | Un mismo usuario puede reservar varias veces |
| Una pista puede tener muchas reservas | Una pista puede reservarse en diferentes fechas y horas |
| Una reserva pertenece a un usuario y a una pista | Cada reserva concreta une usuario, pista, fecha y hora |


### 6.3 Repositorios JPA

Los repositorios permiten acceder a la base de datos utilizando **Spring Data JPA**. Gracias a ellos, el backend puede buscar, guardar, modificar o consultar datos sin escribir manualmente todas las sentencias SQL.

| Repositorio | Entidad asociada | Función |
|---|---|---|
| `RepoUsuario` | `Usuario` | Gestiona las consultas y operaciones sobre usuarios |
| `RepoRol` | `Rol` | Gestiona el acceso a los roles |
| `RepoPista` | `Pista` | Gestiona las consultas y operaciones sobre pistas |
| `RepoReserva` | `Reserva` | Gestiona las consultas y operaciones sobre reservas |

Los repositorios son utilizados por los servicios. Por ejemplo, cuando se quiere crear una reserva, el servicio necesita consultar primero si existe la pista, buscar al usuario autenticado y comprobar si ya existe otra reserva en la misma franja horaria.

El uso de repositorios permite separar la lógica de acceso a datos de la lógica de negocio.


### 6.4 Servicios

Los servicios contienen la lógica principal de la aplicación. Son una capa intermedia entre los controladores y los repositorios.

| Servicio | Función |
|---|---|
| `ServicioUsuarios` | Gestiona el registro, consulta y modificación de usuarios |
| `ServicioPistas` | Gestiona las pistas y la consulta de disponibilidad |
| `ServicioReservas` | Gestiona la creación, consulta, modificación y cancelación de reservas |

Los servicios son importantes porque evitan que toda la lógica esté dentro de los controladores. En esta capa se realizan las comprobaciones necesarias antes de acceder o modificar la base de datos.

Algunas de las comprobaciones que se realizan en los servicios son:

- Comprobar si un usuario existe.
- Evitar emails duplicados.
- Obtener el usuario autenticado.
- Comprobar si una pista existe.
- Comprobar si una pista está activa.
- Consultar la disponibilidad de una pista.
- Evitar reservas solapadas.
- Calcular la hora de fin de una reserva.
- Asociar una reserva al usuario que ha iniciado sesión.
- Comprobar si un usuario puede ver, modificar o cancelar una reserva.
- Permitir ciertas operaciones solo a administradores.

Por ejemplo, al crear una reserva, el flujo del servicio es:

```text
1. Recibe los datos de la reserva desde el controlador.
2. Comprueba que la pista existe.
3. Comprueba que no haya otra reserva solapada.
4. Obtiene el usuario autenticado.
5. Crea una nueva reserva asociada a ese usuario y a esa pista.
6. Calcula la hora de fin a partir de la hora de inicio y la duración.
7. Guarda la reserva en la base de datos.
8. Devuelve la reserva creada.
```

### 6.5 Controladores REST

Los controladores REST son las clases que reciben las peticiones HTTP realizadas desde el frontend.

| Controlador | Función |
|---|---|
| `UsuarioControlador` | Gestiona usuarios, registro y consulta del usuario autenticado |
| `PistaControlador` | Gestiona pistas y disponibilidad |
| `ReservasControlador` | Gestiona reservas de usuario y reservas de administrador |

Los controladores definen los endpoints mediante anotaciones de Spring como:

| Anotación | Uso |
|---|---|
| `@GetMapping` | Obtener información |
| `@PostMapping` | Crear un nuevo recurso |
| `@PatchMapping` | Modificar parcialmente un recurso |
| `@DeleteMapping` | Eliminar, cancelar o desactivar un recurso |

El controlador no debe contener toda la lógica del proyecto. Su función principal es recibir la petición, recoger los parámetros necesarios, llamar al servicio correspondiente y devolver la respuesta.


### 6.6 Seguridad y autenticación

La seguridad del backend se gestiona mediante **Spring Security**.

La aplicación diferencia entre dos roles principales:

| Rol | Permisos principales |
|---|---|
| `USER` | Crear reservas, consultar sus reservas y modificar sus propios datos |
| `ADMIN` | Gestionar usuarios, pistas y reservas globales |

La autenticación utilizada en la integración con el frontend es **Basic Auth**. Cuando el usuario inicia sesión desde el frontend, JavaScript genera un token a partir del email y la contraseña. Ese token se guarda en `localStorage` y se envía en las peticiones protegidas mediante la cabecera `Authorization`.

El flujo de seguridad es el siguiente:

```text
1. El usuario introduce email y contraseña en el frontend.
2. JavaScript genera el token Basic Auth.
3. El token se envía al backend.
4. Spring Security comprueba las credenciales.
5. Si son correctas, permite acceder al recurso.
6. Si no son correctas, devuelve un error 401.
7. Si el usuario está autenticado pero no tiene permisos suficientes, devuelve un error 403.
```

Además de comprobar si el usuario está autenticado, el backend también comprueba los permisos según el rol.

Por ejemplo:

| Acción | Permiso necesario |
|---|---|
| Registrarse | Público |
| Iniciar sesión | Público |
| Consultar pistas | Público |
| Crear reserva | Usuario autenticado |
| Consultar reservas propias | Usuario autenticado |
| Modificar una reserva propia | Usuario propietario o administrador |
| Crear pista | Administrador |
| Modificar pista | Administrador |
| Desactivar pista | Administrador |
| Consultar todos los usuarios | Administrador |
| Consultar todas las reservas | Administrador |

De esta forma, la aplicación controla la seguridad tanto por autenticación como por autorización.


### 6.7 Base de datos H2

La aplicación utiliza una base de datos **H2**, una base de datos ligera que permite ejecutar el proyecto de forma sencilla en local sin instalar un gestor externo.

La configuración de la base de datos se encuentra en:

```text
src/main/resources/application.properties
```

Los datos iniciales de prueba se cargan desde:

```text
src/main/resources/data.sql
```

En este archivo se insertan inicialmente:

- Roles `USER` y `ADMIN`.
- Usuarios de prueba.
- Pistas iniciales.
- Reservas iniciales.

Además, se puede consultar la base de datos desde la consola H2 accediendo en el navegador a:

```text
http://localhost:8080/h2-console
```

Esta consola permite ver las tablas generadas, consultar los datos almacenados y comprobar si las operaciones realizadas desde el frontend se están guardando correctamente.

El uso de H2 ha sido útil para la práctica porque permite probar rápidamente el backend y reiniciar la base de datos con datos iniciales controlados.


### 6.8 Gestión de errores

El backend incluye una gestión centralizada de errores mediante la clase `ControladorGlobalDeErrores`.

Esta clase permite capturar distintos tipos de errores y devolver respuestas más claras al frontend. En lugar de recibir errores difíciles de interpretar, el frontend puede recibir una respuesta estructurada con información sobre lo que ha ocurrido.

El modelo utilizado para devolver errores es `ModeloError`, que permite incluir información como:

| Campo | Descripción |
|---|---|
| Código de error | Código HTTP asociado al error |
| Mensaje | Explicación del problema |
| Ruta | Endpoint donde se ha producido el error |
| Fecha | Momento en el que ocurrió el error |
| Errores de campo | Lista de errores concretos en formularios o validaciones |

Algunos errores que puede devolver el backend son:

| Código | Error | Ejemplo |
|---|---|---|
| `400` | Bad Request | Datos mal enviados o formato incorrecto |
| `401` | Unauthorized | Usuario no autenticado |
| `403` | Forbidden | Usuario sin permisos suficientes |
| `404` | Not Found | Usuario, pista o reserva no encontrada |
| `409` | Conflict | Reserva solapada o acción no permitida |
| `500` | Internal Server Error | Error interno no previsto |

Por ejemplo, si un usuario intenta crear una reserva en una franja horaria ya ocupada, el backend devuelve un error de conflicto. Si un usuario normal intenta acceder a una función reservada al administrador, el backend devuelve un error de permisos.

Esta gestión de errores ayuda a que la aplicación sea más robusta y permite que el frontend pueda mostrar mensajes adecuados al usuario.

### 6.9 API REST

El backend expone una API REST que permite al frontend comunicarse con el servidor mediante peticiones HTTP.  
Estos endpoints son utilizados desde JavaScript mediante `fetch` para registrar usuarios, iniciar sesión, consultar pistas, comprobar disponibilidad y gestionar reservas.

Los endpoints se organizan según la funcionalidad que realizan.

#### 6.9.1 Endpoints de autenticación

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `POST` | `/pistaPadel/auth/register` | Registra un nuevo usuario | Público |
| `POST` | `/pistaPadel/auth/login` | Inicia sesión | Público |
| `POST` | `/pistaPadel/auth/logout` | Cierra sesión | Usuario autenticado |
| `GET` | `/pistaPadel/auth/me` | Devuelve el usuario autenticado | Usuario autenticado |

#### 6.9.2 Endpoints de usuarios

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `GET` | `/pistaPadel/users` | Lista los usuarios del sistema | ADMIN |
| `GET` | `/pistaPadel/users/{userId}` | Obtiene los datos de un usuario concreto | ADMIN o usuario propietario |
| `PATCH` | `/pistaPadel/users/{userId}` | Modifica los datos de un usuario | ADMIN o usuario propietario |

#### 6.9.3 Endpoints de pistas

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `GET` | `/pistaPadel/courts` | Lista las pistas disponibles | Público |
| `GET` | `/pistaPadel/courts/{courtId}` | Obtiene el detalle de una pista concreta | Público |
| `POST` | `/pistaPadel/courts` | Crea una nueva pista | ADMIN |
| `PATCH` | `/pistaPadel/courts/{courtId}` | Modifica una pista existente | ADMIN |
| `DELETE` | `/pistaPadel/courts/{courtId}` | Desactiva o elimina una pista | ADMIN |

#### 6.9.4 Endpoints de disponibilidad

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `GET` | `/pistaPadel/availability` | Consulta disponibilidad general por fecha y pista | Usuario autenticado |
| `GET` | `/pistaPadel/courts/{courtId}/availability` | Consulta la disponibilidad de una pista concreta | Usuario autenticado |

#### 6.9.5 Endpoints de reservas

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `POST` | `/pistaPadel/reservations` | Crea una nueva reserva | Usuario autenticado |
| `GET` | `/pistaPadel/reservations` | Lista las reservas del usuario autenticado | Usuario autenticado |
| `GET` | `/pistaPadel/reservations/{reservationId}` | Obtiene el detalle de una reserva concreta | ADMIN o usuario propietario |
| `PATCH` | `/pistaPadel/reservations/{reservationId}` | Modifica una reserva existente | ADMIN o usuario propietario |
| `DELETE` | `/pistaPadel/reservations/{reservationId}` | Cancela una reserva | ADMIN o usuario propietario |

#### 6.9.6 Endpoints de administración

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `GET` | `/pistaPadel/admin/reservations` | Lista todas las reservas del sistema | ADMIN |

Los endpoints públicos permiten registrar usuarios, iniciar sesión y consultar pistas. El resto de operaciones requieren autenticación, y algunas están restringidas únicamente al usuario con rol `ADMIN`.

---

## 7. Frontend y capturas de la interfaz

El frontend de la aplicación está desarrollado con **HTML**, **CSS** y **JavaScript**. Su objetivo es ofrecer una interfaz clara para que los usuarios puedan consultar pistas, registrarse, iniciar sesión y realizar reservas, y para que los administradores puedan gestionar usuarios, pistas y reservas.


### 7.1 Diseño general del frontend

El diseño del frontend se ha realizado con una estética común en todas las páginas, manteniendo una misma cabecera, pie de página, botones, formularios, colores y estructura visual.

La interfaz se adapta según el tipo de usuario:

| Tipo de acceso | Comportamiento de la interfaz |
|---|---|
| Usuario no autenticado | Se muestran opciones de registro e inicio de sesión |
| Usuario `USER` | Se muestran opciones para consultar pistas, reservar y ver sus reservas |
| Usuario `ADMIN` | Se muestran opciones de gestión de usuarios, pistas y reservas |

Además, varias páginas que inicialmente estaban separadas para usuario y administrador se han unificado mediante JavaScript. De esta forma, una misma vista puede mostrar botones o acciones diferentes según el rol del usuario autenticado.


### 7.2 Página principal

La página principal presenta la aplicación **Arena Padel Club**, mostrando una primera visión del club, sus instalaciones y las opciones principales de navegación.

Esta página es importante porque funciona como punto de entrada a la aplicación.

**Cabecera e inicio**

<img width="1241" height="728" alt="image" src="https://github.com/user-attachments/assets/31d52224-324d-43fa-a436-53c7ad449c3c" />

**Simulación de blog**

<img width="1229" height="707" alt="image" src="https://github.com/user-attachments/assets/ca1900f2-5d72-4a0b-8d38-9ca7053dc5c7" />

**Footer y botones a instalciones y reservas**

<img width="1250" height="727" alt="image" src="https://github.com/user-attachments/assets/143b8d21-4e23-4642-8df9-3623bb26aa7d" />


### 7.3 Página principal con usuario autenticado

Cuando un usuario normal inicia sesión, la cabecera cambia y muestra el menú personalizado del usuario. Desde este menú puede acceder a sus datos, sus reservas o crear una nueva reserva.

<img width="1244" height="727" alt="image" src="https://github.com/user-attachments/assets/0d745784-9d12-4919-b845-94f3f664d1b4" />


### 7.4 Página principal con administrador autenticado

Cuando el usuario autenticado tiene rol `ADMIN`, la cabecera muestra opciones de administración, como la gestión de usuarios, pistas y reservas.

<img width="1242" height="724" alt="image" src="https://github.com/user-attachments/assets/bafeb115-1ed7-4aac-90d0-dbe8ea493054" />


### 7.5 Registro de usuario

La página de registro permite crear una nueva cuenta introduciendo los datos personales del usuario.

Desde JavaScript se valida que las contraseñas coincidan antes de enviar el formulario al backend.

<img width="746" height="689" alt="image" src="https://github.com/user-attachments/assets/f574fcec-ec4c-4408-8b1c-e06850f48a80" />


### 7.6 Inicio de sesión

La página de login permite iniciar sesión introduciendo email y contraseña.

Cuando las credenciales son correctas, JavaScript guarda la autenticación y redirige al usuario a la página principal.

<img width="1247" height="698" alt="image" src="https://github.com/user-attachments/assets/757a7711-1e9a-431e-a14e-29c1fdbb234a" />


### 7.7 Listado de pistas

La página de pistas muestra el listado general de pistas del club. Esta vista cambia según el rol del usuario.

Aunque se utiliza la misma página de pistas, el administrador ve acciones diferentes, como modificar o eliminar pistas.

| Rol | Acciones disponibles |
|---|---|
| Usuario no autenticado | Ver detalles e iniciar sesión para reservar |
| `USER` | Ver detalles y reservar una pista |
| `ADMIN` | Modificar o eliminar pistas |

**VISTA USER**
<img width="1145" height="645" alt="image" src="https://github.com/user-attachments/assets/f3184016-e3c0-40ae-b74e-3b56e1e760cd" />

**VISTA ADMIN**
<img width="1214" height="643" alt="image" src="https://github.com/user-attachments/assets/c0148d75-6ed5-45d6-bd1f-38f1d379c3df" />


### 7.8 Detalle de pista

La página de detalle de pista muestra la información de una pista concreta, como su nombre, ubicación, precio y disponibilidad.

Desde esta pantalla el usuario puede consultar la pista antes de realizar una reserva.

<img width="1257" height="720" alt="image" src="https://github.com/user-attachments/assets/8a9344fa-7b9c-4490-aa3d-09c5848ef599" />

<img width="1244" height="715" alt="image" src="https://github.com/user-attachments/assets/dabf22d2-90b0-4dee-ae72-4e99f8c57cf4" />


### 7.9 Nueva reserva

La página de nueva reserva permite seleccionar una pista, elegir una fecha y escoger una franja horaria disponible.

Esta vista está conectada con el backend mediante JavaScript, de forma que las pistas y los horarios disponibles se cargan dinámicamente.

<img width="1207" height="717" alt="image" src="https://github.com/user-attachments/assets/84883c7c-b636-4ef6-8be3-4c19283eafc0" />


### 7.10 Mis reservas

La página de reservas permite al usuario consultar las reservas que ha realizado.

Desde esta vista puede acceder al detalle de una reserva concreta y realizar acciones como modificarla o cancelarla, según las condiciones establecidas.

<img width="1231" height="694" alt="image" src="https://github.com/user-attachments/assets/43e614ae-fb1d-4dbd-91fc-55f53bb3c2e3" />


### 7.11 Detalle de reserva

La página de detalle de reserva muestra la información de una reserva concreta, incluyendo la pista, la fecha, la hora y el estado.

Esta pantalla permite consultar la reserva con más detalle y realizar acciones sobre ella si el usuario tiene permisos.

<img width="1228" height="727" alt="image" src="https://github.com/user-attachments/assets/42cb9df8-7a3a-4fa6-88ab-757007997d69" />


### 7.12 Panel de administración de reservas

El administrador puede consultar todas las reservas del sistema, no solo las suyas propias.

Esta vista permite comprobar la gestión global de reservas desde el perfil de administrador.

<img width="1229" height="719" alt="image" src="https://github.com/user-attachments/assets/5a03e884-6d09-44fb-befc-aefe3c4db93f" />


### 7.13 Panel de administración de usuarios

El panel de administración de usuarios permite al administrador consultar los usuarios registrados en la aplicación.

Desde esta vista se pueden buscar usuarios y acceder a la modificación de sus datos.

<img width="1229" height="712" alt="image" src="https://github.com/user-attachments/assets/353d72f0-b319-40c3-9f5f-44eaa1b74dc5" />


### 7.14 Formulario de usuario

El formulario de usuario permite consultar o modificar los datos de un usuario.

Esta vista puede utilizarse para que un usuario modifique sus propios datos o para que el administrador gestione la información de otros usuarios o añadir uno nuevo.

<img width="1199" height="713" alt="image" src="https://github.com/user-attachments/assets/24213f35-d04c-4772-ba0c-ae4f0b71471b" />

### 7.15 Formulario de pista

El formulario de pista permite al administrador crear una nueva pista o modificar una pista existente.

Si se accede desde el botón de crear, el formulario aparece vacío. Si se accede desde el botón de modificar, JavaScript carga los datos de la pista seleccionada y rellena los campos automáticamente.

<img width="1184" height="698" alt="image" src="https://github.com/user-attachments/assets/c817f396-f2e6-48f2-aaf8-a620e863a0b2" />


## 8. JavaScript e integración con el backend

### 8.1 Registro de usuarios
### 8.2 Inicio de sesión
### 8.3 Gestión de sesión y roles
### 8.4 Carga dinámica de pistas
### 8.5 Creación de reservas
### 8.6 Funcionalidades de administrador
### 8.7 Uso de fetch y Basic Auth

---

## 9. Funcionalidades implementadas

### 9.1 Registro e inicio de sesión
### 9.2 Consulta de pistas
### 9.3 Consulta de disponibilidad
### 9.4 Creación de reservas
### 9.5 Consulta de reservas propias
### 9.6 Gestión de pistas
### 9.7 Gestión de usuarios
### 9.8 Gestión global de reservas

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
