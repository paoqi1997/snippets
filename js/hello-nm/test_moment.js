'use strict';

const m = require('moment');

const FMT_YMD_Hms = 'YYYY-MM-DD HH:mm:ss';
const FMT_YMD     = 'YYYY-MM-DD';

function Int10() {
    return m().unix();
}

function Int13() {
    return m().valueOf();
}

function Int13ToStr(timestamp) {
    return m(timestamp).format(FMT_YMD_Hms);
}

function StrToInt13(s) {
    return m(s, FMT_YMD_Hms).valueOf();
}

/**
 * 给定时间是否不早于当天指定时分秒的时间
 * @param {number} timestamp 时间戳
 * @param {string} Hms 时分秒
 * @returns {boolean} 比较结果
 */
function laterThan(timestamp, Hms) {
    const YMD = m(timestamp).format(FMT_YMD);
    const ts = m(`${YMD} ${Hms}`, FMT_YMD_Hms).valueOf();
    return timestamp >= ts;
}

/**
 * 以每天零点为分界线，计算从开始时间到今天是第几天
 * @param {string} startTime 开始时间
 * @param {number} n 开始时间作为第 n 天
 * @returns {number} 第几天
 */
function dayN(startTime, n) {
    n = n === undefined ? 1 : n;
    return m().diff(m(startTime, FMT_YMD), 'days') + n;
}

/**
 * 以每天指定时分秒为分界线，计算从开始时间到今天是第几天
 * @param {number} startTime 开始时间
 * @param {string} Hms 时分秒
 * @param {number} n 开始时间作为第 n 天
 * @returns {number} 第几天
 */
function dayN_Hms(startTime, Hms, n) {
    let ans = 0;

    if (!laterThan(startTime, Hms)) {
        ans += 1;
    }

    const YMD = m(startTime).format(FMT_YMD);

    ans += dayN(YMD, 0) + n;

    if (!laterThan(Int13(), Hms)) {
        ans -= 1;
    }

    return ans;
}

let v = Int10();
console.log(v);

v = Int13();
console.log(v);

v = Int13ToStr(v);
console.log(v);

v = StrToInt13(v);
console.log(v);

console.log(dayN('2021-10-01'));
console.log(dayN('2021-10-01', 3));

v = StrToInt13('2021-10-07 04:59:59');
console.log(dayN_Hms(v, '05:00:00', 0));

v = StrToInt13('2021-10-07 05:59:59');
console.log(dayN_Hms(v, '05:00:00', 0));