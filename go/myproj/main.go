package main

import (
    "fmt"

    "github.com/shirou/gopsutil/v3/mem"
)

func main() {
    vmstat, _ := mem.VirtualMemory()

    usedpercent := vmstat.UsedPercent
    free := vmstat.Free / (1024 * 1024)
    total := vmstat.Total / (1024 * 1024)

    fmt.Printf("UsedPercent: %.2f%%, Free: %dMB, Total: %dMB\n", usedpercent, free, total)
}
