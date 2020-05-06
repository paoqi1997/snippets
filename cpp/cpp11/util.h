#ifndef UTIL_H
#define UTIL_H

#include <cstdio>
#include <cstring>
#include <iostream>
#include <utility>

class Obj
{
public:
    Obj() : str(nullptr)
    {
        std::cout << "Obj::Obj" << std::endl;
    }
    Obj(const char *s)
    {
        std::printf("Obj::Obj(\"%s\")\n", s);
        std::size_t len = std::strlen(s) + 1;
        str = new char[len];
#ifdef WIN32
        strcpy_s(str, len, s);
#else
        std::strcpy(str, s);
#endif
    }
    Obj(const Obj& rhs)
    {
        std::printf("Obj::Obj(Obj&)\n");
        if (&rhs != this) {
            const char *s = rhs.str;
            std::size_t len = std::strlen(s) + 1;
            str = new char[len];
#ifdef WIN32
            strcpy_s(str, len, s);
#else
            std::strcpy(str, s);
#endif
        }
    }
    Obj(Obj&& rhs)
    {
        std::printf("Obj::Obj(Obj&&)\n");
        if (&rhs != this) {
            str = rhs.str;
            rhs.str = nullptr;
        }
    }
    ~Obj()
    {
        std::cout << "Obj::~Obj" << std::endl;
        if (str != nullptr) {
            delete []str;
            str = nullptr;
        }
    }
    char* getS() { return str; }
    const char* getS() const { return str; }
private:
    char *str;
};

template <typename T>
void _func(T& param) {
    std::printf("paramType: T&\n");
}

template <typename T>
void _func(T&& param) {
    std::printf("paramType: T&&\n");
}

template <typename T>
void func(T&& param)
{
    _func(param);
}

template <typename T>
void func_with_forward(T&& param)
{
    _func(std::forward<T>(param));
}

#endif // UTIL_H
