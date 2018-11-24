const expelliarmusFactory = require("./index");
const test = require("tape");

function mockFailingResource() {
  return Promise.reject(false);
}

function mockPassingResource() {
  return Promise.resolve(true);
}

test("Should fail for falsy resource response", t => {
  const expelliarmus = expelliarmusFactory.createBreaker(mockFailingResource, {
    threshold: 3, // no.of max retries
    timeout: 500 // ms
  });

  expelliarmus
    .run()
    .catch(err => {
      t.false(err);
      t.end();
    });
});

test("Should pass for truthy resource response", t => {
  const expelliarmus = expelliarmusFactory.createBreaker(mockPassingResource, {
    threshold: 3, // no.of max retries
    timeout: 500 // ms
  });

  expelliarmus.run().then(res => {
    t.true(res);
    t.end();
  });
});
