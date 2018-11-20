/**
 * C++之数字与字符
 */

#include <iostream>
#include <cstdio>
#include <string>

using std::cout;
using std::endl;

inline size_t char2num(char c)
{
    return c - '0';
}

inline char num2char(size_t n)
{
    return static_cast<char>(n + 48);
}

inline size_t str2num(const char *s)
{
    return std::atoi(s);
}

inline const char *num2str(size_t n)
{
    return std::to_string(n).c_str();
}

int main()
{
    // 字符转数字
    std::printf("%d\n", char2num('2'));   // 2

    // 数字转字符
    std::printf("%c\n", num2char(8));     // 8

    // 字符串转数字
    std::printf("%d\n", str2num("9527")); // 9527

    // 数字转字符串
    std::printf("%s\n", num2str(123456)); // 123456

    return 0;
}
