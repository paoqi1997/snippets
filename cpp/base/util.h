#ifndef UTIL_H
#define UTIL_H

#include <cstddef>
#include <cstdio>
#include <iostream>

#define PRINT_INFO(type_s, type)                    \
do {                                                \
    std::printf("%s: %zu\n", type_s, sizeof(type)); \
} while (0)

inline void print_sizeof_info()
{
#ifdef WIN32
    std::cout << "os: windows" << std::endl;
#else
    std::cout << "os: linux" << std::endl;
#endif

    PRINT_INFO("NULL", NULL);
    PRINT_INFO("nullptr", nullptr);
    PRINT_INFO("void*", void*);
    PRINT_INFO("size_t", std::size_t);
    PRINT_INFO("ptrdiff_t", std::ptrdiff_t);

    PRINT_INFO("char", char);
    PRINT_INFO("short", short);
    PRINT_INFO("short int", short int);
    PRINT_INFO("int", int);
    PRINT_INFO("long", long);
    PRINT_INFO("long int", long int);
    PRINT_INFO("long long", long long);

    PRINT_INFO("float", float);
    PRINT_INFO("double", double);
    PRINT_INFO("long double", long double);
}

#endif // UTIL_H
