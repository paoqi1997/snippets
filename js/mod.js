'use strict';

const cp = require('child_process');
const os = require('os');

exports.getNodeVersion = () => {
    if (os.platform() !== 'win32') {
        return 'unknown';
    }

    const p = cp.spawnSync('node', ['--version']);

    if (p.stdout) {
        const sData = String(p.stdout);
        const sVersion = sData.trimEnd().slice(1);
        return sVersion;
    } else {
        return 'unknown';
    }
}
