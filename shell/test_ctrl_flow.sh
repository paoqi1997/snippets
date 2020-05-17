#!/bin/bash

arch='amd64'

if [ $arch = 'amd64' ]; then
    echo 'windows-amd64'
elif [ $arch = '386' ]; then
    echo 'windows-386'
else
    echo 'windows-arm'
fi

sum=0
for n in 1 2 3 4 5; do
    sum=`expr $sum + $n`
done
echo $sum

cnt=0
while (($cnt < 5)); do
    let cnt+=1
done
echo $cnt

while true
do
    let cnt+=1
    if [ $cnt -ge 10 ]; then
        break
    fi
done
echo $cnt

until [ $cnt -ge 20 ]; do
    let cnt+=1
done
echo $cnt

case $arch in
    'amd64')
    echo 'windows-amd64'
    ;;
    '386')
    echo 'windows-386'
    ;;
    *)
    echo 'windows-arm'
    ;;
esac
