/**
 * C++之随机数
 */

#include <iostream>

#include "rand.h"

using std::cout;
using std::endl;

int main()
{
    for (size_t i = 0; i < 10; ++i)
    {
        cout << getRandom(1, 10) << ' ';
    }
    cout << endl;

    return 0;
}
