#!/usr/bin/python3

from functools import partial

import sys

import __util__ as ut

if __name__ == '__main__':
    print('[py/(filter and others)]')

    ut.test_xxxals()

    print('[py/(hasattr and getattr)]')

    if hasattr(sys, 'platform'):
        print('sys.platform=%s'%getattr(sys, 'platform'))

    print('[py/format]')

    print('{0} {2} {0}{1}'.format('Java', 'Script', '&'))

    print('[py/(classmethod and staticmethod)]')

    stu1 = ut.Student('paoqi')
    print(f'id: {stu1.m_ID}, name: {stu1.m_Name}')
    print(f'name_id: {ut.Student.get_name_id(stu1)}')

    stu2 = ut.Student('kuikui')
    print(f'id: {stu2.m_ID}, name: {stu2.m_Name}')
    print(f'name_id: {ut.Student.get_name_id(stu2)}')

    print('[py/copy]')

    ut.test_copy_dict()

    print('[py/deepcopy]')

    ut.test_deepcopy_dict()

    print('[py/partial]')

    _pow2 = lambda base, exp: pow(base, exp)
    pow2 = partial(_pow2, exp=2)
    print(pow2(3))
