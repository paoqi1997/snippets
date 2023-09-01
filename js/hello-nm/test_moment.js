'use strict';

/**
 * old: http://momentjs.cn
 * new: https://moment.nodejs.cn
 */
const m = require('moment');
const mt = require('moment-timezone');

const FMT_YMD_Hms_ZZ = 'YYYY-MM-DD HH:mm:ss ZZ';
const FMT_YMD_Hms    = 'YYYY-MM-DD HH:mm:ss';
const FMT_YMD        = 'YYYY-MM-DD';
const FMT_YM         = 'YYYY-MM';
const FMT_Hms        = 'HH:mm:ss';

const SECS_1_MINUTE = 60;
const SECS_1_HOUR   = 3600;
const SECS_1_DAY    = 86400;
const SECS_1_WEEK   = 604800;

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

function Hms2Secs(Hms) {
    return m(`1970-01-01 ${Hms}`).diff(m('1970-01-01'), 'seconds');
}

/**
 * 获取给定时间的当天零点时间
 * @param {number} timestamp 毫秒级时间戳
 * @returns {m.Moment} Moment 对象
 */
function getMomentOfZeroTime(timestamp) {
    const mobj = timestamp ? m(timestamp) : m();
    const YMD = mobj.format(FMT_YMD);
    return m(YMD);
}

/**
 * 获取本周一的时间
 * @param {number} timestamp 毫秒级时间戳
 * @returns {m.Moment} Moment 对象
 */
function getMomentOfMonday(timestamp) {
    const mobj = timestamp ? m(timestamp) : m();
    const ts = mobj.valueOf();

    const weekday = mobj.days();
    if (weekday === 0) {
        return m(ts - 6 * SECS_1_DAY * 1000);
    } else {
        return m(ts - (weekday - 1) * SECS_1_DAY * 1000);
    }
}

/**
 * 是否已过下周一
 * @param {number} sec 秒级时间戳
 * @param {number} nowSec 指代当前时间的秒级时间戳
 * @param {string} Hms 时分秒
 * @param {number} zone 时区
 */
function isNextMonday(sec, nowSec, Hms = '05:00:00', zone = 9) {
    const mobj = m(sec * 1000).utcOffset(zone);
    const msec = mobj.valueOf();
    const weekday = mobj.days();

    let nextMon;

    if (weekday === 0) {
        nextMon = m(msec + SECS_1_DAY * 1000);
    } else {
        nextMon = m(msec + (8 - weekday) * SECS_1_DAY * 1000);
    }

    const YMD = nextMon.utcOffset(zone).format(FMT_YMD);

    let zz = '';
    zz += zone >= 0 ? '+' : '-';

    const zv = Math.abs(zone);
    zz += zv >= 10 ? zv : `0${zv}`;
    zz += ':00';

    const nextMonWithHms = m(`${YMD}T${Hms}${zz}`);

    const yes = nowSec >= nextMonWithHms.unix();
    const nowText = m(nowSec * 1000).format(FMT_YMD_Hms_ZZ);

    const objText = mobj.format(FMT_YMD_Hms_ZZ);
    const objZText = mobj.utcOffset(zone).format(FMT_YMD_Hms_ZZ);

    const monText = nextMonWithHms.format(FMT_YMD_Hms_ZZ);
    const monZText = nextMonWithHms.utcOffset(zone).format(FMT_YMD_Hms_ZZ);

    return {
        yes,
        now: nowText,
        obj: objText,
        mon: monText,
        objZ: objZText,
        monZ: monZText,
    };
}

/**
 * 获取本周指定星期的时间
 * @param {string} day 星期几
 * @param {number} timestamp 毫秒级时间戳
 * @returns {m.Moment} Moment 对象
 */
function getMomentOfThisWeek(day, timestamp) {
    const mobj = getMomentOfMonday(timestamp);

    switch (day) {
    case 'Mon':
        return mobj;
    case 'Tue':
        return m(mobj.valueOf() + SECS_1_DAY * 1000);
    case 'Wed':
        return m(mobj.valueOf() + 2 * SECS_1_DAY * 1000);
    case 'Thu':
        return m(mobj.valueOf() + 3 * SECS_1_DAY * 1000);
    case 'Fri':
        return m(mobj.valueOf() + 4 * SECS_1_DAY * 1000);
    case 'Sat':
        return m(mobj.valueOf() + 5 * SECS_1_DAY * 1000);
    case 'Sun':
        return m(mobj.valueOf() + 6 * SECS_1_DAY * 1000);
    default:
        throw new Error('Invalid day');
    }
}

