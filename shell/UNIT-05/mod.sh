#!/bin/bash

:<<!
Shell之函数及外部脚本
!

function add() {
    let $1=$2+$3
}

function sub() {
    let $1=$2-$3
}

function print() {
    printf "%s: %d\n" $1 $2
}
