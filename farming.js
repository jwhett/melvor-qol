// Helpers
function getSeeds() {
    return items.filter(item => item.type === "Seeds")
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
function getNextSeedIDByTier(t) {
    let loc
    let seedsOfTier = items.filter(item => item.tier === t)
    for (var i=0; i<seedsOfTier.length; i++){
        let seed = seedsOfTier[i]
        let cname = seed.name.substring(0,seed.name.length-1).replaceAll(' ', '_')
        if (CONSTANTS.item[cname] === undefined) {
            // Carrot_Seeds: the only exception to this rule
            loc = CONSTANTS.item[cname+"s"]
        } else {
            loc = CONSTANTS.item[cname]
        }
        if (loc !== undefined && checkBankForItem(loc)) break
    }
    return loc
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
