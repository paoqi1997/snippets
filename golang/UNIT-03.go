/**
 * Go之函数
 */

package main

import (
    "fmt"
    "math/rand"
)

func add(x int, y int) int {
    return x + y
}

func sub(x, y int) int {
    return x - y
}

// 多返回值
func swap(s1, s2 string) (string, string) {
    return s2, s1
}

// 直接返回
func random(maxn int) (r int) {
    r = rand.Intn(maxn)
    return
}

func main() {
    fmt.Println(add(2, 4))
    fmt.Println(sub(4, 2))

    os1, os2 := swap("Linux", "Windows")
    fmt.Println(os1, "or", os2)

    fmt.Printf("My Number is %d.\n", random(100))
}
