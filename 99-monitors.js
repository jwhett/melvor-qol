/* eslint-disable no-undef, no-restricted-syntax, no-unused-vars, no-console */
const watchers = {};
for (t of ['Junk', 'Gem', 'Havest', 'Logs']) {
    watchers[t] = new Watcher(sellAllOfType, 120000, t, t);
}
watchers.Bones = new Watcher(buryBones, 15000, 'Bury bones');
watchers.Sort = new Watcher(sortBank, 60000, "Bank Sorting");
watchers.Looting = new Watcher(lootAll, 15000, 'Auto-looting');
watchers.Token = new Watcher(learnTokens, 15000, 'Learn tokens');
watchers.Farming = new Watcher(reapAndSow, 60000, 'Auto-farming');
watchers.Fire = new Watcher(lightCookingFire, 250, 'Cooking fire');
watchers.Eating = new Watcher(combatAutoEat, 1500, 'Combat eating');
watchers.Food = new Watcher(foodTracker, 10000, 'Combat food swap');
watchers.Save = new Watcher(saveAndDownload, 1600000, 'Game saving');
watchers.Burnt = new Watcher(sellAllOfNameSubstring, 5000, 'Burnt food seller', 'Burnt');
watchers.Feathers = new Watcher(sellAllOfNameSubstring, 5000, 'Feather seller', 'Feathers');
// for (watcher in watchers) {watchers[watcher].start()}

function showWatchers() {
    console.log(`Status as of ${new Date()}:`);
    for (w in watchers) {
        if (watchers[w].duration() > 0) {
            console.log(` => [ RUNNING ] ${watchers[w].type} running for ${watchers[w].duration()} seconds.`);
        } else {
            console.log(` => [ OFFLINE ] ${watchers[w].type}`);
        }
    }
}
