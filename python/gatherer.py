import os
import re

def sum(li):
    iSum = 0
    for oValue in li:
        iSum += int(oValue)
    return iSum

def getLines(sFilePath):
    if not os.path.exists(sFilePath):
        return []
    with open(sFilePath, 'r') as oFile:
        return oFile.readlines()

class CPUGatherer:
    def __init__(self):
        self.m_iLastIdle = 0
        self.m_iLastTotal = 0

    def __gather(self):
        lstLine = getLines('/proc/stat')
        for sLine in lstLine:
            if 'cpu ' in sLine:
                sLine = sLine.rstrip('\n')
                lstValue = sLine.split(' ')
                self.m_iIdle = int(lstValue[5])
                self.m_iTotal = sum(lstValue[2:])
                break

    def printCpuUsedPercent(self):
        self.__gather()
        if self.m_iLastIdle == 0:
            self.m_iLastIdle = self.m_iIdle
            self.m_iLastTotal = self.m_iTotal
            return '0.00%'
        iIdleDiff = self.m_iIdle - self.m_iLastIdle
        iTotalDiff = self.m_iTotal - self.m_iLastTotal
        self.m_iLastIdle = self.m_iIdle
        self.m_iLastTotal = self.m_iTotal
        if iTotalDiff == 0:
            return '0.00%'
        fCpuUsedPercent = (iTotalDiff - iIdleDiff) / iTotalDiff
        sResult = '%.2f%%'%(fCpuUsedPercent * 100)
        print(f'CPUGatherer:  {sResult}, ({iTotalDiff} - {iIdleDiff}) / {iTotalDiff}')

class CPUGathererX:
    def __init__(self):
        self.m_iLastIdle = 0
        self.m_iLastBusy = 0

    def __gather(self):
        lstLine = getLines('/proc/stat')
        for sLine in lstLine:
            if 'cpu ' in sLine:
                sLine = sLine.rstrip('\n')
                lstValue = sLine.split(' ')
                self.m_iIdle = int(lstValue[5])
                self.m_iBusy = int(lstValue[2]) + int(lstValue[3]) + int(lstValue[4])
                break

    def printCpuUsedPercent(self):
        self.__gather()
        if self.m_iLastIdle == 0:
            self.m_iLastIdle = self.m_iIdle
            self.m_iLastBusy = self.m_iBusy
            return '0.00%'
        iIdleDiff = self.m_iIdle - self.m_iLastIdle
        iBusyDiff = self.m_iBusy - self.m_iLastBusy
        self.m_iLastIdle = self.m_iIdle
        self.m_iLastBusy = self.m_iBusy
        fCpuUsedPercent = iBusyDiff / (iIdleDiff + iBusyDiff)
        sResult = '%.2f%%'%(fCpuUsedPercent * 100)
        print(f'CPUGathererX: {sResult}, {iBusyDiff} / ({iIdleDiff} + {iBusyDiff})')

def getMemUsedPercent():
    lstLine = getLines('/proc/meminfo')
    for sLine in lstLine:
        oMatch = re.search('\d+', sLine)
        if oMatch != None:
            iValue = int(oMatch.group())
        else:
            iValue = 0
        if sLine.startswith('MemTotal'):
            iMemTotal = iValue
        elif sLine.startswith('MemFree'):
            iMemFree = iValue
        elif sLine.startswith('Cached'):
            iCached = iValue
        elif sLine.startswith('SReclaimable'):
            iSReclaimable = iValue
        elif sLine.startswith('Buffers'):
            iBuffers = iValue
    iMemUsed = iMemTotal - iMemFree - (iCached + iSReclaimable) - iBuffers
    fMemUsedPercent = iMemUsed / iMemTotal
    return '%.2f%%'%(fMemUsedPercent * 100)
