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

---

## 8. JavaScript e integración con el backend

La última fase del proyecto consistió en integrar el frontend con el backend mediante **JavaScript**. Hasta ese momento, las páginas HTML y CSS eran principalmente estáticas, por lo que fue necesario añadir lógica para enviar formularios, consultar datos reales del backend y modificar el contenido de las páginas de forma dinámica.

La comunicación se realiza mediante peticiones `fetch` a los endpoints REST del backend. Además, para acceder a las funcionalidades protegidas, se utiliza autenticación mediante **Basic Auth**, guardando el token en `localStorage`.

Los archivos JavaScript principales del proyecto son:

| Archivo JavaScript | Función principal |
|---|---|
| `sesion.js` | Gestiona la cabecera, la sesión y el rol del usuario |
| `login.js` | Gestiona el inicio de sesión |
| `registro.js` | Gestiona el registro de nuevos usuarios |
| `pistas.js` | Carga dinámicamente el listado de pistas |
| `pista_detalle.js` | Muestra el detalle de una pista y sus horarios disponibles |
| `reserva_nueva.js` | Permite crear una nueva reserva |
| `reservas.js` | Carga las reservas del usuario o del administrador |
| `reserva_detalle.js` | Permite consultar, modificar o cancelar una reserva concreta |
| `admin_usuarios.js` | Carga y gestiona el listado de usuarios para administrador |
| `admin_usuario_form.js` | Permite crear o modificar usuarios desde administración |
| `admin_pista_form.js` | Permite crear o modificar pistas desde administración |

### 8.1 Registro de usuarios

El registro de usuarios se gestiona desde el archivo:

```text
js/registro.js
```

Este archivo recoge los datos introducidos en el formulario de `registro.html`, comprueba que las contraseñas coincidan y envía la información al backend mediante una petición `POST`.

El flujo del registro es el siguiente:

```text
1. El usuario rellena el formulario de registro.
2. JavaScript captura el evento submit del formulario.
3. Se comprueba que las dos contraseñas coincidan.
4. Si coinciden, se crea un objeto con los datos del usuario.
5. Se envía una petición POST al backend.
6. Si el registro es correcto, el usuario es redirigido a login.html.
7. Si ocurre un error, se muestra un aviso en el formulario.
```

El endpoint utilizado es:

| Método | Endpoint | Función |
|---|---|---|
| `POST` | `/pistaPadel/auth/register` | Registrar un nuevo usuario |

Los datos enviados al backend incluyen:

| Campo | Descripción |
|---|---|
| `nombre` | Nombre del usuario |
| `apellidos` | Apellidos del usuario |
| `email` | Correo electrónico |
| `password` | Contraseña |
| `telefono` | Teléfono |
| `rol` | Rol inicial del usuario |
| `activo` | Estado del usuario |

En el registro público, los usuarios nuevos se crean como usuarios estándar, es decir, con rol `USER`.

### 8.2 Inicio de sesión

El inicio de sesión se gestiona desde el archivo:

```text
js/login.js
```

Este archivo recoge el email y la contraseña introducidos en el formulario de `login.html`. Después, genera un token en formato Basic Auth y lo utiliza para comprobar si las credenciales son correctas.

El flujo del login es el siguiente:

```text
1. El usuario introduce email y contraseña.
2. JavaScript captura el formulario de login.
3. Se construye la cadena email:contraseña.
4. Esa cadena se codifica en Base64 mediante btoa().
5. Se envía una petición al backend con la cabecera Authorization.
6. Si la respuesta es correcta, el token se guarda en localStorage.
7. El usuario es redirigido a index.html.
8. Si las credenciales son incorrectas, se muestra un aviso.
```

El endpoint utilizado para comprobar el usuario autenticado es:

| Método | Endpoint | Función |
|---|---|---|
| `GET` | `/pistaPadel/auth/me` | Obtener el usuario autenticado |

De esta manera, el backend puede identificar al usuario en las siguientes peticiones protegidas.

### 8.3 Gestión de sesión y roles

La gestión de sesión se realiza desde el archivo:

```text
js/sesion.js
```

Este archivo se carga en las páginas principales del frontend y se encarga de modificar la cabecera según el estado de la sesión.

El flujo de sesión es el siguiente:

```text
1. Al cargar la página, se comprueba si existe un token en localStorage.
2. Si no existe token, se muestra la cabecera con "Registrarse" e "Iniciar sesión".
3. Si existe token, se consulta el endpoint /pistaPadel/auth/me.
4. El backend devuelve los datos del usuario autenticado.
5. JavaScript obtiene el rol del usuario.
6. Si el rol es USER, se muestra el menú de usuario.
7. Si el rol es ADMIN, se muestra el menú de administrador.
8. El rol se guarda también en localStorage para usarlo en otras páginas.
```

La interfaz cambia según el tipo de usuario:

| Estado | Cabecera mostrada |
|---|---|
| Usuario no autenticado | Botones de registro e inicio de sesión |
| Usuario `USER` | Menú con sus datos, sus reservas y nueva reserva |
| Usuario `ADMIN` | Menú con gestión de usuarios, pistas y reservas |

Además, `sesion.js` también gestiona el cierre de sesión. Al cerrar sesión, se eliminan del navegador el token y el rol almacenados.

Endpoints utilizados:

| Método | Endpoint | Función |
|---|---|---|
| `GET` | `/pistaPadel/auth/me` | Obtener el usuario autenticado |
| `POST` | `/pistaPadel/auth/logout` | Cerrar sesión |

