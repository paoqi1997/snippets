/**
 * C++之在一组数中找出第k大的数
 */

#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm>

using std::cout;
using std::endl;

int main()
{
    int m[] = {6, 3, 2, 4};

    int k = 3;

    std::vector<int> vec;

    std::for_each(std::begin(m), std::end(m), [&vec](int n){ vec.push_back(n); });

    std::stable_sort(vec.rbegin(), vec.rend());

    int num = vec.at(k - 1);

    cout << "Value: " << num << endl;

    auto it = std::find(std::begin(m), std::end(m), num);

    cout << "Index: " << std::distance(std::begin(m), it) << endl;

    return 0;
}
