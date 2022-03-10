'use strict';

const _ = require('lodash');

function test_compact() {
    console.log('TEST$_.compact');

    const li = [1, undefined, 2, null, 3];
    console.log(li);
    console.log(_.compact(li)); // [ 1, 2, 3 ]
}

function test_assign_omit_pick() {
    console.log('TEST$_.assign_omit_pick');

    const d = {};
    const d2 = _.assign(d, { bp: 1, pq: 2 });

    console.log(d);  // { bp: 1, pq: 2 }
    console.log(d2); // { bp: 1, pq: 2 }

    console.log(_.omit(d, 'pq')); // { bp: 1 }
    console.log(_.pick(d, 'pq')); // { pq: 2 }
}

function test_random() {
    console.log('TEST$_.random');

    // [min, max]
    const val = _.random(10 ** 3, 10 ** 4 - 1, false);
    console.log(val); // xxxx
}

function test_uniqWith() {
    console.log('TEST$_.uniqWith');

    const l = [1, 1, 2, 2, 3];
    console.log(l);
    console.log(_.uniqWith(l, _.isEqual));  // [ 1, 2, 3 ]

    const li = [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 3 }];
    console.log(li);
    console.log(_.uniqWith(li, _.isEqual)); // [ { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 3 } ]
}

function test_concat() {
    console.log('TEST$_.concat');

    const l1 = [1, 2, 3, { a: 'aa' }];
    const l2 = [4, 5, 6, { b: 'bb' }];

    const l1_2 = _.concat(l1, l2);
    console.log(l1_2); // [ 1, 2, 3, { a: 'aa' }, 4, 5, 6, { b: 'bb' } ]
}

function test_remove() {
    console.log('TEST$_.remove');

    const l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.log(l);

    const removedList = _.remove(l, (x) => {
        return x % 2 === 0;
    });
    console.log(l, removedList); // [ 1, 3, 5, 7, 9 ] [ 0, 2, 4, 6, 8 ]
}

function test_filter() {
    console.log('TEST$_.filter');

    const l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.log(l);

    const filteredList = _.filter(l, (x) => {
        return x % 2 === 0;
    });
    console.log(filteredList); // [ 0, 2, 4, 6, 8 ]
}

function test_keyBy() {
    console.log('TEST$_.keyBy');

    const l = [1, 2, 3];
    console.log(l);

    const li = l.reduce((result, x) => {
        return [...result, { id: x }];
    }, []);
    console.log(li);   // [ { id: 1 }, { id: 2 }, { id: 3 } ]

    const list = _.keyBy(li, 'id');
    console.log(list); // { '1': { id: 1 }, '2': { id: 2 }, '3': { id: 3 } }
}

function tests() {
    test_compact();
    test_assign_omit_pick();
    test_random();
    test_uniqWith();
    test_concat();
    test_remove();
    test_filter();
    test_keyBy();
}

tests();
