/**
 * C++之虚析构函数
 */

#include <iostream>

using std::cout;
using std::endl;

class person
{
public:
    person(int _age) : age(_age)
    {
        cout << "Creating person..." << endl;
    }
    virtual ~person() noexcept
    {
        cout << "Deleting person..." << endl;
    }
private:
    int age;
};

class girl : public person
{
public:
    girl(int _age) : person(_age), cup('C')
    {
        cout << "Creating girl..." << endl;
    }
    ~girl() noexcept override
    {
        cout << "Deleting girl..." << endl;
    }
private:
    char cup;
};

int main()
{
    // Creating person...
    // Creating girl...
    person *p = new girl(18);

    cout << "Waiting..." << endl;

    // Deleting girl...
    // Deleting person...
    delete p;

    return 0;
}
