#include <iostream>
#include <utility>

#include "util.h"

using std::cout;
using std::endl;

int main()
{
    // std::move
    cout << "[std::move]" << endl;

    Obj obj1("Hello");
    Obj obj2 = obj1;
    Obj obj3 = std::move(obj1);

    if (obj1.getS() == nullptr) {
        cout << "obj1.str is null." << endl;
    }

    func(obj1);
    func(Obj("Hi"));

    return 0;
}
