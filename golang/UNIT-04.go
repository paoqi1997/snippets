/**
 * Go之变量
 */

package main

import "fmt"

// 变量列表
var x, y, z int = 9, 8, 5

const (
    Int = 6324
    String = "6324"
)

func main() {
    fmt.Println(x, y, z) // 9 8 5

    fl := 6.324

    fmt.Println(int(fl)) // 6

    fmt.Printf("Type: %T, Value: %v\n", fl, fl)

    const name = "Xiaochuan"

    fmt.Println("Name:", name)
}
