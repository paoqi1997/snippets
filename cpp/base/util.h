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

inline void test_bitfield()
{
    struct BitField1 {
        char a: 1;
        char b: 1;
        char c: 6;
    };
    struct BitField2 {
        char a: 1;
        char b: 1;
        char c: 6;
        char d: 1;
    };
    std::printf("bits: %zu, bits2: %zu\n",
        sizeof(BitField1), sizeof(BitField2));
}

#endif // UTIL_H
