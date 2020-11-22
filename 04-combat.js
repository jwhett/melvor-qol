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
