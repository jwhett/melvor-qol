var myMonitors = {}
["Junk", "Gems", "Havest", "Logs"].forEach((t) => {
    myMonitors[t] = setInterval(sellAllOfType, 120000, t)
});
