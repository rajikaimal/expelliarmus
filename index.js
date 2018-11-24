const expelliarmus = require("./lib/breaker");

function createBreaker(loadResource, options) {
  const exp = new expelliarmus(
    loadResource,
    options.threshold,
    options.timeout
  );
  return exp;
}

const circuitBreakerFactory = function() {
    return createBreaker;
}

module.exports = circuitBreakerFactory;
