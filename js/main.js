'use strict';

const util = require('./util');

util.test_dict();
util.test_map();

let mapobj = new Map([
    ['redis', '5.0.7'],
    ['mysql', '8.0.19'],
    ['mariadb', '10.3.22']
]);
console.log(mapobj);

util.sortMap(mapobj);
console.log(mapobj);

let mymapobj = new Map([
    [6, '3'], [4, '2'], [2, '1']
]);
console.log(mymapobj);

mymapobj = util.sortedMap(mymapobj);
console.log(mymapobj);
