package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "log/syslog"
    "net/http"
    "time"
)

type SyslogServer struct {
    svr *http.Server
    cli *syslog.Writer
}

func NewSyslogServer(port int32) *SyslogServer {
    ss := SyslogServer{}

    router := http.NewServeMux()
    router.HandleFunc("/forwardLog", ss.ForwardLog)
    router.HandleFunc("/syslog", ss.Syslog)

    ss.svr = &http.Server{
        Addr: fmt.Sprintf(":%d", port),
        Handler: router,
    }

    return &ss
}

func (ss *SyslogServer) StartSyslog() {
    // https://golang.hotexamples.com/zh/examples/log.syslog/-/Dial/golang-dial-function-examples.html
    cli, err := syslog.Dial("", "", syslog.LOG_INFO, "simplog")
    if err != nil {
        L.Error("%v", err)
    } else {
        ss.cli = cli
    }
}

func (ss *SyslogServer) CloseSyslog() {
    if ss.cli != nil {
        err := ss.cli.Close()
        if err != nil {
            L.Error("%v", err)
        }
    }
}

func (ss *SyslogServer) Run() {
    go ss.StartSyslog()
    defer ss.CloseSyslog()

    if err := ss.svr.ListenAndServe(); err != nil && err != http.ErrServerClosed {
        L.Error("%v", err)
    }
}

// cat /var/log/syslog
func (ss *SyslogServer) SendLog(msg string) {
    err := ss.cli.Info(msg)
    if err != nil {
        L.Error("%v", err)
    }
}

func (ss *SyslogServer) parseReq(i interface{}, w http.ResponseWriter, r *http.Request) bool {
    reqBytes, err := ioutil.ReadAll(r.Body)
    if err != nil {
        L.Error("%v", err)
        w.WriteHeader(411)
        w.Write([]byte(`{"status":1}`))
        return false
    }

    if err := json.Unmarshal(reqBytes, i); err != nil {
        L.Error("%v", err)
        w.WriteHeader(412)
        w.Write([]byte(`{"status":2}`))
        return false
    }

    return true
}

func (ss *SyslogServer) sendResp(i interface{}, w http.ResponseWriter) {
    respBytes, err := json.Marshal(i)
    if err != nil {
        L.Error("%v", err)
        w.WriteHeader(413)
        w.Write([]byte(`{"status":3}`))
        return
    }

    w.WriteHeader(200)
    w.Write(respBytes)
}

// curl 127.0.0.1:12488/forwardLog -d '{"eventName":"hi","data":"{\"msg\":\"Hello syslog!\"}"}'
func (ss *SyslogServer) ForwardLog(w http.ResponseWriter, r *http.Request) {
    L.Info("%s %s", r.Method, r.URL)

    var req ForwardLogRequest

    if ok := ss.parseReq(&req, w, r); !ok {
        return
    }

    cstSh, err := time.LoadLocation("Asia/Shanghai")
    if err != nil {
        L.Error("%v", err)
        cstSh = time.FixedZone("CST", 8 * 3600)
    }

    cstTime := time.Now().In(cstSh)
    cstString := cstTime.Format("2006-01-02 15:04:05 -0700")

    msg := fmt.Sprintf("[%s][%s] %s", cstString, req.EventName, req.Data)

    L.Info(msg)
    ss.SendLog(msg)

    resp := ForwardLogResponse{
        Status: 0,
        Result: 0,
    }

    ss.sendResp(resp, w)
}

// curl 127.0.0.1:12488/syslog -d '{"msg":"[2023-01-16 17:42:00 +0800][hi] {\"msg\":\"Hello syslog!\"}"}'
func (ss *SyslogServer) Syslog(w http.ResponseWriter, r *http.Request) {
    L.Info("%s %s", r.Method, r.URL)

    var req SyslogRequest

    if ok := ss.parseReq(&req, w, r); !ok {
        return
    }

    msg := req.Msg
    if msg == "" {
        L.Warn("msg is empty")
        w.WriteHeader(414)
        w.Write([]byte(`{"status":4}`))
        return
    }

    L.Info(msg)
    ss.SendLog(msg)

    resp := SyslogResponse{
        Status: 0,
    }

    ss.sendResp(resp, w)
}
