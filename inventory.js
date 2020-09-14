function allOfTypeInItems(t) {
    // Returns a list of items with type t
    // that are NOT locked.
    let things = []
    for (let i=0; i < items.length; i++) {
        if (items[i].type === t) things.push(items[i])
    }
    return things
}

function allCraftingItems() {
    let things = []
    for (let i=0; i < items.length; i++) {
        if (items[i].craftingID !== undefined) things.push(items[i])
    }
    return things
}

function allOfTypeInBank(t) {
    // Returns a list of items with type t
    // that are NOT locked.
    let things = []
    for (let i=0; i < bank.length; i++) {
        if (bank[i].locked) continue
        if (bank[i].type === t) things.push(bank[i])
    }
    return things
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
    try {
        item.craftReq.forEach(req => {
            required.push(checkBankForItem(req.id))
        })
        if (required.some((thing) => thing === false)) {
            haveAllRequired = false
        } else {
            haveAllRequired = true
        }
        return {haveAllRequired: haveAllRequired, forItem: item}
    } catch (err) {
        console.log("maybe you didn't give me an item...");
    }
}
