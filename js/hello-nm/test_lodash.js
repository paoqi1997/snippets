'use strict';

/**
 * https://www.lodashjs.com
 */
const _ = require('lodash');

function tests() {
    test_compact();
    test_get_set();
    test_assign_omit_pick();
    test_random();
    test_uniqWith();
    test_concat();
    test_remove();
    test_filter();
    test_reduce_keyBy();
    test_findIndex();
    test_sortBy();
}

tests();

function test_compact() {
    console.log('TEST$_.compact');

    const li = [1, undefined, 2, null, 3];
    console.log(li);
    console.log(_.compact(li)); // [ 1, 2, 3 ]
}

function test_get_set() {
    console.log('TEST$_.get_set');

    const d = {};
    console.log(d, _.get(d, 'id'));

    _.set(d, 'id', 'you');
    console.log(d, _.get(d, 'id'));

    console.log(_.get(undefined, 'id'));
}

function test_assign_omit_pick() {
    console.log('TEST$_.assign_omit_pick');

    const d0 = {};
    const d1 = { bp: 1, pq: 1 };
    const d2 = { pq: 2 };
    const d = _.assign(d0, d1, d2);
    console.log(d0); // { bp: 1, pq: 2 }
    console.log(d);  // { bp: 1, pq: 2 }

    console.log(_.omit(d, 'pq')); // { bp: 1 }
    console.log(_.pick(d, 'pq')); // { pq: 2 }

    d0.pb = 3;
    console.log(d0); // { bp: 1, pq: 2, pb: 3 }
    console.log(d);  // { bp: 1, pq: 2, pb: 3 }
}

function test_random() {
    console.log('TEST$_.random');

    let val;

    // [0, 1]
    val = _.random();
    console.log(val);

    // [0, 999]
    val = _.random(10 ** 3 - 1);
    console.log(val);

    // [1000, 9999]
    val = _.random(10 ** 3, 10 ** 4 - 1);
    console.log(val);
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

    const removedList = _.remove(l, (x) => {
        return x % 2 === 0;
    });

    console.log(l);           // [ 1, 3, 5, 7, 9 ]
    console.log(removedList); // [ 0, 2, 4, 6, 8 ]
}

function test_filter() {
    console.log('TEST$_.filter');

    const l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const filteredList = _.filter(l, (x) => {
        return x % 2 === 0;
    });

    console.log(l);
    console.log(filteredList); // [ 0, 2, 4, 6, 8 ]
}

function test_reduce_keyBy() {
    console.log('TEST$_.reduce_keyBy');

    const li = [100, 300, 600];

    const l = _.reduce(li, (m, x) => {
        return [...m, { id: m.length + 1, weight: x }];
    }, []);

    console.log(l); // [{ id: 1, weight: 100 }, { id: 2, weight: 300 }, { id: 3, weight: 600 }]

    const d = _.keyBy(l, 'id');
    console.log(d); // { '1': { id: 1, weight: 100 }, '2': { id: 2, weight: 300 }, '3': { id: 3, weight: 600 } }
}

function test_findIndex() {
    console.log('TEST$_.findIndex');

    const l1 = [
        { name: 'cabbage', count: 10 },
        { name: 'cucumber', count: 20 }
    ];
    const l2 = [
        { name: 'cabbage', count: 20 },
        { name: 'cucumber', count: 10 },
        { name: 'tomato', count: 30 }
    ];

    for (const element of l2) {
        const idx = _.findIndex(l1, (x) => {
            return x.name === element.name;
        });

        if (idx === -1) {
            l1.push(element);
        } else {
            l1[idx].count += element.count;
        }
    }

    console.log(l1);
}

function test_sortBy() {
    console.log('TEST$_.sortBy');

    const li = [{ x: 1 }, { x: 3 }, { x: 2 }];
    const ll = _.sortBy(li, (x) => { return x.x; });
    console.log(li, ll);
}
