:: build script for Windows
@echo off
set GOPATH=%cd%
go build -o app.exe main
