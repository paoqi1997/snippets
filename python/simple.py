#!/usr/bin/python3

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
