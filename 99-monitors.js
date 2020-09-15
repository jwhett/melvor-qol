var watchers={}
for (t of ["Junk", "Gem", "Havest", "Logs"]) {
    watchers[t] = new Watcher(sellAllOfType, 120000, t, t)
}
watchers.Farming = new Watcher(reapAndSow, 120000, "Farming")
watchers.Looting = new Watcher(lootAll, 30000, "Looting")
watchers.Token = new Watcher(learnTokens, 30000, "Tokens")
for (watcher in watchers) {watchers[watcher].start()}
watchers.Eating = new Watcher(combatAutoEat, 1500, "Eating")
watchers.Food = new Watcher(foodTracker, 10000, "Food")
watchers.Fire = new Watcher(lightCookingFire, fireIntervalMin-5000, "Fire")