### 8.4 Carga dinámica de pistas

La carga dinámica de pistas se gestiona principalmente desde el archivo:

```text
js/pistas.js
```

Este archivo realiza una petición al backend para obtener el listado de pistas y después genera el contenido HTML de forma dinámica.

El funcionamiento es el siguiente:

```text
1. Al cargar la página pistas.html, se ejecuta cargarPistas().
2. JavaScript realiza una petición GET al backend.
3. El backend devuelve un JSON con las pistas.
4. JavaScript recorre la lista de pistas con forEach.
5. Por cada pista se genera una fila en el HTML.
6. Según el rol del usuario, se muestran botones diferentes.
```

El endpoint utilizado es:

| Método | Endpoint | Función |
|---|---|---|
| `GET` | `/pistaPadel/courts` | Obtener el listado de pistas |

La página se adapta de la siguiente manera:

| Rol | Acciones en la página de pistas |
|---|---|
| Usuario no autenticado | Ver detalles e iniciar sesión para reservar |
| `USER` | Ver detalles y reservar |
| `ADMIN` | Modificar o eliminar pistas |

De esta forma, una misma página puede servir para distintos tipos de usuario, evitando tener archivos HTML repetidos.

### 8.5 Detalle de pista y disponibilidad

El detalle de una pista se gestiona desde el archivo:

```text
js/pista_detalle.js
```

Este archivo obtiene el identificador de la pista desde la URL, consulta sus datos en el backend y muestra la información correspondiente en la página `pista_detalle.html`.

Además, también consulta la disponibilidad de la pista para mostrar las franjas horarias disponibles.

El flujo del detalle de pista es el siguiente:

```text
1. El usuario accede a pista_detalle.html?id=ID.
2. JavaScript obtiene el id de la pista desde la URL.
3. Se realiza un GET al backend para obtener los datos de esa pista.
4. Se pintan en pantalla el nombre, precio y datos principales.
5. Se consulta la disponibilidad de la pista.
6. Se generan las franjas horarias.
7. Si una franja está disponible, se permite acceder a la reserva.
8. Si el usuario no está logueado, se le redirige al login.
```

Endpoints utilizados:

| Método | Endpoint | Función |
|---|---|---|
| `GET` | `/pistaPadel/courts/{courtId}` | Obtener detalle de una pista |
| `GET` | `/pistaPadel/availability?date=YYYY-MM-DD` | Consultar disponibilidad general |
| `GET` | `/pistaPadel/courts/{courtId}/availability?date=YYYY-MM-DD` | Consultar disponibilidad de una pista concreta |


### 8.6 Creación de reservas

La creación de nuevas reservas se gestiona desde el archivo:

```text
js/reserva_nueva.js
```

Este archivo conecta el formulario de nueva reserva con el backend. Permite cargar las pistas activas, consultar los horarios disponibles y enviar la reserva seleccionada.

El flujo para crear una reserva es el siguiente:

```text
1. El usuario accede a reserva_nueva.html.
2. JavaScript carga las pistas activas desde el backend.
3. El usuario selecciona una pista.
4. El usuario selecciona una fecha.
5. JavaScript consulta la disponibilidad de esa pista en esa fecha.
6. El backend devuelve los horarios disponibles.
7. JavaScript pinta los horarios en pantalla.
8. El usuario selecciona una franja horaria.
9. Al confirmar, JavaScript crea el objeto reserva.
10. Se envía un POST al backend.
11. El backend comprueba que no haya solapamientos.
12. Si todo es correcto, se guarda la reserva.
13. El usuario es redirigido a la página de reservas.
```

Endpoints utilizados:

| Método | Endpoint | Función |
|---|---|---|
| `GET` | `/pistaPadel/courts?active=true` | Obtener pistas activas |
| `GET` | `/pistaPadel/courts/{courtId}/availability?date=YYYY-MM-DD` | Consultar disponibilidad |
| `POST` | `/pistaPadel/reservations` | Crear una nueva reserva |

El objeto enviado al backend contiene:

| Campo | Descripción |
|---|---|
| `pista.idPista` | Identificador de la pista seleccionada |
| `fechaReserva` | Fecha elegida por el usuario |
| `horaInicio` | Hora seleccionada |
| `duracionMinutos` | Duración de la reserva |

El usuario no introduce manualmente su identificador, ya que el backend obtiene el usuario a partir de la autenticación.

### 8.7 Consulta y gestión de reservas

La consulta del listado de reservas se gestiona desde el archivo:

```text
js/reservas.js
```

Este archivo se utiliza para cargar las reservas del usuario autenticado o, si el usuario tiene rol `ADMIN`, cargar todas las reservas del sistema.

El flujo del listado de reservas es el siguiente:

```text
1. Al cargar reservas.html, JavaScript comprueba el rol del usuario.
2. Si el rol es USER, se consulta el endpoint de reservas propias.
3. Si el rol es ADMIN, se consulta el endpoint de reservas globales.
4. El backend devuelve un JSON con las reservas.
5. JavaScript pinta las reservas en el HTML.
6. Si el usuario es ADMIN, se muestran acciones adicionales.
7. También se permite buscar o filtrar visualmente las reservas cargadas.
```

Endpoints utilizados:

| Método | Endpoint | Función |
|---|---|---|
| `GET` | `/pistaPadel/reservations` | Obtener reservas del usuario autenticado |
| `GET` | `/pistaPadel/admin/reservations` | Obtener todas las reservas del sistema |
| `DELETE` | `/pistaPadel/reservations/{reservationId}` | Cancelar una reserva |

