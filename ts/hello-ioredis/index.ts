import { promises as fs } from 'fs';

import path from 'path';

import Redis from 'ioredis';
import m from 'moment';

async function main() {
    const scriptPath = path.join(__dirname, 'script.lua');
    const script = await fs.readFile(scriptPath);

    const redis = new Redis();

    const key = 'queue';
    const data = m().format('YYYY-MM-DD HH:mm:ss');

    const evalResult = await redis.eval(script, 1, key, 10, data);
    console.log(evalResult);

    const lrangeResult = await redis.lrange(key, 0, 9);
    console.log(lrangeResult);
}

main();
