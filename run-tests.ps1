# PowerShell script to run tests for Exam App
# To run this script, you may need to set execution policy:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

Write-Host "🚀 Starting Test Suite for Exam App..." -ForegroundColor Green
Write-Host ""

try {
    # Run Frontend Tests
    Write-Host "📁 Running Frontend Tests..." -ForegroundColor Yellow
    npm test -- --watchAll=false
    if ($LASTEXITCODE -ne 0) {
        throw "Frontend tests failed"
    }
    Write-Host "✅ Frontend tests completed successfully!" -ForegroundColor Green
    Write-Host ""

    # Run Backend Tests
    Write-Host "📁 Running Backend Tests..." -ForegroundColor Yellow
    Set-Location backend
    npm test
    if ($LASTEXITCODE -ne 0) {
        throw "Backend tests failed"
    }
    Write-Host "✅ Backend tests completed successfully!" -ForegroundColor Green
    Set-Location ..
    Write-Host ""

    Write-Host "🎉 All tests completed successfully!" -ForegroundColor Green
}
catch {
    Write-Host "💥 Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please check the test output above for details." -ForegroundColor Red
    exit 1
}






