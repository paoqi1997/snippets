/**
 * C++之嵌套类
 */

#include <iostream>

#include "parent.h"

using std::cout;
using std::endl;

int main()
{
    // Creating child...
    // Creating parent...
    parent p(42, 10);

    // 42 10
    cout << p.getage() << ' ' << p.getchildage() << endl;

    // Deleting parent...
    // Deleting child...

    return 0;
}
