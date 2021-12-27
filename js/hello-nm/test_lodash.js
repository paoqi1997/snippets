'use strict';

const _ = require('lodash');

function test_compact() {
    console.log('TEST$_.compact');

    const li = [1, undefined, 2, null, 3];
    console.log(li);
    console.log(_.compact(li));
}

test_compact();
