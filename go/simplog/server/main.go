package main

import (
    "fmt"
    "os"
    "strconv"
)

var (
    L *Logger
)

func main() {
    L = NewLogger()

    var port int32
    if len(os.Args) <= 1 {
        port = 12488
    } else {
        sport := os.Args[1]
        iport, err := strconv.Atoi(sport)
        if err != nil {
            fmt.Println(err)
            return
        }
        port = int32(iport)
    }

    ss := NewSyslogServer(port)
    ss.Run()
}
