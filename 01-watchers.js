function Watcher(fn, interval, type, ...args) {
    this.fn = fn
    this.interval = interval
    this.type = type
    this.args = args
}

Watcher.prototype.start = function () {
    if (this.intervalID == null) return // either null or undefined
    this.intervalID = setInterval(this.fn, this.interval, ...this.args)
    this.startTime = new Date().getTime()
};

Watcher.prototype.stop = function () {
    if (this.intervalID == null) return // either null or undefined
    clearInterval(this.intervalID)
    this.intervalID = null
    console.log(`Ran for ${this.duration()} seconds`)
};

Watcher.prototype.restart = function () {
    this.stop()
    this.start()
};

Watcher.prototype.duration = function () {
    let d = Math.floor((new Date().getTime() - this.startTime)/1000)
    if (isNaN(d)) {
        return 0
    } else {
        return d
    }
};
