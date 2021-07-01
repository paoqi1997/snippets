#include <iostream>

#include "crtp.h"
#include "pimpl.h"
#include "util.h"

using std::cout;
using std::endl;

int main()
{
    // sizeof
    cout << "[cpp/basis/sizeof]" << endl;
    test_sizeof();

    // bitfield
    cout << "[cpp/basis/bitfield]" << endl;
    test_bitfield();

    // array
    cout << "[cpp/basis/array]" << endl;
    test_array();

    // class
    cout << "[cpp/basis/class]" << endl;
    test_class();

    // traits
    cout << "[cpp/basis/traits]" << endl;
    test_traits();

    // memlinkedlist
    cout << "[cpp/basis/memlinkedlist]" << endl;
    test_memlinkedlist();

    // mutable
    cout << "[cpp/basis/mutable]" << endl;
    test_mutable();

    // memops
    cout << "[cpp/basis/memops]" << endl;
    test_memops();

    // algo
    cout << "[cpp/basis/algo]" << endl;
    test_algo();

    // 奇异递归模板模式（Curiously Recurring Template Pattern, CRTP）
    cout << "[cpp/basis/crtp]" << endl;
    test_crtp();

    // Pointer to implementation, PImpl
    cout << "[cpp/basis/pimpl]" << endl;
    test_pimpl();

    return 0;
}
