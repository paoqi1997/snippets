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
