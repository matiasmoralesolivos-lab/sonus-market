# SonusMarket
## Hito 1 – Diseño y prototipo

Marketplace especializado en la compra y venta de instrumentos musicales y equipos de sonido.

**Stack tecnológico:** React, Vite, Node.js, Express y PostgreSQL.

---

## 1. Vistas de la aplicación

La aplicación contempla siete vistas principales:

| Vista | Descripción |
|---|---|
| Inicio | Presentación del Marketplace, categorías y publicaciones destacadas. |
| Registro | Formulario para crear una cuenta de usuario. |
| Inicio de sesión | Autenticación de usuarios registrados. |
| Perfil | Información del usuario y administración de sus publicaciones. |
| Crear publicación | Formulario para publicar instrumentos o equipos de sonido. |
| Galería | Catálogo de publicaciones disponibles. |
| Detalle de publicación | Información completa del artículo y datos del vendedor. |

Los bocetos de estas vistas se encuentran en el material de diseño del proyecto.

---

## 2. Navegación de la aplicación

La navegación se divide en vistas públicas y privadas.

### Vistas públicas

| Vista | Ruta |
|---|---|
| Inicio | `/` |
| Registro | `/registro` |
| Inicio de sesión | `/login` |
| Galería | `/publicaciones` |
| Detalle de publicación | `/publicaciones/:id` |

### Vistas privadas

| Vista | Ruta |
|---|---|
| Perfil | `/perfil` |
| Crear publicación | `/publicaciones/crear` |

Las vistas privadas requieren autenticación mediante JWT. El backend verificará la identidad del usuario y sus permisos antes de permitir operaciones protegidas.

**Diagrama de navegación:** [Ver diagrama PDF](docs/sonusmarket.drawio.pdf)
---

## 3. Dependencias del proyecto

Las dependencias se organizan según las responsabilidades del frontend y backend.

### Frontend

| Dependencia | Función |
|---|---|
| React | Construcción de interfaces mediante componentes. |
| React DOM | Renderizado de componentes en el navegador. |
| Vite | Entorno de desarrollo y compilación. |
| React Router DOM | Gestión de rutas y navegación. |
| Bootstrap | Estilos y componentes visuales. |
| Axios | Comunicación con la API REST. |
| ESLint | Análisis estático y detección de errores. |

### Backend

| Dependencia | Función |
|---|---|
| Express | Creación del servidor y API REST. |
| pg | Conexión con PostgreSQL. |
| dotenv | Administración de variables de entorno. |
| cors | Configuración de acceso entre frontend y backend. |
| bcrypt | Hash seguro de contraseñas. |
| jsonwebtoken | Autenticación mediante tokens JWT. |

### Herramientas de desarrollo

- Node.js: entorno de ejecución.
- npm: administración de paquetes.
- Git y GitHub: control de versiones y alojamiento del repositorio.
- Visual Studio Code: editor de código.
- PostgreSQL: sistema de gestión de base de datos.
- pgAdmin: administración de la base de datos.

### Estructura de carpetas

```text
sonusmarket/
├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── src/
│   └── package.json
│
├── documentacion.md
└── README.md
```

---

## 4. Diseño de la base de datos

SonusMarket utilizará PostgreSQL como sistema de gestión de base de datos. El modelo contempla dos tablas principales: `usuarios` y `publicaciones`.

### 4.1. Tabla usuarios

Almacena la información de los usuarios registrados en la plataforma.

| Atributo | Tipo de dato | Restricciones |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| nombre | VARCHAR(100) | NOT NULL |
| email | VARCHAR(150) | UNIQUE, NOT NULL |
| password_hash | TEXT | NOT NULL |
| fecha_creacion | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### 4.2. Tabla publicaciones

Almacena los instrumentos musicales y equipos de sonido publicados por los usuarios.

| Atributo | Tipo de dato | Restricciones |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| usuario_id | INTEGER | FOREIGN KEY, NOT NULL |
| nombre | VARCHAR(150) | NOT NULL |
| descripcion | TEXT | NOT NULL |
| precio | NUMERIC(12,2) | NOT NULL, CHECK (precio >= 0) |
| categoria | VARCHAR(60) | NOT NULL |
| stock | INTEGER | NOT NULL, DEFAULT 1, CHECK (stock >= 0) |
| imagen_url | TEXT | Opcional |
| fecha_creacion | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### 4.3. Relaciones entre tablas

