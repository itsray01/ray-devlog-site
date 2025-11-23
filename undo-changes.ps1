# undo-changes.ps1
# Script to undo/discard uncommitted changes

$ErrorActionPreference = "Stop"

# Get the script directory and navigate to project root
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Checking git status..." -ForegroundColor Cyan
git status

# Check if there are any changes
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to undo." -ForegroundColor Yellow
    exit 0
}

Write-Host "`nWARNING: This will discard all uncommitted changes!" -ForegroundColor Red
Write-Host "Modified files:" -ForegroundColor Yellow
git status --short

$confirmation = Read-Host "`nAre you sure you want to discard all changes? (yes/no)"
if ($confirmation -ne "yes") {
    Write-Host "Operation cancelled." -ForegroundColor Yellow
    exit 0
}

Write-Host "`nDiscarding all changes..." -ForegroundColor Cyan
git restore .

# Also clean untracked files if needed
$cleanUntracked = Read-Host "`nDo you want to remove untracked files as well? (yes/no)"
if ($cleanUntracked -eq "yes") {
    Write-Host "Removing untracked files..." -ForegroundColor Cyan
    git clean -fd
}

Write-Host "`n[SUCCESS] All changes have been discarded." -ForegroundColor Green
git status

