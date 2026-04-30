# 服务器测试脚本
$ErrorActionPreference = "SilentlyContinue"

function Test-Server {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 3 -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ 服务器运行正常" -ForegroundColor Green
        return $true
    } else {
        Write-Host "❌ 服务器未运行，正在重启..." -ForegroundColor Red
        return $false
    }
}

# 测试服务器
if (-not (Test-Server)) {
    Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
    Start-Sleep 1
    Start-Job -ScriptBlock { 
        cd C:\Users\guoke\WorkBuddy\20260430120316
        & "C:\Program Files\nodejs\node.exe" server.js
    } | Out-Null
    Start-Sleep 3
    Test-Server
}