La vista cambia según el rol:

| Rol | Vista de reservas |
|---|---|
| `USER` | Ve sus propias reservas |
| `ADMIN` | Ve las reservas globales del sistema |

### 8.8 Detalle, modificación y cancelación de reservas

El detalle de una reserva concreta se gestiona desde el archivo:

```text
js/reserva_detalle.js
```

Este archivo permite cargar una reserva específica, mostrar sus datos en un formulario y modificarla o cancelarla.

El flujo del detalle de reserva es el siguiente:

```text
1. El usuario accede a reserva_detalle.html?id=ID.
2. JavaScript obtiene el id de la reserva desde la URL.
3. Se cargan las pistas activas para rellenar el selector.
4. Se consulta la reserva concreta en el backend.
5. Se rellenan los campos del formulario con los datos actuales.
6. Si se cambia la pista o la fecha, se recargan los horarios disponibles.
7. Si se guarda el formulario, se envía un PATCH al backend.
8. Si se cancela la reserva, se envía un DELETE al backend.
```

Endpoints utilizados:

| Método | Endpoint | Función |
|---|---|---|
| `GET` | `/pistaPadel/reservations/{reservationId}` | Obtener una reserva concreta |
| `GET` | `/pistaPadel/courts?active=true` | Obtener pistas activas |
| `GET` | `/pistaPadel/courts/{courtId}/availability?date=YYYY-MM-DD` | Consultar disponibilidad |
| `PATCH` | `/pistaPadel/reservations/{reservationId}` | Modificar una reserva |
| `DELETE` | `/pistaPadel/reservations/{reservationId}` | Cancelar una reserva |

Este archivo permite reutilizar una misma vista para consultar o modificar reservas, adaptando los textos según el rol del usuario.


### 8.9 Funcionalidades de administrador

El administrador dispone de funcionalidades adicionales que también se gestionan mediante JavaScript.

Los principales archivos relacionados con administración son:

| Archivo | Función |
|---|---|
| `admin_usuarios.js` | Carga y muestra el listado de usuarios |
| `admin_usuario_form.js` | Permite crear o modificar usuarios |
| `admin_pista_form.js` | Permite crear o modificar pistas |
| `pistas.js` | Muestra botones de modificar y eliminar pistas cuando el rol es `ADMIN` |
| `reservas.js` | Permite consultar reservas globales desde la vista de administrador |
| `reserva_detalle.js` | Permite consultar, modificar o cancelar reservas concretas |


#### Gestión de usuarios

El listado de usuarios se gestiona desde:

```text
js/admin_usuarios.js
```

Este archivo consulta los usuarios activos del backend y los muestra en la página de administración.

Endpoint utilizado:

| Método | Endpoint | Función |
|---|---|---|
| `GET` | `/pistaPadel/users?activo=true` | Obtener usuarios activos |

Además, permite realizar una baja lógica de usuarios modificando su estado a inactivo.

| Método | Endpoint | Función |
|---|---|---|
| `PATCH` | `/pistaPadel/users/{userId}` | Modificar usuario o marcarlo como inactivo |


#### Formulario de usuario

La creación o modificación de usuarios desde administración se gestiona desde:

```text
js/admin_usuario_form.js
```

Este archivo funciona en dos modos:

| Situación | Funcionamiento |
|---|---|
| Sin id en la URL | Crea un nuevo usuario |
| Con id en la URL | Carga los datos del usuario y permite modificarlos |

Endpoints utilizados:

| Método | Endpoint | Función |
|---|---|---|
| `GET` | `/pistaPadel/users/{userId}` | Obtener datos de un usuario |
| `POST` | `/pistaPadel/auth/register` | Crear un nuevo usuario |
| `PATCH` | `/pistaPadel/users/{userId}` | Modificar un usuario existente |

#### Formulario de pista

La creación o modificación de pistas desde administración se gestiona desde:

```text
js/admin_pista_form.js
```

Este archivo también funciona en dos modos:

| Situación | Funcionamiento |
|---|---|
| Sin id en la URL | Crea una pista nueva |
| Con id en la URL | Carga los datos de la pista y permite modificarlos |

Endpoints utilizados:

| Método | Endpoint | Función |
|---|---|---|
| `GET` | `/pistaPadel/courts/{courtId}` | Obtener datos de una pista |
| `POST` | `/pistaPadel/courts` | Crear una pista nueva |
| `PATCH` | `/pistaPadel/courts/{courtId}` | Modificar una pista existente |
| `DELETE` | `/pistaPadel/courts/{courtId}` | Desactivar o eliminar una pista |

En estas peticiones es necesario enviar el token de autenticación, ya que el backend comprueba que el usuario tenga rol `ADMIN`.

### 8.10 Uso de `fetch` y Basic Auth

La integración entre frontend y backend se realiza mediante la función `fetch`, que permite enviar peticiones HTTP desde JavaScript.

La estructura general de una petición `GET` es:

```javascript
fetch("http://localhost:8080/pistaPadel/endpoint", {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Authorization": "Basic " + token
    }
});
```
En las peticiones que envían datos al backend, se añade también el cuerpo de la petición en formato JSON:

```javascript
fetch("http://localhost:8080/pistaPadel/endpoint", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Basic " + token
    },
    body: JSON.stringify(datos)
});
```

El token se guarda en el navegador mediante:

```javascript
localStorage.setItem("token", tokenCreado);
```

