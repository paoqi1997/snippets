#include <cstdio>
#include <iostream>

#include "util.h"

using std::cout;
using std::endl;

int main()
{
    cout << "cpp/algo/random_with_weights" << endl;

    auto li = {30, 20, 10, 40};
    print_weights(li);

    auto pr = random_with_weights(li);
    std::printf("res %d in section %d.\n", pr.first, pr.second);

    return 0;
}
