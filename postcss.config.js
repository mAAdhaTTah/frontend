module.exports = {
  plugins: [
    'postcss-import',
    ['tailwindcss', require('./tailwind.config.js')],
    'postcss-nested',
    'postcss-for',
    'autoprefixer',
  ],
};
