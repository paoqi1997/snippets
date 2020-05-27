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
            print('[%s] call %s()'%(level, func.__name__))
            func(*args, **kwargs)
        return inner
    return wrapper

class Object:
    def __init__(self):
        print('Object::Object()')
        self.m_BaseName = Object.__name__

class Player(Object):
    def __init__(self, nID: int):
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