Y se recupera cuando es necesario hacer una petición protegida:

```javascript
const token = localStorage.getItem("token");
```

El flujo general de una petición protegida es:

```text
1. JavaScript recupera el token guardado en localStorage.
2. Se realiza una petición fetch al backend.
3. La petición incluye la cabecera Authorization.
4. Spring Security comprueba las credenciales.
5. Si el usuario está autenticado y tiene permisos, se ejecuta la operación.
6. Si no está autenticado, se devuelve 401.
7. Si no tiene permisos suficientes, se devuelve 403.
```

Gracias a esta integración, el frontend puede trabajar con datos reales del backend y adaptar la interfaz según el usuario autenticado.

---

## 9. Funcionalidades implementadas

Para evitar repetir la explicación técnica del backend y de JavaScript, en este apartado se resumen las funcionalidades finales de la aplicación desde el punto de vista del usuario.  
Las funcionalidades se dividen según el tipo de acceso: usuario sin iniciar sesión, usuario registrado con rol `USER` y usuario administrador con rol `ADMIN`.

### 9.1 Funcionalidades según el tipo de usuario

| Tipo de usuario | Funcionalidad | Descripción |
|---|---|---|
| Usuario sin iniciar sesión | Acceder a la página principal | Puede visualizar la página de inicio del club y la información general de la aplicación |
| Usuario sin iniciar sesión | Registrarse | Puede crear una nueva cuenta desde el formulario de registro |
| Usuario sin iniciar sesión | Iniciar sesión | Puede acceder a la aplicación introduciendo email y contraseña |
| Usuario sin iniciar sesión | Consultar listado de pistas | Puede ver las pistas disponibles del club |
| Usuario sin iniciar sesión | Acceder a reserva | Si intenta reservar, la aplicación lo redirige al inicio de sesión |
| `USER` | Cerrar sesión | Puede cerrar su sesión desde el menú de usuario |
| `USER` | Consultar sus datos | Puede acceder a su información personal |
| `USER` | Modificar sus datos | Puede actualizar sus datos personales |
| `USER` | Consultar pistas | Puede ver el listado de pistas del club |
| `USER` | Consultar detalle de pista | Puede ver información concreta de una pista |
| `USER` | Consultar disponibilidad | Puede consultar los horarios disponibles de una pista en una fecha concreta |
| `USER` | Crear reserva | Puede seleccionar pista, fecha y hora para realizar una nueva reserva |
| `USER` | Consultar sus reservas | Puede ver únicamente las reservas asociadas a su usuario |
| `USER` | Consultar detalle de reserva | Puede acceder a la información detallada de una reserva propia |
| `USER` | Modificar reserva | Puede modificar una reserva propia si cumple las condiciones establecidas |
| `USER` | Cancelar reserva | Puede cancelar una reserva propia si está permitido |
| `ADMIN` | Cerrar sesión | Puede cerrar su sesión desde el menú de administrador |
| `ADMIN` | Consultar usuarios | Puede ver el listado de usuarios registrados |
| `ADMIN` | Buscar usuarios | Puede filtrar usuarios desde el panel de administración |
| `ADMIN` | Modificar usuarios | Puede editar los datos de un usuario |
| `ADMIN` | Dar de baja usuarios | Puede marcar usuarios como inactivos mediante baja lógica |
| `ADMIN` | Consultar pistas | Puede ver todas las pistas del sistema |
| `ADMIN` | Crear pistas | Puede añadir nuevas pistas al sistema |
| `ADMIN` | Modificar pistas | Puede editar los datos de una pista existente |
| `ADMIN` | Desactivar pistas | Puede eliminar o desactivar pistas del sistema |
| `ADMIN` | Consultar reservas globales | Puede ver todas las reservas realizadas en la aplicación |
| `ADMIN` | Buscar reservas | Puede filtrar visualmente las reservas cargadas |
| `ADMIN` | Consultar detalle de reserva | Puede acceder al detalle de una reserva concreta |
| `ADMIN` | Modificar reservas | Puede modificar reservas desde la vista de administración |
| `ADMIN` | Cancelar reservas | Puede cancelar reservas del sistema |

### 9.2 Resumen por módulos de la aplicación

| Módulo | Funcionalidades incluidas |
|---|---|
| Autenticación | Registro, inicio de sesión, cierre de sesión y consulta del usuario autenticado |
| Usuarios | Consulta de datos, modificación de usuario, listado de usuarios y baja lógica |
| Pistas | Listado de pistas, detalle de pista, creación, modificación y desactivación |
| Disponibilidad | Consulta de horarios disponibles por pista y fecha |
| Reservas | Creación, consulta, detalle, modificación y cancelación de reservas |
| Administración | Gestión global de usuarios, pistas y reservas |
| Interfaz dinámica | Menús y botones adaptados según el rol del usuario |
| Seguridad | Restricción de acciones según autenticación y rol |

### 9.3 Funcionalidades destacadas

Entre las funcionalidades más importantes del proyecto destacan:

- La diferenciación entre usuario no autenticado, usuario `USER` y usuario `ADMIN`.
- La carga dinámica de información desde el backend mediante JavaScript.
- La creación de reservas comprobando disponibilidad real.
- La protección de las operaciones mediante autenticación y roles.
- La gestión de usuarios, pistas y reservas desde el perfil administrador.
- La reutilización de páginas HTML adaptando el contenido según el rol del usuario.
- La persistencia de datos en base de datos H2.
- La carga inicial de datos de prueba para facilitar la corrección y uso de la aplicación.

