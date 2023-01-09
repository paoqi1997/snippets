package main

func main() {
    ss := NewSysLogServer(12488)
    ss.Run()
}
