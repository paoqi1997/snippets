#!/bin/sh

export GO111MODULE=on

currdir=`pwd`
sumpath=$currdir/go.sum

if [ ! -e $sumpath ]; then
    go mod download
fi

go build -o app
