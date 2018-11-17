#ifndef PARENT_H
#define PARENT_H

#include <memory>

class parent
{
public:
    class child;
    parent(size_t, size_t);
    ~parent() noexcept;
    size_t getage() const { return age; }
    size_t getchildage() const;
private:
    size_t age;
    std::shared_ptr<child> cptr;
};

#endif // PARENT_H
