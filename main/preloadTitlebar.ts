require('./preload');

import { Titlebar } from 'custom-electron-titlebar';

window.addEventListener('DOMContentLoaded', () => {
  new Titlebar({
    // title bar options
    titleHorizontalAlignment: 'left',
  });
});
