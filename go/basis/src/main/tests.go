package main

import (
    "fmt"
    "time"
    "util"
)

func UNIT(unitName string) {
    fmt.Println(fmt.Sprintf(">>> TEST$%s", unitName))
}

func TEST_Platform() {
    UNIT("Platform")

    os, arch := util.Platform()
    switch {
    case arch == "amd64":
        fmt.Printf("%s-x64\n", os)
    case arch == "386":
        fmt.Printf("%s-x86\n", os)
    default:
        fmt.Printf("%s-%s\n", os, arch)
    }
}

func TEST_Random() {
    UNIT("Random")

    util.SetSeed()
    var res int = util.Random(100)
    defer fmt.Printf("Your number: %d\n", res)
}

func TEST_slice() {
    UNIT("slice")

    m := [6]int{1, 2, 3, 4, 5, 6}
    slice1, slice2 := m[:3], m[3:]
    fmt.Println(len(slice1), cap(slice1), slice1)
    fmt.Println(len(slice2), cap(slice2), slice2)
 
    slice := make([]int, 3, 4)
    fmt.Println(len(slice), cap(slice), slice)

    slice = append(slice, 6)
    fmt.Println(len(slice), cap(slice), slice)

    fn := util.Sum()
    for i := 0; i < len(m); i++ {
        fmt.Printf("%d ", fn(m[i]))
    }

    fmt.Println()
}

func TEST_map() {
    UNIT("map")

    pollers := map[string]string {
        "windows": "iocp", "linux": "epoll",
    }
    for os, poller := range pollers {
        fmt.Printf("%s: %s\n", os, poller)
    }

    delete(pollers, "windows")
    fmt.Println(pollers)
}

func TEST_struct_Engine() {
    UNIT("struct_Engine")

    engine := util.Engine{"Unity"}
    fmt.Printf("%s\n", engine.GetName())
    engine.SetName("Unreal")
    fmt.Printf("%s\n", engine.GetName())

    var obj util.Obj
    obj = &engine
    obj.SetName("CryEngine")
    fmt.Printf("%s\n", engine.GetName())

    switch val := obj.(type) {
    case *util.Engine:
        fmt.Printf("[succ] Type: %T\n", val)
    default:
        fmt.Printf("[fail] Type: %T\n", val)
    }
}

func TEST_Timer() {
    UNIT("Timer")

    done := false
    ch := make(chan interface{})

    ticker := time.NewTicker(1 * time.Second)
    starttime := time.Now()

    fmt.Println(starttime.Format("2006-01-02 15:04:05"))

    go func() {
        defer ticker.Stop()
        for {
            select {
            case currtime := <-ticker.C:
                if currtime.Unix() - starttime.Unix() >= 3 {
                    fmt.Println(currtime.Format("2006-01-02 15:04:05"))
                    close(ch)
                }
            case <-ch:
                fmt.Println("Bye!")
                done = true
                return
            }
        }
    }()

    for !done {
        time.Sleep(1 * time.Second)
    }
}
