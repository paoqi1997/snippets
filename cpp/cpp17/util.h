#ifndef UTIL_H
#define UTIL_H

#include <any>
#include <cctype>
#include <cstdint>
#include <cstdio>
#include <cstdlib>
#include <memory>
#include <optional>
#include <variant>

// https://devblogs.microsoft.com/cppblog/stdany-how-when-and-why/
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
    std::printf("%d %s\n", user_data3.has_value(), user_data3.type().name());

    user_data3 = nullptr;
    std::printf("%d %s\n", user_data3.has_value(), user_data3.type().name());

    user_data3 = new char[4];
    std::printf("%d %s\n", user_data3.has_value(), user_data3.type().name());

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

    epoll_data2 = 2;

    std::printf("%zu %d\n", epoll_data2.index(), std::get<int>(epoll_data2)); // 1 2
    std::visit(ResetVisitor(), epoll_data2);
    std::printf("%zu %d\n", epoll_data2.index(), std::get<int>(epoll_data2)); // 1 0

    epoll_data2 = static_cast<std::uint32_t>(3);

    std::printf("%zu %d\n", epoll_data2.index(), std::get<std::uint32_t>(epoll_data2)); // 2 3
    std::visit(ResetVisitor(), epoll_data2);
    std::printf("%zu %d\n", epoll_data2.index(), std::get<std::uint32_t>(epoll_data2)); // 2 0
}

inline std::optional<int> Atoi(const char *s)
{
    for (std::size_t i = 0; s[i] != '\0'; ++i) {
        if (!std::isdigit(s[i])) {
            return std::nullopt;
        }
    }

    return std::atoi(s);
}

inline void test_optional()
{
    if (auto num = Atoi("648"); num) {
        std::printf("%d\n", num.value());
    } else {
        std::printf("0\n");
    }

    auto num2 = Atoi("i18n");
    std::printf("%d\n", num2.value_or(0));
}

#endif // UTIL_H
