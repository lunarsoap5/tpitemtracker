var defaultItemGrid = [
    [
        "Rod",
        "Slingshot",
        "Lanturn",
        "Boomerang",
        "IronBoots",
        "Bow"
    ],
    [
        "Bombs",
        "WBombs",
        "Hawkeye",
        "Clawshot",
        "Spinner",
        "Chainball",
    ],
    [
        "Dominion",
        "Bottle",
        "Memo",
        "Sketch",
        "Skybook",
        "Charm",
    ],
    [
        "Bugs",
        "Skills",
        "Sword",
        "MSword",
        "Shield",
        "GTunic"
    ],
    [
        "Wallet",
        "Soul",
        "Scent",
        "Crystal",
        "ZoraArmor",
        "MagicArmor"
    ],
    [
        "Boss1",
        "Boss2",
        "Boss3",
        "Boss4",
        "Boss5"
    ],
    [ 
        "Boss6",
        "Boss7",
        "Boss8",
        "Shadow",
        "Shard"
    ]
]


var baseItems = {
    Bow: 0,
    Clawshot: 0,
    Chainball: false,
    Slingshot: false,
    Boomerang: false,
    Bombs: 0,
    WBombs: false,
    Rod: 0,
    Lanturn: false,
    Hawkeye: false,
    Spinner: false,
    Memo: false,
    Sketch: false,
    Skybook: 0,
    Dominion: 0,
    Charm: 0,
    Bugs: 0,
    Bottle: 0,
    Wallet: 1,
    Sword: 0,
    MSword: 0,
    Skills: 0,
    Shield: 0,
    Soul: 0,
    Scent: 0,
    Shadow: 0,
    Shard: 0,
    Crystal: false,
    ZoraArmor: false,
    MagicArmor: false,
    IronBoots: false,
    GTunic: 1,
   
    Boss1: false,
    Boss2: false,
    Boss3: false,
    Boss4: false,
    Boss5: false,
    Boss6: false,
    Boss7: false,
    Boss8: false,
    

    blank: false,
};

var itemsMin = {
    Bow: 0,
    Bombs: 0,
    Clawshot: 0,
    Rod: 0,
    Bugs: 0,
    Bottle: 0,
    Sword: 0,
    MSword: 0,
    Skills: 0,
    Shield: 0,
    Soul: 0,
    Scent: 0,
    Charm: 0,
    Entry: 0,
    Wallet: 1,
    Shadow: 0,
    Shard: 0,
    Dominion: 0,
    Skybook: 0,
    GTunic: 1
};

var itemsMax = {
    Bow: 3,
    Bombs: 4,
    Clawshot: 2,
    Rod: 2,
    Bugs: 24,
    Bottle: 8,
    Sword: 2,
    MSword: 2,
    Skills: 1,
    Shield: 2,
    Soul: 60,
    Scent: 5,
    Charm: 4,
    Entry: 4,
    Wallet: 3,
    Shadow: 4,
    Shard: 4,
    Dominion: 2,
    Skybook: 7,
    GTunic: 1
};

var items = Object.assign(baseItems);
