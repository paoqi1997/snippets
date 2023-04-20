'use strict';

const util = require('./util');

const LEVELS = {
    TRACE: 1,
    DEBUG: 2,
    INFO:  3,
    WARN:  4
};

let CURR_LEVEL = LEVELS.DEBUG;

const GUARANTEE_WHEN_DRAWS = 10;
const OUTFIT = '1';

function TRACE(msg) {
    if (CURR_LEVEL <= LEVELS.TRACE) {
        console.trace(`[TRACE] ${msg}`);
    }
}

function DEBUG(msg) {
    if (CURR_LEVEL <= LEVELS.DEBUG) {
        console.debug(`[DEBUG] ${msg}`);
    }
}

function INFO(msg) {
    if (CURR_LEVEL <= LEVELS.INFO) {
        console.info(`[INFO ] ${msg}`);
    }
}

function WARN(msg) {
    if (CURR_LEVEL <= LEVELS.WARN) {
        console.warn(`[WARN ] ${msg}`);
    }
}

function tests() {
    const v1weights = [
        { id: 1, weight: 100 },
        { id: 2, weight: 500 },
        { id: 3, weight: 2400 }
    ];

    const v2weights = [
        { idx: 1,  id: 1, weight: 10 },
        { idx: 2,  id: 2, weight: 150 },
        { idx: 3,  id: 2, weight: 300 },
        { idx: 4,  id: 1, weight: 10 },
        { idx: 5,  id: 3, weight: 1500 },
        { idx: 6,  id: 2, weight: 300 },
        { idx: 7,  id: 1, weight: 50 },
        { idx: 8,  id: 3, weight: 1400 },
        { idx: 9,  id: 3, weight: 400 },
        { idx: 10, id: 1, weight: 100 },
        { idx: 11, id: 3, weight: 450 },
        { idx: 12, id: 3, weight: 450 },
    ];

    const pool = {
        '1':  1,
        '2':  1,
        '3':  1,
        '4':  1,
        '5':  10,
        '6':  1,
        '7':  1,
        '8':  10,
        '9':  10,
        '10': 1,
        '11': 15,
        '12': 5,
    };

    test_draw1st(v1weights, v2weights, pool);
    test_draw10th(v1weights, v2weights, pool);
    test_draw10times(v1weights, v2weights, pool);
}

tests();

function test_draw1st(v1weights, v2weights, pool) {
    console.log('TEST.draw1st');
    const { id2count, wm } = calNewWights(v1weights, v2weights, pool);
    const ctx = { currDrawIndex: 1 };
    const index = rollIndex(v1weights, v2weights, ctx, id2count, wm);
    INFO(`${JSON.stringify(index)}`);
}

function test_draw10th(v1weights, v2weights, pool) {
    console.log('TEST.draw10th');
    const { id2count, wm } = calNewWights(v1weights, v2weights, pool);
    const ctx = { currDrawIndex: 10 };
    const index = rollIndex(v1weights, v2weights, ctx, id2count, wm);
    INFO(`${JSON.stringify(index)}`);
}

function test_draw10times(v1weights, v2weights, pool) {
    console.log('TEST.draw10times');

    CURR_LEVEL = LEVELS.INFO;

    INFO(`${JSON.stringify(pool)}`);

    for (let i = 0; i < 1; i += 1) {
        const tmpool = util.deepcopy(pool);
        const tmpv1weights = util.deepcopy(v1weights);

        for (let j = 0; j < 30; j += 1) {
            const { id2count, wm } = calNewWights(tmpv1weights, v2weights, tmpool);
            const ctx = { currDrawIndex: j + 1 };
            const index = rollIndex(tmpv1weights, v2weights, ctx, id2count, wm);
            tmpool[index.idx] -= 1;

            const v1weight = tmpv1weights.find((v1w) => { return v1w.id == OUTFIT; });
            if (String(index.id) !== OUTFIT && ctx.currDrawIndex > GUARANTEE_WHEN_DRAWS) {
                v1weight.weight += 15;
            } else {
                v1weight.weight = 100;
            }

            INFO(`tmpv1weights: ${JSON.stringify(tmpv1weights)}`);
        }

        INFO(`${JSON.stringify(tmpool)}`);
    }
}

