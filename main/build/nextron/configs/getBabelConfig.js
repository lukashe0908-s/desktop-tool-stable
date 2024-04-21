const fs = require('fs');
const path = require('path');

const cwd = process.cwd();

const getBabelConfig = () => {
  if (fs.existsSync(path.join(cwd, '.babelrc'))) return path.join(cwd, '.babelrc');
  if (fs.existsSync(path.join(cwd, '.babelrc.js'))) return path.join(cwd, '.babelrc.js');
  if (fs.existsSync(path.join(cwd, 'babel.config.js'))) return path.join(cwd, 'babel.config.js');
  return path.join(__dirname, '../babel.js');
};
module.exports = getBabelConfig;
