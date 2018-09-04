/**
 * C++之枚举
 */

#include <iostream>

using std::cout;
using std::endl;

enum numset {
    ONE = 1, TWO, THREE, FOUR, FIVE
};

int main()
{
    numset num = THREE;

    cout << num << endl; // 3

    num = static_cast<numset>(7);

    cout << num << endl; // 7

    switch (num)
    {
    case ONE:
        cout << "ONE" << endl;
        break;
    case TWO:
        cout << "TWO" << endl;
        break;
    case THREE:
        cout << "THREE" << endl;
        break;
    case FOUR:
        cout << "FOUR" << endl;
        break;
    case FIVE:
        cout << "FIVE" << endl;
        break;
    default:
        cout << "UNKNOWN" << endl;
        break;
    }

    return 0;
}
