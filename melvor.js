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
    getFoodCount = () => equippedFood[currentCombatFood].qty
    logger = (s) => {
        console.log(`[${new Date()}] - ${s}`)
    }
    // F(x)
    startLooting = (t) => {
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
    stopLooting = () => {
        if (this.isAutoLooting) {
            clearInterval(this.lootTracker)
            this.lootTracker = 0
            this.isAutoLooting = false
            this.logger("Auto-looter stopped.")
            return
        }
        this.logger("Nothing to do: no auto-looter running.")
    }
    startWatchingFood = (t) => {
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
        this.foodTracker = setInterval(() => {
            if (this.getFoodCount() <= 10) {
                if (currentCombatFood === 2) { // we're completely out of food; exposed by Melvor.
                    stopCombat(false, true, true) // death, stopDungeon, runAway
                    alert("Out of food! Combat ended.")
                    this.logger("Stopped combat due to lack of food.")
                    this.isTrackingFood = false
                    clearInterval(this.foodTracker)
                } else {
                    selectEquippedFood(currentCombatFood+1) // select my next slot of food.
                    this.logger("Swapped food!")
                    // TODO: Add something about adding any bank food.
                    // equipFood(f.BANKID, f.id, f.MAX)
                }
            }
        }, t)
        this.logger("Started watching your food.")
    }
    stopWatchingFood = () => {
        if (this.isTrackingFood) {
            clearInterval(this.foodTracker)
            this.isTrackingFood = false
            this.logger("Stopped tracking food.")
        } else {
            this.logger("Nothing to do: not tracking food.")
        }
    }
    status = () => {
        console.log(`Auto-looting: ${this.isAutoLooting}, Food tracking: ${this.isTrackingFood}, Bank has ${this.foodList.length} eligible food items.`)
    }
    findFood = () => {
        for (i = 0; i < bank.length; i++) {
            thisItem = items[bank[i].id]
            // build a list of food in my bank
            if (thisItem.canEat) {
                f = new MyFood()
                f.id = thisItem.id
                f.name = thisItem.name
                f.bankLocation = i
                this.foodList.push(f)
            }
        }
    }
}
