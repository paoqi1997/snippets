'use strict';

const _ = require('lodash');

function test_compact() {
    console.log('TEST$_.compact');

    const li = [1, undefined, 2, null, 3];
    console.log(li);
    console.log(_.compact(li));
}

function test_omit() {
    console.log('TEST$_.omit');

    const d = { bp: 1, pq: 2 };
    console.log(d);
    console.log(_.omit(d, 'bp'));
}

function test_random() {
    console.log('TEST$_.random');

    const val = _.random(10 ** 3, 10 ** 4 - 1, false);
    console.log(val);
}

function test_uniqWith() {
    console.log('TEST$_.uniqWith');

    const l = [1, 1, 2, 2, 3];
    console.log(l);
    console.log(_.uniqWith(l, _.isEqual));

    const li = [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 3 }];
    console.log(li);
    console.log(_.uniqWith(li, _.isEqual));
}

function test_concat() {
    console.log('TEST$_.concat');

    const l1 = [1, 2, 3, { a: 'aa' }];
    const l2 = [4, 5, 6, { b: 'bb' }];

    const l1_2 = _.concat(l1, l2);
    console.log(l1_2);
}

function tests() {
    test_compact();
    test_omit();
    test_random();
    test_uniqWith();
    test_concat();
}

tests();
