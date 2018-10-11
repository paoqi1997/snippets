/**
 * C++之模板特化
 */

#include <iostream>
#include <cstdlib>

using std::cout;
using std::endl;

template <typename T>
size_t add(T x, T y)
{
    return x + y;
}

// 模板全特化
template <>
size_t add(char x, char y)
{
    return (x - '0') + (y - '0');
}

template <>
size_t add(const char *x, const char *y)
{
    return std::atoi(x) + std::atoi(y);
}

template <typename Iterator>
struct iterator_traits
{
    using difference_type = typename Iterator::difference_type;
    using value_type      = typename Iterator::value_type;
    using pointer         = typename Iterator::pointer;
    using reference       = typename Iterator::reference;
};

// 模板偏特化
template <typename T>
struct iterator_traits<T*>
{
    using difference_type = ptrdiff_t;
    using value_type      = T;
    using pointer         = T*;
    using reference       = T&;
};

template <typename T>
struct iterator_traits<const T*>
{
    using difference_type = ptrdiff_t;
    using value_type      = T;
    using pointer         = const T*;
    using reference       = const T&;
};

int main()
{
    cout << add(2, 4) << endl;     // 6

    cout << add('2', '4') << endl; // 6

    cout << add("2", "4") << endl; // 6

    return 0;
}
