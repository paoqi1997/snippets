#!/bin/bash

# bash main.sh 127.0.0.1 8080
source util.sh

x=0
add x 1 2
echo "x: $x, res: $?"

rm evil
echo "status: $?"

# 这里的 $# 传入给 printInfo 的 $1
printInfo $#

# 127.0.0.1
# 8080
for arg in $*; do
    echo $arg
done

# 127.0.0.1
# 8080
for arg in $@; do
    echo $arg
done

# 127.0.0.1 8080
for arg in "$*"; do
    echo $arg
done

# 127.0.0.1
# 8080
for arg in "$@"; do
    echo $arg
done
