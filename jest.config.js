const JsConfigPathsMapper = require('jsconfig-paths-jest-mapper');
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: new JsConfigPathsMapper({
    configFileName: './jsconfig.json',
  }),
};

module.exports = createJestConfig(customJestConfig);
