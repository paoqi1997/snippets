/**
 * Go之控制流
 */

package main

import (
    "fmt"
    "time"
)

func main() {
    sum := 0
    for i := 0; i < 10; i++ {
        sum += i
    }
    fmt.Println("Sum:", sum)

    num := 0
    for ; num < 10; {
        num += 1
    }
    fmt.Println("Num:", num)

    cnt := 0
    for cnt < 10 {
        cnt += 1
    }
    fmt.Println("Cnt:", cnt)

    /*
    for {
        Infinite Loop
    }
    */

    flag := 0
    if flag == 0 {
        fmt.Println("Rest")
    } else {
        fmt.Println("Work")
    }

    if os := "Linux"; os == "Linux" {
        fmt.Println("Switching from Windows to Linux")
    }

    platform := "Windows"
    switch platform {
    case "Windows":
        fmt.Println("IOCP")
    case "Linux":
        fmt.Println("epoll")
    case "FreeBSD":
        fmt.Println("kqueue")
    default:
        fmt.Println("None")
    }

    clock := time.Now()
    switch {
    case clock.Hour() < 12:
        fmt.Println("Good morning!")
    case clock.Hour() < 18:
        fmt.Println("Good afternoon!")
    default:
        fmt.Println("Good evening!")
    }

    for i := 0; i <= 10; i++ {
        defer fmt.Println(i)
    }
    fmt.Println("Count down!")
}
