module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')('./tailwind.js'),
    require('postcss-nested'),
    require('postcss-for'),
    require('postcss-arithmetic'),
    require('autoprefixer'),
  ],
};
