function MyFood (id, name, bankLocation) {
     this.id = id
     this.name = name
     this.bankLocation = bankLocation
     this.BANKID = 0
     this.MAX = 6969696969
}

function allOfTypeInItems(t) {
    return items.filter(i => i.type === t)
}

function allCraftingItems() {
    return items.filter(i => items[i].craftingID !== undefined)
}

function allOfTypeInBank(t) {
    return bank.filter(i => (i.type === t && !i.locked))
}

function sellAllOfType(t) {
    let things = allOfTypeInBank(t)
    things.forEach(thing => {
        sellItem(thing.id)
    })
}

function learnTokens() {
    let tokens = allOfTypeInBank("Token")
    tokens.forEach(token => {
        claimBankToken(0,token.id)
    })
}

function haveMaterialsForCrafting(item) {
    let required = []
    let haveAllRequired
    item.craftReq.forEach(req => {
        required.push(checkBankForItem(req.id))
    })
    if (required.some((thing) => thing === false)) {
        haveAllRequired = false
    } else {
        haveAllRequired = true
    }
    return {haveAllRequired: haveAllRequired, forItem: item}
}

function findFood() {
    let foodList
    let allFoodItems = allOfTypeInBank("Food")
    allFoodItems.forEach((food, location) => {
        foodList.push(new MyFood(food.id, food.name, location))
    });
    return foodList
}

function isOutOfEquippedFood() {
    equippedFood[0].itemID === equippedFood[1].itemID && equippedFood[0].itemID === equippedFood[2].itemID
}

function getEquippedFoodCount() { equippedFood[currentCombatFood].qty }

function nextEquippedFood() {
    for (var i=0; i++; i < equippedFood.length) {
        if (equippedFood[i].qty > 0) {
            selectEquippedFood(equippedFood[i])
            return
        }
    }
}

function foodTracker() {
    if (!isInCombat) return // we're not in combat, don't need to watch food
    let foodList = findFood()
    if (getEquippedFoodCount() > 0) return // we have equipped food to eat
    if (isOutOfEquippedFood() && foodList.length === 0) { // completely out of food
        stopCombat(false, true, true) // death, stopDungeon, runAway
    } else { // we have food in pocket, but need to equip it
        try {
            nextEquippedFood()
        } catch (err) {
            console.log(`${new Date()} - Couldn't swap to next equipped food.`)
        }
        if (foodList === undefined) return // we don't have food in bank
        f = foodList.pop()
        equipFood(f.BANKID, f.id, f.MAX)
    }
}
