// File to generate the service worker.
require('dotenv').config();
const workboxBuild = require('workbox-build');
const { NODE_ENV } = process.env;
const urlPattern = new RegExp(`/.*`);

// https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW
const buildSW = () => {
  return workboxBuild.generateSW({
    swDest: 'renderer/public/sw.js',
    clientsClaim: true,
    mode: NODE_ENV,
    skipWaiting: true,
    sourcemap: false,
    runtimeCaching: [
      {
        urlPattern: new RegExp(String.raw`/(static|float/lib)/.*`),
        handler: 'CacheFirst',
        options: {
          cacheName: 'desktop-tool',
          expiration: {
            maxEntries: 500,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          },
        },
      },
      {
        urlPattern: urlPattern,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'desktop-tool',
          expiration: {
            maxEntries: 500,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          },
        },
      },
    ],
  });
};

buildSW();
