package main

import (
    "ss/server"
)

func main() {
    ss := server.NewSysLogServer(12488)
    ss.Run()
}
