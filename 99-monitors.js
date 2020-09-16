var watchers={}
for (t of ["Junk", "Gem", "Havest", "Logs"]) {
    watchers[t] = new Watcher(sellAllOfType, 120000, t, t)
}
watchers.Bones = new Watcher(buryBones, 15000, "Bones")
watchers.Food = new Watcher(foodTracker, 10000, "Food")
watchers.Looting = new Watcher(lootAll, 15000, "Looting")
watchers.Token = new Watcher(learnTokens, 15000, "Tokens")
watchers.Fire = new Watcher(lightCookingFire, 250, "Fire")
watchers.Eating = new Watcher(combatAutoEat, 1500, "Eating")
watchers.Farming = new Watcher(reapAndSow, 60000, "Farming")
watchers.Save = new Watcher(saveAndDownload, 1600000, "Game Saving")
watchers.Burnt = new Watcher(sellAllOfNameSubstring, 5000, "Burnt Food", "Burnt")
watchers.Feathers = new Watcher(sellAllOfNameSubstring, 5000, "Feathers", "Feathers")
// for (watcher in watchers) {watchers[watcher].start()}
