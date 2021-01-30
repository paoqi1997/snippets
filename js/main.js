'use strict';

const util = require('./util');

util.test_list();
util.test_array();

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

const x = 2; const y = 4;
const z = eval(x + y);
console.log(`Result: ${z}`);

console.log(util.getTimeString());

const sTime = '2038-03-08 20:00:00';
const oDate = new Date(Date.parse(sTime));
console.log(util.getTimeString(oDate));

util.getPromise().then(value => {
    console.log(`Value: ${value}`);
}).catch(reason => {
    console.log(`Reason: ${reason}`);
});

const g = util.gen(1);
console.log(`n1: ${g.next().value}`);  // 2
console.log(`n2: ${g.next(2).value}`); // 12
console.log(`n3: ${g.next(3).value}`); // 8
console.log(`n4: ${g.next(4).value}`); // undefined

const sumFunc = util.sum();
console.log(sumFunc(1));
console.log(sumFunc(2));
console.log(sumFunc(3));
console.log(sumFunc(4));
