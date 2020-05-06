#ifndef CHILD_H
#define CHILD_H

#include "parent.h"

class parent::child
{
public:
    child(size_t);
    ~child() noexcept;
    size_t getage() const { return age; }
private:
    size_t age;
};

#endif // CHILD_H
