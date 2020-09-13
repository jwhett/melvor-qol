class MyFood {
    id
    name
    bankLocation
    BANKID = 0
    MAX = 6969696969
}

class MelvorDriver {
    // Helpers
    lootTracker
    foodTracker
    foodList = []
    isAutoLooting = false
    isTrackingFood = false
}

MelvorDriver.prototype.isOutOfFood = () => equippedFood[0].itemID === equippedFood[1].itemID && equippedFood[0].itemID === equippedFood[2].itemID
MelvorDriver.prototype.getFoodCount = () => equippedFood[currentCombatFood].qty
MelvorDriver.prototype.logger = (s) => console.log(`[${new Date()}] - ${s}`)
MelvorDriver.prototype.startLooting = function (t) {
    // loot everything every t ms
    if (t == null) {
        this.logger("Usage: startLooting(t) where 't' is interval in ms.")
        return
    }
    if (this.isAutoLooting) {
        this.logger("Nothing to do: auto-looter already running.")
    } else {
        this.lootTracker = setInterval(lootAll, t);
        this.isAutoLooting = true
        this.logger("Auto-loot enabled!")
    }
}
MelvorDriver.prototype.stopLooting = function () {
    if (this.isAutoLooting) {
        clearInterval(this.lootTracker)
        this.lootTracker = 0
        this.isAutoLooting = false
        this.logger("Auto-looter stopped.")
        return
    }
    this.logger("Nothing to do: no auto-looter running.")
}
MelvorDriver.prototype.findFood = function () {
    for (i = 0; i < bank.length; i++) {
        var thisItem = items[bank[i].id]
        // build a list of food in my bank
        if (thisItem.canEat) {
            var f = new MyFood()
            f.id = thisItem.id
            f.name = thisItem.name
            f.bankLocation = i
            this.foodList.push(f)
        }
    }
}
MelvorDriver.prototype.startWatchingFood = function (t) {
    if (t == null) {
        this.logger("Usage: startWatchingFood(t) where 't' is interval in ms.")
        return
    }
    if (this.isTrackingFood) {
        this.logger("Nothing to do: already watching food.")
        return
    }
    // Start monitoring food every t ms.
    this.isTrackingFood = true
    this.findFood() // find any eligible food in our bank
    this.foodTracker = setInterval(() => {
        if (this.getFoodCount() > 0) return // we have equipped food to eat
        if (this.isOutOfFood() && this.foodList.length === 0) { // completely out of food
            stopCombat(false, true, true) // death, stopDungeon, runAway
            notifyPlayer(CONSTANTS.skill.Attack, "Out of food! Combat ended.")
            this.logger("Stopped combat due to lack of food.")
            this.isTrackingFood = false
            clearInterval(this.foodTracker)
        } else { // we have food somewhere but need to equip it
            for (var i=0; i++; i < equippedFood.length) {
                console.log("We are looking for food")
                if (equippedFood[i].qty > 0) {
                    selectEquippedFood(equippedFood[i])
                    this.logger(`Swapped to food in slot ${i}!`)
                    return
                }
            }
            // We don't have any additional food equipped to swap
            // to if we're here, but we must have something in the bank.
            f = this.foodList.pop()
            equipFood(f.BANKID, f.id, f.MAX)
            this.logger(`Equipped ${f.name} from the bank since we didn't have food equipped.`)
        }
    }, t)
    this.logger("Started watching your food.")
}
MelvorDriver.prototype.stopWatchingFood = function () {
    if (this.isTrackingFood) {
        clearInterval(this.foodTracker)
        this.isTrackingFood = false
        this.logger("Stopped tracking food.")
    } else {
        this.logger("Nothing to do: not tracking food.")
    }
}
MelvorDriver.prototype.stopAll = function () {
    this.stopWatchingFood()
    this.stopLooting()
}
MelvorDriver.prototype.status = function () {
    this.logger(`Auto-looting: ${this.isAutoLooting}, Food tracking: ${this.isTrackingFood}, Bank has ${this.foodList.length} eligible food items.`)
}
