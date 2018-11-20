#!/bin/bash

:<<!
Shell之命令及控制流
!

# 换行
echo -e 'Line 1.\nLine 2.'

# 将结果定向至文件
echo 'NMSL! I am your brother!' > TonyHorse.txt

# 显示date命令执行结果
echo `date`

# 格式化输出
printf "Name: %s\n" 'Xiaochuan'

# 检查某个条件是否成立
filename='README.md'
if test -e $filename; then
    echo "$filename exists."
else
    echo "$filename doesn't exist."
fi

# if-else statement
macro='MAC'
if [ macro == 'WIN32' ]; then
    echo 'cl'
elif [ macro == 'LINUX' ]; then
    echo 'g++'
else
    echo 'clang++'
fi

# for loop
for t in 5 4 3 2 1 0; do
    echo "Remaining Time: ${t}s"
done

# while loop
cnt=0
while (($cnt <= 5)); do
    echo $cnt; let cnt+=1
done

# until loop
until [ $cnt -ge 10 ]; do
    echo $cnt; cnt=`expr $cnt + 1`
done

# case statement
goto=''
case goto in
    'Beijing')
    echo 'We arrived in Beijing.'
    ;;
    'Shanghai')
    echo 'We arrived in Shanghai.'
    ;;
    'Guangzhou')
    echo 'We arrived in Guangzhou.'
    ;;
    'Shenzhen')
    echo 'We arrived in Shenzhen.'
    ;;
    *)
    echo 'We arrived in Chengdu.'
    ;;
esac
