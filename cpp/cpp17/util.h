#ifndef UTIL_H
#define UTIL_H

#include <any>
#include <cstdio>
#include <memory>

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

#endif // UTIL_H