La relación entre `usuarios` y `publicaciones` es de uno a muchos (1:N).

- Un usuario puede crear múltiples publicaciones.
- Cada publicación pertenece a un único usuario.
- El campo `usuario_id` de la tabla `publicaciones` referencia al campo `id` de la tabla `usuarios`.
- Se establece `ON DELETE CASCADE` para eliminar las publicaciones asociadas cuando se elimina un usuario.

### 4.4. Diagrama entidad-relación

El diseño se representa mediante dos entidades relacionadas:

**USUARIOS (1) ───────── (N) PUBLICACIONES**

Las claves primarias identifican cada registro y la clave foránea permite establecer la relación entre ambas tablas.

**Diagrama entidad-relación:** [Ver diagrama PDF](docs/Diseño-de-la-base-de-datos.drawio.pdf)

### 4.5. Script SQL de creación de tablas

El siguiente script define la estructura de las tablas y sus respectivas restricciones en PostgreSQL.

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE publicaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id)
        ON DELETE CASCADE,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    precio NUMERIC(12,2) NOT NULL CHECK (precio >= 0),
    categoria VARCHAR(60) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 1 CHECK (stock >= 0),
    imagen_url TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 5. Contrato de la API REST

La API REST de SonusMarket será desarrollada con Node.js y Express. Permitirá gestionar usuarios y publicaciones mediante solicitudes HTTP y respuestas en formato JSON.

### 5.1. Usuarios y autenticación

| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| POST | `/api/usuarios` | Público | Registrar un usuario. |
| POST | `/api/login` | Público | Iniciar sesión y obtener un token JWT. |
| GET | `/api/usuarios/perfil` | Privado | Obtener los datos del usuario autenticado. |
| PUT | `/api/usuarios/perfil` | Privado | Actualizar los datos del usuario autenticado. |

**Registro de usuario**

Solicitud `POST /api/usuarios`:

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "password": "clave123"
}
```

Respuesta `201 Created`:

```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@email.com"
}
```

**Inicio de sesión**

Solicitud `POST /api/login`:

```json
{
  "email": "juan@email.com",
  "password": "clave123"
}
```

Respuesta `200 OK`:

```json
{
  "token": "jwt_token",
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@email.com"
  }
}
```

### 5.2. Publicaciones

| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| GET | `/api/publicaciones` | Público | Obtener todas las publicaciones. |
| GET | `/api/publicaciones/:id` | Público | Obtener el detalle de una publicación. |
| POST | `/api/publicaciones` | Privado | Crear una publicación. |
| PUT | `/api/publicaciones/:id` | Privado | Actualizar una publicación propia. |
| DELETE | `/api/publicaciones/:id` | Privado | Eliminar una publicación propia. |

**Crear publicación**

Solicitud `POST /api/publicaciones`:

Requiere encabezado de autenticación:

`Authorization: Bearer jwt_token`

Cuerpo de la solicitud:

```json
{
  "nombre": "Guitarra eléctrica",
  "descripcion": "Guitarra en buen estado.",
  "precio": 250000,
  "categoria": "Instrumentos",
  "stock": 1,
  "imagen_url": "https://ejemplo.com/guitarra.jpg"
}
```

Respuesta `201 Created`:

```json
{
  "id": 1,
  "usuario_id": 1,
  "nombre": "Guitarra eléctrica",
  "descripcion": "Guitarra en buen estado.",
  "precio": 250000,
  "categoria": "Instrumentos",
  "stock": 1,
  "imagen_url": "https://ejemplo.com/guitarra.jpg"
}
```

### 5.3. Autenticación y autorización

Las rutas privadas requieren un token JWT válido enviado en el encabezado `Authorization`.

El backend verificará la identidad del usuario y comprobará que sea propietario de la publicación antes de permitir su modificación o eliminación.

### 5.4. Códigos de respuesta HTTP

| Código | Descripción |
|---|---|
| 200 OK | Solicitud procesada correctamente. |
| 201 Created | Recurso creado correctamente. |
| 400 Bad Request | Datos de entrada inválidos. |
| 401 Unauthorized | Falta autenticación o el token no es válido. |
| 403 Forbidden | El usuario no tiene permisos para realizar la operación. |
| 404 Not Found | Recurso no encontrado. |
| 409 Conflict | Conflicto con un recurso existente, por ejemplo, un correo registrado. |
| 500 Internal Server Error | Error interno del servidor. |

