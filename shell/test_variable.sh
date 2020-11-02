#!/bin/bash

hello='Hello'
echo "$hello World!"

readonly db='MySQL'
echo $db

version=$(cat /proc/version)
echo $version

unset hello
echo $hello

hello='Hello'
echo $hello' World!'

s='go1.10.7.linux-amd64.tar.gz'
echo ${#s}                 # 27
echo `expr index $s linux` # 10
echo ${s:9:5}              # linux

m=(1 2 3 4 5)
echo ${#m[*]} ${m[*]} # 5 1 2 3 4 5
echo ${#m[@]} ${m[@]} # 5 1 2 3 4 5

# 删除前2个字符
echo ${s#??}  # 1.10.7.linux-amd64.tar.gz

# 从左边开始删除字符，删除第一个'.'后结束
echo ${s#*.}  # 10.7.linux-amd64.tar.gz

# 从左边开始删除字符，删除最后一个'.'后结束
echo ${s##*.} # gz

# 从右边开始删除字符，删除第一个'.'后结束
echo ${s%.*}  # go1.10.7.linux-amd64.tar

# 从右边开始删除字符，删除最后一个'.'后结束
echo ${s%%.*} # go1

api2='Vulkan'

echo $api1
# 如果api1被定义，那么返回api2，但是不改变api1的值
echo ${api1:+$api2}
# 如果api1为空或者被删除，那么返回api2，但是不改变api1的值
echo ${api1:-$api2}
# 如果api1为空或者被删除，那么返回api2，并将api1的值设置为api2
echo ${api1:=$api2}
# 如果api1为空或者被删除，那么将消息送至标准错误输出
echo ${api1:?'nil'}
