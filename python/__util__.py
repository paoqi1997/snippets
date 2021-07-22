from contextlib import contextmanager

import copy

class Student:
    stuID = 0
    def __init__(self, sName: str) -> None:
        self.m_Name = sName
        self.m_ID = self.__id__()

    @classmethod
    def __id__(cls) -> int:
        cls.stuID += 1
        return cls.stuID

    @staticmethod
    def get_name_id(stu) -> str:
        return f'{stu.m_Name}_{stu.m_ID}'

def test_xxxals():
    lstn = list(range(10))
    lstnewn = list(filter(lambda x: x % 2 != 0, lstn))
    print(lstnewn)

    print(f'locals: {locals()}')
    print(f'globals: {globals()}')

def test_copy_dict():
    dInfo = {
        'name': 'mysql',
        'version': '8.0.19'
    }
    print(dInfo)

    dOutput = dInfo
    dOutput['name'] = 'mariadb'
    print(dInfo)

    dOutput = dInfo.copy()
    dOutput['name'] = 'mongodb'
    print(dInfo)

def test_deepcopy_dict():
    dLang = {
        'name': 'C++',
        'os': [ 'windows', 'linux', 'macos' ],
        'std': [ 'C++11', 'C++14', 'C++17', 'C++20' ]
    }
    print(dLang)

    dOutput = copy.copy(dLang)
    dOutput['name'] = 'Rust'
    dOutput['std'].insert(0, 'C++98')
    print(dLang)

    dOutput = copy.deepcopy(dLang)
    dOutput['os'].append('android')
    print(dLang)

@contextmanager
def open_r(filepath: str):
    _ = '-' * 8
    sLine = f'{_} open_r {_}'
    print(sLine)

    try:
        oFile = open(filepath, 'r')
        yield oFile
    except FileNotFoundError:
        print(f'{filepath} not found.')
    finally:
        print(sLine)

        print(f'closed: {oFile.closed}')
        oFile.close()
        print(f'closed: {oFile.closed}')
