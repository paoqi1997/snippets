#!/usr/bin/python3

from functools import partial
from platform import system

import os
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

    print('[py/contextmanager]')

    if system() == 'Windows':
        sFilePath = 'C:\\Windows\\System32\\drivers\\etc\\hosts'
    else:
        sFilePath = os.path.join(sys.path[0], __file__)

    print(sFilePath)

    with ut.open_r(sFilePath) as oFile:
        print(oFile.read())

    print('[py/merge]')

    d1 = {
        1: 2, 2: 4, 3: 6, 'd': {'k1': 'v1', 'k2': 'v2', 'k3': [1, 3, 5, 7, 9]},
        'l': [{'k_': 'v_'}]
    }
    d2 = { 1: 3, 2: 5, 'l': [{'kk': 'vv'}] }

    print(f'd2: {d2}')
    ut.merge(d1, d2)
    print(f'd2: {d2}')

    l1 = { 'list': [ ['v_h', 'v_s'], ['v_n'], ['v_g', 'v_g'] ] }
    l2 = { 'list': [ ['v_r', 'v_s', 'v_c'], ['v_m', 'v_m'] ] }

    print(f'l2: {l2}')
    ut.merge(l1, l2)
    print(f'l2: {l2}')
