# commit-and-push.ps1
# Script to commit and push changes to CloudFlare Pages

$ErrorActionPreference = "Stop"

# Get the script directory and navigate to project root
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Checking git status..." -ForegroundColor Cyan
git status

# Check if there are any changes
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to commit." -ForegroundColor Yellow
    exit 0
}

Write-Host "`nStaging all changes..." -ForegroundColor Cyan
git add .

Write-Host "`nEnter commit message (or press Enter for default):" -ForegroundColor Yellow
$commitMessage = Read-Host
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMessage = "Update: $timestamp"
}

Write-Host "`nCommitting changes..." -ForegroundColor Cyan
git commit -m $commitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nPushing to remote..." -ForegroundColor Cyan
    git push
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n[SUCCESS] Successfully pushed to CloudFlare Pages!" -ForegroundColor Green
    } else {
        Write-Host "`n[ERROR] Failed to push changes." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "`n[ERROR] Failed to commit changes." -ForegroundColor Red
    exit 1
}

