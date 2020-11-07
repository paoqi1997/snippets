package main

import (
    "fmt"
    "time"

    "github.com/shirou/gopsutil/v3/cpu"
    "github.com/shirou/gopsutil/v3/mem"
)

func main() {
    CpuUsedPercent, err := cpu.Percent(time.Second, false)
    if err != nil {
        fmt.Println(err)
        return
    }

    vmstat, err := mem.VirtualMemory()
    if err != nil {
        fmt.Println(err)
        return
    }

    MemUsedPercent := vmstat.UsedPercent

    fmt.Printf("cpu: %.2f%%, mem: %.2f%%\n", CpuUsedPercent[0], MemUsedPercent)
}
