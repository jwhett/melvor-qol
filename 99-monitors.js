var watchers={}
for (t of ["Junk", "Gem", "Havest", "Logs"]) {
    watchers[t] = new Watcher(sellAllOfType, 120000, t, t)
}
watchers.Bones = new Watcher(buryBones, 30000, "Bones")
watchers.Food = new Watcher(foodTracker, 10000, "Food")
watchers.Looting = new Watcher(lootAll, 30000, "Looting")
watchers.Token = new Watcher(learnTokens, 30000, "Tokens")
watchers.Eating = new Watcher(combatAutoEat, 1500, "Eating")
watchers.Farming = new Watcher(reapAndSow, 120000, "Farming")
watchers.Fire = new Watcher(lightCookingFire, fireIntervalMin-5000, "Fire")
watchers.Burnt = new Watcher(sellAllOfNameSubstring, 10000, "Burnt Food", "Burnt")
watchers.Feathers = new Watcher(sellAllOfNameSubstring, 10000, "Feathers", "Feathers")

// for (watcher in watchers) {watchers[watcher].start()}
