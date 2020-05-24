#!/bin/bash

x=2; y=4

echo '------'
echo 'Arithmetic Operators'
echo '------'

echo "$x + $y =" `expr $x + $y`
echo "$x - $y =" `expr $x - $y`
echo "$x * $y =" `expr $x \* $y`
echo "$x / $y =" `expr $x / $y`
echo "$x % $y =" `expr $x % $y`

if [ $x == $y ]; then
    echo "$x == $y"
elif [ $x != $y ]; then
    echo "$x != $y"
fi

echo '------'
echo 'Relational Operators'
echo '------'

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

echo '------'
echo 'Boolean Operators'
echo '------'

if [ $x -gt 0 -a $y -gt 0 ]; then
    echo "$x > 0 and $y > 0"
fi

if [ $x -gt 0 -o $y -gt 0 ]; then
    echo "$x > 0 or $y > 0"
fi

z=false

if [ !$z ]; then
    echo "\$z is false."
else
    echo "\$z is true."
fi

echo '------'
echo 'Logical Operators'
echo '------'

if [[ $x -gt 0 && $y -gt 0 ]]; then
    echo "$x > 0 and $y > 0"
fi

if [[ $x -gt 0 || $y -gt 0 ]]; then
    echo "$x > 0 or $y > 0"
fi

echo '------'
echo 'String Operators'
echo '------'

s='Shell'

if [ $s = 'Shell' ]; then
    echo "$s == Shell"
fi

if [ $s != 'Shell' ]; then
    echo "$s != Shell"
fi

if [ -z $s ]; then
    echo "The length of '$s' is zero."
fi

if [ -n "$s" ]; then
    echo "The length of '$s' isn't zero."
fi

if [ $s ]; then
    echo "The '$s' isn't empty."
fi

ss=''

if [ -n "$ss" ]; then
    echo "The length of '$ss' isn't zero."
fi

if [ -n $ss ]; then
    echo "The length of '$ss' isn't zero???"
fi

echo '------'
echo 'File Operators'
echo '------'

f=$0

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
