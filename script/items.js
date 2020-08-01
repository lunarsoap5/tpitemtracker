//set up how we want the item grid to be displayed by default
var defaultItemGrid = [
    [
        "Rod",
        "Slingshot",
        "Lantern",
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
        "Skills",
        "Sword",
        "MSword",
        "Shield",
        "GTunic",
        "Wallet"
    ],
    [
        "Bugs",
        "Soul",
        "Crystal",
        "ZoraArmor",
        "MagicArmor",
        "Vessel"
    ],
    [
        "YouthScent",
        "IliaScent",
        "PoeScent",
        "ReekfishScent",
        "MedicineScent"
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

// set default parameters for the items
var baseItems = {
    Bow: 0,
    Clawshot: 0,
    Chainball: false,
    Slingshot: false,
    Boomerang: false,
    Bombs: 0,
    WBombs: false,
    Rod: 0,
    Lantern: false,
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
    Vessel: 0,
    YouthScent: false,
    IliaScent: false,
    PoeScent: false,
    ReekfishScent: false,
    MedicineScent: false,
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

//for our progressive items, we want to set their minimum value
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
    Vessel: 0,
    GTunic: 1
};

//set how many of each item there is a maximum for
var itemsMax = {
    Bow: 3,
    Bombs: 4,
    Clawshot: 2,
    Rod: 2,
    Bugs: 24,
    Bottle: 4,
    Sword: 2,
    MSword: 2,
    Skills: 7,
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
    Vessel: 3,
    GTunic: 1
};

//assign the default values of the items to the GUI
var items = Object.assign(baseItems);
