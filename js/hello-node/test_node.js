'use strict';

const mod = require('./mod');

mod.getNodeVersion().then((sVersion) => {
    console.log(sVersion);
});

console.log(mod.getNodeVersionSync());
