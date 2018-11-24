const EventEmmiter = require("events");
const sleep = require("util").promisify(setTimeout);

class Expelliarmus extends EventEmmiter {
  constructor(loadResource, threshold, timeout) {
    super();
    this._loadResource = loadResource;
    this._threshold = threshold;
    this._timeout = timeout;
    this._failureCount = 0;
    this._errCount = 0;
    this._close = "OPEN";
    this._halfOpen = "HALFOPEN";
    this._open = "OPEN";
    this._state;
    this._test = 1;
  }

  async run() {
    try {
      let response = await this._loadResource();
      this.resetFailureCount();
      // closed state
      this.emit("close");
      return Promise.resolve(response);
    } catch (ex) {
      this._errCount++;
      this.incrementFailureCount();

      if (this._threshold === this._errCount) {
        return Promise.reject(false);
      }

      if (this.isFirstFailure()) {
        this._state = this._open;
      } else if (this._failureCount > 1 && this._state === this._open) {
        this._state = this._halfOpen;
        this.resetFailureCount();
      }

      // open state
      if (this._state === this._open) {
        await sleep(this._timeout);
        this.emit("open");
        return this.run();
      }
      // half open state
      if (this._state === this._halfOpen) {
        this._state = this._halfOpen;
        this.emit("halfOpen");
        return this.run();
      }
    }
  }

  // check if it's first failure
  isFirstFailure() {
    if (this._failureCount === 1) {
      return true;
    }

    return false;
  }

  // increment failure counter
  incrementFailureCount() {
    this._failureCount++;
  }

  // reset failure counter to 0
  resetFailureCount() {
    this._failureCount = 0;
  }
}

module.exports = Expelliarmus;
