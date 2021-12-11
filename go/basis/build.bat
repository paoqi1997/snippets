:: build script for Windows
@echo off

set GOPATH=%cd%
set GO111MODULE=off

go build -o app.exe main

if not %ERRORLEVEL% == 0 goto ExitError
goto Done

:ExitError
exit /b 1

:ExitOk
exit /b 0

:Done
