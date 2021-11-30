package main

import (
    "fmt"

    "myproj/util"
)

func main() {
    physicalCounts := util.GetPhysicalCpuCounts()
    fmt.Printf("physical count(s): %d\n", physicalCounts)

    logicalCounts := util.GetLogicalCpuCounts()
    fmt.Printf("logical count(s): %d\n", logicalCounts)

    cpuUsedPercent := util.GetCpuUsedPercent()
    memUsedPercent := util.GetMemUsedPercent()

    fmt.Printf("cpu: %.2f%%, mem: %.2f%%\n", cpuUsedPercent, memUsedPercent)
}
