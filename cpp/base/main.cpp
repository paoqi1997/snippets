#include <iostream>

#include "util.h"

using std::cout;
using std::endl;

int main()
{
    // sizeof
    cout << "cpp/base/sizeof" << endl;
    unit_sizeof();

    // bitfield
    cout << "cpp/base/bitfield" << endl;
    unit_bitfield();

    // array
    cout << "cpp/base/array" << endl;
    unit_array();

    // class
    cout << "cpp/base/class" << endl;
    unit_class();

    // traits
    cout << "cpp/base/traits" << endl;
    unit_traits();

    return 0;
}
