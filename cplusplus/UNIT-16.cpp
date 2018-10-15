/**
 * C++之智能指针第二弹
 */

#include <iostream>
#include <memory>

using std::cout;
using std::endl;

class object : public std::enable_shared_from_this<object>
{
public:
    object(int _n) : n(_n)
    {
        cout << "Creating object..." << endl;
    }
    ~object() noexcept
    {
        cout << "Deleting object..." << endl;
    }
    // 在类的内部获得自身的shared_ptr
    std::shared_ptr<object> get_sptr()
    {
        return this->shared_from_this();
    }
private:
    int n;
};

int main()
{
    // Creating object...
    std::shared_ptr<object> po = std::make_shared<object>(0);

    auto pt = po->get_sptr();

    // 0 2
    cout << pt.unique() << ' ' << pt.use_count() << endl;

    // Deleting object...

    return 0;
}
