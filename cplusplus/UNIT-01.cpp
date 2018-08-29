/**
 * C++之std::move
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

int main()
{
    Obj   x;
    Obj&  y = x;
    Obj&& z = Obj(3);

    func(x);                 // Obj&
    func(y);                 // Obj&
    func(z);                 // Obj&
    func(Obj(4));            // Obj&&

    func(std::move(x));      // Obj&&
    func(std::move(y));      // Obj&&
    func(std::move(z));      // Obj&&
    func(std::move(Obj(4))); // Obj&&

    return 0;
}
