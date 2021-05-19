#ifndef UTIL_H
#define UTIL_H

#include <algorithm>
#include <cstddef>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <iterator>
#include <queue>
#include <vector>

#define PRINT_INFO(type)                           \
do {                                               \
    std::printf("%s: %zu\n", #type, sizeof(type)); \
} while (0)

inline void test_sizeof()
{
#ifdef _WIN32
    std::cout << "os: windows" << std::endl;
#else
    std::cout << "os: linux" << std::endl;
#endif

    PRINT_INFO(NULL);
    PRINT_INFO(nullptr);
    PRINT_INFO(void*);
    PRINT_INFO(std::size_t);
    PRINT_INFO(std::ptrdiff_t);

    PRINT_INFO(char);
    PRINT_INFO(short);
    PRINT_INFO(short int);
    PRINT_INFO(int);
    PRINT_INFO(long);
    PRINT_INFO(long int);
    PRINT_INFO(long long);

    PRINT_INFO(float);
    PRINT_INFO(double);
    PRINT_INFO(long double);
}

inline void test_bitfield()
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

inline void test_array()
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

inline void test_class()
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

    classA *d = new classA;
    classC *q = dynamic_cast<classC*>(d);
    delete d;
}

/**
 * iterator_traits
 */
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

/**
 * _reverse_iterator
 */
template <typename Iter> class _reverse_iterator;

template <typename Iter>
_reverse_iterator<Iter> make_reverse_iterator(Iter it)
{
    return _reverse_iterator<Iter>(it);
}

template <typename Iter1, typename Iter2>
bool operator == (const _reverse_iterator<Iter1>& lhs, const _reverse_iterator<Iter2>& rhs)
{
    return lhs.base() == rhs.base();
}

template <typename Iter1, typename Iter2>
bool operator != (const _reverse_iterator<Iter1>& lhs, const _reverse_iterator<Iter2>& rhs)
{
    return lhs.base() != rhs.base();
}

template <typename Iter1, typename Iter2>
bool operator < (const _reverse_iterator<Iter1>& lhs, const _reverse_iterator<Iter2>& rhs)
{
    return lhs.base() > rhs.base();
}

template <typename Iter1, typename Iter2>
bool operator <= (const _reverse_iterator<Iter1>& lhs, const _reverse_iterator<Iter2>& rhs)
{
    return lhs.base() >= rhs.base();
}

template <typename Iter1, typename Iter2>
bool operator > (const _reverse_iterator<Iter1>& lhs, const _reverse_iterator<Iter2>& rhs)
{
    return lhs.base() < rhs.base();
}

template <typename Iter1, typename Iter2>
bool operator >= (const _reverse_iterator<Iter1>& lhs, const _reverse_iterator<Iter2>& rhs)
{
    return lhs.base() <= rhs.base();
}

template <typename Iter>
_reverse_iterator<Iter> operator +
(typename _reverse_iterator<Iter>::difference_type n, const _reverse_iterator<Iter>& rhs)
{
    return rhs + n;
}

template <typename Iter1, typename Iter2>
auto operator -
(const _reverse_iterator<Iter1>& lhs,
 const _reverse_iterator<Iter2>& rhs) -> decltype(rhs.base() - lhs.base())
{
    return rhs.base() - lhs.base();
}

template <typename Iter>
class _reverse_iterator
{
public:
    using iterator_type   = Iter;
    using value_type      = typename iterator_traits<Iter>::value_type;
    using difference_type = typename iterator_traits<Iter>::difference_type;
    using pointer         = typename iterator_traits<Iter>::pointer;
    using reference       = typename iterator_traits<Iter>::reference;

    _reverse_iterator() = default;

    _reverse_iterator(const iterator_type& iter) { it = iter; }

    template <typename U>
    _reverse_iterator(const _reverse_iterator<U>& rhs)
    {
        if (&rhs != this) {
            it = rhs.it;
        }
    }

    _reverse_iterator& operator = (const iterator_type& iter) { it = iter; return *this; }

    template <typename U>
    _reverse_iterator& operator = (const _reverse_iterator<U>& rhs)
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

    _reverse_iterator& operator ++ () { --it; return *this; }
    _reverse_iterator& operator -- () { ++it; return *this; }

    _reverse_iterator operator ++ (int) {
        auto rhs = *this; --it; return rhs;
    }
    _reverse_iterator operator -- (int) {
        auto rhs = *this; ++it; return rhs;
    }

    _reverse_iterator operator + (difference_type n) const {
        return _reverse_iterator<iterator_type>(it - n);
    }
    _reverse_iterator operator - (difference_type n) const {
        return _reverse_iterator<iterator_type>(it + n);
    }

    _reverse_iterator& operator += (difference_type n) { it -= n; return *this; }
    _reverse_iterator& operator -= (difference_type n) { it += n; return *this; }
private:
    Iter it;
};

/**
 * Array_iterator
 */
template <typename T> class Array_iterator;

template <typename T>
bool operator == (const Array_iterator<T>& lhs, const Array_iterator<T>& rhs)
{
    return lhs.base() == rhs.base();
}

template <typename T>
bool operator != (const Array_iterator<T>& lhs, const Array_iterator<T>& rhs)
{
    return lhs.base() != rhs.base();
}

template <typename T>
bool operator < (const Array_iterator<T>& lhs, const Array_iterator<T>& rhs)
{
    return lhs.base() > rhs.base();
}