/**
 * 给定时间是否不早于当天指定时分秒的时间
 * @param {number} timestamp 毫秒级时间戳
 * @param {string} Hms 时分秒
 * @returns {boolean} 比较结果
 */
function laterThan(timestamp, Hms = '05:00:00') {
    const YMD = m(timestamp).format(FMT_YMD);
    const ts = m(`${YMD} ${Hms}`).valueOf();
    return timestamp >= ts;
}

/**
 * 以每天零点为分界线，计算从开始时间到今天是第几天
 * @param {string} startTime 开始时间（年月日）
 * @param {number} n 开始时间作为第 n 天
 * @returns {number} 第几天
 */
function dayN(startTime, n = 1) {
    return m().diff(m(startTime), 'days') + n;
}

/**
 * 以每天指定时分秒为分界线，计算从开始时间到今天是第几天
 * @param {number} startTime 开始时间（毫秒级时间戳）
 * @param {string} Hms 时分秒
 * @param {number} n 开始时间作为第 n 天
 * @returns {number} 第几天
 */
function dayN_Hms(startTime, Hms = '05:00:00', n = 0) {
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
 * @param {string} targetTime 目标时间（年月日）
 * @returns 剩余天数
 */
function days_left(targetTime) {
    const YMD = m().format(FMT_YMD);
    const m1 = m(YMD);
    const m2 = m(targetTime);
    return m2.diff(m1, 'days');
}

/**
 * 以指定时分秒为分界线，获取给定时间这一天的开始及结束时间
 * @param {number} timestamp 秒级时间戳
 * @param {string} Hms 时分秒
 * @returns 开始和结束时间
 */
function getStartAndEndOfThisDay(timestamp, Hms = '05:00:00') {
    const YMD = m(timestamp * 1000).format(FMT_YMD);
    const ts = m(`${YMD} ${Hms}`).unix();

    const earlier = timestamp < ts;

    const startTimestamp = earlier ? ts - SECS_1_DAY : ts;
    const endTimestamp = earlier ? ts : ts + SECS_1_DAY;

    return {
        startTimestamp,
        startTimeText: m(startTimestamp * 1000).format(FMT_YMD_Hms),
        endTimestamp,
        endTimeText: m(endTimestamp * 1000).format(FMT_YMD_Hms),
    };
}

/**
 * 以指定时分秒为分界线，获取给定时间这一天的开始及结束时间
 * @param {number} timestamp 秒级时间戳
 * @param {string} Hms 时分秒
 * @param {number} zone 时区
 * @returns 开始和结束时间
 */
function getStartAndEndOfThisDayV2(timestamp, Hms = '05:00:00', zone = 9) {
    const m1 = m(timestamp * 1000).utcOffset(zone);

    const duration = Hms2Secs(Hms);

    const m2 = m1.startOf('day').add(duration, 'seconds');

    console.debug(`[DEBUG] ${m2.format(FMT_YMD_Hms_ZZ)}`);

    const ts = m2.unix();
    const earlier = timestamp < ts;

    const startTimestamp = earlier ? ts - SECS_1_DAY : ts;
    const endTimestamp = earlier ? ts : ts + SECS_1_DAY;

    return {
        startTimestamp,
        startTimeText: m(startTimestamp * 1000).format(FMT_YMD_Hms_ZZ),
        endTimestamp,
        endTimeText: m(endTimestamp * 1000).format(FMT_YMD_Hms_ZZ),
    };
}

/**
 * 以指定时分秒为分界线，获取给定时间上一周的开始及结束时间
 * @param {number} timestamp 秒级时间戳
 * @param {string} Hms 时分秒
 * @param {number} weekday 星期几
 * @param {number} zone 时区
 */
function getStartAndEndOfLastWeek(timestamp, Hms = '05:00:00', weekday = 1, zone = 9) {
    const mobj = m(timestamp * 1000).utcOffset(zone);
    const msec = mobj.valueOf();
    const selfWeekday = mobj.days();

    let lastMon, thisMon;

    if (selfWeekday === 0) {
        lastMon = m(msec - 13 * SECS_1_DAY * 1000);
        thisMon = m(msec - 6 * SECS_1_DAY * 1000);
    } else {
        lastMon = m(msec - (selfWeekday + 6) * SECS_1_DAY * 1000);
        thisMon = m(msec - (selfWeekday - 1) * SECS_1_DAY * 1000);
    }

    let offset;

    // 周日
    if (weekday === 0 || weekday === 7) {
        offset = 6 * SECS_1_DAY * 1000;
    } else {
        offset = (weekday - 1) * SECS_1_DAY * 1000;
    }

    const lastDay = m(lastMon.valueOf() + offset).utcOffset(zone);
    const thisDay = m(thisMon.valueOf() + offset).utcOffset(zone);

    const lastYMD = lastDay.format(FMT_YMD);
    const thisYMD = thisDay.format(FMT_YMD);

    let zz = '';
    zz += zone >= 0 ? '+' : '-';

    const zv = Math.abs(zone);
    zz += zv >= 10 ? zv : `0${zv}`;
    zz += ':00';

    const lastDayWithHms = m(`${lastYMD}T${Hms}${zz}`);
    const thisDayWithHms = m(`${thisYMD}T${Hms}${zz}`);

    const nowText = mobj.format(FMT_YMD_Hms_ZZ);

    const lastDayText = lastDayWithHms.format(FMT_YMD_Hms_ZZ);
    const lastDayZText = lastDayWithHms.utcOffset(zone).format(FMT_YMD_Hms_ZZ);
    const ldZText = lastDayWithHms.utcOffset(zone).format('YYMMDD');

    const thisDayText = thisDayWithHms.format(FMT_YMD_Hms_ZZ);
    const thisDayZText = thisDayWithHms.utcOffset(zone).format(FMT_YMD_Hms_ZZ);
    const tdZText = thisDayWithHms.utcOffset(zone).format('YYMMDD');

    return {
        now: nowText,
        lastDay: lastDayText,
        lastDayZ: lastDayZText,
        thisDay: thisDayText,
        thisDayZ: thisDayZText,
        weeklyKey: `${ldZText}_${tdZText}`,
    };
}

/**
 * 以指定时分秒为分界线，获取给定时间这一周的开始及结束时间
 * @param {number} timestamp 秒级时间戳
 * @param {string} Hms 时分秒
 * @param {number} weekday 星期几
 * @param {number} zone 时区
 */
function getStartAndEndOfThisWeek(timestamp, Hms = '05:00:00', weekday = 1, zone = 9) {
    const mobj = m(timestamp * 1000).utcOffset(zone);
    const msec = mobj.valueOf();
    const selfWeekday = mobj.days();

    let thisMon, nextMon;

    if (selfWeekday === 0) {
        thisMon = m(msec - 6 * SECS_1_DAY * 1000);
        nextMon = m(msec + SECS_1_DAY * 1000);
    } else {
        thisMon = m(msec - (selfWeekday - 1) * SECS_1_DAY * 1000);
        nextMon = m(msec + (8 - selfWeekday) * SECS_1_DAY * 1000);
    }

    let offset;

    // 周日
    if (weekday === 0 || weekday === 7) {
        offset = 6 * SECS_1_DAY * 1000;
    } else {
        offset = (weekday - 1) * SECS_1_DAY * 1000;
    }

    const thisDay = m(thisMon.valueOf() + offset).utcOffset(zone);
    const nextDay = m(nextMon.valueOf() + offset).utcOffset(zone);

    const thisYMD = thisDay.format(FMT_YMD);
    const nextYMD = nextDay.format(FMT_YMD);

    let zz = '';
    zz += zone >= 0 ? '+' : '-';

    const zv = Math.abs(zone);
    zz += zv >= 10 ? zv : `0${zv}`;
    zz += ':00';

    const thisDayWithHms = m(`${thisYMD}T${Hms}${zz}`);
    const nextDayWithHms = m(`${nextYMD}T${Hms}${zz}`);

    const nowText = mobj.format(FMT_YMD_Hms_ZZ);

    const thisDayText = thisDayWithHms.format(FMT_YMD_Hms_ZZ);
    const thisDayZText = thisDayWithHms.utcOffset(zone).format(FMT_YMD_Hms_ZZ);
    const tdZText = thisDayWithHms.utcOffset(zone).format('YYMMDD');

    const nextDayText = nextDayWithHms.format(FMT_YMD_Hms_ZZ);
    const nextDayZText = nextDayWithHms.utcOffset(zone).format(FMT_YMD_Hms_ZZ);
    const ndZText = nextDayWithHms.utcOffset(zone).format('YYMMDD');

    return {
        now: nowText,
        thisDay: thisDayText,
        thisDayZ: thisDayZText,
        nextDay: nextDayText,
        nextDayZ: nextDayZText,
        weeklyKey: `${tdZText}_${ndZText}`,
    };
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
    console.log(dayN_Hms(v));

    v = StrToInt13('2021-10-07 05:00:00');
    console.log(dayN_Hms(v));

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

function TEST_DaysV2() {
    console.log('[TEST_DaysV2]');

    console.log('getMomentOfZeroTime:');

    console.log(getMomentOfZeroTime().format(FMT_YMD_Hms));

    console.log('getTimeTextOfMonday:');

    const getTimeTextOfMonday = (timeText) => {
        const timestamp = m(timeText).valueOf();
        return getMomentOfMonday(timestamp).format(FMT_YMD_Hms);
    }

    console.log(getTimeTextOfMonday('2022-03-25'));
    console.log(getTimeTextOfMonday('2022-03-26'));
    console.log(getTimeTextOfMonday('2022-03-27'));
    console.log(getTimeTextOfMonday('2022-03-28'));
    console.log(getTimeTextOfMonday('2022-03-29'));
    console.log(getTimeTextOfMonday('2022-03-30'));
    console.log(getTimeTextOfMonday('2022-03-31'));

    console.log('getTimeTextOfDay:');

    const timestamp = m().valueOf();

    const getTimeTextOfDay = (day, timestamp) => {
        return getMomentOfThisWeek(day, timestamp).format(FMT_YMD_Hms);
    }

    console.log(getTimeTextOfDay('Mon', timestamp));
    console.log(getTimeTextOfDay('Tue', timestamp));
    console.log(getTimeTextOfDay('Wed', timestamp));
    console.log(getTimeTextOfDay('Thu', timestamp));
    console.log(getTimeTextOfDay('Fri', timestamp));
    console.log(getTimeTextOfDay('Sat', timestamp));
    console.log(getTimeTextOfDay('Sun', timestamp));
}

function TEST_ThisDay() {
    console.log('[TEST_ThisDay]');

    const now = m().unix();

    console.log(getStartAndEndOfThisDay(now));
    console.log(getStartAndEndOfThisDay(now, '18:00:00'));

    console.log(getStartAndEndOfThisDayV2(now));
    console.log(getStartAndEndOfThisDayV2(now, '18:00:00'));
}

function TEST_LastWeek() {
    console.log('[TEST_LastWeek]');

    const now = m().unix();

    console.log(getStartAndEndOfLastWeek(now));
    console.log(getStartAndEndOfLastWeek(now, '18:00:00', 3));
    console.log(getStartAndEndOfLastWeek(now, '18:00:00', 7));
}

function TEST_ThisWeek() {
    console.log('[TEST_ThisWeek]');

    const now = m().unix();

    console.log(getStartAndEndOfThisWeek(now));
    console.log(getStartAndEndOfThisWeek(now, '18:00:00', 3));
    console.log(getStartAndEndOfThisWeek(now, '18:00:00', 7));
}

function TEST_ThisWeek_ZeroTimezone() {
    console.log('[TEST_ThisWeek_ZeroTimezone]');

    // https://www.timezoneconverter.com/cgi-bin/zoneinfo.tzc?s=default&tz=Etc/UTC
    // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    mt.tz.setDefault('Etc/UTC');
    console.log(m().format(FMT_YMD_Hms_ZZ));

    const now = m().unix();

    console.log(getStartAndEndOfThisWeek(now));
    console.log(getStartAndEndOfThisWeek(now, '18:00:00', 3));
    console.log(getStartAndEndOfThisWeek(now, '18:00:00', 7));

    mt.tz.setDefault();
    console.log(m().format(FMT_YMD_Hms_ZZ));
}

function TEST_Birthdate() {
    console.log('[TEST_Birthdate]');

    console.log(m('1999-12-31 23:59:59').diff(m('1999-01-01 00:00:00'), 'years'));
    console.log(m('2000-01-01 00:00:00').diff(m('1999-01-01 00:00:01'), 'years'));
    console.log(m('2000-01-01 00:00:01').diff(m('1999-01-01 00:00:01'), 'years'));

    console.log(m().diff(m('1949-10-01'), 'years'));
    console.log(m().diff(m('1945-08-15'), 'years'));
}

function TEST_NextMonth() {
    console.log('[TEST_NextMonth]');

    const YMD = m().format(`${FMT_YM}-01`);
    const this1st = m(YMD);
    const next1st = m(YMD).add(m.duration(1, 'month'));

    console.log(this1st.format(FMT_YMD_Hms));
    console.log(next1st.format(FMT_YMD_Hms));
}

function TEST_IsNextMonday() {
    console.log('[TEST_IsNextMonday]');

    const now = m('2023-07-24 22:12:00').unix();

    console.log(isNextMonday(m('2023-07-21 22:00:00').unix(), now));
    console.log(isNextMonday(m('2023-07-24 20:00:00').unix(), now));
}

function TESTS() {
    TEST_Transform();
    TEST_DayN();
    TEST_Days();
    TEST_DaysV2();
    TEST_ThisDay();
    TEST_LastWeek();
    TEST_ThisWeek();
    TEST_ThisWeek_ZeroTimezone();
    TEST_Birthdate();
    TEST_NextMonth();
    TEST_IsNextMonday();
}

TESTS();
