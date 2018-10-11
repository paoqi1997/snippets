/**
 * C++之指针数组
 */

#include <iostream>

using std::cout;
using std::endl;

int main()
{
    /* 一维数组 */
    const char m1[2] = {'a', 'b'}, n1[2] = {'c', 'd'};

    const char *p[2] = {m1, n1};

    for (size_t i = 0; i < 2; ++i)
    {
        for (size_t j = 0; j < 2; ++j)
        {
            cout << *(*(p + i) + j) << ' ';
        }
    } cout << endl;

    /* 二维数组 */
    const char m2[2][2] = { {'a', 'b'}, {'c', 'd'} }, n2[2][2] = { {'e', 'f'}, {'g', 'h'} };

    const char *q[2][2] = {m2[0], m2[1], n2[0], n2[1]};

    for (size_t i = 0; i < 2; ++i)
    {
        for (size_t j = 0; j < 2; ++j)
        {
            for (size_t k = 0; k < 2; ++k)
            {
                cout << *(*(*(q + i) + j) + k) << ' ';
            }
        }
    } cout << endl;

    /* 三维数组 */
    const char m3[2][2][2] = { { {'a', 'b'}, {'c', 'd'} }, { {'e', 'f'}, {'g', 'h'} } },
               n3[2][2][2] = { { {'i', 'j'}, {'k', 'l'} }, { {'m', 'n'}, {'o', 'p'} } };

    const char *r[2][2][2];

    for (size_t i = 0; i < 2; ++i)
    {
        for (size_t j = 0; j < 2; ++j)
        {
            for (size_t k = 0; k < 2; ++k)
            {
                r[i][j][k] = (i == 0) ? m3[j][k] : n3[j][k];
            }
        }
    }

    for (size_t i = 0; i < 2; ++i)
    {
        for (size_t j = 0; j < 2; ++j)
        {
            for (size_t k = 0; k < 2; ++k)
            {
                for (size_t l = 0; l < 2; ++l)
                {
                    cout << *(*(*(*(r + i) + j) + k) + l) << ' ';
                }
            }
        }
    } cout << endl;

    return 0;
}
