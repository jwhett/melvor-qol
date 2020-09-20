/* eslint-disable no-undef, no-console, no-unused-vars, no-restricted-syntax, max-len, no-plusplus */
function getSeeds() {
    return items.filter((item) => item.type === 'Seeds');
}
function patchHasGrown(p) {
    return p.hasGrown && p.seedID !== 0;
}
function patchIsEmpty(p) {
    return !p.hasGrown && p.seedID === 0;
}
function patchIsReady(p) {
    return ((patchHasGrown(p)) || (patchIsEmpty(p)));
}

function getConstantIDByName(n) {
    const cname = n.replaceAll(' ', '_').substring(0, n.length - 1);
    if (CONSTANTS.item[cname] === undefined) {
        /* eslint-disable prefer-template */
        return CONSTANTS.item[cname + 's'];
        /* eslint-enable prefer-template */
    }
    return CONSTANTS.item[cname];
}

function getNextSeedIDByTier(t) {
    /* eslint-disable arrow-body-style */
    for (s of allOfTypeInBank('Seeds').sort((a, b) => { return b.qty - a.qty; })) {
    /* eslint-enable arrow-body-style */
        if (items[getConstantIDByName(s.name)].tier === t.substring(0, t.length - 1)) return getConstantIDByName(s.name);
    }
    return undefined;
}

function reapAndSow() {
    for (let locationID = 0; locationID < newFarmingAreas.length; locationID++) {
        for (let patchID = 0; patchID < newFarmingAreas[locationID].patches.length; patchID++) {
            const patch = newFarmingAreas[locationID].patches[patchID];
            selectedPatch = [newFarmingAreas[locationID].id, patchID]; // Melvor global
            selectedSeed = 0; // Melvor global; seed 0 is empty

            // can we plant?
            /* eslint-disable no-continue */
            if (!patch.unlocked) continue;
            if (!patchIsReady(patch)) continue;
            /* eslint-enable no-continue */

            // what seed do i plant?
            if (patchIsEmpty(patch)) {
            // no harvest in this block
                selectedSeed = getNextSeedIDByTier(newFarmingAreas[locationID].areaName);
            } else {
                // try to plant the same seed
                // we'll need to harvest before leaving block
                if (checkBankForItem(patch.seedID)) {
                    selectedSeed = patch.seedID;
                } else {
                    // don't have the same seed to plant
                    selectedSeed = getNextSeedIDByTier(newFarmingAreas[locationID].areaName);
                }
                try {
                    harvestSeed(locationID, patchID);
                } catch (err) {
                    console.error(`oops! hit an issue harvesting: ${err}`);
                }
            }
            if (selectedSeed === undefined) {
                return; // don't have a seed to plant
            }
            try {
                plantSeed();
            } catch (err) {
                console.error(`oops! hit an issue planting seeds: ${err}`);
            }
        }
    }
}
