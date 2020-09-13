function allOfTypeInBank(t) {
    let things = []
    for (let i=0; i < bank.length; i++) {
        if (bank[i].locked) continue
        if (bank[i].type === t) things.push(bank[i])
    }
    return things
}

function sellGems() {
    let gems = allOfTypeInBank("Gem")
    gems.forEach(gem => {sellItem(gem.id)})
}

function learnTokens() {
    let tokens = allOfTypeInBank("Token")
    tokens.forEach(token => {
        claimBankToken(0,token.id)
    })

}
