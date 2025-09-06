@echo off
echo 🚀 Starting Test Suite for Exam App...
echo.

echo 📁 Running Frontend Tests...
call npm test -- --watchAll=false
if %errorlevel% neq 0 (
    echo ❌ Frontend tests failed
    pause
    exit /b 1
)
echo ✅ Frontend tests completed successfully!
echo.

echo 📁 Running Backend Tests...
cd backend
call npm test
if %errorlevel% neq 0 (
    echo ❌ Backend tests failed
    cd ..
    pause
    exit /b 1
)
echo ✅ Backend tests completed successfully!
cd ..
echo.

echo 🎉 All tests completed successfully!
pause






