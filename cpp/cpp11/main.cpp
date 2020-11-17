#include <cstdio>
#include <iostream>
#include <utility>

#include "util.h"

using std::cout;
using std::endl;

int main()
{
    // std::move
    cout << "cpp/cpp11/std::move" << endl;

    Obj obj1("Hello");
    Obj obj2 = obj1;
    Obj obj3 = std::move(obj1);

    if (obj1.getS() == nullptr) {
        cout << "obj1.str is null." << endl;
    }

    _func(obj1);
    _func(Obj("Hi"));

    // std::forward
    cout << "cpp/cpp11/std::forward" << endl;

    func(obj1);
    func(Obj("Hi"));
    func_with_forward(obj1);
    func_with_forward(Obj("Hi"));

    // std::shared_ptr, ...
    cout << "cpp/cpp11/smart_pointers" << endl;

    auto engine = std::make_shared<Engine>("pqwan");
    std::printf("Engine(\"%s\") ref: %d\n", engine->getName(), engine.use_count());

    auto sp1 = engine->getPtr();
    std::printf("Engine(\"%s\") ref: %d\n", engine->getName(), engine.use_count());

    std::weak_ptr<Engine> wp = engine;
    std::printf("Engine(\"%s\") ref: %d\n", engine->getName(), engine.use_count());

    auto sp2 = wp.lock();
    std::printf("Engine(\"%s\") ref: %d\n", engine->getName(), engine.use_count());

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
    cout << "cpp/cpp11/align" << endl;

    std::printf("[DataModel1] sizeof: %zu, alignof: %zu\n", sizeof(DataModel1), alignof(DataModel1));
    std::printf("[DataModel2] sizeof: %zu, alignof: %zu\n", sizeof(DataModel2), alignof(DataModel2));
    std::printf("[DataModel3] sizeof: %zu, alignof: %zu\n", sizeof(DataModel3), alignof(DataModel3));

    return 0;
}
