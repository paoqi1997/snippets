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

console.log('[js/eval]');

const x = 2; const y = 4;
const z = eval(x + y);
console.log(`Result: ${z}`);

console.log('[js/Date]');

console.log(util.getTimeString());

const sTime = '2038-03-08 20:00:00';
const oDate = new Date(Date.parse(sTime));
console.log(util.getTimeString(oDate));

const prefix = `[js/Promise]\n`;

util.getPromise().then(value => {
    console.log(`${prefix}Value[1]: ${value}`);
}).catch(reason => {
    console.log(`${prefix}Reason[1]: ${reason}`);
});

const prefix_ = '[js/(async/await)]\n';

util.F(prefix_).catch(reason => console.log(`${prefix_}Reason[2]: ${reason}`));

console.log('[js/function*]');

const g = util.gen(1);
console.log(`n1: ${g.next().value}`);  // 2
console.log(`n2: ${g.next(2).value}`); // 12
console.log(`n3: ${g.next(3).value}`); // 8
console.log(`n4: ${g.next(4).value}`); // undefined

console.log('[js/closure]');

const sumFunc = util.sum();
console.log(sumFunc(1));
console.log(sumFunc(2));
console.log(sumFunc(3));
console.log(sumFunc(4));

console.log('[js/currying]');

const isNumber = util.curryingCheck(/[0-9]+/);
const isLetter = util.curryingCheck(/[a-zA-Z]+/);

console.log(isNumber(1));
console.log(isNumber('a'));
console.log(isLetter(1));
console.log(isLetter('a'));

console.log('[js/merge]');

const d1 = {
    1: 2, 2: 4, 3: 6, 'd': {'k1': 'v1', 'k2': 'v2', 'k3': [1, 3, 5, 7, 9]},
    'l': [{'k_': 'v_'}]
};
const d2 = { 1: 3, 2: 5, 'l': [{'kk': 'vv'}] };

console.log(d2);
util.merge(d1, d2);
console.log(d2);

const l1 = { 'list': [ ['v_h', 'v_s'], ['v_n'], ['v_g', 'v_g'] ] };
const l2 = { 'list': [ ['v_r', 'v_s', 'v_c'], ['v_m', 'v_m'] ] };

console.log(l2);
util.merge(l1, l2);
console.log(l2);

console.log('[js/is_type]');

console.log(util.is_type('', 'string'));
console.log(util.is_type(11, 'number'));
console.log(util.is_type([], 'array'));
console.log(util.is_type({}, 'object'));

console.log('[js/deepcopy]');

const d3 = util.deepcopy(d1);

d3[1] = '?';
console.log(d1);
console.log(d3);
