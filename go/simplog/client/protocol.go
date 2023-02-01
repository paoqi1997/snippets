package main

type ForwardLogRequest struct {
    EventName string `json:"eventName"`
    Data      string `json:"data"`
}

type ForwardLogResponse struct {
    Status int `json:"status"`
    Result int `json:"result"`
}
