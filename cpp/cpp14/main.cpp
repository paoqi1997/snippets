#include <iostream>
#include <memory>
#include <string>

using std::cout;
using std::endl;

int main()
{
    constexpr std::size_t size = 5;
    auto pi = std::make_unique<int[]>(size);

    for (std::size_t i = 0; i < size; ++i) {
        pi[i] = i;
        cout << pi[i] << ' ';
    }
    cout << endl;

    auto add = [](auto x, auto y) { return x + y; };
    cout << add(2, 4) << endl;
    cout << add(std::string("2"), std::string("4")) << endl;

    return 0;
}
