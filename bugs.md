Hello! I've searched through the channels, the wiki, the GitHub issues, and the changelog and haven't found anything related to this: I've noticed that items over `items[141]` either don't have an ID attribute at all, the ID doesn't match its position in `items[]`, or has an ID that it represented differently in the wiki. Also, `type: "Havest"` has a spelling error and I can't find a collision in the code anywhere with `"Harvest"` that would prevent the spelling correction in a refactor.

Examples:

```js
items[0] // {id: 0, name: "Normal Logs", ...}
items[147] // {id: 146, name: "Sweetcorn Seeds", ...}

items[bank[55].id]
// {category: "Farming", type: "Havest", canEat: true, name: "Sweetcorn", healsFor: 5, sellsFor: 8}

items[142].id // undefined
```

```
-->8--
Black Shield => ID: undefined // ID 142 in the wiki; no ID attribute
Potato Seeds => ID: 142       // but this is ID 142, 143 in the wiki?
Onion Seeds => ID: 143
Cabbage Seeds => ID: 144
Tomato Seeds => ID: 145
Sweetcorn Seeds => ID: 146
Strawberry Seeds => ID: 147
Watermelon Seeds => ID: 148
Snape Grass Seeds => ID: 149
Potatoes => ID: 150
Onions => ID: undefined       // harvested item doesn't have an ID
                              // attribute, but is positioned correctly
                              // according to items[144].grownItemID
-->8--
```

This does seem to be expected, or rather accepted, behavior within the app/scripting community. Does anyone have the background on these design decisions or if there are any plans to make similar modifications?
