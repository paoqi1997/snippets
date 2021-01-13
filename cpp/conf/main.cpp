#include <cstdio>
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
    const char *cmd = "pause";
    int status = std::system(cmd);
    if (status != 0) {
        std::printf("Failed to call std::system(\"%s\")\n", cmd);
    }
#endif

    return 0;
}
