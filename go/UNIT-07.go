/**
 * Go之数组及切片
 */

package main

import "fmt"

func outputSlice(s []int) {
    fmt.Printf("Len = %d, Cap = %d\n", len(s), cap(s))
}

func main() {
    var ss [2]string
    ss[0] = "Hello"
    ss[1] = "World"
    fmt.Println(ss[0], ss[1]) //  Hello World
    fmt.Println(ss)           // [Hello World]

    nums := [6]int{1, 2, 3, 4, 5, 6}
    fmt.Println(nums)  // [1 2 3 4 5 6]

    var piece []int = nums[0:4]
    fmt.Println(piece) // [1 2 3 4]
    outputSlice(piece) // Len = 4, Cap = 6

    pa := nums[0:2]
    pb := nums[0:4]
    pa[0] = 6
    fmt.Println(pa)    // [6 2]
    fmt.Println(pb)    // [6 2 3 4]
    fmt.Println(nums)  // [6 2 3 4 5 6]

    pa = nums[4:]
    outputSlice(pa)    // Len = 2, Cap = 2

    bools := []bool{true, false}
    fmt.Println(bools) // [true false]

    fmt.Println(nums[:])   // [6 2 3 4 5 6]
    fmt.Println(nums[0:])  // [6 2 3 4 5 6]
    fmt.Println(nums[:6])  // [6 2 3 4 5 6]
    fmt.Println(nums[0:6]) // [6 2 3 4 5 6]

    var bl []int
    fmt.Println(bl, len(bl), cap(bl)) // [] 0 0

    pc := make([]int, 4, 4)
    fmt.Println(pc, len(pc), cap(pc)) // [0 0 0 0] 4 4

    pc = nums[4:6]
    fmt.Println(pc, len(pc), cap(pc)) // [5 6] 2 2

    pc = append(pc, 7)
    fmt.Println(pc, len(pc), cap(pc)) // [5 6 7] 3 4

    pc = append(pc, 8, 9)
    fmt.Println(pc, len(pc), cap(pc)) // [5 6 7 8 9] 5 8

    pc[4] = 8
    fmt.Println(pc, len(pc), cap(pc)) // [5 6 7 8 8] 5 8

    pic := [][]int {
        []int{1, 0, 0}, []int{0, 1, 0}, []int{0, 0, 1},
    }

    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            fmt.Printf("%d ", pic[i][j])
        }
        fmt.Printf("\n")
    }
}
