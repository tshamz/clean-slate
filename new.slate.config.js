/* eslint-disable no-undef */

const path = require('path');
const SlateConfig = require('@shopify/slate-config');
const commonPaths = require('@shopify/slate-config/common/paths.schema');

const {
  ProvidePlugin,
  HotModuleReplacementPlugin,
  NoErrorsPlugin,
  optimize: { OccurenceOrderPlugin }
} = require('webpack');

const alias = {
  'slick': path.resolve('./node_modules/slick-carousel'),
  'styles': path.resolve('./src/assets/styles'),
  'scripts': path.resolve('./src/assets/scripts'),
};

const rules = [
  {
    test: require.resolve('jquery'),
    use: [{ loader: 'expose-loader', options: '$' }]
  },
  {
    test: /snippets\/(base|core|custom)/,
    loader: 'file-loader',
    // options: {
    //   name: `../snippets/696969696[name].[ext]`,
    // },
    options: {
      name (file) {
        console.log(commonPaths);
        console.log(file);
        return `../snippets/696969696[name].[ext]`
      }
    },
  },
];

const plugins = [
  new ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
  }),
];

module.exports = {

  // An array of string paths to liquid files that associate css variables to liquid variables
  'cssVarLoader.liquidPath': (config) => [
    path.resolve(config.get('paths.theme'), 'src/snippets/base/css-variables.liquid'),
    path.resolve(config.get('paths.theme'), 'src/layout/theme.liquid'),
  ],

  // Paths to exclude for all webpack loaders
  'webpack.commonExcludes': [
    'snippets/base/',
    'snippets/core/',
    'snippets/custom/'
  ],

  'webpack.config.extend.dev': {
    plugins,
    resolve: { alias },
    module: { rules },
  },

  'webpack.config.extend.prod': {
    plugins,
    resolve: { alias }
    module: { rules },
  },
};