function calNewWights(v1weights, v2weights, pool) {
    const totalWeight = v1weights.reduce((accum, x) => accum + x.weight, 0);
    DEBUG(`totalWeight: ${totalWeight}`);

    const v1divider = {};
    const id2count = {};

    for (const v1weight of v1weights) {
        v1divider[v1weight.id] = v1weight.weight / totalWeight;
        id2count[v1weight.id] = 0;
    }

    DEBUG(`v1divider: ${JSON.stringify(v1divider)}`);

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

    DEBUG(`id2count: ${JSON.stringify(id2count)}`);

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

        TRACE(`dividedV1Weights<[${idx}]{${weight}}>: ${JSON.stringify(dividedV1Weights)}`);

        const dividedV2Weights = {};

        for (const id in id2count) {
            dividedV2Weights[id] = dividedV1Weights[id] / id2count[id];
        }

        TRACE(`dividedV2Weights<[${idx}]{${weight}}>: ${JSON.stringify(dividedV2Weights)}`);

        for (const index in idx2weight) {
            if (idx2weight[index] <= 0) {
                continue;
            }

            idx2weight[index] += Math.floor(dividedV2Weights[idx2id[index]]);
        }

        TRACE(`idx2weight<[${idx}]{${weight}}>: ${JSON.stringify(idx2weight)}`);
    }

    const wm = {};

    for (const idx in idx2weight) {
        const weight = idx2weight[idx];
        if (weight <= 0) {
            continue;
        }

        const id = idx2id[idx];
        if (!(id in wm)) {
            wm[id] = {};
        }

        wm[id][idx] = weight;
    }

    DEBUG(`wm: ${JSON.stringify(wm)}`);

    return { id2count, idx2weight, wm };
}

function rollIndex(v1weights, v2weights, context, id2count, wm) {
    const { currDrawIndex } = context;
    const weight2id = {};
    const wa = [];
    const wi = [];

    for (const v1weight of v1weights) {
        const { id, weight } = v1weight;
        weight2id[weight] = id;
        if (id2count[id] > 0) {
            wa.push(weight);
            wi.push(id);
        }
    }

    DEBUG(`wa: ${JSON.stringify(wa)}`);

    const oldId2Count = {};

    for (const v2weight of v2weights) {
        const id = v2weight.id;
        oldId2Count[id] = id in oldId2Count ? oldId2Count[id] + 1 : 1;
    }

    const targetId = OUTFIT;
    let w1, id_;

    if (currDrawIndex >= GUARANTEE_WHEN_DRAWS && id2count[targetId] >= oldId2Count[targetId]) {
        const v1weight = v1weights.find((v1w) => { return v1w.id == targetId; });
        w1 = { weight: v1weight.weight };
        id_ = targetId;
    } else {
        w1 = rollWeights(wa);
        id_ = wi[w1.index];
    }

    const mp = new Map(Object.entries(wm[id_]));
    const wb = [...mp.values()];

    DEBUG(`id_: ${id_}, w1: ${JSON.stringify(w1)}`);
    DEBUG(`wb: ${JSON.stringify(wb)}`);

    const w2 = rollWeights(wb);

    let seq = 0;
    let idx_ = -1;

    for (const idx in wm[id_]) {
        if (seq++ === w2.index) {
            idx_ = idx;
            break;
        }
    }

    DEBUG(`idx_: ${idx_}, w2: ${JSON.stringify(w2)}`);

    return { id: id_, idx: idx_ };
}

function rollWeights(weights) {
    const totalWeight = weights.reduce((accum, curr) => accum + curr);
    const origin = Math.floor(Math.random() * totalWeight) + 1;
    DEBUG(`totalWeight: ${totalWeight}, origin: ${origin}`);

    if (origin > totalWeight) {
        WARN(`${origin} > ${totalWeight}, weights: ${JSON.stringify(weights)}`);
    }

    let target = origin;
    const result = { index: 0, weight: -1 };

    for (let i = 0; i < weights.length; i += 1) {
      if (weights[i] > 0 && target <= weights[i]) {
        result.index = i;
        result.weight = weights[i];
        break;
      }

      target -= weights[i];
    }

    if (result.weight === -1) {
        WARN(`Unexpected ${origin} ${target} ${totalWeight}, weights: ${JSON.stringify(weights)}`);
    }

    return result;
}
