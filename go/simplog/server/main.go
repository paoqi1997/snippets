package main

import (
    "fmt"
    "os"
    "strconv"
)

func main() {
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

    ss := NewSysLogServer(port)
    ss.Run()
}
