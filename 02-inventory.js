function MyFood (id, name, qty) {
     this.id = id
     this.name = name
     this.qty = qty
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

function sellAllOfNameSubstring(s) {
    let things = bank.filter(i => i.name.includes(s))
    things.forEach(thing => {
        sellItem(thing.id)
    })
}

function learnTokens() {
    let tokens = allOfTypeInBank("Token")
    tokens.forEach(token => {
        claimBankToken(currentBank,token.id)
    })
}

function buryBones() {
    let bones = allOfTypeInBank("Bones")
    bones.forEach(bone => {
        if (bone.qty >= 10) {
            cname = bone.name.replaceAll(' ', '_')
            buryItem(currentBank, CONSTANTS.item[cname], 6969696969)
        }
    });
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
    let foodList = []
    let allFoodItems = allOfTypeInBank("Food")
    allFoodItems.forEach(food => {
        foodList.push(new MyFood(food.id, food.name, food.qty))
    });
    return foodList
}

function isOutOfEquippedFood() {
    return equippedFood[0].itemID === equippedFood[1].itemID && equippedFood[0].itemID === equippedFood[2].itemID
}

function getEquippedFoodCount() { return equippedFood[currentCombatFood].qty }

function equipNextFood() {
    for (var i=0; i<equippedFood.length; i++) {
        try {
            if (equippedFood[i].qty > 0) {
                console.log(`Slot ${i} has food! Equipping...`);
                selectEquippedFood(i)
                break
            } else {
                console.log(`Slot ${i} didn't have food... Next!`);
            }
        } catch (err) {
            console.log(`oops! we hit an error: ${err}`);
        }
    }
}

function foodTracker() {
    if (!isInCombat) return // we're not in combat, don't need to watch food
    if (getEquippedFoodCount() > 0) return // we have equipped food to eat
    let foodList = findFood()
    if (isOutOfEquippedFood() && foodList.length === 0) { // completely out of food
        stopCombat(false, true, true) // death, stopDungeon, runAway
    } else { // we have food in pocket, but need to equip it
        try {
            equipNextFood()
        } catch (err) {
            console.log(`${new Date()} - Couldn't swap to next equipped food.`)
        }
        if (foodList === undefined) return // we don't have food in bank
        console.log("foodList before pop: "+foodList.length);
        let f = foodList.pop()
        console.log(`equipping: ${f.qty} of ${f.name}`);
        equipFood(currentBank, f.id, f.qty)
    }
}
