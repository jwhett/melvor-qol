function patchHandler(areaID, patchId, patch) {
    if (patch.hasGrown || patch.unlocked) {
        harvestSeed(areaId, patchId)
    }
    selectedPatch = [areaId, patchId]
    selectedSeed = something
    plantSeed()
}

function loadSeedBag() {
    var a = []
    for (i = 0; i < bank.length; i++) {
        if (bank[i].type !== "Seeds") continue
        a.push(items[bank[i].id])
    }
    return a
}

var mySeeds = loadSeedBag()

for (var i=0; i<newFarmingAreas[0].patches.length; i++) {
    var patch = newFarmingAreas[0].patches[i]
    var selectedPatch = [0,i]
    selectedSeed = 0
    if (!patch.unlocked) {
        console.log("Patch is not unlocked.")
        continue
    }
    if (!patch.hasGrown && patch.seedID !== 0) {
        console.log("Patch isn't ready for harvest.")
        continue
    }
    if (!patch.hasGrown && patch.seedID === 0) {
        // empty patch, need to pick a fresh seed
        mySeeds.forEach(seed => {
            if (seed.tier === "Allotment") {
                selectedSeed = seed.id+1
            }
        })
    } else {
        // not empty
        if (checkBankForItem(patch.seedID)) {
            selectedSeed = patch.seedID
        } else {
            mySeeds.forEach(seed => {
                if (seed.tier === "Allotment") {
                    selectedSeed = seed.id+1
                }
            })
        }
        harvestSeed(0, i)
    }
    plantSeed()
    console.log("Seed planted")
}
