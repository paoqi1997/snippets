#!/bin/bash

:<<!
Shell之运算符
!

x=3; y=4; z=-1
s='Paoqi'
f='README.md'

echo '---'
echo 'Arithmetic Operators'
echo '---'

echo `expr $x + $y`  # 3 + 4 = 7
echo `expr $x - $y`  # 3 - 4 = -1
echo `expr $x \* $y` # 3 * 4 = 12
echo `expr $x / $y`  # 3 / 4 = 0
echo `expr $x % $y`  # 3 % 4 = 3

if [ $x == $y ]; then
    echo "$x == $y"
fi

if [ $x != $y ]; then
    echo "$x != $y"
fi

echo '---'
echo 'Relational Operators'
echo '---'

if [ $x -eq $y ]; then
    echo "$x == $y"
fi

if [ $x -ne $y ]; then
    echo "$x != $y"
fi

if [ $x -lt $y ]; then
    echo "$x < $y"
fi

if [ $x -le $y ]; then
    echo "$x <= $y"
fi

if [ $x -gt $y ]; then
    echo "$x > $y"
fi

if [ $x -ge $y ]; then
    echo "$x >= $y"
fi

echo '---'
echo 'Boolean Operators'
echo '---'

if [ $x -gt 0 -a $y -gt 0 ]; then
    echo "$x > 0 and $y > 0"
fi

if [ $x -gt 0 -o $y -gt 0 ]; then
    echo "$x > 0 or $y > 0"
fi

if [ !$z ]; then
    echo "$z < 0"
fi

echo '---'
echo 'Logical Operators'
echo '---'

if [[ $x -gt 0 && $y -gt 0 ]]; then
    echo "$x > 0 and $y > 0"
fi

if [[ $x -gt 0 || $y -gt 0 ]]; then
    echo "$x > 0 or $y > 0"
fi

echo '---'
echo 'String Operators'
echo '---'

if [ $s = 'Daoqi' ]; then
    echo "$s == Daoqi"
fi

if [ $s != 'Daoqi' ]; then
    echo "$s != Daoqi"
fi

if [ -z $s ]; then
    echo "the length of string is zero."
fi

if [ -n $s ]; then
    echo "the length of string isn't zero."
fi

if [ $s ]; then
    echo "the string isn't empty."
fi

echo '---'
echo 'File Operators'
echo '---'

if [ -e $f ]; then
    echo "$f exists."
fi

if [ -s $f ]; then
    echo "$f isn't empty."
fi

if [ -f $f ]; then
    echo "$f is a common file."
fi

if [ -d $f ]; then
    echo "$f is a directory."
fi

if [ -r $f ]; then
    echo "$f can be read."
fi

if [ -w $f ]; then
    echo "$f can be written."
fi

if [ -x $f ]; then
    echo "$f can be executed."
fi
