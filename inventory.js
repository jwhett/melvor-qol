function sellGems() {
    var g = []
    for (let i=0; i < bank.length; i++) {
        if (bank[i].locked) continue
        if (bank[i].type === "Gem") g.push(bank[i])
    }
    g.forEach(gem => {sellItem(gem.id)})
}
