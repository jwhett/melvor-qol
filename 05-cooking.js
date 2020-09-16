function fireWatcher() {
    if (!isCooking || cookingFireActive) return
    try {
        lightCookingFire()
    } catch (err) {
        console.log("oops! couldn't start a cooking fire: "+err);
    }
}
