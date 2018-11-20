#!/bin/bash

:<<!
Shell之变量替换
!

dll='/usr/local/lib/libpao.so.1'

echo $dll        # /usr/local/lib/libpao.so.1

#
echo ${dll#????} # /local/lib/libpao.so.1

#
echo ${dll#*/}   # usr/local/lib/libpao.so.1
#
echo ${dll##*/}  # libpao.so.1
#
echo ${dll#*.}   # so.1
#
echo ${dll##*.}  # 1

#
echo ${dll%/*}   # /usr/local/lib
#
echo ${dll%%/*}  # None
#
echo ${dll%.*}   # /usr/local/lib/libpao.so
#
echo ${dll%%.*}  # /usr/local/lib/libpao

echo $archive                # None
#
echo ${archive:+$dll}        # None
#
echo ${archive:-$dll}        # /usr/local/lib/libpao.so.1
#
echo ${archive:=$dll}        # /usr/local/lib/libpao.so.1
#
echo ${archive:?'Failured!'} # /usr/local/lib/libpao.so.1

archive='/usr/local/lib/libpao.a'

echo ${archive}              # /usr/local/lib/libpao.a
echo ${archive:+$dll}        # /usr/local/lib/libpao.so.1
echo ${archive:-$dll}        # /usr/local/lib/libpao.a
echo ${archive:=$dll}        # /usr/local/lib/libpao.a
echo ${archive:?'Failured!'} # /usr/local/lib/libpao.a

