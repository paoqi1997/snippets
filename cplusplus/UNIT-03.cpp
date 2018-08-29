#include <iostream>

using std::cout;
using std::endl;

int main()
{
    /* 一维数组 */
    const char ma[2] = {'a', 'b'};

    const char (*pa) = ma;

    for (size_t i = 0; i < 2; ++i)
    {
        cout << *(pa + i) << ' ';
    }
    cout << endl;

    /* 二维数组 */
    const char mb[2][2] = { {'a', 'b'}, {'c', 'd'} };

    const char (*pb)[2] = mb;

    for (size_t i = 0; i < 2; ++i)
    {
        for (size_t j = 0; j < 2; ++j)
        {
            cout << *(*(pb + i) + j) << ' ';
        }
    } cout << endl;

    /* 三维数组 */
    const char mc[2][2][2] =
    {
        { {'a', 'b'}, {'c', 'd'} }, { {'e', 'f'}, {'g', 'h'} }
    };

    const char (*pc)[2][2] = mc;

    for (size_t i = 0; i < 2; ++i)
    {
        for (size_t j = 0; j < 2; ++j)
        {
            for (size_t k = 0; k < 2; ++k)
            {
                cout << *(*(*(pc + i) + j) + k) << ' ';
            }
        }
    } cout << endl;

    return 0;
}
