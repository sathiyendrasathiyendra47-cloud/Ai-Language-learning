@echo off
title AI Language Learning Companion
echo ========================================================
echo   Launching AI Language Learning Companion (A1 English)
echo ========================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Starting server with Node.js...
    start http://localhost:3000
    node server.js
    goto end
)

where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Starting server with Python...
    start http://localhost:3000
    python server.py
    goto end
)

echo Error: Neither Node.js nor Python was found on PATH.
echo Please install Node.js (https://nodejs.org) or Python.
pause

:end
