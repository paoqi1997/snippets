/**
 * C++之位域
 */

#include <iostream>

using std::cout;
using std::endl;

struct box
{
    // Empty
};

struct model
{
    int x: 2;
    int y: 4;
    int z: 6;
};

int main()
{
    // 1 4
    cout << sizeof(box) << ' ' << sizeof(model) << endl;

    return 0;
}
