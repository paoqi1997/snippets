/**
 * C++之智能指针第四弹
 */

#include <iostream>
#include <memory>

using std::cout;
using std::endl;

class object
{
public:
    object(int _n) : n(_n)
    {
        cout << "Creating object" << '(' << n << ')' << "..." << endl;
    }
    ~object() noexcept
    {
        cout << "Deleting object" << '(' << n << ')' << "..." << endl;
    }
    int getn() const { return n; }
private:
    int n;
};

int main()
{
    // Creating object(1)...
    std::unique_ptr<object> up(new object(1));

    auto p = up.get();

    // 1
    cout << p->getn() << endl;

    // Creating object(2)...
    // Deleting object(1)...
    up.reset(new object(2));

    // 通过release()方法返回的裸指针需要手动delete释放对象
    auto q = up.release();

    // 2
    cout << q->getn() << endl;

    // Deleting object(2)...
    delete q;

    return 0;
}
