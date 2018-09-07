#!/bin/bash

:<<!
Shell之传递参数
!

# bash UNIT-02.sh 1 2

echo "currpid: $$"

echo "options: $-"

# UNIT-02.sh
echo "name: $0"

# 2 parameters: 1 2
echo "$# parameters: $1 $2"

# Successful!
if [ "$1" != '1' ]; then
    echo 'Failed!'
else
    echo 'Successful!'
fi

# 1
# 2
for i in $*; do
    echo $i
done

# 1
# 2
for i in $@; do
    echo $i
done

# 1 2
for j in "$*"; do
    echo $j
done

# 1
# 2
for j in "$@"; do
    echo $j
done
