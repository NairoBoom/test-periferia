#!/bin/bash

# Script para iniciar todos los servicios localmente (sin Docker)

echo "Iniciando servicios de la Red Social..."
echo ""

check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "Error: $1 no está instalado"
        exit 1
    fi
}

check_command node
check_command npm
check_command psql

echo "Verificando base de datos PostgreSQL..."
if psql -U postgres -lqt | cut -d \| -f 1 | grep -qw social_network; then
    echo "Base de datos 'social_network' existe"
else
    echo "Creando base de datos 'social_network'..."
    psql -U postgres -c "CREATE DATABASE social_network;"
fi

echo ""
echo "Instalando dependencias..."

cd backend/auth-service
npm install
cd ../..

cd backend/posts-service
npm install
cd ../..

cd backend/users-service
npm install
cd ../..

cd frontend
npm install
cd ..

echo ""
echo "Creando archivos .env si no existen..."

for service in backend/auth-service backend/posts-service backend/users-service frontend; do
    if [ ! -f "$service/.env" ]; then
        cp "$service/.env.example" "$service/.env"
        echo "Creado: $service/.env"
    fi
done

echo ""
echo "Iniciando servicios..."
echo "Presiona Ctrl+C para detener todos los servicios"
echo ""

trap 'kill $(jobs -p)' EXIT

cd backend/auth-service && npm run dev &
sleep 2

cd backend/posts-service && npm run dev &
sleep 2

cd backend/users-service && npm run dev &
sleep 2

cd frontend && npm run dev &

wait
