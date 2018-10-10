/**
 * C++之std::forward
 */

#include <iostream>
#include <utility>

using std::cout;
using std::endl;

struct Obj
{
    Obj() : n(0) {}

    Obj(int _n) : n(_n) {}

    int n;
};

void func(Obj& obj)
{
    cout << obj.n << " : " << "Obj&" << endl;
}

void func(Obj&& obj)
{
    cout << obj.n << " : " << "Obj&&" << endl;
}

// 普通转发
template <typename T>
void fcc(T param)
{
    func(param);
}

// 完美转发
template <typename T>
void foo(T&& param)
{
    func(std::forward<T>(param));
}

int main()
{
    Obj   x;
    Obj&  y = x;
    Obj&& z = Obj(3);

    fcc(x);      // Obj&
    fcc(y);      // Obj&
    fcc(z);      // Obj&
    fcc(Obj(4)); // Obj&

    foo(x);      // Obj&
    foo(y);      // Obj&
    foo(z);      // Obj&
    foo(Obj(4)); // Obj&&

    return 0;
}
