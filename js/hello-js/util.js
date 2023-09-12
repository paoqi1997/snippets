'use strict';

function getUnit(unit) {
    return `>>> TEST$${unit}`;
}

function printUnit(unit) {
    console.log(getUnit(unit));
}

exports.getUnit = getUnit;
exports.printUnit = printUnit;

exports.test_list = function() {
    printUnit('list/push+pop');

    const li = [];
    li.push(1, 2, 3);

    for (let i = 0; i < li.length; ++i) {
        console.log(`li[${i}]=${li[i]}`);
    }

    li.pop();
    console.log(li);

    printUnit('list/sort+map');

    const l1 = [{ seq: 1, c: 'a' }, { seq: 3, c: 'c' }, { seq: 2, c: 'b' }];
    const l2 = l1.sort((x, y) => x.seq - y.seq);

    console.log(l1);
    console.log(l2);

    const cc = l1.map((x) => x.c);
    console.log(cc);

    printUnit('list/filter');

    const filteredCC = cc.filter((c) => c !== 'c');
    console.log(filteredCC);
    console.log(cc);
}

exports.test_array = function() {
    printUnit('array');

    const arrobj = Array();
    arrobj.push(1, 2, 3);

    for (const pair of arrobj.entries()) {
        console.log(`arrobj[${pair[0]}]=${pair[1]}`);
    }

    console.log(arrobj.slice(0, 2));

    arrobj.splice(1, 1);
    console.log(arrobj);
}

exports.test_dict = function() {
    printUnit('dict');

    let dInfo = {};
    dInfo['name'] = 'mysql';
    dInfo['version'] = '8.0.19';

    let iSize = 0;

    for (const sKey in dInfo) {
        ++iSize;
        console.log(`dInfo[${sKey}]=${dInfo[sKey]}`);
    }
    console.log(`size: ${iSize}`);

    const o = { a: 1 };

    try {
        o.a = 1;
        Object.freeze(o);
        o.a = 1;
    } catch (e) {
        console.error(`${e}`);
    }
}

exports.test_map = function() {
    printUnit('map');

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
        const n = Math.ceil(Math.random() * 10);
        if (n % 2 == 0) {
            resolve(n);
        } else {
            reject(`${n} is not even.`);
        }
    });
    return p;
}

exports.F = async unit => {
    const value = await exports.getPromise();
    console.log(`${unit}\nValue_(2): ${value}`);
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

/**
 * 获取 RegExp.test 的调用封装
 * @param {RegExp} reobj RegExp对象
 * @return 调用封装
 */
exports.curryingCheck = reobj => {
    /** @param {string} text 文本对象 */
    return text => {
        return reobj.test(text);
    };
}

/**
 * 将 obj1 合并到 obj2 中
 * @param {Object} obj1 Object对象
 * @param {Object} obj2 Object对象
 */
exports.merge = (obj1, obj2) => {
    if (typeof obj1 !== 'object' || obj1 === null) {
        return;
    }
    if (typeof obj2 !== 'object' || obj2 === null) {
        return;
    }

    for (const key in obj1) {
        if (!(key in obj2)) {
            obj2[key] = obj1[key];
            continue;
        }

        if (typeof obj1[key] === 'object') {
            this.merge(obj1[key], obj2[key]);
        }
    }
}

/**
 * 根据 dd 将 d 中的键删除
 * @param {Object} d 被执行删除操作的对象
 * @param {Object} dd 参考对象
 */
exports.delWith = (d, dd) => {
    if (typeof d !== 'object' || d === null) {
        return;
    }
    if (typeof dd !== 'object' || dd === null) {
        return;
    }

    const li = [];

    for (const key in d) {
        if (key in dd) {
            if (typeof dd[key] === 'object') {
                this.delWith(d[key], dd[key]);
            } else {
                li.push(key);
            }
        }
    }

    for (let i = 0; i < li.length; ++i) {
        delete d[li[i]];
    }
}

/**
 * 判断对象类型是否与给定类型一致
 * @param {Object} obj Object对象
 * @param {string} type 类型
 * @return 判断结果
 */
exports.is_type = (() => {
    const getType = obj => {
        // for example: "[object String]"
        const type = Object.prototype.toString.call(obj);
        // 0: "object String]"
        // 1: "String"
        return /object\s(.*)]/.exec(type)[1];
    };

    const isType = (obj, sType) => {
        const sType_ = getType(obj);
        console.log(`[internal] ${sType_}`);
        return sType_.toLowerCase() === sType;
    };

    return isType;
})();

