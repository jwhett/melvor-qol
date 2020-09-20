/* eslint-disable func-names, no-console */
function Watcher(fn, interval, type, ...args) {
    this.fn = fn;
    this.interval = interval;
    this.type = type;
    this.args = args;
}

Watcher.prototype.start = function () {
    if (this.intervalID != null) return; // either null or undefined
    this.intervalID = setInterval(this.fn, this.interval, ...this.args);
    this.startTime = new Date().getTime();
};

Watcher.prototype.stop = function () {
    if (this.intervalID == null) return; // either null or undefined
    clearInterval(this.intervalID);
    this.intervalID = null;
    console.log(`Ran for ${this.duration()} seconds`);
};

Watcher.prototype.restart = function () {
    this.stop();
    this.start();
};

Watcher.prototype.duration = function () {
    const d = Math.floor((new Date().getTime() - this.startTime) / 1000);
    /* eslint-disable no-restricted-globals */
    if (isNaN(d)) {
        return 0;
    }
    return d;
    /* eslint-enable no-restricted-globals */
};
