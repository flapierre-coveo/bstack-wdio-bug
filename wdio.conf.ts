import { Local as BrowserstackLocal } from 'browserstack-local';

const commonOptions = {
  project: 'tests',
  build: 'Tests',
  'bstack:options': {
    os: 'Windows',
    osVersion: '10',
    debug: 'true'
  }
}

const config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  runner: 'local',
  specs: ['./test/*.ts'],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      browserName: 'chrome',
      ...commonOptions
    }
  ],
  bail: 0,
  baseUrl: 'http://localhost',
  waitforTimeout: 10000,
  connectionRetryTimeout: 30000,
  connectionRetryCount: 2,
  framework: 'mocha',
  reporters: [
    'spec',
    [
      'junit',
      {
        outputDir: './test-results',
        outputFileFormat: function(options) {
          return `functional.browserstack.${options.cid}.xml`;
        }
      }
    ]
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    require: ['tsconfig-paths/register']
  },

  onPrepare: function(config, capabilities) {
    //Start browserstack local before start of test.
    console.log('Connecting local');
    return new Promise(function(resolve, reject) {
      exports.bs_local = new BrowserstackLocal();
      exports.bs_local.start({ key: exports.config.key }, function(error) {
        if (error) {
          return reject(error);
        }
        console.log('Connected. Now testing...');

        resolve();
      });
    });
  },

  onComplete: function(capabilties, specs) {
    // Stop browserstack local after all tests are finished.
    exports.bs_local.stop(function() {});
  }
};

export { config };
