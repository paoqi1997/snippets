package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "time"
)

type HttpClient struct {
    c        *http.Client
    endpoint string
}

func NewHttpClient(endpoint string) *HttpClient {
    hc := &http.Client{
        Transport: &http.Transport{
            Dial: nil,
            ResponseHeaderTimeout: time.Second * 8,
        },
        Timeout: time.Second * 5,
    }

    return &HttpClient{
        c: hc,
        endpoint: endpoint,
    }
}

func (hc *HttpClient) Syslog(req SyslogRequest) SyslogResponse {
    resp := SyslogResponse{}

    reqBytes, err := json.Marshal(req)
    if err != nil {
        fmt.Println(err)
        return resp
    }

    bodyReader := bytes.NewReader(reqBytes)

    url := fmt.Sprintf("%s/syslog", hc.endpoint)
    respObj, err := hc.c.Post(url, "application/json", bodyReader)
    if err != nil {
        fmt.Println(err)
        return resp
    }

    respBytes, err := io.ReadAll(respObj.Body)
    if err != nil {
        fmt.Println(err)
        return resp
    }

    defer respObj.Body.Close()

    if err := json.Unmarshal(respBytes, &resp); err != nil {
        fmt.Println(err)
        return resp
    }

    return resp
}
