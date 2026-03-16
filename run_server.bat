@echo off
setlocal
title Spindle Sequence Server Watchdog

:: 서버 파일 경로 설정
set SERVER_DIR=%~dp0
cd /d "%SERVER_DIR%"

echo =======================================================
echo Spindle Sequence Server starting...
echo Time: %date% %time%
echo =======================================================

:start_server
echo [%time%] Starting server...
echo [%time%] Server starting >> server_log.txt

"C:\Program Files\nodejs\node.exe" server.js >> server_log.txt 2>&1

echo.
echo =======================================================
echo [%time%] !!! WARNING: Server crashed or stopped !!!
echo Restarting in 5 seconds...
echo [%time%] Server stopped (Waiting to restart) >> server_log.txt
echo =======================================================
timeout /t 5 >nul
goto start_server
