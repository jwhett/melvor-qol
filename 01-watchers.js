function Watcher(fn, interval, type, ...args) {
    this.fn = fn
    this.interval = interval
    this.type = type
    this.args = args
}

Watcher.prototype.start = function () {
    this.intervalID = setInterval(this.fn, this.interval, ...this.args)
    this.startTime = new Date().getTime()
};

Watcher.prototype.stop = function () {
    clearInterval(this.intervalID)
    this.intervalID = undefined
    console.log(`Ran for ${this.duration()} seconds`)
};

Watcher.prototype.duration = function () {
    return Math.floor((new Date().getTime() - this.startTime)/1000)
};
