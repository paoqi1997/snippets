'use strict';

function main() {
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

    {
        const { id2count, wm } = calNewWights(v1weights, v2weights, pool);
        const index = rollIndex(v1weights, v2weights, 10, id2count, wm);
        console.log(index);
    }

    pool['1'] = 1;

    const { id2count, wm } = calNewWights(v1weights, v2weights, pool);
    const index = rollIndex(v1weights, v2weights, 10, id2count, wm);
    console.log(index);
}

main();

function calNewWights(v1weights, v2weights, pool) {
    const totalWeight = v1weights.reduce((accum, x) => accum + x.weight, 0);
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

    console.log(`wm: ${JSON.stringify(wm)}`);

    return { id2count, ww: idx2weight, wm };
}

function rollIndex(v1weights, v2weights, currDrawIndex, id2count, wm) {
    const weight2id = {};
    const wa = [];

    for (const v1weight of v1weights) {
        const { id, weight } = v1weight;
        weight2id[weight] = id;
        if (id2count[id] > 0) {
            wa.push(weight);
        }
    }

    console.log(`wa: ${JSON.stringify(wa)}`);

    const oldId2Count = {};

    for (const v2weight of v2weights) {
        const id = v2weight.id;
        oldId2Count[id] = id in oldId2Count ? oldId2Count[id] + 1 : 1;
    }

    const targetId = '1';
    let w1;

    if (currDrawIndex >= 10 && id2count[targetId] >= oldId2Count[targetId]) {
        const v1weight = v1weights.find((v1w) => { return v1w.id == targetId; });
        w1 = { weight: v1weight.weight };
    } else {
        w1 = rollWeights(wa);
    }

    console.log(`w1: ${JSON.stringify(w1)}`);

    const id_ = weight2id[w1.weight];
    const mp = new Map(Object.entries(wm[id_]));
    const wb = [...mp.values()];

    console.log(`id_: ${id_}, wb: ${JSON.stringify(wb)}`);

    const w2 = rollWeights(wb);

    let idx_ = -1;
    for (const idx in wm[id_]) {
        if (wm[id_][idx] === w2.weight) {
            idx_ = idx;
            break;
        }
    }

    console.log(`idx_: ${idx_}`);

    return { id: id_, idx: idx_ };
}

function rollWeights(weights) {
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
