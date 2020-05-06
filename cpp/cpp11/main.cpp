#include <iostream>
#include <utility>

#include "util.h"

using std::cout;
using std::endl;

int main()
{
    // std::move
    cout << "cpp/cpp11/std::move" << endl;

    Obj obj1("Hello");
    Obj obj2 = obj1;
    Obj obj3 = std::move(obj1);

    if (obj1.getS() == nullptr) {
        cout << "obj1.str is null." << endl;
    }

    _func(obj1);
    _func(Obj("Hi"));

    // std::forward
    cout << "cpp/cpp11/std::forward" << endl;

    func(obj1);
    func(Obj("Hi"));
    func_with_forward(obj1);
    func_with_forward(Obj("Hi"));

    return 0;
}
