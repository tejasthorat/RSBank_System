@echo off
title RBank Management System
cls
echo ===========================================
echo        Starting RBank Management System
echo ===========================================
echo.

REM Ask for Sign-in Confirmation
set /p signin=Do you want to Sign In? (Y/N): 
if /i "%signin%" neq "Y" (
    echo Sign-In Cancelled. Exiting...
    exit
)

REM Navigate to Backend Folder
echo Starting Backend...
cd /d C:\Users\TEJAS\IdeaProjects\RSBank_System\Backend\RSBankSystem_B\BankSystem
start cmd /k "mvn spring-boot:run"
timeout /t 10 >nul
echo ✅ Backend Started Successfully.

REM Navigate to Frontend Folder
echo.
echo Starting Frontend...
cd /d C:\Users\TEJAS\IdeaProjects\RSBank_System\Frontend\RSBankSystem_F

if not exist node_modules (
    echo Installing Dependencies...
    call npm install
) else (
    echo Dependencies Already Installed.
)

start cmd /k "npm run dev"
timeout /t 5 >nul
echo ✅ Frontend Started Successfully.

REM Automatically Open App in Browser
echo Opening Application in Browser...
start http://localhost:5173/

echo ===========================================
echo         RBank System is Running... ✅
echo ===========================================

REM Wait for User to Close the Window
pause

REM Automatic User Logout when App Closes
echo Logging out user session...
timeout /t 3 >nul

REM Clear LocalStorage and SessionStorage through hidden browser window
start /min powershell -Command "& {Invoke-WebRequest -Uri 'http://localhost:5173/logout' -UseBasicParsing}"

timeout /t 2 >nul
echo ✅ User Session Logged Out.

REM Kill Backend & Frontend Command Windows
taskkill /f /im cmd.exe >nul
echo RBank System Closed.
exit
