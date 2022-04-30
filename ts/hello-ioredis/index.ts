import { promisify } from 'util';

import fs from 'fs';
import path from 'path';

import Redis from 'ioredis';
import m from 'moment';

const readFile = promisify(fs.readFile);
const fsPromises = fs.promises;

async function main() {
    const scriptPath = path.join(__dirname, 'script.lua');
    const script = await readFile(scriptPath);

    const key = 'queue';
    const data = m().format('YYYY-MM-DD HH:mm:ss');

    const redis = new Redis();

    const evalResult = await redis.eval(script, 1, key, 10, data);
    console.log(evalResult);

    const lrangeResult = await redis.lrange(key, 0, 9);
    console.log(lrangeResult);
}

main();
