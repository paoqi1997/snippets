#!/usr/bin/python3

import os
import sys

import util

if __name__ == '__main__':
    sumFunc = util.sum()
    box = [1, 2, 3, 4, 5, 6]
    for val in box:
        print(sumFunc(val), end=' ')
    print()

    oPlayer = util.Player(1024)
    oPlayer.signin()
    oPlayer.buyItem(64)
    print(oPlayer.getBaseName())

    # lambda返回的值作为该元素的权值，sort将按照权值大小进行排序
    # 奇数为False，偶数为True，故奇数在前
    print(sorted(box, key=lambda x: x % 2 == 0))

    util.foo(1, 2, x=3, y='4', z=[])
    util.foo(*(1, 2), **{'x': 3, 'y': '4', 'z': []})

    print(util.getLocalIP())

    oIniConfig = util.IniConfig()
    sFilePath = os.path.join(sys.path[0], 'config.ini')
    oIniConfig.read(sFilePath)

    oIniConfig.set('net', 'ip', '220.181.38.148')
    with open(sFilePath, 'w') as oFile:
        oIniConfig.write(oFile)

    x, y = 2, 4
    z = eval('x + y')
    print(f'result(eval): {z}')

    sObj = repr({1: 2, 3: 4})
    print(f'result(repr): {sObj}')

    print(f'cpu(s): {os.cpu_count()}')

    s_utf8_content = '未曾设想的道路'
    print(s_utf8_content)

    by_utf8_content = s_utf8_content.encode('utf-8') # unicode -> utf-8
    by_gbk_content = s_utf8_content.encode('gbk')    # unicode -> gbk

    print(by_utf8_content)
    print(by_gbk_content)

    s_gbk_content = by_gbk_content.decode('gbk')    # gbk -> unicode
    print(s_gbk_content)

    by_utf8_content = s_gbk_content.encode('utf-8') # unicode -> utf-8
    by_gbk_content = s_gbk_content.encode('gbk')    # unicode -> gbk

    print(by_utf8_content)
    print(by_gbk_content)

    dInfo = {
        'name': 'mysql',
        'version': '8.0.19'
    }
    for kv in zip(dInfo.keys(), dInfo.values()):
        print('{}: {}'.format(kv[0], kv[1]))

    lstDBName = ['mariadb', 'mongodb', 'mysql', 'redis']
    for idx, element in enumerate(lstDBName):
        print('lstDBName[%d]=%s'%(idx, element))

    print(['%s-x86_64'%name for name in lstDBName])

    oLooper = util.Looper()
    oFuture = oLooper.runTask(util.isValid())
    if oFuture.result():
        for _ in range(10):
            oLooper.addTask(util.test(2))
        oLooper.run()
