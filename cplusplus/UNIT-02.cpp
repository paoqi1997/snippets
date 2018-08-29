/**
 * C++之sizeof运算符
 */

#include <iostream>

using std::cout;
using std::endl;

static inline void PRINT_STR(const char *str)
{
    cout << str << endl;
}

#define PRINT_SIZE(param)          \
{                                  \
    cout << sizeof(param) << endl; \
}

int main()
{
    PRINT_STR("others");
    PRINT_SIZE(NULL);                 // 4
    PRINT_SIZE(nullptr);              // 4
    PRINT_SIZE(size_t);               // 4
    PRINT_SIZE(ptrdiff_t);            // 4

    PRINT_STR("char");
    PRINT_SIZE(char);                 // 1
    PRINT_SIZE(unsigned char);        // 1
    PRINT_SIZE(char *);               // 4
    PRINT_SIZE(unsigned char *);      // 4

    PRINT_STR("short");
    PRINT_SIZE(short);                // 2
    PRINT_SIZE(unsigned short);       // 2
    PRINT_SIZE(short *);              // 4
    PRINT_SIZE(unsigned short *);     // 4

    PRINT_STR("int");
    PRINT_SIZE(int);                  // 4
    PRINT_SIZE(unsigned int);         // 4
    PRINT_SIZE(int *);                // 4
    PRINT_SIZE(unsigned int *);       // 4

    PRINT_STR("long");
    PRINT_SIZE(long);                 // 4
    PRINT_SIZE(unsigned long);        // 4
    PRINT_SIZE(long *);               // 4
    PRINT_SIZE(unsigned long *);      // 4

    PRINT_STR("long long");
    PRINT_SIZE(long long);            // 8
    PRINT_SIZE(unsigned long long);   // 8
    PRINT_SIZE(long long *);          // 4
    PRINT_SIZE(unsigned long long *); // 4

    PRINT_STR("floating point");
    PRINT_SIZE(float);                // 4
    PRINT_SIZE(double);               // 8
    PRINT_SIZE(long double);          // 12
    PRINT_SIZE(float *);              // 4
    PRINT_SIZE(double *);             // 4
    PRINT_SIZE(long double *);        // 4

    PRINT_STR("char array");
    PRINT_SIZE(char[10]);                  // 10
    PRINT_SIZE(unsigned char[10]);         // 10
    PRINT_SIZE(char * [10]);               // 40
    PRINT_SIZE(unsigned char * [10]);      // 40
    PRINT_SIZE(char(*)[10]);               // 4
    PRINT_SIZE(unsigned char(*)[10]);      // 4

    PRINT_STR("short array");
    PRINT_SIZE(short[10]);                 // 20
    PRINT_SIZE(unsigned short[10]);        // 20
    PRINT_SIZE(short * [10]);              // 40
    PRINT_SIZE(unsigned short * [10]);     // 40
    PRINT_SIZE(short(*)[10]);              // 4
    PRINT_SIZE(unsigned short(*)[10]);     // 4

    PRINT_STR("int array");
    PRINT_SIZE(int[10]);                   // 40
    PRINT_SIZE(unsigned int[10]);          // 40
    PRINT_SIZE(int * [10]);                // 40
    PRINT_SIZE(unsigned int * [10]);       // 40
    PRINT_SIZE(int(*)[10]);                // 4
    PRINT_SIZE(unsigned int(*)[10]);       // 4

    PRINT_STR("long array");
    PRINT_SIZE(long[10]);                  // 40
    PRINT_SIZE(unsigned long[10]);         // 40
    PRINT_SIZE(long * [10]);               // 40
    PRINT_SIZE(unsigned long * [10]);      // 40
    PRINT_SIZE(long(*)[10]);               // 4
    PRINT_SIZE(unsigned long(*)[10]);      // 4

    PRINT_STR("long long array");
    PRINT_SIZE(long long[10]);             // 80
    PRINT_SIZE(unsigned long long[10]);    // 80
    PRINT_SIZE(long long * [10]);          // 40
    PRINT_SIZE(unsigned long long * [10]); // 40
    PRINT_SIZE(long long(*)[10]);          // 4
    PRINT_SIZE(unsigned long long(*)[10]); // 4

    PRINT_STR("floating point array");
    PRINT_SIZE(float[10]);                 // 40
    PRINT_SIZE(double[10]);                // 80
    PRINT_SIZE(long double[10]);           // 120
    PRINT_SIZE(float * [10]);              // 40
    PRINT_SIZE(double * [10]);             // 40
    PRINT_SIZE(long double * [10]);        // 40
    PRINT_SIZE(float(*)[10]);              // 4
    PRINT_SIZE(double(*)[10]);             // 4
    PRINT_SIZE(long double(*)[10]);        // 4

    return 0;
}
