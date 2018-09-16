/* eslint-disable no-undef */

const path = require('path');

const { ProvidePlugin } = require('webpack');

const alias = {
  'slick': path.resolve('./node_modules/slick-carousel'),
  'styles': path.resolve('./src/assets/styles'),
  'scripts': path.resolve('./src/assets/scripts'),
};

const rules = [
  {
    test: require.resolve('jquery'),
    use: [{
      loader: 'expose-loader',
      options: '$'
    }]
  },
  {
    test: /snippets\//,
    loader: 'file-loader',
    options: {
      name: `../snippets/[name].[ext]`,
    }
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
  slateCssVarLoader: {
    cssVarLoaderLiquidPath: ['src/snippets/base/css-variables.liquid'],
  },
  slateTools: {
    webpackCommonExcludes: [
      'node_modules',
      'assets/static/',
      'snippets/',
    ],
    extends: {
      dev: {
        plugins,
        resolve: { alias },
        module: { rules },
      },
      prod: {
        plugins,
        resolve: { alias },
        module: { rules },
      },
    },
  },
};
