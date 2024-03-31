// File to generate the service worker.
require('dotenv').config();
const workboxBuild = require('workbox-build');
const { NODE_ENV } = process.env;
const urlPattern = new RegExp(`/\/static|_next|float\/.*/`);

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
        urlPattern: urlPattern,

        // Apply a cache-first strategy.
        handler: 'CacheFirst',
        options: {
          cacheName: 'desktop-tool',
          expiration: {
            // maxEntries: 50,
            // maxAgeSeconds: 15 * 60,
          },
        },
      },
    ],
  });
};

buildSW();
