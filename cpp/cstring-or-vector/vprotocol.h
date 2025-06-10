#ifndef V_PROTOCOL_H
#define V_PROTOCOL_H

#include <vector>

#include "protocol.h"

inline void copy(const char* src, std::vector<char>& dst)
{
    __copy(src, dst);
}

#endif // V_PROTOCOL_H
