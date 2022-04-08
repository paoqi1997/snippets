'use strict';

/**
 * http://nodejs.cn
 */
const mod = require('./mod');

async function main() {
    mod.getNodeVersion().then((sVersion) => {
        console.log(sVersion);
    });

    const version = await mod.getNodeVersion();
    console.log(version);

    console.log(mod.getNodeVersionSync());
}

main();
