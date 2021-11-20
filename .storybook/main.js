const { PHASE_PRODUCTION_BUILD } = require('next/constants');
const { findPagesDir } = require('next/dist/lib/find-pages-dir');
const loadConfig = require('next/dist/server/config').default;
const getWebpackConfig = require('next/dist/build/webpack-config').default;

const CWD = process.cwd();

async function webpackFinal(config) {
  const pagesDir = findPagesDir(CWD);
  const nextConfig = await loadConfig(PHASE_PRODUCTION_BUILD, CWD);
  const nextWebpackConfig = await getWebpackConfig(CWD, {
    pagesDir,
    entrypoints: {},
    isServer: false,
    target: 'server',
    config: nextConfig,
    buildId: 'storybook',
    rewrites: { beforeFiles: [], afterFiles: [], fallback: [] },
  });

  // Use nextjs's resolve rules so we can get the correct modules.
  config.resolve = {
    ...config.resolve,
    ...nextWebpackConfig.resolve,
  };

  return config;
}

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    'storybook-addon-next-router',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  webpackFinal,
};
