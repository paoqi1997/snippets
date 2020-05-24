#!/bin/bash

# bash main.sh 127.0.0.1 8080
source util.sh

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
