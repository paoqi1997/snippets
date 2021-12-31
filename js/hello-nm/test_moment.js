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
    return m(s).valueOf();
}

/**
 * 给定时间是否不早于当天指定时分秒的时间
 * @param {number} timestamp 时间戳
 * @param {string} Hms 时分秒
 * @returns {boolean} 比较结果
 */
function laterThan(timestamp, Hms) {
    const YMD = m(timestamp).format(FMT_YMD);
    const ts = m(`${YMD} ${Hms}`).valueOf();
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
    return m().diff(m(startTime), 'days') + n;
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

/**
 * 现在距离目标时间还剩多少天
 * @param {string} targetTime 目标时间
 * @returns 剩余天数
 */
function days_left(targetTime) {
    const YMD = m().format(FMT_YMD);
    const m1 = m(YMD);
    const m2 = m(targetTime);
    return m2.diff(m1, 'days');
}

function TEST_Transform() {
    console.log('[TEST_Transform]');

    let v = Int10();
    console.log(v);

    v = Int13();
    console.log(v);

    v = Int13ToStr(v);
    console.log(v);

    v = StrToInt13(v);
    console.log(v);
}

function TEST_DayN() {
    console.log('[TEST_DayN]');

    console.log(dayN('2021-10-01'));
    console.log(dayN('2021-10-01', 3));

    console.log(dayN('1949-10-01'));

    let v = StrToInt13('2021-10-07 04:59:59');
    console.log(dayN_Hms(v, '05:00:00', 0));

    v = StrToInt13('2021-10-07 05:00:00');
    console.log(dayN_Hms(v, '05:00:00', 0));

    console.log(days_left('2022-09-01'));
}

function TEST_Days() {
    console.log('[TEST_Days]');

    console.log(`Last Monday: ${m().days(1 - 7).format(FMT_YMD_Hms)}`);
    console.log(`Last Sunday: ${m().days(7 - 7).format(FMT_YMD_Hms)}`);

    console.log(`This Monday: ${m().days(1).format(FMT_YMD_Hms)}`);
    console.log(`This Sunday: ${m().days(7).format(FMT_YMD_Hms)}`);

    console.log(`Next Monday: ${m().days(1 + 7).format(FMT_YMD_Hms)}`);
    console.log(`Next Sunday: ${m().days(7 + 7).format(FMT_YMD_Hms)}`);
}

function TESTS() {
    TEST_Transform();
    TEST_DayN();
    TEST_Days();
}

TESTS();
