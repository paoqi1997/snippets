#!/usr/bin/python3

import os
import sys

import util

def test_closure_lambda():
    print('[py/closure]')

    sumFunc = util.sum()
    box = [1, 2, 3, 4, 5, 6]
    for val in box:
        print(sumFunc(val), end=' ')
    print()

    print('[py/lambda]')

    # lambda返回的值作为该元素的权值，sort将按照权值大小进行排序
    # 奇数为False，偶数为True，故奇数在前
    print(sorted(box, key=lambda x: x % 2 == 0))

def test_decorator():
    print('[py/decorator]')

    oPlayer = util.Player(1024)
    oPlayer.signin()
    oPlayer.buyItem(64)
    print(oPlayer.getBaseName())

def test_args_and_kwargs():
    print('[py/(*args and **kwargs)]')

    util.foo(1, 2, x=3, y='4', z=[])
    util.foo(*(1, 2), **{'x': 3, 'y': '4', 'z': []})

def test_getLocalIP():
    print('[py/getLocalIP]')

    print(util.getLocalIP())

    oIniConfig = util.IniConfig()
    oFilePathFn = lambda name: os.path.join(sys.path[0], f'{name}.ini')

    sInputPath = oFilePathFn('config')
    oIniConfig.read(sInputPath)

    oIniConfig.set('net', 'ip', '220.181.38.148')
    sOutputPath = oFilePathFn('output')

    with open(sOutputPath, 'w') as oFile:
        oIniConfig.write(oFile)

def test_eval_and_repr():
    print('[py/(eval and repr)]')

    x, y = 2, 4
    z = eval('x + y')
    print(f'result(eval): {z}')

    sObj = repr({ 1: x, 3: y })
    print(f'result(repr): {sObj}')

def test_cpu_count():
    print('[py/cpu_count]')

    print(f'cpu(s): {os.cpu_count()}')

def test_encode_and_decode():
    print('[py/(encode/decode)]')

    s_utf8_content = '未曾设想的道路'
    print(s_utf8_content)

    by_utf8_content = s_utf8_content.encode('utf-8') # unicode -> utf-8
    by_gbk_content = s_utf8_content.encode('gbk')    # unicode -> gbk

    print(by_utf8_content)
    print(by_gbk_content)

    s_gbk_content = by_gbk_content.decode('gbk')     # gbk -> unicode
    print(s_gbk_content)

    by_utf8_content = s_gbk_content.encode('utf-8')  # unicode -> utf-8
    by_gbk_content = s_gbk_content.encode('gbk')     # unicode -> gbk

    print(by_utf8_content)
    print(by_gbk_content)

def test_zip():
    print('[py/zip]')

    dInfo = {
        'name': 'mysql',
        'version': '8.0.19'
    }
    for kv in zip(dInfo.keys(), dInfo.values()):
        print('{}: {}'.format(kv[0], kv[1]))

def test_enumerate():
    print('[py/enumerate]')

    lstDBName = ['mariadb', 'mongodb', 'mysql', 'redis']
    for idx, element in enumerate(lstDBName):
        print('lstDBName[%d]=%s'%(idx, element))

    print(['%s-x86_64'%name for name in lstDBName])

def test_asyncio():
    print('[py/asyncio]')

    oLooper = util.Looper()
    oFuture = oLooper.runTask(util.isValid())
    if oFuture.result():
        for _ in range(10):
            oLooper.addTask(util.test(2))
        oLooper.run()

if __name__ == '__main__':
    test_closure_lambda()
    test_decorator()
    test_args_and_kwargs()

    test_getLocalIP()
    test_eval_and_repr()
    test_cpu_count()
    test_encode_and_decode()

    test_zip()
    test_enumerate()

    test_asyncio()
