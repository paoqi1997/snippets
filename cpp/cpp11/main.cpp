#include <cstdio>
#include <iostream>
#include <map>
#include <thread>
#include <tuple>
#include <utility>

#include "util.h"

using std::cout;
using std::endl;

int main()
{
    {
        // std::move
        cout << "[cpp/cpp11/std::move]" << endl;

        Obj obj1("Hello");
        Obj obj2 = obj1;
        Obj obj3 = std::move(obj1);

        if (obj1.getS() == nullptr) {
            cout << "obj1.str is null." << endl;
        }

        _func(obj1);
        _func(Obj("Hi"));

        // std::forward
        cout << "[cpp/cpp11/std::forward]" << endl;

        func(obj1);
        func(Obj("Hi"));
        func_with_forward(obj1);
        func_with_forward(Obj("Hi"));
    }

    // std::shared_ptr, ...
    cout << "[cpp/cpp11/smart_pointers]" << endl;

    {
        auto engine = std::make_shared<Engine>("pqwan");
        std::printf("Engine(\"%s\") ref: %d\n", engine->getName(), engine.use_count()); // 1

        auto sp1 = engine->getPtr();
        std::printf("Engine(\"%s\") ref: %d\n", engine->getName(), engine.use_count()); // 2

        std::weak_ptr<Engine> wp = engine;
        std::printf("Engine(\"%s\") ref: %d\n", engine->getName(), engine.use_count()); // 2

        auto sp2 = wp.lock();
        std::printf("Engine(\"%s\") ref: %d\n", engine->getName(), engine.use_count()); // 3
    }

    // the array of std::shared_ptr
    {
        std::shared_ptr<Engine[]> engines1(new Engine[2]{"Unity", "Unreal"});

        std::shared_ptr<Engine> engines2(
            new Engine[2]{"Unity", "Unreal"}, std::default_delete<Engine[]>()
        );
    }

    // the array of std::unique_ptr
    {
        std::unique_ptr<Engine[]> engines1(new Engine[2]{"CRYENGINE", "Godot"});

        auto deleter = std::default_delete<Engine[]>();
        std::unique_ptr<Engine, decltype(deleter)> engines2(new Engine[2]{"CRYENGINE", "Godot"}, deleter);
    }

    // 循环引用相关
    {
        std::shared_ptr<Parent> parent(new Parent);
        std::shared_ptr<Child> child(new Child);

        parent->setChild(child);
        child->setParent(parent);
    }

    // alignof, ...
    cout << "[cpp/cpp11/align]" << endl;

    std::printf("[DataModel1] sizeof: %zu, alignof: %zu\n", sizeof(DataModel1), alignof(DataModel1));
    std::printf("[DataModel2] sizeof: %zu, alignof: %zu\n", sizeof(DataModel2), alignof(DataModel2));
    std::printf("[DataModel3] sizeof: %zu, alignof: %zu\n", sizeof(DataModel3), alignof(DataModel3));

    // constexpr
    cout << "[cpp/cpp11/constexpr]" << endl;

    int box[getRedisPort()];
    cout << sizeof(box) / sizeof(decltype(box[0])) << endl;

    // variadic templates
    cout << "[cpp/cpp11/variadic_templates]" << endl;

    cout << sum(1, 2, 3, 4, 5, 6) << endl;

    cout << Argc(1, 2, 3, 4, 5, 6) << endl;

    print("I", "like", "C++.");

    // thread_local
    cout << "[cpp/cpp11/thread_local]" << endl;

    g_n = 3;
    std::printf("ThreadID: %ld, n: %zu\n", std::this_thread::get_id(), g_n);

    std::thread thd(threadFunc);
    thd.join();

    // std::tie
    cout << "[cpp/cpp11/std::tie]" << endl;

    std::map<int, int> mapobj;

    std::map<int, int>::iterator mit;
    bool inserted;

    auto t = std::tie(mit, inserted) = mapobj.insert(std::make_pair(2, 3));

    std::printf("mapobj[%d]=%d, inserted: %d\n", mit->first, mit->second, inserted);

    mit = std::get<0>(t), inserted = std::get<1>(t);

    std::printf("mapobj[%d]=%d, inserted: %d\n", mit->first, mit->second, inserted);

    return 0;
}
