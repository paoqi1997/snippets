#!/bin/sh

export GO111MODULE=on

currdir=`pwd`
sumpath=$currdir/go.sum

if [ ! -e $sumpath ]; then
    go mod download
fi

# 如果 main.go 文件在 src/main 目录下，应为 go build -o app hello-redis/src/main
go build -o app
