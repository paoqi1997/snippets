#!/usr/bin/python3

from pympler import (
    muppy,
    summary
)

import os
import platform
import subprocess
import sys

import scheduler

import objgraph

def test_os_system(sType: str):
    print('[os.system]')

    sCmd = 'kvm'
    iStatus = os.system(sCmd)
    if sType == 'Linux':
        iStatus >>= 8

    print(f'cmd: {sCmd}, status: {iStatus}')

def test_popen(sType: str):
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

def test_objgraph(obj):
    print('[test.objgraph]')

    # dot -Tpng objgraph.dot -o objgraph.png
    sDotFilePath = os.path.join(sys.path[0], 'objgraph.dot')
    with open(sDotFilePath, 'w') as oDotFile:
        objgraph.show_refs(obj, output=oDotFile)

def test_pympler():
    print('[test.pympler]')

    allObjs = muppy.get_objects()
    sumObjs = summary.summarize(allObjs)
    summary.print_(sumObjs)

if __name__ == '__main__':
    sType = platform.system()

    test_os_system(sType)
    test_popen(sType)

    oScheduler = scheduler.test_scheduler()

    test_objgraph(oScheduler)
    test_pympler()
