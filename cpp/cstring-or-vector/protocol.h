#ifndef PROTOCOL_H
#define PROTOCOL_H

#include <cstring>
#include <iostream>
#include <type_traits>
#include <vector>

// std::decay<T>::type - 将类型T退化
// std::is_same<T, U>::value - 如果T和U类型相同，value 为 true，反之为 false
// std::enable_if<B, T = void>::type - 如果条件B成立，那么拥有一个名为 type 的类型别名成员，反之则没有，T未指定的话默认为 void
template <typename T>
typename std::enable_if<std::is_same<typename std::decay<T>::type, char*>::value>::type
__copy(const char* src, T buf)
{
    std::cout << "Type: char*" << std::endl;

    std::strcpy(buf, src);
}

template <typename T>
typename std::enable_if<std::is_same<typename std::decay<T>::type, std::vector<char>>::value>::type
__copy(const char* src, T& buf)
{
    std::cout << "Type: std::vector<char>&" << std::endl;

    std::size_t len = std::strlen(src) + 1;

    buf.resize(len);

    std::memcpy(buf.data(), src, len);
}

#endif // PROTOCOL_H
