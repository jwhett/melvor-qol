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
                if (s.realID === undefined) throw "s.realID is undefined..."
                seedFound = s.realID
            }
        } catch (err) {
            console.error(`getNextSeedIDByTier() error: ${err}`);
        }
        if (seedFound !== undefined) break
  }
  return seedFound
}
function reapAndSow() {
    console.log("> Reaping...")
    let realSeeds = getSeeds()
    for (let locationID=0; locationID < newFarmingAreas.length; locationID++) {
        console.log(`>> {locationID: ${locationID}, areaName: ${newFarmingAreas[locationID].areaName}}`)
      for (let patchID=0; patchID < newFarmingAreas[locationID].patches.length; patchID++) {
          console.log(`>>> {patchID: ${patchID}}`)
          let patch = newFarmingAreas[locationID].patches[patchID]
          let areaName = newFarmingAreas[locationID].areaName
          selectedPatch = [newFarmingAreas[locationID].id, patchID]
          selectedSeed = 0
          console.log(`>>> {patch: ${patch}, selectedPatch: ${selectedPatch}, areaName: ${areaName}, selectedSeed: ${selectedSeed}}`)

          // can we plant?
          if (!patch.unlocked) {console.log(">>> not unlocked");continue}
          if (!patchIsReady(patch)) {console.log(">>> not ready");continue}

          // what seed do i plant?
          if (patchIsEmpty(patch)) {
              // no harvest in this block
              selectedSeed = getNextSeedIDByTier(realSeeds, areaName)
              console.log(`>>> empty, decided on this seed: {selectedSeed: ${selectedSeed}}`)
          } else {
              // try to plant the same seed
              // we'll need to harvest before leaving block
              if (checkBankForItem(patch.seedID)) {
                  selectedSeed = patch.seedID
                  console.log(`>>> not empty, decided on this seed: {selectedSeed: ${selectedSeed}}`)
              } else {
                  // don't have the same seed to plant
                  selectedSeed = getNextSeedIDByTier(realSeeds, areaName)
                  console.log(`>>> not empty & doin't have same, decided on this seed: {selectedSeed: ${selectedSeed}}`)
              }
              console.log(`>>> harvesting: {locationID: ${locationID}, patchID: ${patchID}}`)
              harvestSeed(locationID, patchID)
          }
          console.log(`>>> planting: {selectedSeed: ${selectedSeed}, selectedPatch: ${selectedPatch}}`)
          plantSeed()
          if (patchIsEmpty(patch)) {
              console.log(">>> planting FAILED <<<")
          } else {
              console.log(`>>> Seed ${selectedSeed} planted in ${areaName}`)
          }
      }
      console.log(`>> done with: {locationID: ${locationID}, areaName: ${newFarmingAreas[locationID].areaName}`)
    }
    console.log("> done with all locations");
}
