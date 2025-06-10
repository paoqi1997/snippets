#include <iostream>
#include <vector>

#include "cprotocol.h"
#include "vprotocol.h"

int main()
{
    const char* s = "Hello";

    char cbuf[10];
    std::vector<char> vbuf;

    copy(s, cbuf);
    copy(s, vbuf);

    std::cout << cbuf << std::endl;
    std::cout << vbuf.data() << std::endl;

    return 0;
}
