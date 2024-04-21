const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const getNextronConfig = require('./getNextronConfig');
const baseConfig = require('./webpack.config.base');

const { webpack: userWebpack } = getNextronConfig();

let config = webpackMerge.merge(baseConfig, {
  mode: 'development',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
  devtool: 'inline-source-map',
});

if (typeof userWebpack === 'function') {
  config = userWebpack(config, 'development');
}

module.exports = config;
