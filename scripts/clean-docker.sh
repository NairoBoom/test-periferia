#!/bin/bash

echo "Limpiando Docker..."
echo ""

echo "Deteniendo contenedores..."
docker-compose down -v

echo ""
echo "Limpiando imagenes antiguas del proyecto..."
docker rmi prueba-periferia-auth-service 2>/dev/null || true
docker rmi prueba-periferia-posts-service 2>/dev/null || true
docker rmi prueba-periferia-users-service 2>/dev/null || true
docker rmi prueba-periferia-frontend 2>/dev/null || true

echo ""
echo "Limpieza completa!"
echo "Ahora puedes ejecutar: docker-compose up --build"
