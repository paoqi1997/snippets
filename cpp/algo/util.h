#ifndef UTIL_H
#define UTIL_H

#include <cassert>
#include <cstdlib>
#include <ctime>
#include <numeric>
#include <utility>
#include <vector>

inline void print_weights(const std::vector<int>& weights)
{
    int left = 0, right = weights.front();
    std::size_t len = weights.size();
    for (std::size_t i = 0; i < len; ++i) {
        std::printf("%zu: [%d, %d)\n", i, left, right);
        if (i < len - 1) {
            left += weights[i];
            right += weights[i + 1];
        }
    }
}

inline int random(std::size_t total)
{
    std::srand(unsigned int(std::time(nullptr)));
    return std::rand() % total;
}

/**
 * weights: {30, 20, 10, 40}
 * section: [0, 100)
 * 1: [0, 30), 2: [30, 50), 3: [50, 60), 4: [60, 100)
 */
inline std::pair<int, int> random_with_weights(const std::vector<int>& weights)
{
    std::size_t total = std::accumulate(weights.begin(), weights.end(), 0);

    int res = random(total);

    int idx1 = 0, weight = 0;
    for (std::size_t i = 0; i < weights.size(); ++i) {
        weight += weights[i];
        if (res < weight) {
            idx1 = int(i);
            break;
        }
    }

    int idx2 = 0, tmpRes = res;
    for (std::size_t i = 0; i < weights.size(); ++i) {
        if (tmpRes < weights[i]) {
            idx2 = int(i);
            break;
        }
        tmpRes -= weights[i];
    }

    assert(idx1 == idx2);
    return std::make_pair(res, idx1);
}

#endif // UTIL_H
