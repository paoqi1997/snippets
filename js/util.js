'use strict';

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
    console.log('js/dict');

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
    console.log('js/map');

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
