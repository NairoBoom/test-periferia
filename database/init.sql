-- Script de inicialización de base de datos para Red Social
-- Este script se ejecuta automáticamente por los seeders de cada servicio

-- Verificar la conexión
SELECT 'Base de datos social_network inicializada correctamente' AS status;

-- Las tablas se crean automáticamente mediante TypeORM
-- Este script es solo para referencia del esquema

/*
Esquema de Base de Datos:

-- Tabla de Usuarios
users (
  id UUID PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  firstName VARCHAR NOT NULL,
  lastName VARCHAR NOT NULL,
  alias VARCHAR NOT NULL,
  birthDate DATE NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- Tabla de Publicaciones
posts (
  id UUID PRIMARY KEY,
  message TEXT NOT NULL,
  userId UUID NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
)

-- Tabla de Likes
likes (
  id UUID PRIMARY KEY,
  userId UUID NOT NULL,
  postId UUID NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (postId) REFERENCES posts(id),
  UNIQUE(userId, postId)
)

Datos de Prueba (Seeders):

Usuarios:
- jperez / password123 (Juan Perez, alias: juanito)
- mgonzalez / password123 (Maria González, alias: mary)
- crodriguez / password123 (Carlos Rodriguez, alias: carlitos)
- lmartinez / password123 (Laura Martinez, alias: lau)
- dlopez / password123 (Diego Lopez, alias: diegol)

Cada usuario incluye una publicación inicial.
*/

-- Crear índices para mejorar el rendimiento (opcional)
-- Estos se crean automáticamente por las foreign keys y unique constraints
-- CREATE INDEX idx_posts_userId ON posts(userId);
-- CREATE INDEX idx_likes_postId ON likes(postId);
-- CREATE INDEX idx_likes_userId ON likes(userId);