---

## 10. Instalación y ejecución

En este apartado se explica cómo descargar, ejecutar y probar el proyecto en local. Para que la aplicación funcione correctamente, primero debe iniciarse el backend y después abrirse el frontend en el navegador.

### 10.1 Requisitos previos

Antes de ejecutar el proyecto, es necesario tener instaladas las siguientes herramientas:

| Herramienta | Uso |
|---|---|
| Java | Necesario para ejecutar el backend con Spring Boot |
| IntelliJ IDEA | Recomendado para abrir y ejecutar el backend |
| Visual Studio Code | Recomendado para abrir y probar el frontend |
| Git | Necesario para clonar el repositorio |
| Navegador web | Para acceder a la aplicación y a la consola H2 |

Además, es recomendable tener instalado **Postman** para probar los endpoints del backend de forma independiente.

### 10.2 Clonar el repositorio

Para descargar el proyecto en local, se debe clonar el repositorio desde GitHub:

```bash
git clone https://github.com/jmfernandezfreige/pistasPadel.git
```

Después, se accede a la carpeta del proyecto:

```bash
cd pistasPadel
```

La estructura principal del proyecto contiene el backend, los archivos HTML, la carpeta `js`, la carpeta `img`, la hoja de estilos y el README.

### 10.3 Ejecutar el backend

El backend se encuentra dentro de la carpeta:

```text
backend/
```

También se puede ejecutar desde **IntelliJ IDEA** abriendo la carpeta `backend` y lanzando la clase principal:

```text
PracticaFinalApplication.java
```

Cuando el backend se inicia correctamente, queda disponible en:

```text
http://localhost:8080
```

Los endpoints de la aplicación utilizan la ruta base:

```text
http://localhost:8080/pistaPadel
```

Por ejemplo:

```text
http://localhost:8080/pistaPadel/courts
```

### 10.4 Acceder a H2

La aplicación utiliza una base de datos **H2** para guardar usuarios, roles, pistas y reservas.

La consola de H2 se puede abrir desde el navegador en:

```text
http://localhost:8080/h2-console
```

Los datos de conexión son:

| Campo | Valor |
|---|---|
| JDBC URL | `jdbc:h2:file:./dbdata` |
| User Name | `sa` |
| Password | vacío |

Desde esta consola se pueden consultar las tablas de la aplicación y comprobar que los datos iniciales se han cargado correctamente.

Las tablas principales son:

| Tabla | Contenido |
|---|---|
| `ROL` | Roles `USER` y `ADMIN` |
| `USUARIO` | Usuarios registrados |
| `PISTA` | Pistas de pádel |
| `RESERVA` | Reservas realizadas |

### 10.5 Abrir el frontend

El frontend está formado por los archivos HTML, CSS y JavaScript situados en la raíz del repositorio.

La página principal es:

```text
index.html
```

Para abrir el frontend, se puede hacer doble clic sobre `index.html` o abrir el proyecto con **Visual Studio Code** y usar una extensión como **Live Server**.

Es importante que el backend esté ejecutándose antes de probar las funcionalidades dinámicas, ya que las páginas utilizan JavaScript para hacer peticiones a:

```text
http://localhost:8080/pistaPadel
```

El flujo recomendado para probar la aplicación es:

```text
1. Ejecutar el backend.
2. Comprobar que carga la base de datos.
3. Abrir index.html en el navegador.
4. Iniciar sesión con un usuario de prueba.
5. Probar las funcionalidades según el rol.
```

### 10.6 Usuarios de prueba

La base de datos se inicializa automáticamente con usuarios de prueba para facilitar la corrección y el uso de la aplicación.

| Rol | Nombre | Email | Contraseña | Funcionalidades principales |
|---|---|---|---|---|
| `ADMIN` | Pepe Fernández Freige | `pepe@gmail.com` | `1234` | Gestión de usuarios, pistas y reservas |
| `USER` | Isabel Alonso Casas | `isabel@gmail.com` | `1234` | Consulta de pistas y gestión de sus reservas |

El usuario administrador permite probar las funcionalidades de gestión del sistema, mientras que el usuario estándar permite probar el flujo normal de reserva de pistas.

> [!IMPORTANT]
> Estos usuarios son datos de prueba para la práctica. Las contraseñas se han configurado de forma sencilla para facilitar la ejecución local y no deberían utilizarse así en un entorno real.

---

## 11. Pruebas realizadas

Las pruebas del proyecto se realizaron de forma progresiva en cada entrega, adaptándose al estado de desarrollo de la aplicación en cada momento. Al principio, las comprobaciones se centraron en el backend y en los endpoints REST; después, se añadieron pruebas propias del backend; más adelante se comprobó la parte visual del frontend; y finalmente se realizaron pruebas completas con el backend y el frontend integrados.

| Entrega | Parte probada | Forma de prueba | Objetivo |
|---|---|---|---|
| Entrega 1 | Backend inicial | Postman y navegador | Comprobar que los primeros endpoints respondían correctamente |
| Entrega 2 | Backend con persistencia y seguridad | Tests del propio backend y pruebas manuales | Verificar la lógica de negocio, la base de datos, la seguridad y las validaciones |
| Entrega 3 | Frontend HTML y CSS | Previsualización en Visual Studio Code y navegador | Revisar que las páginas se vieran correctamente y que la navegación visual tuviera sentido |
| Entrega 4 | JavaScript e integración | Backend ejecutándose y pruebas dinámicas desde el frontend | Comprobar que la aplicación completa funcionaba conectando frontend, backend y base de datos |

