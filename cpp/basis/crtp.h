#pragma once

#include <iostream>

#define PRINT(who) \
do { \
    std::cout << (who) << std::endl; \
} while (0)

template <typename Derived> class IComparable;

template <typename Derived>
bool operator > (const IComparable<Derived>& lhs, const IComparable<Derived>& rhs)
{
    const Derived& d1 = static_cast<const Derived&>(lhs);
    const Derived& d2 = static_cast<const Derived&>(rhs);

    return d2 < d1;
}

template <typename Derived>
bool operator <= (const IComparable<Derived>& lhs, const IComparable<Derived>& rhs)
{
    const Derived& d1 = static_cast<const Derived&>(lhs);
    const Derived& d2 = static_cast<const Derived&>(rhs);

    return !(d1 > d2);
}

template <typename Derived>
bool operator >= (const IComparable<Derived>& lhs, const IComparable<Derived>& rhs)
{
    const Derived& d1 = static_cast<const Derived&>(lhs);
    const Derived& d2 = static_cast<const Derived&>(rhs);

    return !(d1 < d2);
}

template <typename Derived>
bool operator != (const IComparable<Derived>& lhs, const IComparable<Derived>& rhs)
{
    const Derived& d1 = static_cast<const Derived&>(lhs);
    const Derived& d2 = static_cast<const Derived&>(rhs);

    return (d1 < d2) || (d1 > d2);
}

template <typename Derived>
bool operator == (const IComparable<Derived>& lhs, const IComparable<Derived>& rhs)
{
    const Derived& d1 = static_cast<const Derived&>(lhs);
    const Derived& d2 = static_cast<const Derived&>(rhs);

    return !(d1 < d2) && !(d1 > d2);
}

template <typename Derived>
class IComparable {};

class Boy : public IComparable<Boy>
{
public:
    Boy(int deposit) : m_deposit(deposit) {}
    int getDeposit() const { return m_deposit; }
private:
    int m_deposit;
};

inline bool operator < (const Boy& boy1, const Boy& boy2)
{
    return boy1.getDeposit() < boy2.getDeposit();
}

template <typename T>
class Counter
{
public:
    Counter() { ++count; }
    Counter(const Counter&) { ++count; }
    ~Counter() { --count; }
    static int use_count() { return count; }
private:
    static int count;
};

template <typename T>
int Counter<T>::count = 0;

class A : public Counter<A> {};
class B : public Counter<B> {};

inline void test_crtp()
{
    std::cout << "part1:\n";

    Boy boy1(10000);
    Boy boy2(20000);

    PRINT(boy1 < boy2);
    PRINT(boy1 > boy2);
    PRINT(boy1 <= boy2);
    PRINT(boy1 >= boy2);
    PRINT(boy1 != boy2);
    PRINT(boy1 == boy2);

    std::cout << "part2:\n";

    A a1;
    PRINT(a1.use_count());

    A a2 = a1;
    PRINT(a2.use_count());

    {
        A a3;
        PRINT(a3.use_count());

        A a4 = a3;
        PRINT(a4.use_count());
    }

    PRINT(a1.use_count());

    B b1;
    PRINT(b1.use_count());
}
