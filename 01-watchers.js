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
    console.log(`Ran for ${this.duration()} seconds`);
    this.intervalID = null;
    this.startTime = null;
};

Watcher.prototype.restart = function () {
    this.stop();
    this.start();
};

Watcher.prototype.duration = function () {
    if (this.startTime == null) return;
    return Math.floor((new Date().getTime() - this.startTime) / 1000);
};
