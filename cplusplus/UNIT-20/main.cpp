/**
 * C++之extern
 */

#include <iostream>

#include "status.h"

using std::cout;
using std::endl;

int main()
{
    cout << getflag() << endl; // 0

    setflag(true);

    cout << getflag() << endl; // 1

    turnflag();

    cout << getflag() << endl; // 0

    return 0;
}
