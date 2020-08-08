import asyncio
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

def sTime():
    fTime = time.time()
    group = time.localtime(fTime)
    return time.strftime('%Y-%m-%d %H:%M:%S', group)

async def __test(iDelay):
    await asyncio.sleep(iDelay)

async def test(iDelay):
    await __test(iDelay)

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
        print(sTime())
        self.m_Looper.run_until_complete(
            asyncio.wait(self.m_Tasks)
        )
        print(sTime())
