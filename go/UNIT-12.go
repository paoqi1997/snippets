/**
 * Go之类型断言及错误
 */

package main

import (
    "fmt"
    "time"
)

func check(i interface{}) {
    switch val := i.(type) {
    case int:
        fmt.Printf("Type: %T, Value: %d\n", val, val)
    case string:
        fmt.Printf("Type: %T, Value: %s\n", val, val)
    default:
        fmt.Printf("Unknown\n")
    }
}

type pq_error struct {
    what string
    when time.Time
}

func (e pq_error) Error() string {
    return fmt.Sprintf("%s, at %v.", e.what, e.when)
}

func run() error {
    return pq_error{"run failed", time.Now()}
}

func main() {
    var i interface{} = "paoqi"

    s, ok := i.(string)
    fmt.Println(s, ok) // paoqi true

    f, ok := i.(float64)
    fmt.Println(f, ok) // 0 false

    check(777)   // int 777
    check("777") // string 777
    check(false) // Unknown

    if err := run(); err != nil {
        fmt.Println(err)
    }
}
