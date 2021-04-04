#include <iostream>

#include "util.h"

using std::cout;
using std::endl;

int main()
{
    // std::any
    cout << "[cpp/cpp17/std::any]" << endl;
    test_any();

    // std::variant
    cout << "[cpp/cpp17/std::variant]" << endl;
    test_variant();

    // std::optional
    cout << "[cpp/cpp17/std::optional]" << endl;
    test_optional();

    return 0;
}
