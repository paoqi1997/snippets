#!/bin/sh

currdir=`pwd`

export GOPATH=$currdir
export GO111MODULE=off

libpath=$currdir/pkg/linux_amd64/github.com/go-sql-driver/mysql.a

if [ ! -e $libpath ]; then
    go get -u -v github.com/go-sql-driver/mysql
fi

go build -o app main