En la **primera entrega**, al estar centrada principalmente en la creación del backend inicial, las pruebas se realizaron sobre todo con **Postman**. Esta herramienta permitió enviar peticiones a los endpoints REST y comprobar si el backend devolvía las respuestas esperadas. También se probaron algunos endpoints directamente desde el navegador, especialmente aquellos de tipo `GET`, como el listado de pistas o la consulta de información.

En esta fase se comprobaba principalmente que las rutas existieran, que los métodos HTTP fueran correctos y que las respuestas tuvieran sentido. Por ejemplo, se revisó el registro de usuarios, la consulta de pistas, la creación de reservas y las restricciones básicas de acceso.

En la **segunda entrega**, el backend ya incorporaba persistencia, entidades JPA, repositorios, servicios, seguridad y validaciones. Por ello, además de seguir haciendo algunas pruebas manuales, se utilizaron también **tests dentro del propio backend**. Estos tests permitieron comprobar de forma más estructurada que la lógica principal funcionaba correctamente.

En esta fase se revisaron aspectos como la creación de usuarios, la consulta de datos desde la base de datos, la relación entre usuarios, pistas y reservas, la seguridad por roles y la gestión de errores. También se comprobó que los datos iniciales definidos en `data.sql` se cargaban correctamente al arrancar la aplicación.

En la **tercera entrega**, el trabajo se centró en el frontend desarrollado con **HTML y CSS**. Como todavía no estaba completamente integrado con JavaScript y backend, las pruebas fueron principalmente visuales.

La comprobación se realizó previsualizando las páginas desde **Visual Studio Code** o abriéndolas directamente en el navegador. En esta fase se revisó que las páginas cargaran correctamente, que los formularios estuvieran bien estructurados, que los botones y enlaces tuvieran sentido y que la estética fuera coherente en toda la aplicación.

También se revisaron las distintas vistas creadas para usuarios y administradores, como la página principal, login, registro, listado de pistas, detalle de pista, reservas y páginas de administración.

En la **cuarta entrega**, una vez incorporado JavaScript, las pruebas pasaron a ser pruebas dinámicas de integración. Para realizarlas era necesario tener el **backend ejecutándose** y abrir el frontend en el navegador.

En esta fase se comprobó que las páginas ya no fueran solo estáticas, sino que pudieran comunicarse con el backend mediante `fetch`. Se probaron acciones reales como registrarse, iniciar sesión, cargar pistas desde la base de datos, consultar disponibilidad, crear reservas, modificar datos y acceder a funcionalidades de administrador.

Estas pruebas finales permitieron comprobar el funcionamiento completo de la aplicación, verificando que el frontend, el JavaScript, el backend, la seguridad y la base de datos trabajaban correctamente de forma conjunta.

---

## 12. Problemas encontrados y soluciones

Durante el desarrollo del proyecto surgieron distintos problemas técnicos y de organización. Estos problemas se fueron resolviendo progresivamente en cada entrega, especialmente durante la integración final entre backend, frontend y JavaScript.


### 12.1 Seguridad y autenticación

Uno de los principales problemas encontrados fue la integración de la seguridad del backend con el frontend. En el backend se utilizaba **Spring Security**, pero al conectar las páginas HTML con JavaScript surgieron dificultades para mantener la sesión y enviar correctamente las credenciales desde el navegador.

Al principio, la autenticación estaba más orientada a una gestión mediante sesión, pero esto complicaba la comunicación con el frontend, ya que las peticiones `fetch` necesitaban una forma clara de identificarse ante el backend.

La solución aplicada fue simplificar la autenticación utilizando **Basic Auth**. De esta forma, al iniciar sesión, el frontend genera un token a partir del email y la contraseña del usuario y lo guarda en `localStorage`.

Después, en cada petición protegida, JavaScript envía ese token en la cabecera:

```text
Authorization: Basic token
```

Esto permitió que el backend pudiera identificar al usuario autenticado y aplicar las restricciones según su rol.

| Problema | Solución aplicada |
|---|---|
| Dificultad para mantener sesión entre frontend y backend | Uso de Basic Auth |
| Peticiones protegidas rechazadas | Envío del token en la cabecera `Authorization` |
| Diferenciar usuario normal y administrador | Uso de roles `USER` y `ADMIN` |
| Ocultar o mostrar opciones según el rol | Gestión dinámica desde `sesion.js` |

### 12.2 CORS e integración con JavaScript

Otro problema importante apareció al conectar el frontend con el backend mediante JavaScript. Como las páginas HTML hacían peticiones al servidor Spring Boot, el navegador podía bloquear algunas peticiones por la política de **CORS**.

Este problema se solucionó configurando CORS en el backend para permitir las peticiones desde el frontend. Además, se revisaron las cabeceras enviadas desde JavaScript para que las peticiones incluyeran correctamente el tipo de contenido y la autorización.

En las peticiones `fetch` se añadieron cabeceras como:

```javascript
headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Basic " + token
}
```

También fue necesario adaptar cada formulario para que no recargara la página automáticamente, utilizando:

```javascript
event.preventDefault();
```

De esta forma, JavaScript podía controlar el envío de datos al backend y gestionar la respuesta recibida.

| Problema | Solución aplicada |
|---|---|
| Bloqueo de peticiones desde el navegador | Configuración de CORS en el backend |
| Formularios que recargaban la página | Uso de `event.preventDefault()` |
| Datos enviados en formato incorrecto | Uso de `JSON.stringify()` |
| Respuestas no interpretadas correctamente | Uso de `await respuesta.json()` o `await respuesta.text()` |

