/**
 * C++之智能指针第三弹
 */

#include <iostream>
#include <memory>

using std::cout;
using std::endl;

class boy;
class girl;

// 防止循环引用
class boy
{
public:
    boy() noexcept
    {
        cout << "Creating boy..." << endl;
    }
    ~boy() noexcept
    {
        cout << "Deleting boy..." << endl;
    }
    void setgirlfriend(const std::shared_ptr<girl>& mygirl)
    {
        girlfriend = mygirl;
    }
private:
    std::weak_ptr<girl> girlfriend;
};

class girl
{
public:
    girl() noexcept
    {
        cout << "Creating girl..." << endl;
    }
    ~girl() noexcept
    {
        cout << "Deleting girl..." << endl;
    }
    void setboyfriend(const std::shared_ptr<boy>& myboy)
    {
        boyfriend = myboy;
    }
private:
    std::weak_ptr<boy> boyfriend;
};

int main()
{
    // Creating boy...
    std::shared_ptr<boy> boyptr(new boy());

    // Creating girl...
    std::shared_ptr<girl> girlptr(new girl());

    // 1 1
    cout << boyptr.use_count() << ' ' << girlptr.use_count() << endl;

    boyptr->setgirlfriend(girlptr);

    girlptr->setboyfriend(boyptr);

    // 1 1
    cout << boyptr.use_count() << ' ' << girlptr.use_count() << endl;

    // Deleting girl...
    // Deleting boy...

    return 0;
}
