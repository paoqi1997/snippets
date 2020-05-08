#ifndef UTIL_H
#define UTIL_H

#include <cstddef>
#include <cstdio>
#include <iostream>

#define PRINT_INFO(type_s, type)                    \
do {                                                \
    std::printf("%s: %zu\n", type_s, sizeof(type)); \
} while (0)

inline void unit_sizeof()
{
#ifdef WIN32
    std::cout << "os: windows" << std::endl;
#else
    std::cout << "os: linux" << std::endl;
#endif

    PRINT_INFO("NULL", NULL);
    PRINT_INFO("nullptr", nullptr);
    PRINT_INFO("void*", void*);
    PRINT_INFO("size_t", std::size_t);
    PRINT_INFO("ptrdiff_t", std::ptrdiff_t);

    PRINT_INFO("char", char);
    PRINT_INFO("short", short);
    PRINT_INFO("short int", short int);
    PRINT_INFO("int", int);
    PRINT_INFO("long", long);
    PRINT_INFO("long int", long int);
    PRINT_INFO("long long", long long);

    PRINT_INFO("float", float);
    PRINT_INFO("double", double);
    PRINT_INFO("long double", long double);
}

inline void unit_bitfield()
{
    struct BitField1 {
        char a: 1;
        char b: 1;
        char c: 6;
    };
    struct BitField2 {
        char a: 1;
        char b: 1;
        char c: 6;
        char d: 1;
    };
    std::printf("bytes: %zu, %zu\n",
        sizeof(BitField1), sizeof(BitField2));
}

inline void unit_array()
{
    int m[][3] = {{1, 2, 3}, {4, 5, 6}};

    // 数组指针
    int (*p1)[3] = m;
    for (int i = 0; i < 2; ++i) {
        for (int j = 0; j < 3; ++j) {
            std::cout << *(*(p1 + i) + j) << ' ';
        }
    }
    std::cout << std::endl;

    // 指针数组
    int *p2[] = {m[0], m[1]};
    for (int i = 0; i < 2; ++i) {
        for (int j = 0; j < 3; ++j) {
            std::cout << *(*(p2 + i) + j) << ' ';
        }
    }
   std::cout << std::endl;
}

namespace shape1
{

class circle {
public:
    const char* getName() const { return "circle"; }
};
class square {
public:
    const char* getName() const { return "square"; }
};
class triangle {
public:
    const char* getName() const { return "triangle"; }
};

template <typename T>
void printName(const T& param)
{
    std::cout << param.getName() << std::endl;
}

} // namespace shape1

namespace shape2
{

class shape {
public:
    virtual const char* getName() const = 0;
};
class circle : public shape {
public:
    const char* getName() const override { return "circle"; }
};
class square : public shape {
public:
    const char* getName() const override { return "square"; }
};
class triangle : public shape {
public:
    const char* getName() const override { return "triangle"; }
};

void printName(const shape& shapeObj)
{
    std::cout << shapeObj.getName() << std::endl;
}

} // namespace shape2

class classA {
public:
    classA() { std::cout << "classA::classA" << std::endl; }
    virtual ~classA() { std::cout << "classA::~classA" << std::endl; }
};
class classB : public classA {
public:
    classB() { std::cout << "classB::classB" << std::endl; }
    ~classB() { std::cout << "classB::~classB" << std::endl; }
};
class classC : public classB {
public:
    classC() { std::cout << "classC::classC" << std::endl; }
    ~classC() { std::cout << "classC::~classC" << std::endl; }
};

inline void unit_class()
{
    // 静态多态
    shape1::circle circleObj1;
    shape1::square squareObj1;
    shape1::triangle triangleObj1;

    shape1::printName(circleObj1);
    shape1::printName(squareObj1);
    shape1::printName(triangleObj1);

    // 动态多态
    shape2::circle circleObj2;
    shape2::square squareObj2;
    shape2::triangle triangleObj2;

    shape2::printName(circleObj2);
    shape2::printName(squareObj2);
    shape2::printName(triangleObj2);

    // We need virtual destructor.
    classA *p = new classC;
    delete p;
}

