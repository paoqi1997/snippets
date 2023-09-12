'use strict';

/**
 * https://joi.dev
 */
const joi = require('joi');

function tests() {
    test();
}

tests();

function test() {
    const schema = joi.object({
        skipReducing: joi.number().optional(),
    });

    console.log(schema.validate({}));
    console.log(schema.validate({ skipReducing: 1 }));
    console.log(schema.validate({ name: 'paoqi' }));
}
