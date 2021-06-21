#!/usr/bin/python3

from functools import partial

import copy
import sys

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

if __name__ == '__main__':
    test_xxxals()

    if hasattr(sys, 'platform'):
        print('sys.platform=%s'%getattr(sys, 'platform'))

    print('{0} {2} {0}{1}'.format('Java', 'Script', '&'))

    stu1 = Student('paoqi')
    print(f'id: {stu1.m_ID}, name: {stu1.m_Name}')
    print(f'name_id: {Student.get_name_id(stu1)}')

    stu2 = Student('kuikui')
    print(f'id: {stu2.m_ID}, name: {stu2.m_Name}')
    print(f'name_id: {Student.get_name_id(stu2)}')

    test_copy_dict()
    test_deepcopy_dict()

    _pow2 = lambda base, exp: pow(base, exp)
    pow2 = partial(_pow2, exp=2)
    print(pow2(3))
