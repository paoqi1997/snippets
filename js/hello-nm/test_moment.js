'use strict';

const m = require('moment');

const fmt  = 'YYYY-MM-DD HH:mm:ss';
const fmt2 = 'YYYY-MM-DD';

function Int10() {
    return m().unix();
}

function Int13() {
    return m().valueOf();
}

function Int13ToStr(timestamp) {
    return m(timestamp).format(fmt);
}

function StrToInt13(s) {
    return m(s, fmt).valueOf();
}

/**
 * 计算从开始时间到今天是第几天
 * @param {string} startTime 开始时间
 * @param {number} n 开始时间作为第 n 天
 * @returns 第几天
 */
function dayN(startTime, n) {
    n = n || 1;
    return m().diff(m(startTime, fmt2), 'days') + n;
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
