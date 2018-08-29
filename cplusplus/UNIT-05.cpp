/**
 * C++之节点访问
 */

#include <iostream>

using std::cout;
using std::endl;

template <typename T>
struct node
{
    T element; node<T> *next;

    node() : next(nullptr) {}

    node(const T& _element) : element(_element), next(nullptr) {}
};

int main()
{
    node<int> *root = new node<int>(1); root->next = new node<int>(2);

    node<int> *p = root;

    //  root ==  p |  root->next ==  p->next
    cout <<  root << ' ' <<  p << ' ' <<  root->next << ' ' <<  p->next << endl;

    // &root != &p | &root->next == &p->next
    cout << &root << ' ' << &p << ' ' << &root->next << ' ' << &p->next << endl;

    // 1 1 2
    cout << root->element << ' ' << p->element << ' ' << root->next->element << endl;

    p->element = 3;

    // 3 3 2
    cout << root->element << ' ' << p->element << ' ' << root->next->element << endl;

    p->next->element = 4;

    // 3 3 4
    cout << root->element << ' ' << p->element << ' ' << root->next->element << endl;

    p = p->next;

    // 3 4 4
    cout << root->element << ' ' << p->element << ' ' << root->next->element << endl;

    p->element = 5;

    // 3 5 5
    cout << root->element << ' ' << p->element << ' ' << root->next->element << endl;

    delete root->next; delete root;

    return 0;
}
