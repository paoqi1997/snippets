package main

import (
    "fmt"
)

func main() {
    c := NewHttpClient("http://127.0.0.1:12488")

    resp := c.ForwardLog(ForwardLogRequest{
        EventName: "hi",
        Data: "Hello syslog!",
    })

    fmt.Println(resp.Status)
}
