:: build script for Windows
@echo off
set GOPATH=%cd%
set GO111MODULE=off
go build -o app.exe main
