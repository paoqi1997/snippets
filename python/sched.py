#!/usr/bin/python3

import os
import platform
import subprocess

import scheduler

if __name__ == '__main__':
    sType = platform.system()

    print('[os.system]')
    sCmd = 'kvm'
    iStatus = os.system(sCmd)
    if sType == 'Linux':
        iStatus >>= 8
    print(f'cmd: {sCmd}, status: {iStatus}')

    print('[os.popen]')
    dCmd = {
        'Windows': 'VER',
        'Linux': 'hostname -I'
    }
    sCmd = dCmd[sType]
    with os.popen(sCmd) as oPipe:
        sResult = oPipe.read()
        print(sResult)

    print('[subprocess.Popen]')
    p = subprocess.Popen(args=sCmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    byOut, byErr = p.communicate()
    print(f'stdout: {byOut}, stderr: {byErr}')

    print('[test.scheduler]')
    scheduler.test_scheduler()
