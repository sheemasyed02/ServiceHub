# Ensures the correct Node.js version via fnm (Fast Node Manager).
# Run: . .\scripts\ensure-node.ps1

$ErrorActionPreference = 'Stop'

$fnmDir = Join-Path $env:USERPROFILE '.fnm'
$fnmExe = Join-Path $fnmDir 'fnm.exe'
$requiredVersion = (Get-Content (Join-Path $PSScriptRoot '..\.nvmrc') -Raw).Trim()

if (-not (Test-Path $fnmExe)) {
  Write-Host 'Installing fnm...' -ForegroundColor Yellow
  $fnmZip = Join-Path $env:TEMP 'fnm-windows.zip'
  $fnmUrl = 'https://github.com/Schniz/fnm/releases/download/v1.38.1/fnm-windows.zip'
  New-Item -ItemType Directory -Force -Path $fnmDir | Out-Null
  Invoke-WebRequest -Uri $fnmUrl -OutFile $fnmZip -UseBasicParsing
  Expand-Archive -Path $fnmZip -DestinationPath $fnmDir -Force
}

$env:FNM_DIR = $fnmDir
$env:FNM_MULTISHELL_PATHS = 'true'
$env:Path = "$fnmDir;$env:Path"

$installed = & $fnmExe list 2>$null | Select-String $requiredVersion
if (-not $installed) {
  Write-Host "Installing Node.js v$requiredVersion..." -ForegroundColor Yellow
  & $fnmExe install $requiredVersion
}

& $fnmExe use $requiredVersion | Out-Null
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression

$current = node -v
Write-Host "Node.js $current is active (required: v$requiredVersion)" -ForegroundColor Green

if ($current -ne "v$requiredVersion") {
  Write-Error "Node version mismatch. Expected v$requiredVersion but got $current"
}
