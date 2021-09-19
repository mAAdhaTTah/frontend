const JsConfigPathsMapper = require('jsconfig-paths-jest-mapper');

module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: new JsConfigPathsMapper({
    configFileName: './jsconfig.json',
  }),
};
