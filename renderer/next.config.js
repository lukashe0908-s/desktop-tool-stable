const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  distDir: '../build/out',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // config.plugins.push(new MonacoWebpackPlugin());
    // Important: return the modified config
    return config;
  },
};
