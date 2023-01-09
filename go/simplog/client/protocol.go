package main

type SyslogRequest struct {
    EventName string `json:"eventName"`
    Data      string `json:"data"`
}

type SyslogResponse struct {
    Status int `json:"status"`
}
