#!/bin/bash

# Script para ejecutar todas las pruebas del proyecto

echo "Ejecutando pruebas unitarias..."
echo ""

FAILED=0

echo "=== Testing Auth Service ==="
cd backend/auth-service
npm test
if [ $? -ne 0 ]; then
    FAILED=1
fi
cd ../..
echo ""

echo "=== Testing Posts Service ==="
cd backend/posts-service
npm test
if [ $? -ne 0 ]; then
    FAILED=1
fi
cd ../..
echo ""

echo "=== Testing Users Service ==="
cd backend/users-service
npm test
if [ $? -ne 0 ]; then
    FAILED=1
fi
cd ../..
echo ""

if [ $FAILED -eq 0 ]; then
    echo "✓ Todas las pruebas pasaron exitosamente"
    exit 0
else
    echo "✗ Algunas pruebas fallaron"
    exit 1
fi
