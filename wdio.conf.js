require('ts-node').register({ project: 'tsconfig.json', files: true });
module.exports = require('./wdio.conf.ts');