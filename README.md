# expelliarmus

🎃 Circuit breaker implementation in Node.js

## Usage

```js
const expelliarmusFactory = require("expelliarmus");

function loadResource() {
  return Promise.resolve();
}

const expelliarmus = expelliarmusFactory.createBreaker(loadResource, {
  threshold: 3, // no.of max retries
  timeout: 3000 // ms
});

expelliarmus
  .run()
  .then(res => console.log("Success", res))
  .catch(err => console.log("Failed", err));

expelliarmus.on("open", () => {
  console.log("OPENED callback");
});

expelliarmus.on("halfOpen", () => {
  console.log("HALFOPEN callback");
});

expelliarmus.on("close", () => {
  console.log("CLOSED callback");
});
```

# License

MIT © [rajikaimal](https://github.com/rajikaimal)
