#!/usr/bin/python3

import platform
import time

import gatherer

if __name__ == '__main__':
    sType = platform.system()
    if sType != 'Linux':
        print(f'Can not run on {sType}.')
        exit(1)

    oCPUGatherer = gatherer.CPUGatherer()
    oCPUGathererX = gatherer.CPUGathererX()

    for _ in range(10):
        oCPUGatherer.printCpuUsedPercent()
        oCPUGathererX.printCpuUsedPercent()
        print(f'{gatherer.getMemUsedPercent()}')
        time.sleep(1)
