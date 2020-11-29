module.exports = {
  plugins: [
    'postcss-import',
    ['tailwindcss', require('./tailwind.config.js')],
    'postcss-nested',
    'postcss-for',
    'postcss-arithmetic',
    'autoprefixer',
    'postcss-google-font',
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './src/pages/**/*.{js,jsx,ts,tsx}',
          './src/components/**/*.{js,jsx,ts,tsx}',
          './src/hooks/**/*.{js,jsx,ts,tsx}',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      },
    ],
  ],
};
