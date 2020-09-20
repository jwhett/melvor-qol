/* eslint-disable no-unused-vars, no-undef */
function combatAutoEat() {
    const missingHP = maxHitpoints - combatData.player.hitpoints;
    if (equippedFood[currentCombatFood].qty > 0 && combatData.player.hitpoints < maxHitpoints) {
        if (missingHP >= items[equippedFood[currentCombatFood].itemID].healsFor * 10) {
            eatFood();
        }
    }
    if (equippedFood[currentCombatFood].qty === 0) {
        lootAll();
        stopCombat();
    }
}
