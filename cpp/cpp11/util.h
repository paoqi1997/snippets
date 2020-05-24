#ifndef UTIL_H
#define UTIL_H

#include <cstdio>
#include <cstring>
#include <iostream>
#include <memory>
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

class Engine : public std::enable_shared_from_this<Engine>
{
public:
    Engine(const char *_name) : name(_name)
    {
        std::printf("Engine::Engine(\"%s\")\n", _name);
    }
    ~Engine()
    {
        std::printf("Engine::~Engine(\"%s\")\n", name);
    }
    const char* getName() const { return name; }
    std::shared_ptr<Engine> getPtr() {
        return shared_from_this();
    }
private:
    const char *name;
};

class Child;

class Parent
{
public:
    Parent() { std::cout << "Parent::Parent" << std::endl; }
    ~Parent()
    {
        std::printf(
            "Parent::~Parent(use_count=%d)\n", ptr.use_count()
        );
    }
    void setChild(const std::shared_ptr<Child>& sp) {
        ptr = sp;
    }
private:
    std::shared_ptr<Child> ptr;
};

class Child
{
public:
    Child() { std::cout << "Child::Child" << std::endl; }
    ~Child()
    {
        std::printf(
            "Child::~Child(use_count=%d)\n", ptr.use_count()
        );
    }
    void setParent(const std::shared_ptr<Parent>& sp) {
        ptr = sp;
    }
private:
    std::weak_ptr<Parent> ptr;
};

#endif // UTIL_H
