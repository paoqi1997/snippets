#!/bin/bash

# bash main.sh 127.0.0.1 8080
source util.sh

x=0
add x 1 2
echo "x: $x, res: $?"

rm evil
echo "status: $?"

if [ $# -lt 1 ]; then
    echo "没有填写参数！"
fi

if [ -z $1 ]; then
    echo "参数不能为空！"
    exit 1
elif [ $1 = '/' -o $1 = "\\" ]; then
    # 若要打印"\\"，bash 应为"\\\\"，dash 应为"\\\\\\"
    echo "参数不能为\"/\"或\"\\\\\"！"
    exit 1
fi

# $# 是传入的参数个数，这里将它传给 printInfo 的 $1
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
