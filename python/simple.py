#!/usr/bin/python3

import sys

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
