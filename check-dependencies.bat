@echo off
echo 🔍 Dependency Checker for Exam App
echo.

echo 📦 Checking package.json...
if not exist "package.json" (
    echo ❌ package.json not found!
    pause
    exit /b 1
)

echo ✅ package.json found

echo.
echo 📁 Checking node_modules...
if not exist "node_modules" (
    echo ❌ node_modules not found
    echo Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        echo Please check your internet connection and try again
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully
) else (
    echo ✅ node_modules found
)

echo.
echo 🔧 Checking specific packages...
call npm list react-router-dom
call npm list @testing-library/react
call npm list axios

echo.
echo 📋 Dependency check complete!
echo.
echo 💡 If you see missing packages, run: npm install
echo.
pause






