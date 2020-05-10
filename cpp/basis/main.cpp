#include <iostream>

#include "util.h"

using std::cout;
using std::endl;

int main()
{
    // sizeof
    cout << "cpp/basis/sizeof" << endl;
    test_sizeof();

    // bitfield
    cout << "cpp/basis/bitfield" << endl;
    test_bitfield();

    // array
    cout << "cpp/basis/array" << endl;
    test_array();

    // class
    cout << "cpp/basis/class" << endl;
    test_class();

    // traits
    cout << "cpp/basis/traits" << endl;
    test_traits();

    return 0;
}
