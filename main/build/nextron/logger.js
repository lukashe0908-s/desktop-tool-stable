const info = text => {
  import('chalk').then(chalk => {
    console.log(`${chalk.default.cyan('[nextron]')} ${text}`);
  });
};

const error = message => {
  import('chalk').then(chalk => {
    console.log(`${chalk.default.cyan('[nextron]')} ${chalk.red(message)}`);
  });
};

module.exports = { info, error };
