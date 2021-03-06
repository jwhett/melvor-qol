/* eslint-disable no-unused-vars, no-undef */
function combatAutoEat(healWhenMissing = null) {
    if (!isInCombat) {
        return;
    }
    const missingHP = maxHitpoints - combatData.player.hitpoints;
    if (healWhenMissing === null) {
        // if i have food and am missing some amount of HP
        if (equippedFood[currentCombatFood].qty > 0 && combatData.player.hitpoints < maxHitpoints) {
            // if i'm missing enough HP for my food to heal
            if (missingHP >= items[equippedFood[currentCombatFood].itemID].healsFor * 10) {
                eatFood(efficiency = 100, autoEat = true);
            }
        }
    } else if (missingHP >= healWhenMissing) {
            eatFood(efficiency = 100, autoEat = true);
    }
    // loot and exit combat if i'm out of food now
    if (equippedFood[currentCombatFood].qty === 0) {
        lootAll();
        stopCombat();
    }
}

function getCurrentEnemy() {
    if (!isInCombat) return;
    return MONSTERS[enemyInCombat];
}

const AttackTypes = [ 'melee', 'range', 'magic' ]

const PrayerMap = {
    'magic': 15,
    'range': 16,
    'melee': 17
}

function noPrayers() {
    for (var i=0; i<activePrayer.length; i++) {
        if (activePrayer[i]) {
            togglePrayer(i)
        }
    }
}

function avoidBoss() {
    if (!isInCombat) {
        return; // no need to check if out of combat
    }
    let avoid
    try {
        avoid = PrayerMap[AttackTypes[getCurrentEnemy().attackType]]
    } catch(err) {
        return // try again later
    }
    if (getCurrentEnemy().isBoss) {
        // Fighting a boss, turn on avoidance prayer
        if (!activePrayer[avoid]) {
            togglePrayer(avoid);
        }
    } else {
        // Not fighting a boss, clear the avoidance prayers
        for (let p in PrayerMap) {
            if (activePrayer[PrayerMap[p]]) {
                togglePrayer(PrayerMap[p]);
            }
        }
    }
}

function slayerWatcher() {
    let slayerTarget
    try {
        slayerTarget = slayerTask[0].monsterID;
    } catch(err) {
        return; // probably between enemy spawns
    }
    if (getCurrentEnemy().id === slayerTarget) return; // same task
    try {
        jumpToEnemy(slayerTarget); // new enemy
    } catch(err) {
        // couldn't jump to next slayer target
        newSlayerTask(); // get new task
        slayerWatcher(); // evaluate current situation
    }
}
