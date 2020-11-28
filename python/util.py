import asyncio
import configparser
import socket
import time

def sum():
    iSum = 0
    def inner(n):
        nonlocal iSum
        iSum += n
        return iSum
    return inner

def debug(func):
    def inner(*args, **kwargs):
        print('[DEBUG] call %s()'%func.__name__)
        func(*args, **kwargs)
    return inner

def log(level):
    def wrapper(func):
        def inner(*args, **kwargs):
            print('[%-5s] call %s()'%(level, func.__name__))
            func(*args, **kwargs)
        return inner
    return wrapper

class Object:
    def __init__(self) -> None:
        print('Object::Object()')
        self.m_BaseName = Object.__name__

class Player(Object):
    def __init__(self, nID: int) -> None:
        super().__init__()
        print('Player::Player(%d)'%nID)
        self.m_ID = nID

    def getBaseName(self) -> str:
        return self.m_BaseName

    @debug
    def signin(self) -> None:
        print('Player %d sign in.'%self.m_ID)

    @log(level='INFO')
    def buyItem(self, nItemID: int, iCount: int=2) -> None:
        if iCount == 1:
            print('Player %d buy %d item(%d).'%(self.m_ID, iCount, nItemID))
        else:
            print('Player %d buy %d items(%d).'%(self.m_ID, iCount, nItemID))

def getLocalIP() -> str:
    """获取本机IP"""
    sIP = socket.gethostbyname(socket.gethostname())
    try:
        # 创建一个UDP包，将本机IP放入UDP协议头中，然后从包中获取本机IP
        oSocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        oSocket.connect(('8.8.8.8', 80))
        sIP = oSocket.getsockname()[0]
    finally:
        oSocket.close()
    return sIP

class IniConfig(configparser.ConfigParser):
    def optionxform(self, optionstr: str) -> str:
        # 不自动转化为小写
        return optionstr

    def write(self, fp, space_around_delimiters: bool=False) -> None:
        # 等号两边不添加空格
        super().write(fp, space_around_delimiters)

def sTime():
    oTimeStruct = time.localtime()
    return time.strftime('%Y-%m-%d %H:%M:%S', oTimeStruct)

async def __test(iDelay):
    await asyncio.sleep(iDelay)

async def test(iDelay):
    await __test(iDelay)

async def isValid():
    await asyncio.sleep(1)
    return True

class Looper:
    def __init__(self):
        self.m_Looper = asyncio.get_event_loop()
        self.m_Tasks = []

    def __del__(self):
        print('Looper::~Looper')
        self.m_Looper.close()

    def addTask(self, co):
        self.m_Tasks.append(co)

    def run(self):
        print('%s run::Begin'%sTime())
        self.m_Looper.run_until_complete(
            asyncio.wait(self.m_Tasks)
        )
        print('%s run::End'%sTime())

    def runTask(self, co):
        oFuture = asyncio.ensure_future(co)
        print('%s runTask::Begin'%sTime())
        self.m_Looper.run_until_complete(
            asyncio.wait([oFuture])
        )
        print('%s runTask::End'%sTime())
        return oFuture
