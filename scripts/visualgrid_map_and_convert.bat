@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM ============================================================
REM Visual Reference Grid - Rename + Convert to WEBM (No Audio)
REM Save this file in: devlog-site\scripts\
REM Output goes to:    devlog-site\public\visual-grid\loops\
REM ============================================================

REM ---- Resolve project root (parent of scripts folder) ----
set "SCRIPT_DIR=%~dp0"
for %%A in ("%SCRIPT_DIR%..") do set "PROJECT_ROOT=%%~fA"

REM ---- FFmpeg location (project-local) ----
set "FFMPEG_DIR=%PROJECT_ROOT%\scripts\tools\ffmpeg"

if exist "%FFMPEG_DIR%\bin\ffmpeg.exe" (
  set "FFMPEG=%FFMPEG_DIR%\bin\ffmpeg.exe"
) else if exist "%FFMPEG_DIR%\ffmpeg.exe" (
  set "FFMPEG=%FFMPEG_DIR%\ffmpeg.exe"
) else (
  echo [ERROR] ffmpeg.exe not found in:
  echo   %FFMPEG_DIR%
  echo   %FFMPEG_DIR%\bin
  echo.
  pause
  exit /b 1
)

echo [OK] Using FFmpeg:
echo   "%FFMPEG%"
echo.

REM ---- Output directory ----
set "OUT_DIR=%PROJECT_ROOT%\public\visual-grid\loops"
if not exist "%OUT_DIR%" (
  echo [INFO] Creating output folder:
  echo   %OUT_DIR%
  mkdir "%OUT_DIR%" >nul 2>&1
)

echo Output folder:
echo   %OUT_DIR%
echo.
echo You will be prompted 9 times.
echo DRAG + DROP the correct SOURCE video file into this window, then press Enter.
echo (This avoids any “random filename” issues.)
echo.
pause

call :PROCESS "black-mirror"
call :PROCESS "detroit"
call :PROCESS "stanley-parable"
call :PROCESS "portal"
call :PROCESS "soma"
call :PROCESS "control"
call :PROCESS "blade-runner"
call :PROCESS "ex-machina"
call :PROCESS "cyberpunk"

echo.
echo ===============================
echo ✅ ALL DONE
echo WebMs + renamed MP4s are in:
echo   %OUT_DIR%
echo ===============================
echo.
pause
exit /b 0


:PROCESS
set "NAME=%~1"
echo.
echo =========================================
echo [%NAME%]
echo =========================================

:ASK
set "SRC="
set /p SRC=Drag-and-drop SOURCE video for %NAME% here then press Enter: 

REM Strip quotes if drag-drop added them
set "SRC=%SRC:"=%"

if "%SRC%"=="" (
  echo [WARN] Nothing entered. Try again.
  goto ASK
)

if not exist "%SRC%" (
  echo [ERROR] File not found:
  echo   %SRC%
  echo Try again.
  goto ASK
)

echo [INFO] Copying to:
echo   %OUT_DIR%\%NAME%.mp4
copy /y "%SRC%" "%OUT_DIR%\%NAME%.mp4" >nul

echo [INFO] Converting to WEBM (no audio)...
echo   %OUT_DIR%\%NAME%.webm

REM VP9 WEBM, no audio, decent quality for thumbnails
"%FFMPEG%" -y ^
  -i "%SRC%" ^
  -an ^
  -c:v libvpx-vp9 ^
  -b:v 0 ^
  -crf 33 ^
  -pix_fmt yuv420p ^
  -row-mt 1 ^
  -deadline good ^
  -cpu-used 4 ^
  "%OUT_DIR%\%NAME%.webm"

if errorlevel 1 (
  echo [ERROR] ffmpeg failed for %NAME%.
  echo Check the ffmpeg output above.
  pause
  exit /b 1
)

echo [OK] Wrote:
echo   %OUT_DIR%\%NAME%.mp4
echo   %OUT_DIR%\%NAME%.webm
exit /b 0
