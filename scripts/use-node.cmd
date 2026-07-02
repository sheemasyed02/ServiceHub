@echo off
setlocal
set "FNM_DIR=%USERPROFILE%\.fnm"
set "FNM_MULTISHELL_PATHS=true"
set "PATH=%FNM_DIR%;%PATH%"
if exist "%FNM_DIR%\fnm.exe" (
  for /f "delims=" %%i in ('fnm env --use-on-cd --shell cmd') do call %%i
)
cd /d "%~dp0"
if exist .nvmrc (
  fnm use
)
node -v
npm -v
endlocal
