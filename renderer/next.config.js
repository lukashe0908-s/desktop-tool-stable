const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  distDir: '../build/out',
  // outputFileTracing: false,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.ttf$/,
      type: 'asset/resource',
    });
    if (!isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ['javascript', 'typescript'],
          filename: 'static/[name].worker.js',
        })
      );
    }
    // Important: return the modified config
    return config;
  },
};
