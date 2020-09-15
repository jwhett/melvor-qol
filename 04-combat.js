function combatAutoEat() {
    if (equippedFood[currentCombatFood].qty > 0 && combatData.player.hitpoints < maxHitpoints) {
        if (combatData.player.hitpoints <= items[equippedFood[currentCombatFood].itemID].healsFor) {
            eatFood(100, true)
        }
    }
}
