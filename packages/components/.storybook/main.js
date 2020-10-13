
const path = require('path');
const { getCSSModuleLocalIdent } = require('../webpack/getCSSModuleLocalIdent');

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
  "stories": [
    "../src/docs/**/*.stories.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.module.rules.push( {
      test: sassRegex,
      exclude: sassModuleRegex,
      include: path.resolve(__dirname, '../'),
      use: [
        'style-loader',
        {
          loader: require.resolve('css-loader'),
          options:  {
            importLoaders: 3,
            sourceMap: false,
          },
        }, 'sass-loader'],
      sideEffects: true,
    });
    config.module.rules.push({
      test: sassModuleRegex,
      include: path.resolve(__dirname, '../'),
      use: [
        'style-loader',
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 3,
            sourceMap: false,
            modules: {
              getLocalIdent: getCSSModuleLocalIdent,
            },
          },
        }, 'sass-loader'],
    });

   // config.output.publicPath = path.resolve(__dirname, './assets');

    // Return the altered config
    return config;
  },
}