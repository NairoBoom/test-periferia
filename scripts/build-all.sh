#!/bin/bash

# Script para construir todos los servicios

echo "Construyendo todos los servicios..."
echo ""

FAILED=0

echo "=== Building Auth Service ==="
cd backend/auth-service
npm install
npm run build
if [ $? -ne 0 ]; then
    echo "Error en Auth Service"
    FAILED=1
fi
cd ../..
echo ""

echo "=== Building Posts Service ==="
cd backend/posts-service
npm install
npm run build
if [ $? -ne 0 ]; then
    echo "Error en Posts Service"
    FAILED=1
fi
cd ../..
echo ""

echo "=== Building Users Service ==="
cd backend/users-service
npm install
npm run build
if [ $? -ne 0 ]; then
    echo "Error en Users Service"
    FAILED=1
fi
cd ../..
echo ""

echo "=== Building Frontend ==="
cd frontend
npm install
npm run build
if [ $? -ne 0 ]; then
    echo "Error en Frontend"
    FAILED=1
fi
cd ..
echo ""

if [ $FAILED -eq 0 ]; then
    echo "✓ Todos los servicios se construyeron exitosamente"
    exit 0
else
    echo "✗ Algunos servicios fallaron al construirse"
    exit 1
fi