template <typename T>
bool operator <= (const Array_iterator<T>& lhs, const Array_iterator<T>& rhs)
{
    return lhs.base() >= rhs.base();
}

template <typename T>
bool operator > (const Array_iterator<T>& lhs, const Array_iterator<T>& rhs)
{
    return lhs.base() < rhs.base();
}

template <typename T>
bool operator >= (const Array_iterator<T>& lhs, const Array_iterator<T>& rhs)
{
    return lhs.base() <= rhs.base();
}

template <typename T>
class Array_iterator
{
public:
    using value_type      = T;
    using difference_type = std::ptrdiff_t;
    using pointer         = T*;
    using reference       = T&;

    Array_iterator() = default;

    Array_iterator(pointer p) { ptr = p; }
    Array_iterator(const Array_iterator& rhs)
    {
        if (&rhs != this) {
            ptr = rhs.ptr;
        }
    }

    Array_iterator& operator = (pointer p) { ptr = p; return *this; }
    Array_iterator& operator = (const Array_iterator& rhs)
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

    Array_iterator& operator ++ () { ++ptr; return *this; }
    Array_iterator& operator -- () { --ptr; return *this; }

    Array_iterator operator ++ (int) {
        auto rhs = *this; ++ptr; return rhs;
    }
    Array_iterator operator -- (int) {
        auto rhs = *this; --ptr; return rhs;
    }

    Array_iterator operator + (difference_type n) const {
        return Array_iterator<T>(ptr + n);
    }
    Array_iterator operator - (difference_type n) const {
        return Array_iterator<T>(ptr - n);
    }

    Array_iterator& operator += (difference_type n) { ptr += n; return *this; }
    Array_iterator& operator -= (difference_type n) { ptr -= n; return *this; }
private:
    T *ptr;
};

/**
 * Array
 */
template <typename T, std::size_t N>
class Array
{
public:
    using iterator               = Array_iterator<T>;
    using const_iterator         = const Array_iterator<T>;

    using reverse_iterator       = _reverse_iterator<iterator>;
    using const_reverse_iterator = _reverse_iterator<const_iterator>;

    Array() = default;
    Array(std::initializer_list<T> init)
    {
        std::size_t idx = 0;
        for (auto it = init.begin(); it != init.end(); ++it) {
            array[idx++] = *it;
        }
    }

    reverse_iterator rbegin() { return iterator(array + N - 1); }
    const_reverse_iterator rbegin() const { return const_iterator(array + N - 1); }

    reverse_iterator rend() { return iterator(array - 1); }
    const_reverse_iterator rend() const { return const_iterator(array - 1); }
private:
    T array[N];
};

inline void test_traits()
{
    Array<int, 5> array{1, 2, 3, 4, 5};
    for (auto it = array.rbegin(); it != array.rend(); ++it) {
        std::cout << *it << ' ';
    }
    std::cout << std::endl;
}

template <typename T>
union _Node
{
    _Node() : next(nullptr) {}
    T element;
    _Node *next;
};

using Element = int;
using Node    = _Node<Element>;

inline void test_memlinkedlist()
{
    std::size_t capacity = 63;
    std::size_t datalen = capacity - sizeof(Node);
    std::printf("Capacity: %zu, DataLen: %zu\n", capacity, datalen);

    auto mem = new char[capacity];
    auto node = reinterpret_cast<Node*>(mem);
    node->next = nullptr;

    std::size_t elementCount = datalen / sizeof(Element);
    std::printf("ElementCount: %zu\n", elementCount);

    auto body = reinterpret_cast<Element*>(mem + sizeof(Node));
    for (std::size_t i = 0; i < elementCount; ++i) {
        body[i] = i + 1;
    }

    std::printf("[%d", body[0]);
    for (std::size_t i = 1; i < elementCount; ++i) {
        std::printf(", %d", body[i]);
    }
    std::printf("]\n");

    delete []mem;
}

template <typename T>
class Queue : public std::queue<T>
{
public:
    using size_type = typename std::queue<T>::size_type;
    Queue() : std::queue<T>(), callcnt(0) { std::cout << "Queue::Queue()" << std::endl; }
    ~Queue() { std::cout << "Queue::~Queue()" << std::endl; }
    size_type size() const {
        ++callcnt;
        return std::queue<T>::size();
    }
    std::size_t getCallCount() const { return callcnt; }
private:
    mutable std::size_t callcnt;
};

inline void test_mutable()
{
    Queue<int> q;
    q.push(1);
    q.push(2);
    q.push(3);
    std::size_t mysize = q.size();
    std::printf("size: %zu, callcount: %zu\n", mysize, q.getCallCount());
}

inline void test_memops()
{
    char s1[16] = "0123456789";
    std::memcpy(s1 + 3, s1, 6);
    std::printf("memcpy:  %s\n", s1);

    char s2[16] = "0123456789";
    std::memmove(s2 + 3, s2, 6);
    std::printf("memmove: %s\n", s2);
}

inline void test_algo()
{
    std::vector<int> vec{1, 3, 5, 7, 9};

    std::for_each(vec.begin(), vec.end(), [](int ele) {
        std::cout << ele << ' ';
    });
    std::cout << std::endl;

    auto it = std::remove_if(vec.begin(), vec.end(), [](int ele) {
        return ele == 5;
    });
    vec.erase(it, vec.end());

    std::copy(vec.begin(), vec.end(), std::ostream_iterator<int>(std::cout, " "));
    std::cout << std::endl;
}

#endif // UTIL_H
