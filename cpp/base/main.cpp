#include <iostream>

#include "util.h"

using std::cout;
using std::endl;

int main()
{
    // sizeof
    cout << "cpp/base/sizeof" << endl;

    print_sizeof_info();

    // bitfield
    cout << "cpp/base/bitfield" << endl;

    test_bitfield();

    return 0;
}