### 12.3 Persistencia y carga de datos

Durante la parte de persistencia también surgieron problemas relacionados con la base de datos H2 y la carga inicial de datos.

Fue necesario configurar correctamente `application.properties` para que Hibernate creara las tablas y después se ejecutara el archivo `data.sql`. También se tuvo que revisar el orden de inserción de los datos, ya que los usuarios dependen de los roles mediante una clave ajena.

Por eso, en `data.sql` primero se insertan los roles:

```sql
INSERT INTO rol (nombre_rol, descripcion)
VALUES ('USER', 'Usuario estándar del sistema');

INSERT INTO rol (nombre_rol, descripcion)
VALUES ('ADMIN', 'Administrador con control total');
```

Y después se insertan los usuarios, pistas y reservas.

También se utilizó la consola de H2 para comprobar visualmente que los datos se estaban guardando correctamente:

```text
http://localhost:8080/h2-console
```

| Problema | Solución aplicada |
|---|---|
| Datos iniciales que no se cargaban correctamente | Revisión de `data.sql` |
| Errores por claves ajenas | Insertar primero roles y después usuarios |
| Dudas sobre si se usaba base en memoria o en archivo | Configuración de H2 en `application.properties` |
| Comprobación de datos guardados | Uso de la consola H2 |

### 12.4 Organización de páginas HTML

En la primera versión del frontend existían muchas páginas duplicadas, separando vistas de usuario y vistas de administrador. Por ejemplo, había páginas distintas para usuario logueado, administrador, reservas de usuario, reservas de administrador o detalles según el tipo de rol.

Esto hacía que el proyecto fuera más difícil de mantener, ya que cualquier cambio visual o funcional debía repetirse en varias páginas.

La solución fue ir unificando páginas durante la fase de JavaScript. En lugar de tener varias versiones de una misma vista, se utilizó JavaScript para adaptar el contenido según el rol del usuario autenticado.

Por ejemplo:

| Antes | Después |
|---|---|
| `index.html`, `index_log_user.html`, `index_log_admin.html` | Una página principal gestionada con `sesion.js` |
| Páginas separadas de reservas para usuario y administrador | `reservas.html` adaptada según el rol |
| Vistas separadas de detalle de reserva | `reserva_detalle.html` reutilizada |
| Listado de pistas distinto para usuario y administrador | `pistas.html` con botones dinámicos según rol |

Esta solución permitió reducir duplicidad y hacer que el frontend fuera más fácil de mantener.

### 12.5 Control de versiones con GitHub

El trabajo en equipo también generó algunos problemas relacionados con Git y GitHub. Al principio, se trabajó en repositorios separados para no mezclar el backend y el frontend antes de que ambas partes estuvieran preparadas.

Más adelante, en la última entrega, se integró todo en un único repositorio final. Durante este proceso aparecieron conflictos al hacer `pull`, `push` o `rebase`, especialmente cuando varios miembros habían modificado los mismos archivos.

Cuando aparecían conflictos, se revisaban manualmente los archivos afectados, se elegía la versión correcta del código y después se marcaban como resueltos con `git add`.

| Problema | Solución aplicada |
|---|---|
| Cambios simultáneos en los mismos archivos | Resolución manual de conflictos |
| Mezcla de backend y frontend | Trabajo inicial en repositorios separados |
| Necesidad de integrar todo al final | Creación de un repositorio final común |
| Conflictos durante `pull --rebase` | Revisión de archivos, `git add` y `git rebase --continue` |
| Control de versiones del equipo | Uso de commits y pushes frecuentes |

El uso de GitHub permitió mantener un historial del proyecto, coordinar el trabajo del equipo y conservar una versión final integrada con backend, frontend, JavaScript, estilos e imágenes.

---

## 13. Mejoras futuras

Aunque la aplicación cumple con los objetivos principales de la práctica, existen varias mejoras que podrían implementarse en el futuro para hacer el proyecto más completo, seguro y cercano a una aplicación real.

### 13.1 Mejoras funcionales

A nivel funcional, se podrían añadir nuevas características para mejorar la experiencia del usuario y ampliar las posibilidades de gestión del club.

| Mejora | Descripción |
|---|---|
| Calendario visual de reservas | Mostrar las reservas en un calendario semanal o mensual para que sea más fácil consultar la disponibilidad |
| Filtros avanzados | Permitir filtrar reservas por fecha, pista, usuario, estado o rango horario |
| Duración variable de reservas | Permitir al usuario elegir reservas de 60, 90 o 120 minutos |
| Confirmación por correo electrónico | Enviar un email al usuario cuando cree, modifique o cancele una reserva |
| Recuperación de contraseña | Añadir una funcionalidad para restablecer la contraseña en caso de olvido |
| Historial de reservas | Diferenciar entre reservas futuras, pasadas y canceladas |
| Panel de estadísticas | Mostrar al administrador datos como número de reservas, pistas más utilizadas o usuarios más activos |
| Mejora de disponibilidad | Mostrar de forma más visual qué horas están libres y cuáles ocupadas |

### 13.2 Mejoras visuales

En cuanto al diseño, la aplicación podría seguir mejorándose para ofrecer una interfaz más profesional y cómoda de usar.

