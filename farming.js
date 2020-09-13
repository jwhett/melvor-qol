// Helpers
function getSeeds() {
    var a = []
    for (i = 0; i < items.length; i++) {
        if (items[i].type !== "Seeds") continue
        a.push({ realID: i, seed: items[i]})
    }
    return a
}
function patchHasGrown(p) {
    return p.hasGrown && p.seedID !== 0
}
function patchIsEmpty(p) {
    return !p.hasGrown && p.seedID === 0
}
function patchIsReady(p) {
    return ((patchHasGrown(p)) || (patchIsEmpty(p)))
}
function getNextSeedIDByTier(seeds, t) {
    let seedFound
    for (s of seeds){
        try {
            if (s.seed.tier.toLowerCase() === t.toLowerCase().substring(0, t.length-1)) {
                seedFound = s.realID
            }
        } catch (err) {
            console.error(`getNextSeedIDByTier() error: ${err}`);
        }
        if (seedFound !== undefined && checkBankForItem(seedFound)) break
    }
    return seedFound
}
// Main
function reapAndSow() {
    let realSeeds = getSeeds()
    for (let locationID=0; locationID < newFarmingAreas.length; locationID++) {
        for (let patchID=0; patchID < newFarmingAreas[locationID].patches.length; patchID++) {
            let patch = newFarmingAreas[locationID].patches[patchID]
            let areaName = newFarmingAreas[locationID].areaName
            selectedPatch = [newFarmingAreas[locationID].id, patchID] // Melvor global
            selectedSeed = 0 // Melvor global

            // can we plant?
            if (!patch.unlocked) continue
            if (!patchIsReady(patch)) continue

            // what seed do i plant?
            if (patchIsEmpty(patch)) {
            // no harvest in this block
                selectedSeed = getNextSeedIDByTier(realSeeds, areaName)
            } else {
                // try to plant the same seed
                // we'll need to harvest before leaving block
                if (checkBankForItem(patch.seedID)) {
                    selectedSeed = patch.seedID
                } else {
                  // don't have the same seed to plant
                  selectedSeed = getNextSeedIDByTier(realSeeds, areaName)
                }
                harvestSeed(locationID, patchID)
            }
            plantSeed()
        }
    }
}
