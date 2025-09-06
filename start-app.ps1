# PowerShell script to start Exam Application
# To run this script, you may need to set execution policy:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

Write-Host "🚀 Starting Exam Application..." -ForegroundColor Green
Write-Host ""

# Check and install frontend dependencies
Write-Host "📋 Checking frontend dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "❌ Frontend dependencies not found. Installing..." -ForegroundColor Red
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
        exit 1
    }
}

# Check and install backend dependencies
Write-Host "📋 Checking backend dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "backend\node_modules")) {
    Write-Host "❌ Backend dependencies not found. Installing..." -ForegroundColor Red
    Set-Location backend
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
        Set-Location ..
        exit 1
    }
    Set-Location ..
}

Write-Host "✅ All dependencies installed" -ForegroundColor Green
Write-Host ""

# Start backend server
Write-Host "🌐 Starting Backend Server..." -ForegroundColor Yellow
Start-Process -FilePath "cmd" -ArgumentList "/k", "cd backend && npm start" -WindowStyle Normal

# Wait a moment for backend to start
Write-Host "⏳ Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start frontend application
Write-Host "🎨 Starting Frontend Application..." -ForegroundColor Yellow
Start-Process -FilePath "cmd" -ArgumentList "/k", "npm start" -WindowStyle Normal

Write-Host ""
Write-Host "🎉 Application Starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Backend: http://localhost:5000 (or check backend console)" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Keep both terminal windows open" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")






