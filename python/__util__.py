from collections import OrderedDict
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
    print('[py/(filter and others)]')

    lstn = list(range(10))
    lstnewn = list(filter(lambda x: x % 2 != 0, lstn))
    print(lstnewn)

    print(f'locals: {locals()}')
    print(f'globals: {globals()}')

def test_copy_dict():
    print('[py/copy]')

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
    print('[py/deepcopy]')

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
        oFile = open(filepath, 'r', encoding='utf-8')
        yield oFile
    except FileNotFoundError:
        print(f'{filepath} not found.')
    finally:
        print(sLine)

        print(f'closed: {oFile.closed}')
        oFile.close()
        print(f'closed: {oFile.closed}')

def merge(obj1, obj2):
    if obj1 == None or obj2 == None:
        return

    t_obj1 = type(obj1)
    t_obj2 = type(obj2)

    # obj1 和 obj2 的类型要一致
    if t_obj1 != t_obj2:
        return

    t_list = type([])
    t_dict = type({})
    t_od = type(OrderedDict())

    tt = (t_list, t_dict, t_od)

    if t_obj1 not in tt:
        return
    if t_obj2 not in tt:
        return

    if t_obj1 == t_list:
        for i in range(len(obj1)):
            if i >= len(obj2):
                obj2.append(obj1[i])
                continue

            t_v = type(obj1[i])
            if t_v in tt:
                merge(obj1[i], obj2[i])

    if t_obj1 in (t_dict, t_od):
        for key in obj1:
            if key not in obj2:
                obj2[key] = obj1[key]
                continue

            t_v = type(obj1[key])
            if t_v in tt:
                merge(obj1[key], obj2[key])

def delWith(d: dict, dd: dict):
    t_d = type(d)
    t_dd = type(dd)
    t_dict = type({})

    if t_d != t_dict or t_dd != t_dict:
        return

    lstKey = []

    for key in d:
        if key in dd:
            if type(dd[key]) == t_dict:
                delWith(d[key], dd[key])
            else:
                lstKey.append(key)

    for key in lstKey:
        del d[key]
