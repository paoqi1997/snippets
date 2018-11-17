#include <iostream>

#include "child.h"

parent::child::child(size_t _age) : age(_age)
{
    std::cout << "Creating child..." << std::endl;
}

parent::child::~child() noexcept
{
    std::cout << "Deleting child..." << std::endl;
}