template <typename Iterator>
struct iterator_traits
{
    using value_type      = typename Iterator::value_type;
    using difference_type = typename Iterator::difference_type;
    using pointer         = typename Iterator::pointer;
    using reference       = typename Iterator::reference;
};

template <typename T>
struct iterator_traits<T*>
{
    using value_type      = T;
    using difference_type = std::ptrdiff_t;
    using pointer         = T*;
    using reference       = T&;
};

template <typename T>
struct iterator_traits<const T*>
{
    using value_type      = T;
    using difference_type = std::ptrdiff_t;
    using pointer         = const T*;
    using reference       = const T&;
};

template <typename Iter> class reverse_iterator;

template <typename Iter>
reverse_iterator<Iter> make_reverse_iterator(Iter it)
{
    return reverse_iterator<Iter>(it);
}

template <typename Iter1, typename Iter2>
bool operator == (const reverse_iterator<Iter1>& lhs, const reverse_iterator<Iter2>& rhs)
{
    return lhs.base() == rhs.base();
}

template <typename Iter1, typename Iter2>
bool operator != (const reverse_iterator<Iter1>& lhs, const reverse_iterator<Iter2>& rhs)
{
    return lhs.base() != rhs.base();
}

template <typename Iter1, typename Iter2>
bool operator < (const reverse_iterator<Iter1>& lhs, const reverse_iterator<Iter2>& rhs)
{
    return lhs.base() >  rhs.base();
}

template <typename Iter1, typename Iter2>
bool operator <= (const reverse_iterator<Iter1>& lhs, const reverse_iterator<Iter2>& rhs)
{
    return lhs.base() >= rhs.base();
}

template <typename Iter1, typename Iter2>
bool operator > (const reverse_iterator<Iter1>& lhs, const reverse_iterator<Iter2>& rhs)
{
    return lhs.base() <  rhs.base();
}

template <typename Iter1, typename Iter2>
bool operator >= (const reverse_iterator<Iter1>& lhs, const reverse_iterator<Iter2>& rhs)
{
    return lhs.base() <= rhs.base();
}

template <typename Iter>
reverse_iterator<Iter> operator +
(typename reverse_iterator<Iter>::difference_type n, const reverse_iterator<Iter>& rhs)
{
    return rhs + n;
}

template <typename Iter1, typename Iter2>
auto operator -
(const reverse_iterator<Iter1>& lhs,
 const reverse_iterator<Iter2>& rhs) -> decltype(rhs.base() - lhs.base())
{
    return rhs.base() - lhs.base();
}

template <typename Iter>
class reverse_iterator
{
public:
    using iterator_type   = Iter;
    using value_type      = typename iterator_traits<Iter>::value_type;
    using difference_type = typename iterator_traits<Iter>::difference_type;
    using pointer         = typename iterator_traits<Iter>::pointer;
    using reference       = typename iterator_traits<Iter>::reference;

    reverse_iterator() = default;

    reverse_iterator(const iterator_type& iter) { it = iter; }

    template <typename U>
    reverse_iterator(const reverse_iterator<U>& rhs)
    {
        if (&rhs != this) {
            it = rhs.it;
        }
    }

    reverse_iterator& operator = (const iterator_type& iter) { it = iter; return *this; }

    template <typename U>
    reverse_iterator& operator = (const reverse_iterator<U>& rhs)
    {
        if (&rhs != this) {
            it = rhs.it;
        }
        return *this;
    }

    iterator_type base() const { return it; }

    pointer operator -> () const { return it; }
    reference operator * () const { return *it; }

    reference operator [] (difference_type n) const { return *(it - n); }

    reverse_iterator& operator ++ () { --it; return *this; }
    reverse_iterator& operator -- () { ++it; return *this; }

    reverse_iterator operator ++ (int) {
        auto rhs = *this; --it; return rhs;
    }
    reverse_iterator operator -- (int) {
        auto rhs = *this; ++it; return rhs;
    }

