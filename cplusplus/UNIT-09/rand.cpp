#include "rand.h"

/**
 * Range: [left, right]
 */
int getRandom(int left, int right)
{
    return u(e) % (right - left + 1) + left;
}
