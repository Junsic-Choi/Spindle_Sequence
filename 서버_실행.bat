@echo off
echo =======================================================
echo 스핀들 작업 순서 관리 서버 시작 중...
echo =======================================================
start /B node server.js
echo 서버가 성공적으로 백그라운드에 실행되었습니다.
echo 접속 창을 엽니다...
timeout /t 2 >nul
start http://localhost:8282
exit
