@echo off
REM Script para iniciar todos los servicios localmente en Windows

echo Iniciando servicios de la Red Social...
echo.

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js no esta instalado
    exit /b 1
)

echo Instalando dependencias...
echo.

cd backend\auth-service
call npm install
cd ..\..

cd backend\posts-service
call npm install
cd ..\..

cd backend\users-service
call npm install
cd ..\..

cd frontend
call npm install
cd ..

echo.
echo Creando archivos .env si no existen...

if not exist "backend\auth-service\.env" (
    copy "backend\auth-service\.env.example" "backend\auth-service\.env"
    echo Creado: backend\auth-service\.env
)

if not exist "backend\posts-service\.env" (
    copy "backend\posts-service\.env.example" "backend\posts-service\.env"
    echo Creado: backend\posts-service\.env
)

if not exist "backend\users-service\.env" (
    copy "backend\users-service\.env.example" "backend\users-service\.env"
    echo Creado: backend\users-service\.env
)

if not exist "frontend\.env" (
    copy "frontend\.env.example" "frontend\.env"
    echo Creado: frontend\.env
)

echo.
echo IMPORTANTE: Asegurate de tener PostgreSQL corriendo con la base de datos 'social_network'
echo.
echo Para iniciar los servicios, abre 4 terminales separadas y ejecuta:
echo.
echo Terminal 1: cd backend\auth-service ^&^& npm run dev
echo Terminal 2: cd backend\posts-service ^&^& npm run dev
echo Terminal 3: cd backend\users-service ^&^& npm run dev
echo Terminal 4: cd frontend ^&^& npm run dev
echo.

pause
