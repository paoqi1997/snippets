#!/bin/bash

:<<!
Shell之变量替换
!

dll='/usr/local/lib/libpao.so.1'

echo $dll

#
echo ${dll#????} #

#
echo ${dll#*/}   #
#
echo ${dll##*/}  #
#
echo ${dll#*.}   #
#
echo ${dll##*.}  #

#
echo ${dll%/*}   #
#
echo ${dll%%/*}  #
#
echo ${dll%.*}   #
#
echo ${dll%%.*}  #

echo $archive
#
echo ${archive:+$dll}        #
#
echo ${archive:-$dll}        #
#
echo ${archive:=$dll}        #
#
echo ${archive:?'Failured!'} #

archive='/usr/local/lib/libpao.a'

echo ${archive}              #
echo ${archive:+$dll}        #
echo ${archive:-$dll}        #
echo ${archive:=$dll}        #
echo ${archive:?'Failured!'} #

