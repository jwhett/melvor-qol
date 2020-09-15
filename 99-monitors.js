var watchers={}
for (t of ["Junk", "Gem", "Havest", "Logs"]) {
    watchers[t] = new Watcher(sellAllOfType, 120000, t, t)
}
watchers.Farming = new Watcher(reapAndSow, 120000, "Farming")
watchers.Food = new Watcher(foodTracker, 10000, "Food")
watchers.Looting = new Watcher(lootAll, 30000, "Looting")
for (watcher in watchers) {watchers[watcher].start()}
