/**
 * C++之智能指针第一弹
 */

#include <iostream>
#include <string>
#include <memory>

using std::cout;
using std::endl;

class girl
{
public:
    girl(const char *_name) : name(_name)
    {
        cout << "Creating " << name << "..." << endl;
    }
    ~girl() noexcept
    {
        cout << "Deleting " << name << "..." << endl;
    }
    const char *getname() const
    {
        return name.c_str();
    }
private:
    std::string name;
};

int main()
{
    // Creating Tutu...
    // Creating Kuikui...
    std::shared_ptr<girl> girls
    (
        // 使用shared_ptr管理动态数组时需要自定义deleter
        new girl[2]{ girl{"Tutu"}, girl{"Kuikui"} }, std::default_delete<girl[]>()
    );

    auto pg = girls.get();

    // Tutu Kuikui
    for (size_t i = 0; i < 2; ++i)
    {
        cout << pg[i].getname() << ' ';
    }
    cout << endl;

    // Deleting Kuikui...
    // Deleting Tutu...

    return 0;
}
