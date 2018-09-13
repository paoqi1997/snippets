/**
 * Go之函数值及闭包
 */

package main

import "fmt"

func compute(operator func(int, int) int, x int, y int) int {
    return operator(x, y)
}

func connstr() func(string) string {
    var ss string
    return func(s string) string {
        ss += s + " "
        return ss
    }
}

func main() {
    add := func(x, y int) int {
        return x + y
    }
    sub := func(x, y int) int {
        return x - y
    }
    fmt.Println(compute(add, 2, 4)) // 6
    fmt.Println(compute(sub, 2, 4)) // -2

    str := []string{"deep", "dark", "fantasies"}

    fun := connstr()

    for i := 0; i < len(str); i++ { // deep
        fmt.Println(fun(str[i]))    // deep dark
    }                               // deep dark fantasies
}
