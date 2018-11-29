/* eslint-disable */

// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

const path = require('path');
const { ProvidePlugin } = require('webpack');

const externals = {
  jquery: 'jQuery',
};

const plugins = [
  new ProvidePlugin({
    '$': 'jquery',
    'jQuery': 'jquery',
    'window.$': 'jquery',
    'window.jQuery': 'jquery',
  }),
];

const alias = {
  'styles': path.resolve('./src/styles'),
  'scripts': path.resolve('./src/scripts'),
};

module.exports = {
  'eslint.config': '.eslintrc.js',
  'cssVarLoader.liquidPath': ['src/snippets/css-variables.liquid'],
  'webpack.extend': {
    externals,
    plugins,
    resolve: { alias },
  },
};
