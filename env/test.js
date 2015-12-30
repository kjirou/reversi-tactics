process.env.NODE_ENV = 'test';
process.env.NODE_PATH = [
  __dirname + '/..'
].join(':');
require('module')._initPaths();
