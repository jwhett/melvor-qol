function loadSeedBag() {
    var a = []
    for (i = 0; i < bank.length; i++) {
        if (bank[i].type !== "Seeds") continue
        a.push(items[bank[i].id])
    }
    return a
}

function getSeedID(seed) {
    switch (seed.tier) {
        case "Allotment":
            return seed.id+1
        case "Herb":
            return seed.id+1
        default:
            return undefiend
    }
}

function getNextSeedIDByTier(t) {
  loadSeedBag().forEach((seed) => {
    if (seed.tier.toLowerCase() === t.toLowerCase.substring(0, t.length-1)) {
      return getSeedID(s)
    }
  });
}

for (var x=0; x<newFarmingAreas.length; x++) {
  for (var i=0; i<newFarmingAreas[x].patches.length; i++) {
      var patch = newFarmingAreas[x].patches[i]
      var selectedPatch = [newFarmingAreas[x].id,i]
      selectedSeed = 0
      if (!patch.unlocked) {
        console.log("Patch locked.")
        continue
      }
      if (!patch.hasGrown && patch.seedID !== 0) {
        // occupied; not ready
        console.log("Patch not ready.")
        continue
      }
      if (!patch.hasGrown && patch.seedID === 0) {
          // empty patch, need to pick a fresh seed
          selectedSeed = getNextSeedIDByTier(newFarmingAreas[x].name)
      } else {
          // not empty
          if (checkBankForItem(patch.seedID)) {
              selectedSeed = patch.seedID
          } else {
              // don't have the same seed to plant
              selectedSeed = getNextSeedIDByTier(newFarmingAreas[x].name)
          }
          harvestSeed(locationID, i)
      }
      plantSeed()
      console.log(`Seed ${selectedSeed} planted`)
  }
}
