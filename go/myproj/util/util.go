package util

import (
    "time"

    "github.com/shirou/gopsutil/v3/cpu"
    "github.com/shirou/gopsutil/v3/mem"
)

func GetPhysicalCpuCounts() int {
    counts, err := cpu.Counts(false)
    if err != nil {
        return -1
    } else {
        return counts
    }
}

func GetLogicalCpuCounts() int {
    counts, err := cpu.Counts(true)
    if err != nil {
        return -1
    } else {
        return counts
    }
}

func GetCpuUsedPercent() float64 {
    percents, err := cpu.Percent(time.Second, false)
    if err != nil {
        return -1.00
    } else {
        return percents[0]
    }
}

func GetMemUsedPercent() float64 {
    vmstat, err := mem.VirtualMemory()
    if err != nil {
        return -1.00
    } else {
        return vmstat.UsedPercent
    }
}
