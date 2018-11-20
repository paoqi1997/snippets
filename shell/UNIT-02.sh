#!/bin/bash

:<<!
Shell之初体验
!

# 定义变量
content='NMSL'
echo "$content! I am your brother!"

# 只读变量
readonly name='Xiaochuan'
echo $name

# 删除变量
unset content
echo $content

# 拼接字符串
action='kkp'
echo 'zai?'" $action"    # zai? kkp

# 获取字符串长度
distribution='Arch Linux'
echo ${#distribution}    # 10

# 提取子字符串
echo ${distribution:0:4} # Arch

# 查找子字符串
language='JavaScript'
echo `expr index $language Script` # 5

# 遍历数组
array=(1 3 5 7 9)
echo ${array[@]}
echo ${array[*]}

array[0]=2
array[1]=4
array[2]=6
array[3]=8
array[4]=10

for i in 0 1 2 3 4
do
    echo ${array[i]}
done

# 获取数组长度
echo ${#array[@]} # 5
echo ${#array[*]} # 5
