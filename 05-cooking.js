function fireWatcher() {
    if (!isCooking || cookingFireActive) return
    try {
        lightCookingFire()
    } catch (err) {
        console.error("oops! couldn't start a cooking fire: "+err);
    }
}
