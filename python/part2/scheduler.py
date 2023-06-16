#!/usr/bin/python3

import threading
import time

def sTime():
    oTimeStruct = time.localtime()
    return time.strftime('%Y-%m-%d %H:%M:%S', oTimeStruct)

def test_scheduler():
    print('[test.scheduler]')

    def call1():
        print('%s new1Second'%sTime())

    def call2():
        print('%s new2Second'%sTime())

    def call5():
        print('%s new5Second'%sTime())

    def call10():
        print('%s new10Second'%sTime())

    oScheduler = Scheduler()
    oScheduler.addCall(Scheduler.T_1_SECOND, call1, 'call1')
    oScheduler.addCall(Scheduler.T_2_SECOND, call2, 'call2')
    oScheduler.addCall(Scheduler.T_5_SECOND, call5, 'call5')
    oScheduler.addCall(Scheduler.T_10_SECOND, call10, 'call10')
    oScheduler.newClock()

    return oScheduler

class Scheduler:
    T_1_SECOND  = 1
    T_2_SECOND  = 2
    T_5_SECOND  = 5
    T_10_SECOND = 10
    def __init__(self):
        self.m_Wheels = {
            Scheduler.T_1_SECOND: {},
            Scheduler.T_2_SECOND: {},
            Scheduler.T_5_SECOND: {},
            Scheduler.T_10_SECOND: {}
        }
        self.m_SetFlag = False
        self.m_Duration = 5

    def run(self, iType):
        if iType not in self.m_Wheels:
            return
        oWheel = self.m_Wheels[iType]
        for sFlag in oWheel:
            oFunc = oWheel[sFlag]
            oFunc()

    def addCall(self, iType, oFunctor, sFlag):
        oWheel = self.m_Wheels[iType]
        oWheel[sFlag] = oFunctor

    def delCall(self, iType, sFlag):
        oWheel = self.m_Wheels[iType]
        del oWheel[sFlag]

    def newClock(self):
        oTimeStruct = time.localtime()
        iTimeDiff = 10 - (oTimeStruct[5] % 10)
        print('%s TimeDiff: %d'%(sTime(), iTimeDiff))
        oTimer = threading.Timer(iTimeDiff, self.new1Second)
        oTimer.run()

    def new1Second(self):
        if not self.m_SetFlag:
            self.m_CurrTime = int(time.time())
            self.m_SetFlag = True

        self.run(Scheduler.T_1_SECOND)

        oTimeStruct = time.localtime()
        if oTimeStruct[5] % 2 == 0:
            self.new2Second()
        if oTimeStruct[5] % 5 == 0:
            self.new5Second(oTimeStruct)

        iCurrTime = int(time.time())
        if iCurrTime - self.m_CurrTime < self.m_Duration:
            oTimer = threading.Timer(1, self.new1Second)
            oTimer.run()

    def new2Second(self):
        self.run(Scheduler.T_2_SECOND)

    def new5Second(self, oTimeStruct):
        self.run(Scheduler.T_5_SECOND)

        if oTimeStruct[5] % 10 == 0:
            self.new10Second()

    def new10Second(self):
        self.run(Scheduler.T_10_SECOND)
