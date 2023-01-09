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

// curl 127.0.0.1:12488/log -d '{"eventName":"hi","data":"{\"msg\":\"Hello syslog!\"}"}'
func (ss *SysLogServer) Syslog(w http.ResponseWriter, r *http.Request) {
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        fmt.Println(err)
        w.WriteHeader(411)
        w.Write([]byte(`{"status":1}`))
        return
    }

    var req SyslogRequest

    if err := json.Unmarshal(body, &req); err != nil {
        fmt.Println(err)
        w.WriteHeader(412)
        w.Write([]byte(`{"status":2}`))
        return
    }

    cstSh, err := time.LoadLocation("Asia/Shanghai")
    if err != nil {
        fmt.Println(err)
        cstSh = time.FixedZone("CST", 8 * 3600)
    }

    cstTime := time.Now().In(cstSh)
    cstString := cstTime.Format("2006-01-02 15:04:05 -0700")

    ss.SendLog(fmt.Sprintf("[%s][%s] %s", cstString, req.EventName, req.Data))

    resp := SyslogResponse{
        Status: 0,
    }

    jsonResp, err := json.Marshal(resp)
    if err != nil {
        fmt.Println(err)
        w.WriteHeader(413)
        w.Write([]byte(`{"status":3}`))
        return
    }

    w.WriteHeader(200)
    w.Write(jsonResp)
}
