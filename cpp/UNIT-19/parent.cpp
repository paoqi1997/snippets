#include <iostream>

#include "child.h"

parent::parent(size_t p_age, size_t c_age)
    : age(p_age), cptr(std::make_shared<child>(c_age))
{
    std::cout << "Creating parent..." << std::endl;
}

parent::~parent() noexcept
{
    std::cout << "Deleting parent..." << std::endl;
}

size_t parent::getchildage() const
{
    return cptr->getage();
}
