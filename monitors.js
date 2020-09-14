var watchers=[];["Junk", "Gem", "Havest", "Logs"].forEach((t) => watchers.push(new Watcher(sellAllOfType, 120000, t)))
var myMonitors={}; watchers.forEach(watcher => myMonitors[watcher.type] = watcher)
