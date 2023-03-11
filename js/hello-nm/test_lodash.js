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
    test_keyBy();
    test_reduce();
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

function test_reduce() {
    console.log('TEST$_.reduce');

    const v1weights = [
        { id: 1, weight: 100 },
        { id: 2, weight: 300 },
        { id: 3, weight: 600 }
    ];

    const v2weights = [
        { idx: 1, id: 1, weight: 10 },
        { idx: 2, id: 1, weight: 20 },
        { idx: 3, id: 1, weight: 30 },
        { idx: 4, id: 1, weight: 50 },
        { idx: 5, id: 2, weight: 100 },
        { idx: 6, id: 2, weight: 300 },
        { idx: 7, id: 2, weight: 600 },
        { idx: 8, id: 2, weight: 800 },
        { idx: 9, id: 3, weight: 1200 },
        { idx: 10, id: 3, weight: 3000 }
    ];

    const pool = {
        '1': 0, '2': 1, '3': 1, '4': 1, '5': 1,
        '6': 0, '7': 1, '8': 0, '9': 1, '10': 0
    };

    const ww = calNewWights(v1weights, v2weights, pool);
    const weights = _.values(ww);

    const rolledWeight = rollWeight(weights);
    console.log(rolledWeight);
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

function calNewWights(v1weights, v2weights, pool) {
    const totalWeight = _.reduce(v1weights, (accum, x) => accum + x.weight, 0);
    console.log(`totalWeight: ${totalWeight}`);

    const v1divider = {};
    const id2count = {};

    for (const v1weight of v1weights) {
        v1divider[v1weight.id] = v1weight.weight / totalWeight;
        id2count[v1weight.id] = 0;
    }

    console.log(`v1divider: ${JSON.stringify(v1divider)}`);

    const idx2id = {};
    const oldIdx2Weight = {};
    const idx2weight = {};

    for (const v2weight of v2weights) {
        idx2id[v2weight.idx] = v2weight.id;
        oldIdx2Weight[v2weight.idx] = v2weight.weight;
        idx2weight[v2weight.idx] = v2weight.weight;
    }

    for (const idx in pool) {
        const id = idx2id[idx];
        if (pool[idx] > 0) {
            id2count[id] += 1;
        }
    }

    console.log(`id2count: ${JSON.stringify(id2count)}`);

    for (const idx in pool) {
        if (pool[idx] > 0) {
            continue;
        }

        const weight = oldIdx2Weight[idx];
        idx2weight[idx] = 0;

        const dividedV1Weights = {};

        for (const id in v1divider) {
            dividedV1Weights[id] = weight * v1divider[id];
        }

        console.log(`dividedV1Weights<[${idx}]{${weight}}>: ${JSON.stringify(dividedV1Weights)}`);

        const dividedV2Weights = {};

        for (const id in id2count) {
            dividedV2Weights[id] = dividedV1Weights[id] / id2count[id];
        }

        console.log(`dividedV2Weights<[${idx}]{${weight}}>: ${JSON.stringify(dividedV2Weights)}`);

        for (const index in idx2weight) {
            if (idx2weight[index] <= 0) {
                continue;
            }

            idx2weight[index] += dividedV2Weights[idx2id[index]];
        }

        console.log(`idx2weight<[${idx}]{${weight}}>: ${JSON.stringify(idx2weight)}`);
    }

    return idx2weight;
}

function rollWeight(weights) {
    const totalWeight = weights.reduce((accum, curr) => accum + curr);
    let target = Math.floor(Math.random() * totalWeight) + 1;

    console.log(`totalWeight: ${totalWeight}, target: ${target}`);

    for (let i = 0; i < weights.length; i += 1) {
      if (weights[i] > 0 && target <= weights[i]) {
        return { index: i, weight: weights[i] };
      }

      target -= weights[i];
    }

    return { index: 0, weight: -1 };
}
