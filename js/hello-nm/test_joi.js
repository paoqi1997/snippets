'use strict';

/**
 * https://joi.dev
 */
const joi = require('joi');

const schema = joi.object({
    skipReducing: joi.number().optional(),
});

console.log(schema.validate({}));
console.log(schema.validate({ skipReducing: 1 }));
