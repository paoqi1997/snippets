package main

type ForwardLogRequest struct {
    EventName string `json:"eventName"`
    Data      string `json:"data"`
}

type ForwardLogResponse struct {
    Result int `json:"result"`
}

type SyslogRequest struct {
    Msg string `json:"msg"`
}

type SyslogResponse struct {
    Status int `json:"status"`
}
