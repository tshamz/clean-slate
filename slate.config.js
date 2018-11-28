/* eslint-disable */

// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

const path = require('path');
const { ProvidePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [
  new ProvidePlugin({
    '$': 'jquery',
    'jQuery': 'jquery',
    'window.$': 'jquery',
    'window.jQuery': 'jquery',
    'PubSub': 'pubsub-js',
  }),
  new CopyWebpackPlugin(
    { from: 'src/snippets/*', to: 'dist/snippets', flatten: true },
    { from: 'src/sections/*', to: 'dist/sections', flatten: true }
  ),
];

const alias = {
  // 'jquery': path.resolve('./node_modules/jquery'),
  'lodash-es': path.resolve('./node_modules/lodash-es'),
};

module.exports = {
  'eslint.config': '.eslintrc.js',
  'cssVarLoader.liquidPath': ['src/snippets/css-variables.liquid'],
  'webpack.extend': {
    plugins,
    resolve: { alias },
  },
};
