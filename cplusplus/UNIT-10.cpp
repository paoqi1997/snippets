/**
 * C++之权重随机算法
 */

#include <iostream>
#include <cstdio>
#include <ctime>
#include <cstdlib>
#include <numeric>
#include <iterator>

using std::cout;
using std::endl;

void printInfo(int *weights, size_t length)
{
    int left = 0, right = weights[0];

    for (size_t i = 0; i < length; ++i)
    {
        std::printf("Index: %d, Weight: %d", i, weights[i]);

        std::printf(", Section: [%d, %d)\n", left, right);

        if (i + 1 < length)
        {
            left += weights[i], right += weights[i + 1];
        }
    }
}

int main()
{
    // Range: [0, 100)
    int weights[] = {30, 20, 10, 40};

    size_t length = sizeof(weights) / sizeof(int);

    printInfo(weights, length);

    std::srand(std::time(nullptr));

    int total = std::accumulate(std::begin(weights), std::end(weights), 0);

    int point = std::rand() % total;

    cout << "Value: " << point << endl;

    for (size_t i = 0; i < length; point -= weights[i++])
    {
        if (point < weights[i])
        {
            cout << "Index: " << i << endl;
            break;
        }
    }

    return 0;
}
