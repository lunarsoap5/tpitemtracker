
function generalCanGetChest(chestlist) {
    var canGet = 0;
    var unopened = 0;
    for (var key in chestlist) {
        if (chestlist.hasOwnProperty(key)) {
            if (!chestlist[key].isOpened) {
                unopened++;
            }

            if (!chestlist[key].isOpened && chestlist[key].isAvailable()) {
                canGet++;
            }
        }
    }
    
 

    if (unopened == 0) {
        return "opened"; 
    }
    if (canGet == unopened) {
        return "available";
    }
    if (canGet == 0) {
        return "unavailable";
    }
    return "possible";
}






function hasBoom()
{
    return ((items.Bombs || items.WBombs))
}

function canSmash()
{
    return (hasBoom() || items.Chainball);
}

function shootPew()
{
    return (hasBoom() && items.Bow);
}

//Need lanturn to burn the web at the entrance and sword to get past Golden Wolf
function canAccessFaron() {
    return (items.Vessel >= 1 || TwilightSkip);
}

function canAccessEldin() {
    return (items.Vessel >= 2 || TwilightSkip);
}

function canAccessLanayru() {
    return (items.Vessel >= 3 || TwilightSkip);
}

//Need lanturn to burn the web at the entrance and sword to get past Golden Wolf
function canAccessForest() {
    return (items.Lanturn && items.Sword >= 2);
}

//Need iron boots to beat Gor Coron
function canAccessMines() {
    return (items.IronBoots);
}

//Need iron boots to use water bombs and Zora Armor so you do not drown
function canAccessLakebed() {
    return (items.ZoraArmor && items.WBombs && items.IronBoots);
}

//Need Auru's Memo to use the cannon to get to the desert
function canAccessDesert() {
    return ((items.Memo && items.Crystal) || (EarlyDesert && items.Crystal));
}

//Need Aleshi's Sketch to get the Coral Earring to get the ReekfishScent
function canAccessSnowpeak() {
    return (items.ReekfishScent);
}

//Need Golden Cuccoo to reach Sacred Grove then need bow to beat Skull Kid and need Master Sword to open Dungeon Entrance
function canAccessTot() {
    return (items.Boss5 && items.MSword >= 1 && items.Bow);
}

//Need Dominion Rod to move the Owl Statues and Charm to get Skybook to access Cannon and Clawshot to enter cannon
function canAccessCITS() {
    return ((items.Skybook >=7 || EarlyCits) && items.Clawshot);
}

// You only need the Mirror Shard from City in the Sky to open up Pallace of Twilight
function canAccessPoT() {
    return (items.Boss7);
}

//To enter Hyrule you need to beat Zant so the requirements for beating Zant are the same as entering Hyrule
function canAccessHyrule() {
    return (items.Boss8);
}


