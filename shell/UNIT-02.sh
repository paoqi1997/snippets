#!/bin/bash

:<<!
Shell之变量替换
!

dll='/usr/local/lib/libpao.so.1'

echo $dll        # /usr/local/lib/libpao.so.1

# 删除前4个字符
echo ${dll#????} # /local/lib/libpao.so.1

# 从左边开始删除字符，删除第一个'/'后结束
echo ${dll#*/}   # usr/local/lib/libpao.so.1
# 从左边开始删除字符，删除最后一个'/'后结束
echo ${dll##*/}  # libpao.so.1
# 从左边开始删除字符，删除第一个'.'后结束
echo ${dll#*.}   # so.1
# 从左边开始删除字符，删除最后一个'.'后结束
echo ${dll##*.}  # 1

# 从右边开始删除字符，删除第一个'/'后结束
echo ${dll%/*}   # /usr/local/lib
# 从右边开始删除字符，删除最后一个'/'后结束
echo ${dll%%/*}  # None
# 从右边开始删除字符，删除第一个'.'后结束
echo ${dll%.*}   # /usr/local/lib/libpao.so
# 从右边开始删除字符，删除最后一个'.'后结束
echo ${dll%%.*}  # /usr/local/lib/libpao

echo $archive              # None
# 如果archive被定义，那么返回dll，但不改变archive的值
echo ${archive:+$dll}      # None
# 如果archive为空或者被删除，那么返回dll，但不改变archive的值
echo ${archive:-$dll}      # /usr/local/lib/libpao.so.1
# 如果archive为空或者被删除，那么返回dll，并将archive的值设置为dll
echo ${archive:=$dll}      # /usr/local/lib/libpao.so.1
# 如果archive为空或者被删除，那么将消息送到标准错误输出
echo ${archive:?'Failed!'} # /usr/local/lib/libpao.so.1

archive='/usr/local/lib/libpao.a'

echo ${archive}            # /usr/local/lib/libpao.a
echo ${archive:+$dll}      # /usr/local/lib/libpao.so.1
echo ${archive:-$dll}      # /usr/local/lib/libpao.a
echo ${archive:=$dll}      # /usr/local/lib/libpao.a
echo ${archive:?'Failed!'} # /usr/local/lib/libpao.a
