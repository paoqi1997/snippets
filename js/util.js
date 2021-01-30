'use strict';

exports.test_list = function() {
    console.log('[js/list]');

    const li = [];
    li.push(1, 2, 3);

    for (let i = 0; i < li.length; ++i) {
        console.log(`li[${i}]=${li[i]}`);
    }

    li.pop();
    console.log(li);
}

exports.test_array = function() {
    console.log('[js/array]');

    const arrobj = new Array;
    arrobj.push(1, 2, 3);

    for (const pair of arrobj.entries()) {
        console.log(`arrobj[${pair[0]}]=${pair[1]}`);
    }

    console.log(arrobj.slice(0, 2));

    arrobj.splice(1, 1);
    console.log(arrobj);
}

/**
 * 对传入的 Map 对象进行排序
 * @param {Map} mapobj Map对象
 */
exports.sortMap = function(mapobj) {
    let keys = [...mapobj.keys()];
    keys.sort();

    let sortedMapObj = new Map;
    keys.forEach(key => {
        sortedMapObj.set(key, mapobj.get(key));
    });

    mapobj.clear();
    keys.forEach(key => {
        mapobj.set(key, sortedMapObj.get(key));
    });
}

/**
 * 根据传入的 Map 对象返回一个新的已排序的 Map 对象
 * @param {Map} mapobj Map对象
 * @return {Map} 已排序的 Map 对象
 */
exports.sortedMap = function(mapobj) {
    const arrayobj = Array.from(mapobj).sort();
    return new Map(arrayobj.map( kv => [kv[0], kv[1]] ));
}

exports.test_dict = function() {
    console.log('[js/dict]');

    let dInfo = {};
    dInfo['name'] = 'mysql';
    dInfo['version'] = '8.0.19';

    let iSize = 0;

    for (const sKey in dInfo) {
        ++iSize;
        console.log(`dInfo[${sKey}]=${dInfo[sKey]}`);
    }
    console.log(`size: ${iSize}`);
}

exports.test_map = function() {
    console.log('[js/map]');

    let mapobj = new Map;
    mapobj.set('name', 'redis');
    mapobj.set('version', '5.0.7');

    for (const kv of mapobj.entries()) {
        console.log(`mapobj[${kv[0]}]=${kv[1]}`);
    }
    console.log(`size: ${mapobj.size}`);

    for (const [sKey, sValue] of mapobj) {
        console.log(`mapobj[${sKey}]=${sValue}`);
    }

    mapobj.forEach((sValue, sKey, self) => {
        self.set(`${sKey}`, `_${sValue}`);
    });
    console.log([...mapobj.values()]);
}

/**
 * 不足10的补零
 * @param {number} iNum number对象
 * @return {string} 补零后的字符串 or 无须补零的字符串
 */
function zeroFill(iNum) {
    return iNum < 10 ? `0${iNum}` : `${iNum}`;
}

/**
 * 根据给定的 Date 对象返回形如 yyyy-MM-dd HH:mm:ss 的字符串
 * @param {Date} dateobj Date对象
 * @return {string} 既定格式的时间文本
 */
exports.getTimeString = dateobj => {
    const oDate = dateobj || new Date;

    const iYear = oDate.getFullYear();
    const iMonth = oDate.getMonth() + 1;
    const iDay = oDate.getDate();
    const iHour = oDate.getHours();
    const iMinute = oDate.getMinutes();
    const iSecond = oDate.getSeconds();

    const sMonth = zeroFill(iMonth);
    const sDay = zeroFill(iDay);
    const sHour = zeroFill(iHour);
    const sMinute = zeroFill(iMinute);
    const sSecond = zeroFill(iSecond);

    return `${iYear}-${sMonth}-${sDay} ${sHour}:${sMinute}:${sSecond}`;
}

exports.getPromise = () => {
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            const n = Math.ceil(Math.random() * 10);
            if (n % 2 == 0) {
                resolve(n);
            } else {
                reject(`${n} is not even.`);
            }
        }, 1000);
    });
    return p;
}

exports.gen = function* foo(x) {
    const y1 = 2 * (yield x + 1);
    console.log(`y1: ${y1}`); // 4
    const y2 = yield 3 * y1;
    console.log(`y2: ${y2}`); // 3
    return x + y1 + y2;
}

exports.sum = () => {
    let iSum = 0;
    return n => {
        iSum += n;
        return iSum;
    };
}
