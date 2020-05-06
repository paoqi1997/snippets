/**
 * Go之range及map
 */

package main

import "fmt"

type girl struct {
    cup string
    age int
}

var pow = []int{1, 2, 4, 8, 16, 32, 64}

func main() {
    for i, v := range pow {
        fmt.Printf("2 ** %d = %d\n", i, v)
    }

    box := make([]int, 10)
    for i := range box {
        box[i] = i
    }
    for _, val := range box {
        fmt.Printf("%d ", val)    // 0 1 2 3 4 5 6 7 8 9
    }
    fmt.Printf("\n")

    list := make(map[string]girl)

    list["Xiaoting"] = girl{"C", 20}

    fmt.Println(list["Xiaoting"]) // {C 20}

    var table = map[string]girl {
        "Tutu": girl{"B", 18}, "Kuikui": girl{"E", 18},
    }
    fmt.Println(table)            // map[Tutu:{B 18} Kuikui:{E 18}]

    table["Tutu"] = girl{"G", 18}

    girlfriend := list["Xiaoting"]
    fmt.Println(girlfriend)       // {C 20}

    delete(table, "Kuikui")
    fmt.Println(table)            // map[Tutu:{G 18}]

    girl, isok := list["Xiaoting"]
    if isok {                     // Cup: C, Age: 20
        fmt.Printf("Cup: %s, Age: %d\n", girl.cup, girl.age)
    }
}