    reverse_iterator operator + (difference_type n) const {
        return reverse_iterator<iterator_type>(it - n);
    }
    reverse_iterator operator - (difference_type n) const {
        return reverse_iterator<iterator_type>(it + n);
    }

    reverse_iterator& operator += (difference_type n) { it -= n; return *this; }
    reverse_iterator& operator -= (difference_type n) { it += n; return *this; }
private:
    Iter it;
};

template <typename T> class pqArray_iterator;

template <typename T>
bool operator == (const pqArray_iterator<T>& lhs, const pqArray_iterator<T>& rhs)
{
    return lhs.base() == rhs.base();
}

template <typename T>
bool operator != (const pqArray_iterator<T>& lhs, const pqArray_iterator<T>& rhs)
{
    return lhs.base() != rhs.base();
}

template <typename T>
bool operator < (const pqArray_iterator<T>& lhs, const pqArray_iterator<T>& rhs)
{
    return lhs.base() >  rhs.base();
}

template <typename T>
bool operator <= (const pqArray_iterator<T>& lhs, const pqArray_iterator<T>& rhs)
{
    return lhs.base() >= rhs.base();
}

template <typename T>
bool operator > (const pqArray_iterator<T>& lhs, const pqArray_iterator<T>& rhs)
{
    return lhs.base() <  rhs.base();
}

template <typename T>
bool operator >= (const pqArray_iterator<T>& lhs, const pqArray_iterator<T>& rhs)
{
    return lhs.base() <= rhs.base();
}

template <typename T>
class pqArray_iterator
{
public:
    using value_type      = T;
    using difference_type = std::ptrdiff_t;
    using pointer         = T*;
    using reference       = T&;

    pqArray_iterator() = default;

    pqArray_iterator(pointer p) { ptr = p; }
    pqArray_iterator(const pqArray_iterator& rhs)
    {
        if (&rhs != this) {
            ptr = rhs.ptr;
        }
    }

    pqArray_iterator& operator = (pointer p) { ptr = p; return *this; }
    pqArray_iterator& operator = (const pqArray_iterator& rhs)
    {
        if (&rhs != this) {
            ptr = rhs.ptr;
        }
        return *this;
    }

    pointer base() const { return ptr; }

    pointer operator -> () const { return ptr; }
    reference operator * () const { return *ptr; }

    reference operator [] (difference_type n) const { return *(ptr + n); }

    pqArray_iterator& operator ++ () { ++ptr; return *this; }
    pqArray_iterator& operator -- () { --ptr; return *this; }

    pqArray_iterator operator ++ (int) {
        auto rhs = *this; ++ptr; return rhs;
    }
    pqArray_iterator operator -- (int) {
        auto rhs = *this; --ptr; return rhs;
    }

    pqArray_iterator operator + (difference_type n) const {
        return pqArray_iterator<T>(ptr + n);
    }
    pqArray_iterator operator - (difference_type n) const {
        return pqArray_iterator<T>(ptr - n);
    }

    pqArray_iterator& operator += (difference_type n) { ptr += n; return *this; }
    pqArray_iterator& operator -= (difference_type n) { ptr -= n; return *this; }
private:
    T *ptr;
};

template <typename T, std::size_t N>
class pqArray
{
public:
    pqArray() = default;

    using iterator = pqArray_iterator<T>;
    using const_iterator = const pqArray_iterator<T>;

    using riterator = reverse_iterator<iterator>;
    using const_riterator = reverse_iterator<const_iterator>;

    riterator rbegin() { return array + N; }
    const_riterator rbegin() const { return array + N; }

    riterator rend() { return array; }
    const_riterator rend() const { return array; }

private:
    T array[N];
};

inline void unit_traits()
{
    pqArray<int, 10> array;
    for (auto it = array.rbegin(); it != array.rend(); ++it) {
        std::cout << *it << ' ';
    }
    std::cout << std::endl;
}

#endif // UTIL_H
