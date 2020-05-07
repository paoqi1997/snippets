#ifndef UTIL_H
#define UTIL_H

#include <cstddef>
#include <cstdio>
#include <iostream>

#define PRINT_INFO(type_s, type)                    \
do {                                                \
    std::printf("%s: %zu\n", type_s, sizeof(type)); \
} while (0)

inline void unit_sizeof()
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

inline void unit_bitfield()
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
    std::printf("bytes: %zu, %zu\n",
        sizeof(BitField1), sizeof(BitField2));
}

inline void unit_array()
{
    int m[][3] = {{1, 2, 3}, {4, 5, 6}};

    // 数组指针
    int (*p1)[3] = m;
    for (int i = 0; i < 2; ++i) {
        for (int j = 0; j < 3; ++j) {
            std::cout << *(*(p1 + i) + j) << ' ';
        }
    }
    std::cout << std::endl;

    // 指针数组
    int *p2[] = {m[0], m[1]};
    for (int i = 0; i < 2; ++i) {
        for (int j = 0; j < 3; ++j) {
            std::cout << *(*(p2 + i) + j) << ' ';
        }
    }
   std::cout << std::endl;
}

#endif // UTIL_H
