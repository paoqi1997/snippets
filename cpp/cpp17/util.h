#ifndef UTIL_H
#define UTIL_H

#include <any>
#include <cstdint>
#include <cstdio>
#include <memory>
#include <optional>
#include <string>
#include <string_view>
#include <variant>

/**
 * https://devblogs.microsoft.com/cppblog/stdany-how-when-and-why/
 */
inline void test_any()
{
    void *user_data1 = new char[4];
    std::shared_ptr<void> user_data2(new char[4], std::default_delete<char[]>());

    char *pc1 = static_cast<char*>(user_data1);
    char *pc2 = static_cast<char*>(user_data2.get());

    int *pn1 = reinterpret_cast<int*>(pc1);
    *pn1 = 16;
    int *pn2 = reinterpret_cast<int*>(pc2);
    *pn2 = 32;

    std::any user_data3;
    std::printf("%d %s\n", user_data3.has_value(), user_data3.type().name()); // 0 void

    user_data3 = nullptr;
    std::printf("%d %s\n", user_data3.has_value(), user_data3.type().name()); // 1 std::nullptr_t

    user_data3 = new char[4];
    std::printf("%d %s\n", user_data3.has_value(), user_data3.type().name()); // 1 char * __ptr64

    char *pc3 = std::any_cast<char*>(user_data3);

    int *pn3 = reinterpret_cast<int*>(pc3);
    *pn3 = 64;

    std::printf("%d %d %d\n", *pn1, *pn2, *pn3);

    delete []pc1;
    delete []pc3;
}

typedef union epoll_data {
    void *ptr;
    int fd;
    std::uint32_t u32;
    std::uint64_t u64;
} epoll_data_t;

struct ResetVisitor
{
    void operator () (void*& ptr) { ptr = nullptr; }
    void operator () (int& num) { num = 0; }
    void operator () (std::uint32_t& u32) { u32 = 0; }
    void operator () (std::uint64_t& u64) { u64 = 0; }
};

inline void test_variant()
{
    epoll_data_t epoll_data1;

    std::printf("%d\n", (epoll_data1.fd = 1));

    std::variant<void*, int, std::uint32_t, std::uint64_t> epoll_data2;
    int val1, val2;

    epoll_data2 = 2;

    val1 = std::get<int>(epoll_data2), val2 = std::get<1>(epoll_data2);
    std::printf("%zu %d %d\n", epoll_data2.index(), val1, val2); // 1 2 2

    std::visit(ResetVisitor(), epoll_data2);

    val1 = std::get<int>(epoll_data2), val2 = std::get<1>(epoll_data2);
    std::printf("%zu %d %d\n", epoll_data2.index(), val1, val2); // 1 0 0

    epoll_data2 = static_cast<std::uint32_t>(3);

    val1 = std::get<std::uint32_t>(epoll_data2), val2 = std::get<2>(epoll_data2);
    std::printf("%zu %d %d\n", epoll_data2.index(), val1, val2); // 2 3 3

    std::visit(ResetVisitor(), epoll_data2);

    val1 = std::get<std::uint32_t>(epoll_data2), val2 = std::get<2>(epoll_data2);
    std::printf("%zu %d %d\n", epoll_data2.index(), val1, val2); // 2 0 0
}

inline std::optional<const char*> getPlayerName(std::size_t playerID)
{
    return playerID == 1001 ? std::optional<const char*>("paoqi") : std::nullopt;
}

inline void test_optional()
{
    if (auto name = getPlayerName(1001); name) {
        std::printf("%s\n", name.value());
    } else {
        std::printf("null\n");
    }

    auto name2 = getPlayerName(1);
    std::printf("%s\n", name2.value_or("null"));
}

inline void test_string_view()
{
    std::string s("123456");

    std::string_view sv(s);

    std::printf("%s %zu\n", sv.data(), sv.length());
}

#endif // UTIL_H
