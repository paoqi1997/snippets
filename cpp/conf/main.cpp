#include <cstdlib>
#include <iostream>

#include "util.h"

using std::cout;
using std::endl;

int main()
{
    // ini
    cout << "cpp/conf/ini" << endl;
    test_ini();

#ifdef _WIN32
    std::system("pause");
#endif

    return 0;
}
