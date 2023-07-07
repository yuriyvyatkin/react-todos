const path = require('path');

module.exports = function override(config, env) {
  config.resolve.alias['@'] = path.resolve(__dirname, 'src');

  if (env === 'test') {
    config.moduleNameMapper['^@/(.*)$'] = '<rootDir>/src/$1';
  }

  return config;
};
