const setupGenerator = require('./generators/setup');

module.exports = (plop) => {
  plop.setGenerator('setup', setupGenerator);
};
