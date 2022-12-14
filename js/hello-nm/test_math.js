'use strict';

/**
 * https://mathjs.org
 */
const math = require('mathjs');

function test1() {
    const sentry = 100000 * 10000;
    const magicNum = 2654435769;

    const aid1 = 3057526;
    const serverNum1 = 10004;
    const tAid1 = aid1 * 10 + serverNum1;
    const tmpAid1 = tAid1 * magicNum;

    const aid2 = 3307696;
    const serverNum2 = 10001;
    const tAid2 = aid2 * 10 + serverNum2;
    const tmpAid2 = tAid2 * magicNum;

    console.log(tmpAid1);
    console.log(tmpAid2);
    console.log(Number.MAX_SAFE_INTEGER);

    const newAid1 = tmpAid1 % sentry;
    const newAid2 = tmpAid2 % sentry;
    console.log(newAid1, newAid2);

    const rAid1 = math.bignumber(tmpAid1).mod(sentry);
    const rAid2 = math.bignumber(tmpAid2).mod(sentry);
    console.log(rAid1, rAid2);

    const resAid1 = math.bignumber(tAid1).mul(magicNum).mod(sentry);
    const resAid2 = math.bignumber(tAid2).mul(magicNum).mod(sentry);
    console.log(resAid1, resAid2);
}

function tests() {
    test1();
}

tests();
