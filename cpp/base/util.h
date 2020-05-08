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

namespace shape1
{

class circle {
public:
    const char* getName() const { return "circle"; }
};
class square {
public:
    const char* getName() const { return "square"; }
};
class triangle {
public:
    const char* getName() const { return "triangle"; }
};

template <typename T>
void printName(const T& param)
{
    std::cout << param.getName() << std::endl;
}

} // namespace shape1

namespace shape2
{

class shape {
public:
    virtual const char* getName() const = 0;
};
class circle : public shape {
public:
    const char* getName() const override { return "circle"; }
};
class square : public shape {
public:
    const char* getName() const override { return "square"; }
};
class triangle : public shape {
public:
    const char* getName() const override { return "triangle"; }
};

void printName(const shape& shapeObj)
{
    std::cout << shapeObj.getName() << std::endl;
}

} // namespace shape2

class classA {
public:
    classA() { std::cout << "classA::classA" << std::endl; }
    virtual ~classA() { std::cout << "classA::~classA" << std::endl; }
};
class classB : public classA {
public:
    classB() { std::cout << "classB::classB" << std::endl; }
    ~classB() { std::cout << "classB::~classB" << std::endl; }
};
class classC : public classB {
public:
    classC() { std::cout << "classC::classC" << std::endl; }
    ~classC() { std::cout << "classC::~classC" << std::endl; }
};

inline void unit_class()
{
    // 静态多态
    shape1::circle circleObj1;
    shape1::square squareObj1;
    shape1::triangle triangleObj1;

    shape1::printName(circleObj1);
    shape1::printName(squareObj1);
    shape1::printName(triangleObj1);

    // 动态多态
    shape2::circle circleObj2;
    shape2::square squareObj2;
    shape2::triangle triangleObj2;

    shape2::printName(circleObj2);
    shape2::printName(squareObj2);
    shape2::printName(triangleObj2);

    // We need virtual destructor.
    classA *p = new classC;
    delete p;
}

#endif // UTIL_H
