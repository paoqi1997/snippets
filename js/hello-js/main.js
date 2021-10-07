'use strict';

const axios = require('axios');
const fs    = require('fs');
const path  = require('path');

const image      = 'nginx';
const parentPath = path.join(__dirname, 'tags');
const filePath   = path.join(parentPath, `${image}.tags`);

function writeToFile(tags) {
    fs.writeFile(filePath, tags.join('\n') + '\n', err => {
        if (err) {
            console.log(err);
        }
    });
}

axios({
    'method': 'get',
    'url': 'https://auth.docker.io/token',
    'params': {
        'service': 'registry.docker.io',
        'scope': `repository:library/${image}:pull`
    }
}).then(response => {
    const token = response.data.token;

    axios({
        'method': 'get',
        'url': `https://registry.hub.docker.com/v2/library/${image}/tags/list`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        const tags = response.data.tags;

        fs.access(parentPath, fs.constants.F_OK, err => {
            if (err) {
                fs.mkdir(parentPath, err => {
                    if (err) {
                        console.log(err);
                    } else {
                        writeToFile(tags);
                    }
                });
            } else {
                writeToFile(tags);
            }
        });
    }).catch(error => {
        console.log(error.response.data);
    });
}).catch(error => {
    console.log(error.response.data);
});