| Mejora | Descripción |
|---|---|
| Diseño responsive más avanzado | Adaptar mejor todas las páginas a móviles y tablets |
| Mensajes visuales personalizados | Sustituir algunos `alert()` por mensajes integrados en la propia interfaz |
| Indicadores de carga | Mostrar animaciones o mensajes mientras se cargan pistas, reservas o usuarios |
| Mejoras en formularios | Añadir validaciones visuales en tiempo real |
| Confirmaciones visuales | Mostrar mensajes más claros después de crear, modificar o cancelar elementos |

### 13.3 Mejoras de seguridad

La seguridad es una de las partes que más podría mejorarse si la aplicación se llevara a un entorno real.

| Mejora | Descripción |
|---|---|
| Cifrado de contraseñas | Sustituir las contraseñas en texto plano por contraseñas cifradas |
| Mejor gestión de autenticación | Sustituir Basic Auth por un sistema mejor|
| Protección del almacenamiento del token | Evitar guardar credenciales sensibles directamente en `localStorage` |
| Validaciones adicionales | Añadir más validaciones tanto en frontend como en backend |
| Control más estricto de permisos | Revisar todas las rutas protegidas y comprobar los accesos por rol |
| Gestión de errores de seguridad | Personalizar las respuestas ante errores `401` y `403` |

### 13.4 Despliegue de la aplicación

Otra mejora futura sería desplegar la aplicación en un entorno real, de forma que pudiera accederse a ella desde internet sin necesidad de ejecutarla localmente.

---

## 14. Conclusiones

El desarrollo de **PistasPadel — Arena Padel Club** nos ha permitido crear una aplicación web completa, conectando una parte visual hecha con HTML, CSS y JavaScript con un backend desarrollado en Spring Boot.

### 14.1 Resultados obtenidos

Como resultado final, hemos conseguido una aplicación funcional que permite:

- Registrar usuarios e iniciar sesión.
- Diferenciar entre usuarios normales y administradores.
- Consultar pistas disponibles.
- Ver la disponibilidad de una pista.
- Crear, modificar y cancelar reservas.
- Gestionar usuarios, pistas y reservas desde el perfil administrador.
- Conectar el frontend con el backend mediante JavaScript.
- Guardar los datos en una base de datos H2 inicializada con datos de prueba.

En conjunto, la aplicación cumple con el objetivo principal de la práctica: simular el funcionamiento de una página web real para la reserva de pistas de pádel.

### 14.2 Aprendizajes técnicos

Durante el desarrollo del proyecto hemos aprendido y reforzado varios conceptos importantes:

- Crear un backend con Spring Boot.
- Organizar el código en entidades, repositorios, servicios y controladores.
- Crear endpoints REST para conectar frontend y backend.
- Usar una base de datos H2 con datos iniciales.
- Aplicar seguridad con usuarios, roles y autenticación.
- Usar JavaScript para enviar peticiones `fetch`.
- Trabajar con formularios dinámicos.
- Gestionar errores y comprobar el funcionamiento de la aplicación paso a paso.

Una de las partes más importantes ha sido entender cómo se conectan todas las piezas: el usuario interactúa con la web, JavaScript manda la petición, el backend procesa los datos y la base de datos guarda la información.

### 14.3 Valoración del trabajo en equipo

El trabajo en equipo ha sido clave para poder completar la práctica. Dividir el proyecto por entregas nos ayudó a organizarnos mejor y a avanzar poco a poco.

Algunos aspectos positivos del trabajo en grupo han sido:

- Repartir las tareas.
- Trabajar primero backend y frontend por separado para no mezclar errores.
- Revisar entre todos los problemas que iban apareciendo.
- Usar GitHub para guardar cambios y juntar el trabajo final.
- Aprender a resolver conflictos y coordinar mejor las versiones del proyecto.

Aunque durante el desarrollo surgieron problemas, especialmente en la integración entre frontend, backend y seguridad, conseguir resolverlos nos ayudó a entender mucho mejor cómo funciona una aplicación web completa.

Como conclusión final, consideramos que el proyecto nos ha servido para aplicar de forma práctica los conocimientos de la asignatura y para aprender a trabajar de manera más organizada en un proyecto realista.

---

## 15. Bibliografía y recursos

Para el desarrollo del proyecto se han utilizado distintos recursos y materiales de clase. Estos recursos han servido para resolver dudas técnicas, comprobar el funcionamiento de la aplicación y mejorar la organización del trabajo.

### Recursos utilizados

- Material proporcionado en clase.
- Postman para probar endpoints REST.
- GitHub para el control de versiones y trabajo colaborativo.
- IntelliJ IDEA para el desarrollo del backend.
- Visual Studio Code para el desarrollo del frontend.

### Uso de herramientas de Inteligencia Artificial

Durante el desarrollo del proyecto se ha hecho un uso consciente y responsable de herramientas de **Inteligencia Artificial** como apoyo al trabajo del equipo.

La IA se ha utilizado principalmente para:

- Resolver errores concretos del backend y del frontend.
- Entender problemas relacionados con Spring Security, CORS y autenticación.
- Revisar fragmentos de código.
- Mejorar la organización de archivos JavaScript.
- Ayudar a estructurar el README y la documentación del proyecto.
- Explicar mensajes de error y posibles soluciones.
- Proponer mejoras en la integración entre frontend y backend.

En todo momento, las soluciones propuestas fueron revisadas, adaptadas y probadas por el equipo antes de incorporarlas al proyecto. Por tanto, la IA se utilizó como herramienta de apoyo y aprendizaje, no como sustituto del desarrollo ni de la comprensión del código.

---
