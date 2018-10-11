#ifndef RAND_H
#define RAND_H

#include <ctime>
#include <random>

static std::default_random_engine e(std::time(nullptr));
static std::uniform_int_distribution<size_t> u;

int getRandom(int, int);

#endif // RAND_H
