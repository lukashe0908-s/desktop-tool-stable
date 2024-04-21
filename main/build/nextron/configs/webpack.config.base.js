const fs = require('fs');
const path = require('path');
const TsconfigPathsPlugins = require('tsconfig-paths-webpack-plugin');
const getNextronConfig = require('./getNextronConfig');
const getBabelConfig = require('./getBabelConfig');

const cwd = process.cwd();
const isTs = fs.existsSync(path.join(cwd, 'tsconfig.json'));
const ext = isTs ? '.ts' : '.js';
const externals = require(path.join(cwd, 'package.json')).dependencies;

const { mainSrcDir } = getNextronConfig();
const backgroundPath = path.join(cwd, mainSrcDir || 'main', `background${ext}`);
const preloadPath = path.join(cwd, mainSrcDir || 'main', `preload${ext}`);
const preloadPath_titlebar = path.join(cwd, mainSrcDir || 'main', `preload_titlebar${ext}`);

const entry = {
  background: backgroundPath,
};
if (fs.existsSync(preloadPath)) {
  entry.preload = preloadPath;
}
if (fs.existsSync(preloadPath_titlebar)) {
  entry.preload_titlebar = preloadPath_titlebar;
}

const baseConfig = {
  target: 'electron-main',
  entry,
  output: {
    filename: '[name].js',
    path: path.join(cwd, 'app'),
    library: {
      type: 'umd',
    },
  },
  externals: [...Object.keys(externals || {})],
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            extends: getBabelConfig(),
          },
        },
        exclude: [/node_modules/, path.join(cwd, 'renderer')],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: ['node_modules'],
    plugins: [isTs ? new TsconfigPathsPlugins() : null].filter(Boolean),
  },
  stats: 'errors-only',
  node: {
    __dirname: false,
    __filename: false,
  },
};
module.exports = baseConfig;
