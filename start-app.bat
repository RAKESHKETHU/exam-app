@echo off
echo 🚀 Starting Exam Application...
echo.

echo 📋 Checking dependencies...
if not exist "node_modules" (
    echo ❌ Frontend dependencies not found. Installing...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install frontend dependencies
        pause
        exit /b 1
    )
)

if not exist "backend\node_modules" (
    echo ❌ Backend dependencies not found. Installing...
    cd backend
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install backend dependencies
        cd ..
        pause
        exit /b 1
    )
    cd ..
)

echo ✅ All dependencies installed
echo.

echo 🌐 Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm start"

echo ⏳ Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo 🎨 Starting Frontend Application...
start "Frontend App" cmd /k "npm start"

echo.
echo 🎉 Application Starting!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:5000 (or check backend console)
echo.
echo 💡 Keep both terminal windows open
echo.
pause






