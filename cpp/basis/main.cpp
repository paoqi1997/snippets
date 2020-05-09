#include <iostream>

#include "util.h"

using std::cout;
using std::endl;

int main()
{
    // sizeof
    cout << "cpp/basis/sizeof" << endl;
    unit_sizeof();

    // bitfield
    cout << "cpp/basis/bitfield" << endl;
    unit_bitfield();

    // array
    cout << "cpp/basis/array" << endl;
    unit_array();

    // class
    cout << "cpp/basis/class" << endl;
    unit_class();

    // traits
    cout << "cpp/basis/traits" << endl;
    unit_traits();

    return 0;
}
