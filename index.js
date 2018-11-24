const expelliarmus = require("./lib/expelliarmus");

function createBreaker(loadResource, options) {
  const exp = new expelliarmus(
    loadResource,
    options.threshold,
    options.timeout
  );
  return exp;
}

module.exports = { createBreaker };
