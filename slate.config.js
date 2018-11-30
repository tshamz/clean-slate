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
    'PubSub': 'pubsub-js',
  }),
];

const alias = {
  'styles': path.resolve('./src/styles'),
  'scripts': path.resolve('./src/scripts'),
  'common': path.resolve('./src/scripts/common'),
  'components': path.resolve('./src/scripts/components'),
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
