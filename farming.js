newFarmingAreas // list that holds the area objects
                // id, areaName, patches[]

function loadSeedBag() {
    var a = []
    for (i = 0; i < bank.length; i++) {
        if (bank[i].type !== "Seeds") continue
        a.push(items[bank[i].id])
    }
    return a
}

function patchHandler(areaID, patchId, patch) {
    if (patch.hasGrown || patch.unlocked) {
        harvestSeed(areaId, patchId)
    }
    selectedPatch = [areaId, patchId]
    selectedSeed = something
    plantSeed()
}

selectedPatch = [0, 0]
selectedSeed = 146
plantSeed()
