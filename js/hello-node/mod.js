'use strict';

const cp = require('child_process');
const os = require('os');

exports.getNodeVersion = () => {
    if (os.platform() !== 'win32') {
        return 'unknown';
    }

    const p = new Promise((resolve, reject) => {
        const np = cp.spawn('node', ['--version']);

        np.stdout.on('data', (data) => {
            if (data) {
                const sData = String(data);
                const sVersion = sData.trimEnd().slice(1);
                resolve(sVersion);
            } else {
                resolve('unknown');
            }
        });

        np.stderr.on('data', (data) => {
            reject(data);
        });
    });

    return p;
}

exports.getNodeVersionSync = () => {
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