// define dungeon chests
var dungeons = [
{
        name: "Ordon Village",
        x: "55.5%",
        y: "85.84%",
        chestlist: {
            'Wooden Sword Chest': { isAvailable: function () {
                return true; }, },
            'Link House Basement Chest': { isAvailable: function () {
                return items.Lanturn; }, },
            'Fishing Rod': { isAvailable: function () {
                return true; }, },
            'Seras Bottle': { isAvailable: function () {
                return true; }, },
            'Slingshot': { isAvailable: function () {
                return true; }, },
            'Ordon Shield': { isAvailable: function () {
                return (items.Sword >=1 || SkipIntro); }, },
            'Ordon Sword': { isAvailable: function () {
                return (items.Sword >=1 || SkipIntro); }, },
            'Iron Boots Chest': { isAvailable: function () {
                return ((items.Boss1 && items.Vessel >=1) || (FaronEscape && ((SkipIntro && TwilightSkip) || items.Sword >=1))); }, },
        },
        isBeatable: function() {
            return this.canGetChest();
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Forest Temple",
        x: "47.58%",
        y: "66.2%",
        chestlist: {
            'Entrance Vine Chest': { isAvailable: function () { return canAccessForest() && (items.Bow || items.Slingshot || items.Clawshot || items.Boomerang || items.Chainball); }, },
            'Central Chest Behind Stairs': { isAvailable: function () { return canAccessForest() && items.Boomerang; }, },
            'Dungeon Map Chest': { isAvailable: function () { return items.Lanturn && canAccessForest(); }, },
            'Ooccoo': { isAvailable: function () { return items.Lanturn && canAccessForest(); }, },
            'Windless Bridge Chest': { isAvailable: function () { return items.Lanturn && canAccessForest(); }, },
            'Second Monkey Under Bridge Chest': { isAvailable: function () { return items.Lanturn && canAccessForest(); }, },
            'Totem Pole Chest': { isAvailable: function () { return items.Lanturn && canAccessForest(); }, },
            'West Tile Worm Small Chest': { isAvailable: function () { return items.Lanturn && canAccessForest(); }, },
            'Deku Like Piece of Heart': { isAvailable: function () { return items.Lanturn && canAccessForest(); }, },
            'Big Baba Small Key': { isAvailable: function () { return items.Lanturn && (items.Bow || items.Slingshot || items.Clawshot || items.Boomerang || items.Chainball) && canAccessForest(); }, },
            'Boomerang': { isAvailable: function () { return items.Lanturn && (items.Bow || items.Slingshot || items.Clawshot || items.Boomerang || items.Chainball) && canAccessForest(); }, },
            'West Tile Worm Heart Piece': { isAvailable: function () { return items.Lanturn && items.Boomerang && canAccessForest(); }, },
            'Compass Chest': { isAvailable: function () { return (items.Bow || items.Slingshot || items.Clawshot || items.Boomerang || items.Chainball) && canAccessForest(); }, },
            'Big Key Chest': { isAvailable: function () { return items.Lanturn && items.Boomerang && canAccessForest(); }, },
            'Water Cave Near Big Key': { isAvailable: function () { return items.Lanturn && canAccessForest(); }, },
            'North Deku Like Chest': { isAvailable: function () { return items.Lanturn && items.Boomerang && canAccessForest(); }, },
            'East Tile Worm Chest': { isAvailable: function () { return items.Lanturn && items.Boomerang && canAccessForest(); }, },
            'Diababa': { isAvailable: function () { return items.Lanturn && items.Boomerang && canAccessForest(); }, },
        },
        isBeatable: function() {
            if (canAccessForest() && items.Boomerang && items.Lanturn) {
                if (this.canGetChest() == 'available') {
                    return 'available';
                }
                return 'possible';
            } else {
                return "unavailable";
            }
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Goron Mines",
        x: "85.91%",
        y: "38.16%",
        chestlist: {
            'Entrace Small Chest': { isAvailable: function () {
                return canAccessMines(); }, },
            'Main Magnet Room Bottom Chest': { isAvailable: function () {
                return canAccessMines(); }, },
            'Dungeon Map Chest': { isAvailable: function () {
                return canAccessMines(); }, },
            'Gor Amato Small Chest': { isAvailable: function () {
                return canAccessMines(); }, },
            'Gor Amato Key Shard': { isAvailable: function () {
                return canAccessMines(); }, },
            'Ooccoo': { isAvailable: function () {
                return canAccessMines(); }, },
            'Magnet Maze Heart Piece': { isAvailable: function () {
                return canAccessMines(); }, },
            'Switch Room Underwater Chest': { isAvailable: function () {
                return canAccessMines(); }, },
            'Switch Room Small Chest': { isAvailable: function () {
                return canAccessMines(); }, },
            'After Switch Room Heart Piece': { isAvailable: function () {
                return canAccessMines(); }, },
            'Outside Beamos Chest': { isAvailable: function () {
                return canAccessMines(); }, },
            'Gor Ebizo Key Shard': { isAvailable: function () {
                return canAccessMines(); }, },
            'Gor Ebizo Small Chest ': { isAvailable: function () { 
                return canAccessMines(); }, },
            'Small Chest Before Dangoro': { isAvailable: function () { 
                return canAccessMines(); }, },
            'Bow Chest': { isAvailable: function () { 
                return canAccessMines(); }, },
            'Compass Chest': { isAvailable: function () { 
                return  canAccessMines() && items.Bow; }, },
            'Gor Liggs Key Shard': { isAvailable: function () { 
                return canAccessMines() && items.Bow; }, },
            'Gor Liggs Chest': { isAvailable: function () { 
                return canAccessMines() && items.Bow; }, },
            'Main Magnet Room Top Chest': { isAvailable: function () { 
                return canAccessMines() && items.Bow; }, },
            'Outside Underwater Chest': { isAvailable: function () { 
                return canAccessMines(); }, },
            'Outside Clawshot Chest': { isAvailable: function () { 
                return canAccessMines() && items.Clawshot; }, },
            'Fyrus': { isAvailable: function () { 
                return canAccessMines() && items.Bow; }, },
        },
        isBeatable: function() {
            if (canAccessMines && items.IronBoots && items.Clawshot && items.Bow) {
                if (this.canGetChest() == 'available') {
                    return 'available';
                }
                return 'possible';
            } else {
                return "unavailable";
            }
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Lakebed Temple",
        x: "40.33%",
        y: "47.76%",
        chestlist: {
            'Lobby Left Chest': { isAvailable: function () {
                return canAccessLakebed(); }, },
            'Lobby Rear Chest': { isAvailable: function () {
                return canAccessLakebed(); }, },
            'Stalactite Room Small Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew(); }, },
            'Central Room Small Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew(); }, },
            'Ooccoo': { isAvailable: function () {
                return canAccessLakebed() && shootPew(); }, },
            'Dungeon Map Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew(); }, },
            'East Stalactite Room Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew(); }, },
            'East Second Floor Southwest Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew(); }, },
            'East Second Floor Southeast Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew(); }, },
            'East Water Supply Small Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew(); }, },
            'Before Deku Toad Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew(); }, },
            'Before Deku Toad Submerged Left Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew(); }, },
            'Before Deku Toad Submerged Right Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew(); }, },
            'Clawshot Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew(); }, },
            'Central Room Chanelier Heart Piece': { isAvailable: function () {
                return canAccessLakebed() && shootPew() && items.Clawshot; }, },
            'Central Room Center Spire Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew(); }, },
            'East Water Supply Clawshot Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew() && items.Clawshot; }, },
            'West Lower Small Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew() && items.Clawshot; }, },
            'West Water Supply Small Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew() && items.Clawshot; }, },
            'Compass Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew() && items.Clawshot; }, },
            'West Second Floor Southwest Underwater Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew() && items.Clawshot; }, },
            'West Second Floor Central Small Chest': { isAvailable: function () {
                return canAccessLakebed() && shootPew() && items.Clawshot; }, },
            'West Second Floor Northeast Chest': { isAvailable: function () { return canAccessLakebed() && shootPew() && items.Clawshot; }, },
            'West Second Floor Southeast Chest': { isAvailable: function () { return canAccessLakebed() && shootPew() && items.Clawshot; }, },
            'Big Key Chest': { isAvailable: function () { return canAccessLakebed() && shootPew() && items.Clawshot; }, },
            'West Water Maze Small Chest': { isAvailable: function () { return canAccessLakebed() && shootPew() && items.Clawshot; }, },
            'East Stalactite Room Heart Piece': { isAvailable: function () { return canAccessLakebed() && shootPew() && items.Clawshot; }, },
            'Morpheel': { isAvailable: function () { return canAccessLakebed() && shootPew() && items.Clawshot; }, },
        },
        isBeatable: function () {
            if (canAccessLakebed() && shootPew() && items.Clawshot) {
                if (this.canGetChest() == 'available') {
                    return 'available';
                }
                return 'possible';
            } else {
                return "unavailable";
            }
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Arbiter's Grounds",
        x: "15.2%",
        y: "41.44%",
        chestlist: {
            'Entrance Chest': { isAvailable: function () {
                return canAccessDesert()  }, },
            'Poe Scent': { isAvailable: function () {
                return canAccessDesert() && items.Lantern;  }, },
            'Lobby Heart Piece Chest': { isAvailable: function () {
                return canAccessDesert() && items.Lanturn; }, },
            'Dungeon Map Chest': { isAvailable: function () {
                return canAccessDesert() && items.Lanturn; }, },
            'East Redead Lower Small Chest': {
                isAvailable: function () { return canAccessDesert() && items.Crystal; }, },
            'Compass Chest': { isAvailable: function () {
                return canAccessDesert() && items.Lanturn; }, },
            'East Upper Turnable Readed Chest': { isAvailable: function () {
                return canAccessDesert() && items.Lanturn; }, },
            'Ghoul Rat Small Chest': { isAvailable: function () {
                return canAccessDesert() && items.Lanturn; }, },
            'West Small Chest Behind Block': { isAvailable: function () {
                return canAccessDesert() && items.Lanturn; }, },
            'West Chandelier Chest': { isAvailable: function () {
                return canAccessDesert() && items.Lanturn; }, },
            'Stalfos West Small Chest': { isAvailable: function () {
                return canAccessDesert() && (hasBoom() || items.Chainball) && items.Lanturn; }, },
            'Stalfos Northeast Small Chest': { isAvailable: function () {
                return canAccessDesert() && (hasBoom() || items.Chainball) && items.Lanturn; }, },
            'North Turning Room Chest': { isAvailable: function () {
                return canAccessDesert() && items.Lanturn; }, },
            'Ooccoo': { isAvailable: function () {
                return canAccessDesert() && items.Lanturn; }, },
            'Spinner Chest': { isAvailable: function () {
                return canAccessDesert() && items.Lanturn; }, },
            'Spinner Room First Small Chest': { isAvailable: function () {
                return canAccessDesert() && items.Spinner && items.Lanturn; }, },
            'Spinner Room Second Small Chest': { isAvailable: function () {
                return canAccessDesert() && items.Spinner && items.Lanturn; }, },
            'Spinner Room Lower Central Small Chest': { isAvailable: function () {
                return canAccessDesert() && items.Spinner && items.Lanturn; }, },
            'Spinner Room Heart Piece Chest': { isAvailable: function () {
                return canAccessDesert() && items.Spinner && items.Lanturn; }, },
            'Spinner Room Lower North Chest': { isAvailable: function () {
                return canAccessDesert() && items.Spinner && items.Lanturn; }, },
            'Big Key Chest': { isAvailable: function () {
                return canAccessDesert() && items.Spinner && items.Lanturn; }, },
            'Stalord': {
                isAvailable: function () {
                    return canAccessDesert() && items.Spinner && items.Lanturn && (items.Boomerang || items.Clawshot) && (hasBoom() || items.Chainball);
                },
            },
        },
        isBeatable: function() {
            if (canAccessDesert() && items.Lanturn && items.Spinner && (items.Boomerang || items.Clawshot) && (hasBoom() || items.Chainball)) {
                if (this.canGetChest() == 'available') {
                    return 'available';
                }
                return 'possible';
            } else {
                return "unavailable";
            }
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Snowpeak Ruins",
        x: "21.31%",
        y: "28.64%",
        chestlist: {
            'Entrance Left Armor Small Chest': { isAvailable: function () {
                return canAccessSnowpeak() && items.Chainball; } },
            'Entrance Right Armor Small Chest': { isAvailable: function () {
                return canAccessSnowpeak() && items.Chainball; } },
            'Dungeon Map': { isAvailable: function () { 
                return canAccessSnowpeak(); } },
            'Ooccoo': { isAvailable: function () { 
                return canAccessSnowpeak(); } },
            'Courtyard Partially Buried Small Chest': { isAvailable: function () {
                return canAccessSnowpeak(); } },
            'Courtyard Open Chest': { isAvailable: function () {
                return canAccessSnowpeak(); } },
            'Ordon Pumpkin Chest': { isAvailable: function () {
                return canAccessSnowpeak();  } },
            'Courtyard Buried Small Chest': { isAvailable: function () {
                return canAccessSnowpeak(); } },
            'Wooden Beam Room Small Chest': { isAvailable: function () {
                return canAccessSnowpeak() && (hasBoom() || items.Chainball); } },
            'Compass Chest': { isAvailable: function () {
                return canAccessSnowpeak() && (hasBoom() || items.Chainball); } },
            'Courtyard South Ice Wall Small Chest': { isAvailable: function () {
                return canAccessSnowpeak() && (hasBoom() || items.Chainball); } },
            'Ball and Chain': { isAvailable: function () {
                return canAccessSnowpeak() && (hasBoom() || items.Chainball); } },
            'Goat Cheese Chest': { isAvailable: function () {
                return canAccessSnowpeak() && items.Chainball; } },
            'West Breakable Floor Heart Piece': { isAvailable: function () {
                return canAccessSnowpeak() && items.Chainball; } },
            'Wooden Beam Room Chandelier Chest': { isAvailable: function () {
                return canAccessSnowpeak() && items.Chainball; } },
            'Entrace Chandelier Heart Piece Chest': { isAvailable: function () {
                return canAccessSnowpeak() && items.Chainball; }  },
            'East Chilfos Chandelier Chest': { isAvailable: function () {
                return canAccessSnowpeak() && items.Chainball && items.Clawshot; } },
            'West Cannon Storage Left Small Chest': { isAvailable: function () {
                return canAccessSnowpeak() && items.Chainball; }  },
            'West Cannon Storage Right Small Chest': { isAvailable: function () {
                return canAccessSnowpeak() && (hasBoom() || items.Chainball);  } },
            'Bedroom Key Chest': { isAvailable: function () {
                return canAccessSnowpeak() && items.Chainball && hasBoom(); } },
            'Blizzeta': { isAvailable: function () {
                return canAccessSnowpeak() && items.Chainball && hasBoom();  } },
        },
        isBeatable: function () {
            if (canAccessSnowpeak() && items.Chainball && hasBoom()) {
                if (this.canGetChest() == 'available') {
                    return 'available';
                }
                return 'possible';
            } else {
                return "unavailable";
            }
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Temple of Time",
        x: "43.83%",
        y: "63.36%",
        chestlist: {
            'Ooccoo': { isAvailable: function () {
                return canAccessTot(); }, },
            'Lobby Lanturn Chest': { isAvailable: function () {
                return canAccessTot() && items.Lanturn; }, },
            'First Stair Pot Small Chest': { isAvailable: function () {
                return canAccessTot(); }, },
            'First Stair Window Small Chest': { isAvailable: function () {
                return canAccessTot(); }, },
            'Dungeon Map Chest': { isAvailable: function () {
                return canAccessTot(); }, },
            'Armos Room Left Chest': { isAvailable: function () {
                return canAccessTot() && items.Spinner; }, },
            'Compass Chest': { isAvailable: function () {
                return canAccessTot() && items.Spinner; }, },
            'Scale Room Spider Chest': { isAvailable: function () {
                return canAccessTot() && items.Spinner; }, },
            'Third Stair Swinging Gilloutine Chest': { isAvailable: function () {
                return canAccessTot() && items.Spinner; }, },
            'Third Stair Window Chest': { isAvailable: function () {
                return canAccessTot() && items.Spinner; }, },
            'Dominion Rod Chest': { isAvailable: function () {
                return canAccessTot() && items.Spinner; }, },
            'Scale Room Upper Chest': { isAvailable: function () {
                return canAccessTot() && items.Spinner && items.Dominion >= 1; }, },
            'Helmasaur Room Small Chest': { isAvailable: function () {
                return canAccessTot() && items.Spinner && items.Dominion >= 1; }, },
            'Big Key Chest': { isAvailable: function () {
                return canAccessTot() && items.Spinner && items.Dominion >= 1; }, },
            'Second Stair Heart Piece Chest': { isAvailable: function () {
                return canAccessTot() && items.Spinner && items.Dominion >= 1; }, },
            'Armos Room South Chest': { isAvailable: function () {
                return canAccessTot() && items.Spinner; }, },
            'Armos Room Right Heart Piece Chest': { isAvailable: function () {
                return canAccessTot() && items.Spinner && items.Dominion >= 1; }, },
            'Armagohma': { isAvailable: function () {
                return canAccessTot() && items.Spinner && items.Dominion >= 1; }, },
       },
        isBeatable: function() {
            if (canAccessTot() && items.Spinner && items.Dominion >= 1) {
                if (this.canGetChest() == 'available') {
                    return 'available';
                }
                return 'possible';
            } else {
                return "unavailable";
            }
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "City In The Sky",
        x: "38.0%",
        y: "50.56%",
        chestlist: {
            'Ooccoo': { isAvailable: function () {
                return canAccessCITS(); }, },
            'Southwest Underwater Chest': { isAvailable: function () {
                return canAccessCITS() && items.IronBoots; }, },
            'Underwater Southeast Chest': { isAvailable: function () {
                return canAccessCITS() && items.IronBoots; }, },
            'West First Chest': { isAvailable: function () {
                return canAccessCITS() && items.Clawshot > 1; }, },
            'Dungeon Map Chest': { isAvailable: function () {
                return canAccessCITS() && items.Spinner && items.IronBoots; }, },
            'East Tile Worm Small Chest': { isAvailable: function () {
                return canAccessCITS() && items.Spinner && items.IronBoots; }, },
            'East After-Dinofols Small Chest': { isAvailable: function () {
                return canAccessCITS() && items.Spinner && items.IronBoots; }, },
            'East After-Dinofols Chest': { isAvailable: function () {
                return canAccessCITS() && items.Spinner && items.IronBoots; }, },
            'Double Clawshot Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots; }, },
            'Compass Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >=2; }, },
            'West Baba Serpent Alcove Small Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2; }, },
            'West Narrow Ledge Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2; }, },
            'West Tile Worm Small Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2; }, },
            'Big Baba Tower West Small Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2; }, },
            'Big Baba Tower North Small Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2; }, },
            'Big Baba Tower Heart Piece Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2; }, },
            'West Gardens Small Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2; }, },
            'West Gardens Poe Island Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2; }, },
            'West Gardens Lower Small Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2; }, },
            'West Gardens Heart Piece Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2; }, },
            'Central Outside Small Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2; }, },
            'Central Outside Poe Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2; }, },
            'Big Key Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2; }, },
            'Central Upper Small Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2; }, },
            'North Fan Chest': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2; }, },
            'Argorok': { isAvailable: function () { 
                return canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2; }, },
        },
        isBeatable: function() {
            if (canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2) {
                if (this.canGetChest() == 'available') {
                    return 'available';
                }
                return 'possible';
            } else {
                return "unavailable";
            }
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Palace of Twilight",
        x: "15.0%",
        y: "37.44%",
        chestlist: {

            'West First Room Central Chest': { isAvailable: function () {
                return canAccessPoT(); }, },
            'West First Room Heart Piece Chest': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot; }, },
            'West Second Room Central Chest': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot; }, },
            'Compass Chest Chest': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot; }, },
            'West Second Room Southeast Chest': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot >1; }, },
            'East First Room Small Chest': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot; }, },
            'East First Room North Chest': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot; }, },
            'East Second Room Northeast Small Chest': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot >1; }, },
            'East Second Room Northwest Chest': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot > 1; }, },
            'Dungeon Map Chest': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot > 1; }, },
            'East Second Room Southeast Chest': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot > 1; }, },
            'East First Room Heart Piece Chest': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot > 1; }, },
            'East First Room West Chest': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot > 1; }, },
            'Central First Room Chest': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot > 1 && items.Sword >3; }, },
            'Big Key Chest': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot > 1 && items.Sword > 3; }, },
            'Central Outdoor Chest': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot > 1 && items.Sword > 3; }, },
            'Central Tower Chest': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot > 1 && items.Sword > 3; }, },
            'Zant': { isAvailable: function () {
                return canAccessPoT() && items.Clawshot > 1 && items.Sword > 3 && items.Boomerang && items.IronBoots && items.ZoraArmor && items.Chainball; }, },
        },
        isBeatable: function() {
            if (canAccessPoT() && items.Clawshot > 1 && items.Sword > 3 && items.Boomerang && items.IronBoots && items.ZoraArmor && items.Chainball) {
                if (this.canGetChest() == 'available') {
                    return 'available';
                    
                }
                return 'possible';
            } else {
                return "unavailable";
            }
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Hyrule Castle",
        x: "53.78%",
        y: "36.56%",
        chestlist: {
            'Graveyard Grave Switch Room Right Chest': { isAvailable: function () {
                return canAccessHyrule(); }, },
            'Graveyard Grave Switch Room Front Left Small Chest': { isAvailable: function () {
                return canAccessHyrule() && hasBoom(); }, },
            'Graveyard Grave Switch Room Back Left Small Chest': { isAvailable: function () {
                return canAccessHyrule() && hasBoom(); }, },
            'Graveyard Owl Statue Chest': { isAvailable: function () {
                return canAccessHyrule() && hasBoom() && items.Lanturn && items.Dominion > 1; }, },
            'Dungeon Map Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Boomerang; }, },
            'East Castle Balcony Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Boomerang; }, },
            'West Courtyard Northern Small Chest': { isAvailable: function () {
                return canAccessHyrule(); }, },
            'West Courtyard Central Small Chest': { isAvailable: function () {
                return canAccessHyrule(); }, },
            'King Bublin Key': { isAvailable: function () {
                return canAccessHyrule(); }, },
            'Compass Chest': { isAvailable: function () {
                return canAccessHyrule(); }, },
            'Lanturn Staircase Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot >1 && items.Boomerang; }, },
            'Main Hall Southwest Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot >1 && items.Boomerang && (items.Bow || items.Lanturn); }, },
            'Main Hall Northwest Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot >1 && items.Boomerang && (items.Bow || items.Lanturn); }, },
            'Southeast Balcony Tower Chest Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot >1 && items.Boomerang && (items.Bow || items.Lanturn); }, },
            'Big Key Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot >1 && items.Boomerang && (items.Bow || items.Lanturn); }, },
            'Treasure Room First Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot >1 && items.Boomerang && (items.Bow || items.Lanturn) && items.Spinner; }, },
            'Treasure Room Second Chest Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lanturn) && items.Spinner; }, },
            'Treasure Room Third Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lanturn) && items.Spinner; }, },
            'Treasure Room Fourth Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lanturn) && items.Spinner; }, },
            'Treasure Room Fifth Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lanturn) && items.Spinner; }, },
            'Treasure Room First Small Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lanturn) && items.Spinner; }, },
            'Treasure Room Second Small Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lanturn) && items.Spinner; }, },
            'Treasure Room Third Small Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lanturn) && items.Spinner; }, },
            'Treasure Room Fourth Small Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lanturn) && items.Spinner; }, },
            'Treasure Room Fifth Small Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lanturn) && items.Spinner; }, },
            'Treasure Room Sixth Small Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lanturn) && items.Spinner; }, },
            'Treasure Room Seventh Small Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lanturn) && items.Spinner; }, },
            'Treasure Room Eighth Small Chest': { isAvailable: function () {
                return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lanturn) && items.Spinner; }, },
            },
        isBeatable: function () {
            if (canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && items.Bow && items.Lanturn && items.Spinner && items.Dominion > 1 && hasBoom() ) {
                if (this.canGetChest() == 'available') {
                    return 'available';
                }
                return 'possible';
            } else {
                return "unavailable";
            }
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    /*
    {
        name: "Cave of Ordeals",
        x: "16.08%",
        y: "59.64%",
        chestlist: {
            'Floor 10 Reward (HD Only)': { isAvailable: function () {
                return (hasBoom() || items.Scale) && items.ZoraLetter && canPlay(items.ZeldasLullaby) && items.Bottle; }, },
            'Floor 20 Reward (HD Only)': { isAvailable: function () {
                return (hasBoom() || items.Scale) && items.ZoraLetter && canPlay(items.ZeldasLullaby) && items.Bottle; }, },
            'Floor 30 Reward (HD Only)': { isAvailable: function () {
                return (hasBoom() || items.Scale) && items.ZoraLetter && canPlay(items.ZeldasLullaby) && items.Bottle; }, },
            'Floor 40 Reward (HD Only)': { isAvailable: function () {
                return (hasBoom() || items.Scale) && items.ZoraLetter && canPlay(items.ZeldasLullaby) && items.Bottle; }, },
            'Floor 50 Reward (HD Only)': { isAvailable: function () {
                return (hasBoom() || items.Scale) && items.ZoraLetter && canPlay(items.ZeldasLullaby) && items.Bottle; }, },
        },
        isBeatable: function() {
            return this.canGetChest();
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    */
    {
        name: "Lake Hylia Lanturn Cave",
        x: "40.75%",
        y: "55.68%",
        chestlist: {
            'First Chest': { isAvailable: function () {
                return canSmash(); }, },
            'Second Chest': { isAvailable: function () {
                return canSmash(); }, },
            'Third Chest': { isAvailable: function () {
                return canSmash(); }, },
            'Fourth Chest': { isAvailable: function () {
                return canSmash(); }, },
            'Fifth Chest': { isAvailable: function () {
                return canSmash(); }, },
            'Sixth Chest (Lanturn Chest)': { isAvailable: function () {
                return canSmash(); }, },
            'Seventh Chest': { isAvailable: function () {
                return canSmash(); }, },
            'Eighth Chest': { isAvailable: function () {
                return canSmash(); }, },
            'Ninth Chest': { isAvailable: function () {
                return canSmash(); }, },
            'Tenth Chest': { isAvailable: function () {
                return canSmash(); }, },
            'Eleventh Chest': { isAvailable: function () {
                return canSmash(); }, },
            'Twelfth Chest': { isAvailable: function () {
                return canSmash(); }, },
            'Thirteenth Chest': { isAvailable: function () {
                return canSmash(); }, },
            'Fourteenth Chest': { isAvailable: function () {
                return canSmash(); }, },
            'Heart Piece Chest': { isAvailable: function () { 
                return canSmash() && items.Lanturn; }, },
        },
        isBeatable: function() {
            if ((canPlay(items.SariasSong) || canPlay(items.MinuetofForest)) && items.Hookshot && items.Glove  && items.Bow) {
                if (this.canGetChest() == 'available') {
                    return 'available';
                }
                return 'possible';
            } else {
                return "unavailable";
            }
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Bridge of Eldin Stockcave",
        x: "81.0%",
        y: "27.6%",
        chestlist: {
            'Dodongo Chest': { isAvailable: function () {
                return items.Clawshot && items.IronBoots; }, },
            'Lanturn Chest': { isAvailable: function () {
                return items.Clawshot && items.Lanturn && items.IronBoots; }, },
            'Heart Piece Chest': { isAvailable: function () {
                return items.Clawshot && items.Lanturn && items.IronBoots; }, },
        },
        isBeatable: function() {
            return this.canGetChest();
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Kakariko Village",
        x: "80.41%",
        y: "53.36%",
        chestlist: {
            'Inn Small Chest': { isAvailable: function () {
                return true; }, },
            'Barnes Bomb Bag': { isAvailable: function () {
                return items.Boss2; }, },
            'Eldin Spring Heart Piece': { isAvailable: function () {
                return items.IronBoots && canSmash(); }, },
            'Bomb Rock Spire Heart Piece': { isAvailable: function () {
                    return items.Boomerang && shootPew(); }, },
            'Graveyard Lanturn Chest': { isAvailable: function () {
                return items.Lanturn; }, },
            'Watchtower Chest': { isAvailable: function () {
                return true; }, },
            'Watchtower Alcove Chest': { isAvailable: function () {
                return canSmash(); }, },
            'Archery Heart Piece': { isAvailable: function () {
                return items.Bow; }, },
            'Cliff Heart Piece': { isAvailable: function () {
                return shootPew() && items.Boomerang; }, },
            'Hylian Shield': { isAvailable: function () {
                return items.Boss1; }, },
            'Hawkeye': { isAvailable: function () {
                return items.Bow && items.Shield >1; }, },
            'Zora Armor': { isAvailable: function () {
                return items.Lanturn && items.IronBoots && items.Boomerang && items.Bow && hasBoom(); }, },
            'Coral Earring': { isAvailable: function () {
                return items.Sketch; }, },
            'Jump Strike': { isAvailable: function () {
                return items.Crystal && canAccessSnowpeak(); }, },
            'Renados Letter': { isAvailable: function () {
                return items.Boss6; }, },
            'Horse Call': { isAvailable: function () {
                return items.Charm >=4; }, },
            'Powered Dominion Rod': { isAvailable: function () {
                return items.Skybook >=1; }, },
        },
        isBeatable: function() {
            return this.canGetChest();
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Lanayru Spring",
        x: "42.5%",
        y: "52.08%",
        chestlist: {
            'Underwater Left Small Chest': { isAvailable: function () {
                return items.IronBoots; }, },
            'Underwater Right Small Chest': { isAvailable: function () {
                return items.IronBoots; }, },
            'Southern Room Left Chest': { isAvailable: function () {
                return items.Clawshot; }, },
            'Southern Room Right Chest': { isAvailable: function () {
                return items.Clawshot; }, },
            'Heart Piece Chest': { isAvailable: function () {
                return items.Clawshot && items.Lanturn; }, },
            'West Double Clawshot Chest': { isAvailable: function () {
                return items.Clawshot >1; }, },
            'East Double Clawshot Chest': { isAvailable: function () {
                return items.Clawshot >1; }, },
        },
        isBeatable: function() {
            return this.canGetChest();
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Hyrule Castle Town",
        x: "53.75%",
        y: "41.2%",
        chestlist: {
            'East Small Chest': { isAvailable: function () {
                return items.Charm >= 2; }, },
            'Magic Armor': { isAvailable: function () {
                return items.Wallet >2 && items.Lanturn && items.IronBoots && items.Boomerang && items.Bow && hasBoom(); }, },
            'Donation Heart Piece': { isAvailable: function () {
                return true; }, },
            'STAR Challenge 1': { isAvailable: function () {
                return items.Clawshot; }, },
            'STAR Challenge 2': { isAvailable: function () {
                return items.Clawshot >1; }, },
            'Jovani Bottle': { isAvailable: function () {
                return items.Soul >= 20; }, },
            'Jovani All Souls': { isAvailable: function () {
                return items.Soul >= 60; }, },
            'Invoice': { isAvailable: function () {
                return items.Charm >=1; }, },
            'Medicine Scent': { isAvailable: function () {
                return items.Charm > 1; }, },
            'Agitha 1st Bug': { isAvailable: function () {
                return items.Bugs >=1; }, },
            'Agitha 2nd Bug': { isAvailable: function () {
                return items.Bugs >=2; }, },
            'Agitha 3rd Bug': { isAvailable: function () {
                return items.Bugs >=3; }, },
            'Agitha 4th Bug': { isAvailable: function () {
                return items.Bugs >=4; }, },
            'Agitha 5th Bug': { isAvailable: function () {
                return items.Bugs >=5; }, },
            'Agitha 6th Bug': { isAvailable: function () {
                return items.Bugs >=6; }, },
            'Agitha 7th Bug': { isAvailable: function () {
                return items.Bugs >=7; }, },
            'Agitha 8th Bug': { isAvailable: function () {
                return items.Bugs >=8; }, },
            'Agitha 9th Bug': { isAvailable: function () {
                return items.Bugs >=9; }, },
            'Agitha 10th Bug': { isAvailable: function () {
                return items.Bugs >=10; }, },
            'Agitha 11th Bug': { isAvailable: function () {
                return items.Bugs >=11; }, },
            'Agitha 12th Bug': { isAvailable: function () {
                return items.Bugs >=12; }, },
            'Agitha 13th Bug': { isAvailable: function () {
                return items.Bugs >=13; }, },
            'Agitha 14th Bug': { isAvailable: function () {
                return items.Bugs >=14; }, },
            'Agitha 15th Bug': { isAvailable: function () {
                return items.Bugs >=15; }, },
            'Agitha 16th Bug': { isAvailable: function () {
                return items.Bugs >=16; }, },
            'Agitha 17th Bug': { isAvailable: function () {
                return items.Bugs >=17; }, },
            'Agitha 18th Bug': { isAvailable: function () {
                return items.Bugs >=18; }, },
            'Agitha 19th Bug': { isAvailable: function () {
                return items.Bugs >=19; }, },
            'Agitha 20th Bug': { isAvailable: function () {
                return items.Bugs >=20; }, },
            'Agitha 21st Bug': { isAvailable: function () {
                return items.Bugs >=21; }, },
            'Agitha 22nd Bug': { isAvailable: function () {
                return items.Bugs >=22; }, },
            'Agitha 23rd Bug': { isAvailable: function () {
                return items.Bugs >=23; }, },
            'Agitha All Bugs': { isAvailable: function () {
                return items.Bugs >=24; }, },
        },
        isBeatable: function() {
            return this.canGetChest();
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Kakariko Gorge Lanturn Cave",
        x: "65.91%",
        y: "57.31%",
        chestlist: {
            'First Chest': { isAvailable: function () {
                return canSmash() && items.Lanturn; }, },
            'Second Chest': { isAvailable: function () {
                return canSmash() && items.Lanturn; }, },
            'Heart Piece Chest': { isAvailable: function () {
                return canSmash() && items.Lanturn; }, },
        },
        isBeatable: function() {
            return this.canGetChest();
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Bublin Camp",
        x: "14.98%",
        y: "44.96%",
        chestlist: {
            'Outside Watchtower Small Chest': {
                isAvailable: function () {
                    return canAccessDesert();
                },
            },
            'Inner Tent Small Chest': {
                isAvailable: function () {
                    return canAccessDesert();
                },
            },
            'Cooked Boar Heart Piece': {
                isAvailable: function () {
                    return canAccessDesert();
                },
            },
            'Outside Arbiter Grounds Lanturn Chest': {
                isAvailable: function () {
                    return items.Lanturn && canAccessDesert();
                },
            },
        },
        isBeatable: function () {
            return this.canGetChest();
        },
        canGetChest: function () {
            return generalCanGetChest(this.chestlist);
        },
    },

    {
        name: "Arbiter's Grounds Poes",
        x: "15.2%",
        y: "41.44%",
        chestlist: {
            'Lobby Poe': { //1
                isAvailable: function () {
                    return canAccessDesert()
                },
            },
            'East Lower Poe': { //2
                isAvailable: function () {
                    return canAccessDesert() && items.Lantern;
                },
            },
            'East Upper Poe': { //3
                isAvailable: function () {
                    return canAccessDesert() && items.Lanturn;
                },
            },
            'West Poe': { //4
                isAvailable: function () {
                    return canAccessDesert() && items.Lanturn;
                },
            }
        },
        isBeatable: function () {
            if (canAccessDesert() && items.Lanturn ) {
                if (this.canGetChest() == 'available') {
                    return 'available';
                }
                return 'possible';
            } else {
                return "unavailable";
            }
        },
        canGetChest: function () {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Snowpeak Ruins Poes",
        x: "21.31%",
        y: "28.64%",
        chestlist: {
            'Lobby Armor Poe': { //5
                isAvailable: function () {
                    return canAccessSnowpeak() && items.Chainball;
                }
            },
            'Lobby Poe': { //6
                isAvailable: function () {
                    return canAccessSnowpeak() && items.Chainball;
                }
            },
            'Mini Freezard Poe': { //7
                isAvailable: function () {
                    return canAccessSnowpeak();
                }
            },
        },
        isBeatable: function () { 
            if (canAccessSnowpeak() && items.Chainball && hasBoom()) {
                if (this.canGetChest() == 'available') {
                    return 'available';
                }
                return 'possible';
            } else {
                return "unavailable";
            }
        },
        canGetChest: function () {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Temple of Time Poes",
        x: "43.83%",
        y: "63.36%",
        chestlist: {
            'Poe Behind Gate': { //8
                isAvailable: function () {
                    return canAccessTot() && items.Dominion >= 1 && items.Lanturn;
                },
            },
            'Poe Above Scales': { //9
                isAvailable: function () {
                    return canAccessTot() && items.Lanturn;
                },
            },          
        },
        isBeatable: function () { 
            if (canAccessTot() && items.Spinner && items.Dominion >= 1 && items.Lanturn) {
                if (this.canGetChest() == 'available') {
                    return 'available';
                }
                return 'possible';
            } else {
                return "unavailable";
            }
        },
        canGetChest: function () {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "CiTS Poes",
        x: "38.0%",
        y: "50.56%",
        chestlist: {
            'Garden Island Poe': { //10
                isAvailable: function () {
                    return canAccessCITS();
                },
            },
            'Poe Above Central Fan': { //11
                isAvailable: function () {
                    return canAccessCITS() && items.IronBoots;
                },
            },
        },
        isBeatable: function () {
            if (canAccessCITS() && items.Spinner && items.IronBoots && items.Clawshot >= 2) {
                if (this.canGetChest() == 'available') {
                    return 'available';
                }
                return 'possible';
            } else {
                return "unavailable";
            }
        },
        canGetChest: function () {
            return generalCanGetChest(this.chestlist);
        },
    }
];

//define overworld chests
var chests = [
    {
        name: "Herding Goats Heart Piece",
        x: "56.33%",
        y: "90.16%",
        isAvailable: function () {
            if (items.Boss1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Rat and Chu-Chu Chest",
        x: "54.33%",
        y: "90.16%",
        isAvailable: function () {
            if (items.Crystal && items.Lanturn) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Lanturn",
        x: "56.16%",
        y: "71.76%",
        isAvailable: function () {
            if (items.Slingshot) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Coro's Bottle",
        x: "56.16%",
        y: "72.76%",
        isAvailable: function () {
            if (items.Lanturn) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "North Faron Cave Small Chest",
        x: "54.33%",
        y: "68.08%",
        isAvailable: function() {
            if (items.Lanturn) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "North Faron Cave Heart Piece Chest",
        x: "53.33%",
        y: "68.08%",
        isAvailable: function() {
            if (items.Lanturn) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "South Faron Cave Small Chest",
        x: "53.7%",
        y: "71.8%",
        isAvailable: function () {
            if (items.Lanturn) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Mist - North Mist Small Chest",
        x: "51.91%",
        y: "69.2%",
        isAvailable: function() {
            if (items.Lanturn && FaronEscape) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Mist - West Stump Small Chest",
        x: "51.01%",
        y: "70.2%",
        isAvailable: function() {
            if (items.Lanturn) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Mist - East Mist Chest",
        x: "52.10%",
        y: "70.2%",
        isAvailable: function() {
            if (items.Lanturn) {
                return "available";
            }
            return "unavailable"
        },
    },
    {
        name: "Mist - Owl Statue Chest",
        x: "54.01%",
        y: "69.6%",
        isAvailable: function () {
            if ((glitchedLogic == false && items.Dominion > 1 && canSmash() && items.Crystal) || (glitchedLogic == true && items.Crystal)) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Mist - Skybook Letter",
        x: "55.01%",
        y: "69.6%",
        isAvailable: function () {
            if (items.Dominion > 1 && canSmash()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
	        name: "Near Shop Chest",
	        x: "48.66%",
	        y: "69.6%",
	        isAvailable: function() {
	            if (items.Lanturn) {
	                return "available";
        	    }
	            return "unavailable"
	        },
	},
    {
        name: "Alcove Heart Piece Chest",
        x: "85.83%",
        y: "41.28%",
        isAvailable: function() {
            if (items.Boss2 || items.Clawshot) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Past - Heart Piece",
        x: "45.08%",
        y: "68.88%",
        isAvailable: function() {
            if (canAccessTot() && items.Dominion > 1)
                return "available";
            return "unavailable";
        },
    },
    {
        name: "Bomb Rock Ledge Heart Piece",
        x: "71.91%",
        y: "43.52%",
        isAvailable: function() {
            if (canSmash()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Ashei Sketch",
        x: "50.43%",
        y: "11.06%",
        isAvailable: function () {
            if (items.Boss4) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Small Chest Under Waterfall",
        x: "55.93%",
        y: "10.56%",
        isAvailable: function() {
            return "available";
        },
    },
    {
        name: "Small Chest Near Mother and Child Isles",
        x: "56.73%",
        y: "11.44%",
        isAvailable: function () {
            return "available";
        }
    },
    {
        name: "Underwater Chest",
        x: "39.85%",
        y: "54.06%",
        isAvailable: function() {
            if (items.IronBoots) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Deku Baba Heart Piece Chest",
        x: "42.16%",
        y: "68.88%",
        isAvailable: function() {
            if (items.Crystal && canSmash()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Helmasaur Chest",
        x: "45.25%",
        y: "38.48%",
        isAvailable: function () {
            if (items.Crystal && items.Clawshot) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Water Toadpoli Chest",
        x: "38.95%",
        y: "55.26%",
        isAvailable: function() {
            if (items.Crystal && items.Boss3) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Outside Lanayru Spring - Left Statue Small Chest",
        x: "42.05%",
        y: "50.76%",
        isAvailable: function() {
                return "available";  
        },
    },
    {
        name: "Outside Lanayru Spring - Right Statue Chest",
        x: "43.15%",
        y: "50.76%",
        isAvailable: function() {
                return "available";
            }
    },
    {
        name: "Flight-By-Fowl (5)",
        x: "43.5%",
        y: "48.0%",
        isAvailable: function () {
            return "available";
        }
    },
    {
        name: "Grotto - Shell Blade Chest",
        x: "38.41%",
        y: "45.92%",
        isAvailable: function() {
            if (items.Crystal && items.IronBoots && items.Boss3) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Underwater Right Chest",
        x: "55.5%",
        y: "08.48%",
        isAvailable: function() {
            if (items.Lanturn && items.IronBoots) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Goron In Lava Rock",
        x: "55.05%",
        y: "07.2%",
        isAvailable: function() {
            if (items.IronBoots && hasBoom()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Underwater Left Chest",
        x: "54.5%",
        y: "08.48%",
        isAvailable: function() {
            if (items.Boomerang && items.IronBoots && items.Lanturn) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Skultulla Chest",
        x: "54.0%",
        y: "22.8%",
        isAvailable: function() {
            if (items.Crystal && items.Lanturn) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Behind Gate Underwater Chest",
        x: "53.83%",
        y: "29.84%",
        isAvailable: function() {
            if (items.Crystal && items.IronBoots) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Bridge Vines Chest",
        x: "41.58%",
        y: "45.84%",
        isAvailable: function() {
            if (items.Clawshot) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Bubble Chest",
        x: "46.33%",
        y: "56.24%",
        isAvailable: function () {
            if (items.Crystal && items.Clawshot && items.Lanturn && shootPew()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Oustide Grotto Chest",
        x: "44.83%",
        y: "56.24%",
        isAvailable: function () {
            if (items.Clawshot && shootPew()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Under Bridge Chest",
        x: "54.91%",
        y: "58.8%",
        isAvailable: function () {
            if (items.Clawshot) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Chu, Baba, and Keese  Right Chest",
        x: "58.11%",
        y: "64.16%",
        isAvailable: function () {
            if (items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Chu, Baba, and Keese  Left Chest",
        x: "57.01%",
        y: "64.16%",
        isAvailable: function () {
            if (items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Chu, Baba, and Keese  Rear Chest",
        x: "57.01%",
        y: "65.16%",
        isAvailable: function () {
            if (items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Castle Pillar Chest",
        x: "52.83%",
        y: "44.16%",
        isAvailable: function () {
            if (items.Clawshot) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Tetike Chest",
        x: "55.8%",
        y: "46.12%",
        isAvailable: function () {
            if (items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Bombling Left Chest",
        x: "69.66%",
        y: "39.36%",
        isAvailable: function () {
            if (items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Bombling Right Chest",
        x: "70.86%",
        y: "39.36%",
        isAvailable: function () {
            if (items.Crystal && items.Lanturn) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Water Bomb Fish Chest",
        x: "77.41%",
        y: "34.88%",
        isAvailable: function () {
            if (items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Skulltula Chest",
        x: "33.58%",
        y: "60.32%",
        isAvailable: function () {
            if (canAccessDesert() && items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Peahat Chest",
        x: "29.08%",
        y: "60.24%",
        isAvailable: function () {
            if (canAccessDesert() && items.Clawshot) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "East Canyon Chest",
        x: "29.33%",
        y: "56.88%",
        isAvailable: function () {
            if (canAccessDesert()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Lone Small Chest",
        x: "22.50%",
        y: "57.68%",
        isAvailable: function () {
            if (canAccessDesert()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "West Canyon Chest",
        x: "14.08%",
        y: "57.64%",
        isAvailable: function () {
            if (canAccessDesert() && items.Clawshot) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Poe and Boulder Chest",
        x: "21.66%",
        y: "50.64%",
        isAvailable: function () {
            if (canAccessDesert() && items.Crystal && canSmash()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "North Small Chest Behind Gate",
        x: "17%",
        y: "49.28%",
        isAvailable: function () {
            if (canAccessDesert()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "South Chest Behind Gate",
        x: "26.5%",
        y: "61.28%",
        isAvailable: function () {
            if (canAccessDesert()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Top-Left Small Chest by Campfire",
        x: "15%",
        y: "51.36%",
        isAvailable: function () {
            if (canAccessDesert()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Right Small Chest by Campfire",
        x: "16%",
        y: "51.36%",
        isAvailable: function () {
            if (canAccessDesert()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Bottom-Left Small Chest by Campfire",
        x: "15%",
        y: "52.36%",
        isAvailable: function () {
            if (canAccessDesert()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Small Chest With Boxes",
        x: "16.33%",
        y: "47.76%",
        isAvailable: function () {
            if (canAccessDesert()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Spinner Wall Heart Piece Chest",
        x: "41.41%",
        y: "38.08%",
        isAvailable: function () {
            if (items.Spinner) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Stalfos Left Small Chest",
        x: "74.16%",
        y: "19.6%",
        isAvailable: function () {
            if (items.Spinner) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Stalfos Right Small Chest",
        x: "75.16%",
        y: "19.6%",
        isAvailable: function () {
            if (items.Spinner) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Stalfos Heart Piece Chest",
        x: "74.66%",
        y: "18.6%",
        isAvailable: function () {
            if (items.Spinner && canSmash()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Fountain Chest",
        x: "54.01%",
        y: "45.68%",
        isAvailable: function () {
            if (items.Spinner && items.Clawshot) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Wooden Statue",
        x: "54.01%",
        y: "47.68%",
        isAvailable: function () {
            if (items.Charm >=2) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Frozen Lanturn Chest",
        x: "38.26%",
        y: "11.48%",
        isAvailable: function () {
            if (items.Chainball && items.Lanturn && canAccessSnowpeak()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Freezard Chest",
        x: "42.5%",
        y: "9.12%",
        isAvailable: function () {
            if (items.Crystal && items.Chainball && canAccessSnowpeak()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Frozen Block Cave Chest",
        x: "52.85%",
        y: "26.04%",
        isAvailable: function () {
            if (items.Chainball) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Lost Woods - Lanturn Chest",
        x: "45.41%",
        y: "70.8%",
        isAvailable: function () {
            if (items.Lanturn && items.Boomerang) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Lost Woods - Spinner Chest",
        x: "42.91%",
        y: "70.8%",
        isAvailable: function () {
            if (items.Spinner && items.Boomerang) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Eldin Bridge Owl Chest",
        x: "77.75%",
        y: "32.64%",
        isAvailable: function () {
            if ((items.Dominion > 1 && items.Clawshot >= 1) || glitchedLogic == true && (canLJA() || items.Crystal)) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Eldin Bridge Skybook Letter",
        x: "77.75%",
        y: "28.64%",
        isAvailable: function () {
            if (items.Dominion > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Gorge Owl Statue Chest",
        x: "66%",
        y: "48.8%",
        isAvailable: function () {
            if (items.Dominion > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Gorge Skybook Letter",
        x: "67%",
        y: "48.8%",
        isAvailable: function () {
            if (items.Dominion > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Castle Ruins Owl Statue Chest",
        x: "45.38%",
        y: "43.84%",
        isAvailable: function () {
            if (items.Dominion > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Castle Ruins Skybook Letter",
        x: "46.38%",
        y: "43.84%",
        isAvailable: function () {
            if (items.Dominion > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Hylia Bridge Owl Statue Chest",
        x: "41.45%",
        y: "43.44%",
        isAvailable: function () {
            if (items.Dominion > 1 && items.Clawshot) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Hylia Bridge Skybook Letter",
        x: "42.45%",
        y: "43.44%",
        isAvailable: function () {
            if (items.Dominion > 1 && items.Clawshot) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Gerudo Desert Owl Statue Chest",
        x: "20.58%",
        y: "59.6%",
        isAvailable: function () {
            if (items.Dominion > 1 && canAccessDesert()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Gerudo Desert Skybook Letter",
        x: "20.58%",
        y: "61.1%",
        isAvailable: function () {
            if (items.Dominion > 1 && canAccessDesert()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Gorge Spire Chest",
        x: "61.75%",
        y: "52.16%",
        isAvailable: function () {
            if (items.Clawshot > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Lake Chasm Chest",
        x: "51.50%",
        y: "46.88%",
        isAvailable: function () {
            if (items.Clawshot > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Gorge Spire Heart Piece",
        x: "62.85%",
        y: "52.40%",
        isAvailable: function () {
            if (items.Boomerang) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Fishing Hole Heart Piece",
        x: "64.5%",
        y: "9%",
        isAvailable: function () {
            if (items.Crystal || canSmash()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Fishing Hole Bottle",
        x: "65.8%",
        y: "9.5%",
        isAvailable: function () {
            if (items.Rod && (items.Crystal || canSmash())) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Plumm Fruit Game Heart Piece",
        x: "65.8%",
        y: "14.5%",
        isAvailable: function () {
            if (items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Aurus Memo",
        x: "35.58%",
        y: "53.36%",
        isAvailable: function () {
            if (items.Boss3 && items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Iza Bomb Bag",
        x: "65.8%",
        y: "12%",
        isAvailable: function () {
            if (items.Lanturn && items.IronBoots && items.Boomerang && items.Bow && hasBoom()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Giant Bomb Bag",
        x: "66.8%",
        y: "12%",
        isAvailable: function () {
            if (items.Lanturn && items.IronBoots && items.Boomerang && items.Bow && hasBoom()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Tree Heart Piece",
        x: "56%",
        y: "60.88%",
        isAvailable: function () {
            if (items.Boomerang) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Hot Springwater Goron",
        x: "60.25%",
        y: "40.4%",
        isAvailable: function () {
            if (items.Lanturn && items.IronBoots && items.Boomerang && items.Bow && hasBoom()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Snowboard Racing",
        x: "36.25%",
        y: "11.68%",
        isAvailable: function () {
            if (items.Boss5) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Hidden Village - Impaz - Llia Charm",
        x: "71%",
        y: "24.8%",
        isAvailable: function () {
            if (items.Charm >=3) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Hidden Village - Impaz - Skybook",
        x: "71%",
        y: "25.8%",
        isAvailable: function () {
            if (items.Charm >= 4) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Hidden Village - Hide and Seek",
        x: "72%",
        y: "23.8%",
        isAvailable: function () {
            if (items.Charm >= 4) {
                return "available";
            }
            return "unavailable";
        },
    },
    //Custom Chests
    {
        name: "Ending Blow",
        x: "48.16%",
        y: "68.6%",
        isAvailable: function() {
            if (items.Lanturn) {
                return "available";
            }
            return "unavailable"
        },
    },
    {
        name: "Shield Attack",
        x: "54.5%",
        y: "81.24%",
        isAvailable: function() {
            if (items.Crystal) {
                return "available";
            }
            return "unavailable"
        },
    },
    {
        name: "Back Slice",
        x: "48.38%",
        y: "40.84%",
        isAvailable: function () {
            if (items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Helm Splitter",
        x: "52.83%",
        y: "46.16%",
        isAvailable: function () {
            if (items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Mortal Draw",
        x: "14.13%",
        y: "47.36%",
        isAvailable: function () {
            if (items.Crystal && canAccessDesert()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Great Spin",
        x: "53.85%",
        y: "38.8%",
        isAvailable: function () {
            if (items.Crystal && items.Charm > 2) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Youth's Scent",
        x: "62%",
        y: "59.88%",
        isAvailable: function () {
            if (items.Boss1 || FaronEscape) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Ilia Scent",
        x: "62.0%",
        y: "23.3%",
        isAvailable: function() {
            if ((FaronEscape || items.Boss1) && ((items.Boss2 && canSmash()) || (TwilightSkip && OpenGates))) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Reekfish Scent",
        x: "55.73%",
        y: "11.44%",
        isAvailable: function() {
            if (items.Rod > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Light Sword",
        x: "15.3%",
        y: "39.14%",
        isAvailable: function() {
            if (canAccessPoT() && items.Clawshot > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Master Sword",
        x: "44.70%",
        y: "65.68%",
        isAvailable: function() {
            if (items.Crystal || (items.Boss3 && !SkipMDH))
                return "available";
            return "unavailable";
        },
    },
    {
        name: "Shadow Crystal",
        x: "43.70%",
        y: "65.68%",
        isAvailable: function() {
            if (items.Crystal || (items.Boss3 && !SkipMDH))
                return "available";
            return "unavailable";
        },
    },

    // Poes =============================================================================================
    
    {
        //12
        name: "Jovani Poe",
        x: "54.75%",
        y: "42.2%",
        isAvailable: function () {
            if (items.Shard2) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        //13
        name: "East Castle Town Bridge Poe",
        x: "58.25%",
        y: "40.56%",
        isAvailable: function () {
            if (items.Shard2) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        //14
        name: "South Castle Town Field Poe",
        x: "53.66%",
        y: "45.84%",
        isAvailable: function () {
            if (items.Shard2) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        //15
        name: "Castle Ruins Poe",
        x: "45.16%",
        y: "43.36%",
        isAvailable: function () {
            if (items.Shard2) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        //16
        name: "Faron Mist Poe",
        x: "51.41%",
        y: "69.76%",
        isAvailable: function () {
            if (items.Shard2) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        //17
        name: "Lost Woods Poe",
        x: "47%",
        y: "71.4%",
        isAvailable: function () {
            if (items.Shard2) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        //18
        name: "Faron Field Poe",
        x: "54.58%",
        y: "59.04%",
        isAvailable: function () {
            if (items.Shard2) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        //19
        name: "Kakariko Gorge Poe",
        x: "65.25%",
        y: "53.52%",
        isAvailable: function () {
            if (items.Shard2) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        //20
        name: "Poe Under Rock",
        x: "42.16%",
        y: "68.88%",
        isAvailable: function () {
            if (items.Sword > 2 && canSmash()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        //21
        name: "Master Sword Poe",
        x: "44.20%",
        y: "65.68%",
        isAvailable: function () {
            if (items.Shadow3)
                return "available";
            return "unavailable";
        },
    },
    {
        //22
        name: "Past - Poe",
        x: "43.78%",
        y: "68.88%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //23
        name: "CoO - F17 Poe",
        x: "14.25%",
        y: "60.4%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //24
        name: "CoO - F33 Poe",
        x: "15.25%",
        y: "60.4%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //25
        name: "CoO - F44 Poe",
        x: "14.25%",
        y: "61.4%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //26
        name: "Death Mountain Poe",
        x: "85.91%",
        y: "44%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //27
        name: "Poe By Entrance",
        x: "33.75%",
        y: "60.40%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //28
        name: "Poe Above CoO",
        x: "14.17%",
        y: "59.4%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //29
        name: "Poe Above Grotto",
        x: "20.83%",
        y: "50.88%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //30
        name: "Poe in Grotto #1",
        x: "21.83%",
        y: "50.88%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //31
        name: "Poe in Grotto #2",
        x: "20.83%",
        y: "51.88%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //32
        name: "Poe next to Bublin Camp",
        x: "13.33%",
        y: "47.2%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //33
        name: "Bublin Camp Poe",
        x: "15%",
        y: "45.2%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //34
        name: "Poe before AG",
        x: "15%",
        y: "43.6%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //35
        name: "Graveyard Open Poe",
        x: "84.16%",
        y: "54.4%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //36
        name: "Graveyard Grave Poe",
        x: "84.16%",
        y: "55.4%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //37
        name: "Hidden Village Poe",
        x: "70.41%",
        y: "24.00%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //38
        name: "Eldin Longcave Poe",
        x: "65.83%",
        y: "57.2%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //39
        name: "Bridge Poe",
        x: "54.25%",
        y: "26.88%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //40
        name: "Grotto Poe #1",
        x: "49.66%",
        y: "26.8%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //41
        name: "Grotto Poe #2",
        x: "50.66%",
        y: "26.8%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //42
        name: "Poe on Rock Ledge",
        x: "44.42%",
        y: "56%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //43
        name: "Bomb Shop Poe",
        x: "81.83%",
        y: "51.76%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //44
        name: "Watchtower Poe",
        x: "80.83%",
        y: "50.88%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //45
        name: "Poe by the Dock",
        x: "46.58%",
        y: "50.64%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //46
        name: "Alcove Poe",
        x: "40.08%",
        y: "54.72%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //47
        name: "Poe near Tower",
        x: "34.08%",
        y: "53.12%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //48
        name: "Isle of Riches Poe",
        x: "39.08%",
        y: "49.12%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //49
        name: "Flight by Fowl Ledge Poe",
        x: "36.42%",
        y: "46.72%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //50
        name: "LLC Poe #1",
        x: "38.5%",
        y: "54.8%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //51
        name: "LLC Poe #2",
        x: "39.5%",
        y: "55.8%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //52
        name: "LLC Poe #3",
        x: "38.5%",
        y: "55.8%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //53
        name: "Poe in Blizzard",
        x: "44.67%",
        y: "9.36%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //54
        name: "Poe under Tree",
        x: "41.5%",
        y: "8.08%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //55
        name: "Poe above Grotto",
        x: "41.75%",
        y: "9.46%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //56
        name: "Poe in Cave",
        x: "38.08%",
        y: "11.44%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //57
        name: "Poe in Cave",
        x: "21.75%",
        y: "31.52%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //58
        name: "Upper Zora River Poe",
        x: "64%",
        y: "14.16%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //59
        name: "Poe Behind Waterfall",
        x: "54.5%",
        y: "9.52%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
    {
        //60
        name: "Poe By Mother and Child Rocks",
        x: "55.25%",
        y: "11.36%",
        isAvailable: function () {
            if (canAccessTot() && items.Dominion)
                return "available";
            return "unavailable";
        },
    },
]

