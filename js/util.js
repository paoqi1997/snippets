'use strict';

/**
 * 对传入的 Map 对象进行排序
 * @param {Map} mapobj Map 对象
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
    })
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
