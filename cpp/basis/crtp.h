#pragma once

#include <iostream>

template <typename Derived> class IComparable;

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

inline bool operator > (const Boy& boy1, const Boy& boy2)
{
    return boy1.getDeposit() > boy2.getDeposit();
}

inline void test_crtp()
{
    Boy boy1(10000);
    Boy boy2(20000);

    std::cout << (boy1 < boy2) << std::endl;
    std::cout << (boy1 > boy2) << std::endl;
    std::cout << (boy1 <= boy2) << std::endl;
    std::cout << (boy1 >= boy2) << std::endl;
    std::cout << (boy1 != boy2) << std::endl;
    std::cout << (boy1 == boy2) << std::endl;
}
