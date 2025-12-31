@echo off
REM ============================================================
REM Visual Grid Loop Generator for Windows
REM ============================================================
REM Generates subtle Ken Burns pan/zoom video loops from static images
REM Input:  src/assets/visual-grid/*.{jpg,png}
REM Output: public/visual-grid/loops/{basename}.{mp4,webm}
REM ============================================================

setlocal enabledelayedexpansion

REM Parse command line arguments
set FORCE_REGENERATE=0
if "%1"=="--force" set FORCE_REGENERATE=1
if "%1"=="-f" set FORCE_REGENERATE=1

REM Define paths (relative to project root)
set INPUT_DIR=src\assets\visual-grid
set OUTPUT_DIR=public\visual-grid\loops
set FFMPEG_PATH=scripts\tools\ffmpeg\ffmpeg.exe

REM Video settings
set DURATION=2.8
set FPS=30
set WIDTH=1280
set HEIGHT=720
set VIDEO_BITRATE=800k
set CRF=28

REM Statistics
set PROCESSED=0
set SKIPPED=0
set ERRORS=0

echo.
echo ============================================================
echo Visual Grid Loop Generator
echo ============================================================
echo Input:  %INPUT_DIR%
echo Output: %OUTPUT_DIR%
echo Duration: %DURATION%s @ %FPS%fps
echo Resolution: %WIDTH%x%HEIGHT% (16:9)
if %FORCE_REGENERATE%==1 (
    echo Mode: FORCE REGENERATE
) else (
    echo Mode: Skip existing files
)
echo ============================================================
echo.

REM Check if FFmpeg exists at expected location
if not exist "%FFMPEG_PATH%" (
    echo [ERROR] FFmpeg not found at: %FFMPEG_PATH%
    echo.
    echo Please download FFmpeg and place it at:
    echo   %cd%\%FFMPEG_PATH%
    echo.
    echo Download FFmpeg:
    echo   1. Visit: https://www.gyan.dev/ffmpeg/builds/
    echo   2. Download: ffmpeg-release-essentials.zip
    echo   3. Extract ffmpeg.exe from bin\ folder
    echo   4. Place at: scripts\tools\ffmpeg\ffmpeg.exe
    echo.
    echo Folder structure should be:
    echo   scripts\
    echo     tools\
    echo       ffmpeg\
    echo         ffmpeg.exe  ^<-- Place here
    echo.
    exit /b 1
)

echo [INFO] Using FFmpeg at: %FFMPEG_PATH%
echo.

REM Create output directory if it doesn't exist
if not exist "%OUTPUT_DIR%" (
    echo [INFO] Creating output directory: %OUTPUT_DIR%
    mkdir "%OUTPUT_DIR%"
)

REM Check if input directory exists
if not exist "%INPUT_DIR%" (
    echo [ERROR] Input directory not found: %INPUT_DIR%
    echo Please create it and add your reference images.
    exit /b 1
)

REM Count total files to process
set TOTAL=0
for %%F in ("%INPUT_DIR%\*.jpg" "%INPUT_DIR%\*.jpeg" "%INPUT_DIR%\*.png") do (
    if exist "%%F" set /a TOTAL+=1
)

if %TOTAL%==0 (
    echo [WARNING] No images found in %INPUT_DIR%
    echo Supported formats: .jpg, .jpeg, .png
    exit /b 0
)

echo Found %TOTAL% image(s) to process.
echo.

REM Process each image file
for %%F in ("%INPUT_DIR%\*.jpg" "%INPUT_DIR%\*.jpeg" "%INPUT_DIR%\*.png") do (
    set "FILENAME=%%~nF"
    set "INPUT_FILE=%%F"
    set "OUTPUT_MP4=%OUTPUT_DIR%\!FILENAME!.mp4"
    set "OUTPUT_WEBM=%OUTPUT_DIR%\!FILENAME!.webm"
    
    REM Check if outputs already exist (unless force flag is set)
    if %FORCE_REGENERATE%==0 (
        if exist "!OUTPUT_MP4!" if exist "!OUTPUT_WEBM!" (
            echo [SKIP] !FILENAME! - outputs already exist
            echo       MP4:  !OUTPUT_MP4!
            echo       WebM: !OUTPUT_WEBM!
            set /a SKIPPED+=1
            goto :continue
        )
    )
    
    echo [PROCESSING] !FILENAME!...
    echo   Input:  !INPUT_FILE!
    echo   Output: !OUTPUT_MP4!
    echo           !OUTPUT_WEBM!
    
    REM Generate MP4 with H.264 (subtle zoom + pan)
    REM Ken Burns effect: slow zoom from 1.0 to 1.15 scale with slight pan
    "%FFMPEG_PATH%" -y -loop 1 -i "!INPUT_FILE!" ^
        -vf "scale=%WIDTH%:%HEIGHT%:force_original_aspect_ratio=increase,crop=%WIDTH%:%HEIGHT%,zoompan=z='min(zoom+0.0015,1.15)':d=%FPS%*%DURATION%:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=%WIDTH%x%HEIGHT%:fps=%FPS%,format=yuv420p" ^
        -t %DURATION% ^
        -c:v libx264 ^
        -preset medium ^
        -crf %CRF% ^
        -movflags +faststart ^
        -an ^
        "!OUTPUT_MP4!" >nul 2>&1
    
    if !ERRORLEVEL! neq 0 (
        echo [ERROR] Failed to generate MP4 for !FILENAME!
        set /a ERRORS+=1
        goto :continue
    )
    
    REM Generate WebM with VP9 (better compression for web)
    "%FFMPEG_PATH%" -y -loop 1 -i "!INPUT_FILE!" ^
        -vf "scale=%WIDTH%:%HEIGHT%:force_original_aspect_ratio=increase,crop=%WIDTH%:%HEIGHT%,zoompan=z='min(zoom+0.0015,1.15)':d=%FPS%*%DURATION%:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=%WIDTH%x%HEIGHT%:fps=%FPS%" ^
        -t %DURATION% ^
        -c:v libvpx-vp9 ^
        -b:v %VIDEO_BITRATE% ^
        -quality good ^
        -speed 2 ^
        -an ^
        "!OUTPUT_WEBM!" >nul 2>&1
    
    if !ERRORLEVEL! neq 0 (
        echo [WARNING] Failed to generate WebM for !FILENAME! (MP4 still created)
    )
    
    echo [SUCCESS] Generated loops for !FILENAME!
    echo   - !OUTPUT_MP4! (%%~zF bytes)
    echo   - !OUTPUT_WEBM!
    set /a PROCESSED+=1
    
    :continue
)

REM Print summary
echo.
echo ============================================================
echo Generation Complete
echo ============================================================
echo Processed: %PROCESSED%
echo Skipped:   %SKIPPED%
echo Errors:    %ERRORS%
echo Total:     %TOTAL%
echo ============================================================
echo.
echo INPUT DIRECTORY:  %cd%\%INPUT_DIR%
echo OUTPUT DIRECTORY: %cd%\%OUTPUT_DIR%
echo.

if %PROCESSED% gtr 0 (
    echo Video loops saved to: %OUTPUT_DIR%
    echo.
    echo Generated files will be accessible at:
    echo   /visual-grid/loops/{filename}.mp4
    echo   /visual-grid/loops/{filename}.webm
    echo.
    echo Example video URLs:
    echo   /visual-grid/loops/black-mirror.mp4
    echo   /visual-grid/loops/blade-runner.webm
    echo.
    echo Ready to use in Visual Reference Grid!
)

if %ERRORS% gtr 0 (
    echo [WARNING] Some files failed to process. Check FFmpeg installation.
    exit /b 1
)

exit /b 0

