function Watcher(fn, interval, type) {
    this.fn = fn
    this.interval = interval
    this.type = type
}

Watcher.prototype.watch = function () {
    this.intervalID = setInterval(this.fn, this.interval, this.type)
    this.startTime = new Date().getTime()
};

Watcher.prototype.stopWatching = function () {
    clearInterval(this.intervalID)
    this.intervalID = undefined
};

Watcher.prototype.duration = function () {
    return Math.floor((new Date().getTime() - this.startTime)/1000) + " seconds"
};
