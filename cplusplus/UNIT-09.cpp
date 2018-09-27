/**
 * C++之静态多态与动态多态
 */

#include <iostream>

using std::cout;
using std::endl;

namespace cpp
{
    class circle
    {
    public:
        inline const char *getname() const { return "circle"; }
    };

    class square
    {
    public:
        inline const char *getname() const { return "square"; }
    };

    class triangle
    {
    public:
        inline const char *getname() const { return "triangle"; }
    };

    template <typename object>
    void printName(const object& obj)
    {
        cout << obj.getname() << endl;
    }
}

namespace cxx
{
    class shape
    {
    public:
        virtual const char *getname() const = 0;
    };

    class circle : public shape
    {
    public:
        const char *getname() const override { return "circle"; }
    };

    class square : public shape
    {
    public:
        const char *getname() const override { return "square"; }
    };

    class triangle : public shape
    {
    public:
        const char *getname() const override { return "triangle"; }
    };

    void printName(const shape& s)
    {
        cout << s.getname() << endl;
    }
}

int main()
{
    cpp::circle c;
    cpp::square s;
    cpp::triangle t;

    cpp::printName(c);  // circle
    cpp::printName(s);  // square
    cpp::printName(t);  // triangle

    cxx::circle cc;
    cxx::square ss;
    cxx::triangle tt;

    cxx::printName(cc); // circle
    cxx::printName(ss); // square
    cxx::printName(tt); // triangle

    return 0;
}
