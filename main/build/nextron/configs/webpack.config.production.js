const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const getNextronConfig = require('./getNextronConfig');
const baseConfig = require('./webpack.config.base');

const { webpack: userWebpack } = getNextronConfig();

let config = webpackMerge.merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
      START_MINIMIZED: false,
    }),
    new webpack.DefinePlugin({
      'process.type': '"browser"',
    }),
  ],
  devtool: 'source-map',
});

if (typeof userWebpack === 'function') {
  config = userWebpack(config, 'development');
}

const compiler = webpack(config);

compiler.run((error, stats) => {
  if (error) {
    console.error(error.stack || error);
  }

  if (stats) {
    console.log(stats.toString());
  }
});
