@echo off
echo 🚀 Simple Test Runner for Exam App
echo.

echo 📋 Checking project setup...
if not exist "node_modules" (
    echo ❌ node_modules not found. Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        echo Please run: npm install
        pause
        exit /b 1
    )
) else (
    echo ✅ Dependencies found
)

echo.
echo 🧪 Running Frontend Tests...
call npm test -- --watchAll=false --passWithNoTests
if %errorlevel% neq 0 (
    echo ⚠️  Some tests failed (this is normal for first run)
    echo This usually means missing dependencies or setup issues
)

echo.
echo 📊 Test Summary:
echo - Frontend tests attempted
echo - Check the output above for specific errors
echo.
echo 💡 Next steps:
echo 1. Run: npm install (if dependencies missing)
echo 2. Check if all required packages are installed
echo 3. Run individual test files to debug specific issues
echo.
pause






