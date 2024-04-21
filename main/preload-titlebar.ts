require('./preload');
import { Titlebar } from 'custom-electron-titlebar';
try {
  window.addEventListener('DOMContentLoaded', () => {
    // Title bar implementation
    new Titlebar({});
  });
} catch {}
