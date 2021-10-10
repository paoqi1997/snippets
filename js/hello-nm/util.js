'use strict';

/**
 * 不足10的补零
 * @param {number} iNum number对象
 * @return {string} 补零后的字符串 or 无须补零的字符串
 */
const zeroFill = iNum => {
    return iNum < 10 ? `0${iNum}` : `${iNum}`;
}

/**
 * 根据给定的 Date 对象返回形如 yyyy-MM-dd HH:mm:ss 的字符串
 * @param {Date} dateobj Date对象
 * @return {string} 既定格式的时间文本
 */
const getTimeString = dateobj => {
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

/**
 * 打印带有当前时间的信息
 * @param {string} info 信息
 */
exports.printInfo = info => {
    console.log(`[${getTimeString()}] ${info}`);
}
