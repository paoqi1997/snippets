package protocol

type LogRequest struct {
    EventName string `json:"eventName"`
    Data      string `json:"data"`
}

type LogResponse struct {
    Status int `json:"status"`
}