exports.deepcopy = obj => {
    if (typeof obj !== 'object' || obj === null) {
        return;
    }

    const res = this.is_type(obj, 'array') ? [] : {};

    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            this.deepcopy(obj[key]);
        }

        res[key] = obj[key];
    }

    return res;
}

class Exception {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}

class NotFoundException extends Exception {
    constructor() {
        super(404, 'Not Found');
    }
}

exports.test_exception = () => {
    printUnit('exception');

    try {
        throw new NotFoundException();
    } catch (e) {
        if (e instanceof NotFoundException) {
            console.error(e.code, e.message);
        }
    }
}

String.prototype.hashCode = function() {
    let hash = 0;

    for (let i = 0; i < this.length; ++i) {
        const ord = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + ord;
        hash |= 0; // Convert to 32bit integer
    }

    return Math.abs(hash);
}

exports.test_hashCode = () => {
    printUnit('hashCode');

    const s = 'a8a43e0d-7e29-4fff-88bc-16d2cf8bfba6';
    const hc = s.hashCode();

    console.log(hc);
    console.log(hc % 10);
}

exports.test_matchRoute = () => {
    printUnit('matchRoute');

    const route = '/gm';
    const regex = RegExp(`^${route}($|[?]{1})`);

    console.log(regex);
    console.log(regex.test('/g'));       // false
    console.log(regex.test('/gm'));      // true
    console.log(regex.test('/gm?'));     // true
    console.log(regex.test('/gm?cmd=')); // true
    console.log(regex.test('/gmcheat')); // false
}

exports.test_removeSpaces = () => {
    printUnit('removeSpaces');

    const s = 'abc, xyz, 123';
    console.log(s.replace(/\s/g, '').split(','));
}

/**
 * 解析区间
 * @param {string} section 区间
 * @returns 最高和最低排名要求
 */
function analySection(section) {
    const result = { highestRank: 0, lowestRank: 0 };

    try {
        const rankLevel = Number(section);
        result.highestRank = rankLevel;
    } catch (e) {}

    const IsNaN = Number.isNaN(result.highestRank);

    if (result.highestRank !== 0 && !IsNaN) {
        result.lowestRank = result.highestRank;
        return result;
    }

    if (IsNaN) {
        result.highestRank = 0;
    }

    try {
        const rankLevel = section.replace(/\s+/g, '');

        const leftParenthesis = rankLevel[0] === '(';
        const rightParenthesis = rankLevel[rankLevel.length - 1] === ')';
        const leftSquareBracket = rankLevel[0] === '[';
        const rightSquareBracket = rankLevel[rankLevel.length - 1] === ']';

        const idx = rankLevel.indexOf(',');

        // 左方/圆括号的另一边
        // (xxx | [xxx,
        const leftAnotherSide = idx === -1 ? rankLevel.length : idx;

        // 右方/圆括号的另一边
        // xxx) | ,xxx]
        const rightAnotherSide = idx === -1 ? 0 : idx + 1;

        if (leftSquareBracket) {
            result.highestRank = Number(rankLevel.slice(1, leftAnotherSide));
        }
        if (rightSquareBracket) {
            result.lowestRank = Number(rankLevel.slice(rightAnotherSide, rankLevel.length - 1));
        }
        if (leftParenthesis) {
            result.highestRank = Number(rankLevel.slice(1, leftAnotherSide)) + 1;
        }
        if (rightParenthesis) {
            result.lowestRank = Number(rankLevel.slice(rightAnotherSide, rankLevel.length - 1)) - 1;
        }
    } catch (e) {}

    if (result.highestRank === 0) {
        result.highestRank = 1;
    }
    if (result.lowestRank === 0) {
        result.lowestRank = 100000;
    }

    return result;
}

exports.test_matchSection = () => {
    printUnit('matchSection');

    console.log(analySection('1'));
    console.log(analySection('(3,100]'));
    console.log(analySection('[4,100]'));
    console.log(analySection('[4,101)'));
    console.log(analySection('(100'));
    console.log(analySection('200)'));
}
