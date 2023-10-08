'use strict';

/**
 * https://joi.dev
 */
const joi = require('joi');

function tests() {
    test();
}

tests();

function print(msg) {
    console.log(`>>> TEST$${msg}`);
}

function test() {
    const schema = joi.object({
        skipReducing: joi.number().optional(),
        clanCount: joi.number().integer().min(0).optional(),
    });

    console.log(schema.validate({}));
    console.log(schema.validate({ skipReducing: 1 }));
    console.log(schema.validate({ name: 'paoqi' }));

    print('clanCount');

    console.log(schema.validate({ clanCount: null }));
    console.log(schema.validate({ clanCount: -1 }));
    console.log(schema.validate({ clanCount: 1 }));
}
