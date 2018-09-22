/**
 * Go之接口
 */

package main

import "fmt"

type shape interface {
    getname() string
}

type circle struct {
    radius int
}

func (c circle) getname() string {
    return "circle"
}

type square struct {
    side int
}

func (s *square) getname() string {
    if s == nil {
        return "nil"
    } else {
        return "square"
    }
}

func printInfo(i interface{}) {
    fmt.Printf("Type: %T, Value: %v\n", i, i)
}

func main() {
    var sb shape

    printInfo(sb) // <nil> <nil>

    var sc shape = circle{0}

    fmt.Println(sc.getname()) // circle
    printInfo(sc) // main.circle {0}

    var p *square
    var ss shape = p

    fmt.Println(ss.getname()) // nil
    printInfo(ss) // *main.square <nil>
}
