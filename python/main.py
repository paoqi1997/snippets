#!/usr/bin/python3

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
    for _ in range(10):
        oLooper.addTask(util.test(2))
    oLooper.run()
