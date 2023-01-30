package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "log/syslog"
    "net/http"
    "time"
)

type SysLogServer struct {
    svr *http.Server
    cli *syslog.Writer
}

func NewSysLogServer(port int32) *SysLogServer {
    ss := SysLogServer{}

    router := http.NewServeMux()
    router.HandleFunc("/forwardLog", ss.ForwardLog)
    router.HandleFunc("/syslog", ss.Syslog)

    ss.svr = &http.Server{
        Addr: fmt.Sprintf(":%d", port),
        Handler: router,
    }

    return &ss
}

func (ss *SysLogServer) StartSysLog() {
    // https://golang.hotexamples.com/zh/examples/log.syslog/-/Dial/golang-dial-function-examples.html
    cli, err := syslog.Dial("", "", syslog.LOG_INFO, "ss")
    if err != nil {
        fmt.Println(err)
    } else {
        ss.cli = cli
    }
}

func (ss *SysLogServer) CloseSysLog() {
    if ss.cli != nil {
        err := ss.cli.Close()
        if err != nil {
            fmt.Println(err)
        }
    }
}

func (ss *SysLogServer) Run() {
    go ss.StartSysLog()
    defer ss.CloseSysLog()

    if err := ss.svr.ListenAndServe(); err != nil && err != http.ErrServerClosed {
        fmt.Println(err)
    }
}

// cat /var/log/syslog
func (ss *SysLogServer) SendLog(msg string) {
    err := ss.cli.Info(msg)
    if err != nil {
        fmt.Println(err)
    }
}

func (ss *SysLogServer) parseReq(i interface{}, w http.ResponseWriter, r *http.Request) bool {
    reqBytes, err := ioutil.ReadAll(r.Body)
    if err != nil {
        fmt.Println(err)
        w.WriteHeader(411)
        w.Write([]byte(`{"status":1}`))
        return false
    }

    if err := json.Unmarshal(reqBytes, i); err != nil {
        fmt.Println(err)
        w.WriteHeader(412)
        w.Write([]byte(`{"status":2}`))
        return false
    }

    return true
}

func (ss *SysLogServer) sendResp(i interface{}, w http.ResponseWriter) {
    respBytes, err := json.Marshal(i)
    if err != nil {
        fmt.Println(err)
        w.WriteHeader(413)
        w.Write([]byte(`{"status":3}`))
    }

    w.WriteHeader(200)
    w.Write(respBytes)
}

// curl 127.0.0.1:12488/forwardLog -d '{"eventName":"hi","data":"{\"msg\":\"Hello syslog!\"}"}'
func (ss *SysLogServer) ForwardLog(w http.ResponseWriter, r *http.Request) {
    fmt.Printf("%s %s\n", r.Method, r.URL)

    var req ForwardLogRequest

    if ok := ss.parseReq(&req, w, r); !ok {
        return
    }

    cstSh, err := time.LoadLocation("Asia/Shanghai")
    if err != nil {
        fmt.Println(err)
        cstSh = time.FixedZone("CST", 8 * 3600)
    }

    cstTime := time.Now().In(cstSh)
    cstString := cstTime.Format("2006-01-02 15:04:05 -0700")

    msg := fmt.Sprintf("[%s][%s] %s", cstString, req.EventName, req.Data)

    fmt.Println(msg)
    ss.SendLog(msg)

    resp := ForwardLogResponse{
        Result: 0,
    }

    ss.sendResp(resp, w)
}

// curl 127.0.0.1:12488/syslog -d '{"msg":"[2023-01-16 17:42:00 +0800][hi] {\"msg\":\"Hello syslog!\"}"}'
func (ss *SysLogServer) Syslog(w http.ResponseWriter, r *http.Request) {
    fmt.Printf("%s %s\n", r.Method, r.URL)

    var req SyslogRequest

    if ok := ss.parseReq(&req, w, r); !ok {
        return
    }

    msg := req.Msg

    fmt.Println(msg)
    ss.SendLog(msg)

    resp := SyslogResponse{
        Status: 0,
    }

    ss.sendResp(resp, w)
}
