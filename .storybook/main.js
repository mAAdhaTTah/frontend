export const stories = [
  '../src/**/*.mdx',
  '../src/**/*.stories.@(js|jsx|ts|tsx)',
];

export const addons = ['@storybook/addon-docs', '@chromatic-com/storybook'];

export const framework = {
  name: '@storybook/nextjs',
  options: { nextConfigPath: '../next.config.mjs' },
};
