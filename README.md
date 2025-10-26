# Red Social - Arquitectura de Microservicios

Aplicación de red social desarrollada con arquitectura de microservicios utilizando Node.js, TypeScript, React, PostgreSQL y Docker.

## Tabla de Contenidos

- [Características](#características)
- [Arquitectura](#arquitectura)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Pruebas](#pruebas)

## Características

- Autenticación de usuarios con JWT
- Gestión de publicaciones
- Sistema de likes en publicaciones
- Visualización de perfiles de usuario
- Arquitectura de microservicios independientes
- Documentación API con Swagger
- Contenedores Docker para cada servicio
- Base de datos PostgreSQL con TypeORM

## Arquitectura

El proyecto está compuesto por 3 microservicios backend y 1 aplicación frontend:

### Backend

- **auth-service** (Puerto 3001): Gestiona la autenticación y generación de tokens JWT
- **posts-service** (Puerto 3002): Administra las publicaciones y likes
- **users-service** (Puerto 3003): Gestiona los perfiles de usuario

### Frontend

- **React App** (Puerto 3000): Interfaz de usuario construida con React y TypeScript

### Base de Datos

- **PostgreSQL** (Puerto 5432): Base de datos compartida por los microservicios

## Tecnologías Utilizadas

### Backend
- Node.js 18
- TypeScript
- Express.js
- TypeORM
- PostgreSQL
- JWT para autenticación
- Bcrypt para encriptación
- Swagger para documentación
- Jest para pruebas

### Frontend
- React 18
- TypeScript
- Vite
- Zustand para manejo de estado
- Axios para peticiones HTTP
- React Router para navegación

### DevOps
- Docker
- Docker Compose

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Docker](https://www.docker.com/get-started) (versión 20 o superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (versión 2 o superior)
- Git

## Instalación

### Opción 1: Usando Docker (Recomendado)

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd prueba-periferia
```

2. Construye y levanta todos los servicios:
```bash
docker-compose up --build
```

Los servicios estarán disponibles en:
- Frontend: http://localhost:3000
- Auth Service: http://localhost:3001
- Posts Service: http://localhost:3002
- Users Service: http://localhost:3003
- PostgreSQL: localhost:5432

### Opción 2: Instalación Local

#### Backend Services

Para cada servicio (auth-service, posts-service, users-service):

```bash
cd backend/<nombre-servicio>
npm install
cp .env.example .env
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

#### Base de Datos

Asegúrate de tener PostgreSQL corriendo y crea la base de datos:

```sql
CREATE DATABASE social_network;
```

## Uso

### Usuarios de Prueba

El sistema incluye usuarios pre-configurados con el seeder:

| Usuario | Contraseña | Alias |
|---------|-----------|-------|
| jperez | password123 | juanito |
| mgonzalez | password123 | mary |
| crodriguez | password123 | carlitos |
| lmartinez | password123 | lau |
| dlopez | password123 | diegol |

### Acceso a la Aplicación

1. Abre tu navegador en http://localhost:3000
2. Ingresa con cualquiera de los usuarios de prueba
3. Explora las funcionalidades:
   - Ver publicaciones de otros usuarios
   - Crear nuevas publicaciones
   - Dar like a publicaciones
   - Ver tu perfil de usuario

### Documentación API (Swagger)

Cada microservicio incluye documentación Swagger:

- Auth Service: http://localhost:3001/api-docs
- Posts Service: http://localhost:3002/api-docs
- Users Service: http://localhost:3003/api-docs


## API Endpoints

### Auth Service (Puerto 3001)

#### POST /api/auth/login
Autenticación de usuario

**Request:**
```json
{
  "username": "jperez",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "username": "jperez",
    "firstName": "Juan",
    "lastName": "Perez",
    "alias": "juanito",
    "birthDate": "1995-03-15"
  }
}
```

#### GET /api/auth/validate
Validar token JWT

**Headers:**
```
Authorization: Bearer <token>
```

### Posts Service (Puerto 3002)

#### GET /api/posts
Obtener todas las publicaciones

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "uuid",
    "message": "Contenido de la publicación",
    "userId": "uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "likesCount": 5,
    "isLikedByUser": false
  }
]
```

#### POST /api/posts
Crear una publicación

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "message": "Mi nueva publicación"
}
```

#### POST /api/posts/like
Dar like a una publicación

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "postId": "uuid"
}
```

### Users Service (Puerto 3003)

#### GET /api/users/profile
Obtener perfil del usuario autenticado

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "uuid",
  "username": "jperez",
  "firstName": "Juan",
  "lastName": "Perez",
  "alias": "juanito",
  "birthDate": "1995-03-15",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### GET /api/users/:userId
Obtener usuario por ID

**Headers:**
```
Authorization: Bearer <token>
```

## Pruebas

Cada microservicio incluye pruebas unitarias con Jest.

### Ejecutar pruebas en un servicio específico:

```bash
cd backend/<nombre-servicio>
npm test
```

### Ejecutar pruebas con cobertura:

```bash
npm test -- --coverage
```

## Características Técnicas Implementadas

- **TypeScript**: Tipado estático en todo el proyecto
- **Arquitectura de Microservicios**: Servicios independientes y escalables
- **JWT Authentication**: Autenticación segura mediante tokens
- **TypeORM**: ORM robusto para gestión de base de datos
- **Docker**: Contenedorización de todos los servicios
- **Swagger**: Documentación interactiva de APIs
- **Zustand**: Manejo de estado ligero y eficiente en React
- **Jest**: Framework de testing para pruebas unitarias
- **Seeders**: Datos de prueba pre-cargados automáticamente
- **Error Handling**: Manejo consistente de errores en toda la aplicación
- **CORS**: Configuración correcta para comunicación entre servicios

## Solución de Problemas

### Los contenedores no inician correctamente

Verifica que los puertos no estén en uso:
```bash
docker-compose down
docker-compose up --build
```

### Error de conexión a la base de datos

Asegúrate de que el contenedor de PostgreSQL esté corriendo:
```bash
docker-compose ps
```

### Frontend no se conecta al backend

Verifica las variables de entorno en el archivo `.env` del frontend.

## Detener los Servicios

```bash
docker-compose down
```

Para eliminar también los volúmenes:
```bash
docker-compose down -v
```

