'use strict';

const util = require('./util');

function tests() {
    util.test_list();
    util.test_array();

    util.test_dict();
    util.test_map();

    test_sortMap();
    test_sortedMap();

    test_eval();
    test_Date();

    test_Promise();
    test_AsyncAndAwait();
    test_functionSTAR();

    test_closure();
    test_currying();

    test_merge_delWith_deepcopy();
    test_isType();
    test_map_method();
    test_reduce_method();

    util.test_exception();
    util.test_hashCode();
    util.test_matchRoute();
    util.test_removeSpaces();
}

tests();

function test_sortMap() {
    util.printUnit('sortMap');

    const mapobj = new Map([
        ['redis', '5.0.7'],
        ['mysql', '8.0.19'],
        ['mariadb', '10.3.22']
    ]);
    console.log(mapobj);

    util.sortMap(mapobj);
    console.log(mapobj);
}

function test_sortedMap() {
    util.printUnit('sortedMap');

    let mymapobj = new Map([
        [6, '3'], [4, '2'], [2, '1']
    ]);
    console.log(mymapobj);

    mymapobj = util.sortedMap(mymapobj);
    console.log(mymapobj);
}

function test_eval() {
    util.printUnit('eval');

    const x = 2; const y = 4;
    const z = eval(x + y);
    console.log(`Result: ${z}`);
}

function test_Date() {
    util.printUnit('Date');

    console.log(util.getTimeString());

    const sTime = '2038-03-08 20:00:00';
    const oDate = new Date(Date.parse(sTime));
    console.log(util.getTimeString(oDate));
}

function test_Promise() {
    const unit1 = util.getUnit('Promise');

    util.getPromise().then(value => {
        console.log(`${unit1}\nValue_(1): ${value}`);
    }).catch(reason => {
        console.log(`${unit1}\nReason(1): ${reason}`);
    });
}

function test_AsyncAndAwait() {
    const unit2 = util.getUnit('(async/await)');

    util.F(unit2).catch(reason => console.log(`${unit2}\nReason(2): ${reason}`));
}

function test_functionSTAR() {
    util.printUnit('function*');

    const g = util.gen(1);
    console.log(`n1: ${g.next().value}`);  // 2
    console.log(`n2: ${g.next(2).value}`); // 12
    console.log(`n3: ${g.next(3).value}`); // 8
    console.log(`n4: ${g.next(4).value}`); // undefined
}

function test_closure() {
    util.printUnit('closure');

    const sumFunc = util.sum();
    console.log(sumFunc(1));
    console.log(sumFunc(2));
    console.log(sumFunc(3));
    console.log(sumFunc(4));
}

function test_currying() {
    util.printUnit('currying');

    const isNumber = util.curryingCheck(/[0-9]+/);
    const isLetter = util.curryingCheck(/[a-zA-Z]+/);

    console.log(isNumber(1));
    console.log(isNumber('a'));
    console.log(isLetter(1));
    console.log(isLetter('a'));
}

function test_merge_delWith_deepcopy() {
    util.printUnit('merge');

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

    util.printUnit('delWith');

    console.log(d2);
    util.delWith(d2, { 'd': { 'k1': '?' } });
    console.log(d2);

    util.printUnit('deepcopy');

    const d3 = util.deepcopy(d1);

    d3[1] = '?';
    console.log(d1);
    console.log(d3);
}

function test_isType() {
    util.printUnit('is_type');

    console.log(util.is_type('', 'string'));
    console.log(util.is_type(11, 'number'));
    console.log(util.is_type([], 'array'));
    console.log(util.is_type({}, 'object'));
}

function test_map_method() {
    util.printUnit('map_method');

    {
        const l1 = [{ weight: 100 }, { weight: 300 }, { weight: 600 }];
        const l2 = l1.map(x => x);
        console.log(l1, l2);

        l2[0].weight = 101;
        console.log(l1, l2);
    }

    {
        const l1 = [{ weight: 100 }, { weight: 300 }, { weight: 600 }];
        const l2 = l1.map(x => { x.weight += 1; return x; });
        console.log(l1, l2);

        l2[0].weight = 102;
        console.log(l1, l2);
    }

    {
        const l1 = [{ weight: 100 }, { weight: 300 }, { weight: 600 }];
        const l2 = l1.map(x => Object.assign({}, x));
        console.log(l1, l2);

        l2[0].weight = 101;
        console.log(l1, l2);
    }
}

function test_reduce_method() {
    util.printUnit('reduce_method');

    const L = [
        { id: 'aaa' }, { id: 'bbb' },
        { id: 'aaa' }, { id: 'ccc' },
    ];

    {
        const r = L.reduce((o, x) => {
            const { m, d, k } = o;

            if (d[x[k]]) {
                o.update = true;
            } else {
                m.push(x);
                d[x[k]] = true;
            }

            return o;
        }, { m: [], d: {}, k: 'id', update: false });

        const { m, update } = r;

        console.log(update, m);
    }

    {
        const filterFn = (li, k) => {
            return li.reduce((o, x) => {
                const { m, d, k } = o;

                if (d[x[k]]) {
                    o.update = true;
                } else {
                    m.push(x);
                    d[x[k]] = true;
                }

                return o;
            }, { m: [], d: {}, k, update: false });
        }

        const { m, update } = filterFn(L, 'id');

        console.log(update, m);
    }
}
