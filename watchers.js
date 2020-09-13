function Watcher(fn, duration, type) {
    this.fn = fn
    this.duration = duration
    this.type = type
}

Watcher.prototype.watch = function () => {
    this.intervalID = setInterval(this.fn, this.duration, this.type)
};

Watcher.prototype.stopWatching = function () {
    clearInterval(this.intervalID)
    this.intervalID = undefined
};
