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




function hasBoom() {
    return ((items.Bombs || items.WBombs))
}

function canSmash() {
    return (hasBoom() || items.Chainball);
}

function shootPew() {
    return (hasBoom() && items.Bow);
}

function canDoDamage() {
    return (items.Bow || items.Spinner || items.Chainball || items.Sword >= 1 || items.MSword >= 1 || items.IronBoots || hasBoom() || items.Crystal);
}

function hasRangedItem() {
    return (items.Bow || items.Chainball || items.Clawshot >= 1 || items.Slingshot || items.Boomerang);
}

function canBurnWebs() {
    return (items.Lantern || canSmash());
}

function faronTwilightCleared() {
    return (items.Vessel >= 1 || TwilightSkip);
}

function eldinTwilightCleared() {
    return (items.Vessel >= 2 || TwilightSkip);
}

function lanayruTwilightCleared() {
    return (items.Vessel >= 3 || TwilightSkip);
}


//Area Access
function canAccessHyruleField() {
    return (items.Boss1 || FaronEscape);
}

function canAccessNorthFaron() {
    return (faronTwilightCleared() && (items.Lantern || items.Crystal));
}

function canAccessKakGorge() {
    return (eldinTwilightCleared());
}

function canAccessKakVillage() {
    return (eldinTwilightCleared());
}

function canAccessDeathMountain() {
    return (eldinTwilightCleared() && (canAccessKakVillage() || items.Crystal) && (items.IronBoots || MinesPatch));
}

function canAccessLakeHylia() {
    return (lanayruTwilightCleared() && (canSmash() || OpenGates))
}

//Need Auru's Memo to use the cannon to get to the desert
function canAccessDesert() {
    return (canAccessLakeHylia() && (items.Memo || EarlyDesert) && items.Crystal);
}

function canAccessZoraDomain() {
    return (lanayruTwilightCleared() && (items.Crystal || canSmash()));
}

function canAccessSnowpeakSummit() {
    return (canAccessZoraDomain() && items.ReekfishScent && items.Crystal);
}

function canAccessGrove() {
    return (canAccessNorthFaron() && ((setMDHFlag() && items.Crystal) || (EarlyToT && items.Crystal)));
}

function canAccessGrove2() {
    return ((canAccessNorthFaron() && items.Boss5 && items.Bow) || (items.Crystal && EarlyToT));
}

function canAccessMirrorChamber() {
    return (items.Boss4);
}

function canAccessCastleTown() {
    return (canAccessLanayruField());
}

function canAccessFaronField() {
    return (faronTwilightCleared() && (FaronEscape || items.Boss1));
}

function canAccessEldinField() {
    return (eldinTwilightCleared());
}

function canAccessLanayruField() {
    return (lanayruTwilightCleared() && (hasBoom() || OpenGates));
}

function canAccessHiddenVillage() {
    return (items.Charm >= 3 && (canAccessLanayruField() || (canAccessEldinField() && canSmash())));
}

function setMDHFlag() {
    return (SkipMDH || (!SkipMDH && items.Boss3));
}
//Need Lantern to burn the web at the entrance and sword to get past Golden Wolf
function canAccessForest() {
    return (canAccessNorthFaron() && (FaronEscape || canBurnWebs()));
}

//Need iron boots to beat Gor Coron
function canAccessMines() {
    return ((canDoDamage() || items.Slingshot || items.Lantern) && canAccessDeathMountain());
}

//Need iron boots to use water bombs and Zora Armor so you do not drown
function canAccessLakebed() {
    return (items.ZoraArmor && items.WBombs && items.IronBoots && canAccessLakeHylia());
}

//Need Auru's Memo to use the cannon to get to the desert
function canAccessArbiters() {
    return (canAccessDesert() && (items.Sword || items.MSword));
}

//Need Aleshi's Sketch to get the Coral Earring to get the ReekfishScent
function canAccessSnowpeakRuins() {
    return (canAccessSnowpeakSummit());
}

//Need Golden Cuccoo to reach Sacred Grove then need bow to beat Skull Kid and need Master Sword to open Dungeon Entrance
function canAccessTot() {
    return (canAccessGrove2() && (items.MSword || EarlyToT));
}

//Need Dominion Rod to move the Owl Statues and Charm to get Skybook to access Cannon and Clawshot to enter cannon
function canAccessCiTS() {
    return (canAccessLakeHylia() && (items.Skybook >= 7 || EarlyCits) && items.Clawshot);
}

// You only need the Mirror Shard from City in the Sky to open up Pallace of Twilight
function canAccessPoT() {
    return (items.Boss7 && canAccessMirrorChamber());
}

//To enter Hyrule you need to beat Zant so the requirements for beating Zant are the same as entering Hyrule
function canAccessHyrule() {
    return ((items.Boss8 || EarlyHyruleCastle) && canAccessCastleTown());
}


// define dungeon chests
var dungeons = [{
        name: "Ordon Village",
        x: "55.5%",
        y: "85.84%",
        chestlist: {
            'Wooden Sword Chest': {
                isAvailable: function() {
                    return (items.Rod >= 1 || SkipIntro);
                },
            },
            'Link House Basement Chest': {
                isAvailable: function() {
                    return items.Lantern;
                },
            },
            'Fishing Rod': {
                isAvailable: function() {
                    return true;
                },
            },
            'Seras Bottle': {
                isAvailable: function() {
                    return (items.Rod >= 1 || SkipIntro);
                },
            },
            'Slingshot': {
                isAvailable: function() {
                    return (items.Rod >= 1 || SkipIntro)
                },
            },
            'Ordon Shield': {
                isAvailable: function() {
                    return (canDoDamage() || SkipIntro);
                },
            },
            'Ordon Sword': {
                isAvailable: function() {
                    return (canDoDamage() || SkipIntro);
                },
            },
            'Iron Boots Chest': {
                isAvailable: function() {
                    return ((canDoDamage() || SkipIntro) && (items.Vessel >= 1 || TwilightSkip));
                },
            },
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
            'Entrance Vine Chest': {
                isAvailable: function() {
                    return canAccessForest() && hasRangedItem();
                },
            },
            'Central Chest Behind Stairs': {
                isAvailable: function() {
                    return canAccessForest() && items.Boomerang && canDoDamage();
                },
            },
            'Dungeon Map Chest': {
                isAvailable: function() {
                    return items.Lantern && canAccessForest() && canDoDamage();
                },
            },
            'Ooccoo': {
                isAvailable: function() {
                    return canAccessForest() && canDoDamage();
                },
            },
            'Windless Bridge Chest': {
                isAvailable: function() {
                    return canBurnWebs() && canAccessForest() && canDoDamage();
                },
            },
            'Second Monkey Under Bridge Chest': {
                isAvailable: function() {
                    return canBurnWebs() && canDoDamage() && canAccessForest();
                },
            },
            'Totem Pole Chest': {
                isAvailable: function() {
                    return canBurnWebs() && canDoDamage() && canAccessForest();
                },
            },
            'West Tile Worm Small Chest': {
                isAvailable: function() {
                    return canBurnWebs() && canDoDamage() && canAccessForest();
                },
            },
            'Deku Like Piece of Heart': {
                isAvailable: function() {
                    return canBurnWebs() && canDoDamage() && canAccessForest();
                },
            },
            'Big Baba Small Key': {
                isAvailable: function() {
                    return canBurnWebs() && canDoDamage() && canAccessForest();
                },
            },
            'Boomerang': {
                isAvailable: function() {
                    return (canBurnWebs() || items.Clawshot >= 1) && canDoDamage() && canAccessForest();
                },
            },
            'West Tile Worm Heart Piece': {
                isAvailable: function() {
                    return canBurnWebs() && canDoDamage() && items.Boomerang && canAccessForest();
                },
            },
            'Compass Chest': {
                isAvailable: function() {
                    return canDoDamage() && hasRangedItem() && canAccessForest();
                },
            },
            'Big Key Chest': {
                isAvailable: function() {
                    return canBurnWebs() && canDoDamage() && items.Boomerang && canAccessForest();
                },
            },
            'Water Cave Near Big Key': {
                isAvailable: function() {
                    return canBurnWebs() && canDoDamage() && canAccessForest();
                },
            },
            'North Deku Like Chest': {
                isAvailable: function() {
                    return canBurnWebs() && canDoDamage() && items.Boomerang && canAccessForest();
                },
            },
            'East Tile Worm Chest': {
                isAvailable: function() {
                    return canBurnWebs() && canDoDamage() && items.Boomerang && canAccessForest();
                },
            },
            'Diababa': {
                isAvailable: function() {
                    return canBurnWebs() && canDoDamage() && hasRangedItem() && items.Boomerang && canAccessForest();
                },
            },
        },
        isBeatable: function() {
            if (canAccessForest()) {
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
            'Entrace Small Chest': {
                isAvailable: function() {
                    return canAccessMines();
                },
            },
            'Main Magnet Room Bottom Chest': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots;
                },
            },
            'Dungeon Map Chest': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots;
                },
            },
            'Gor Amato Small Chest': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots;
                },
            },
            'Gor Amato Key Shard': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots;
                },
            },
            'Ooccoo': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots;
                },
            },
            'Magnet Maze Heart Piece': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots;
                },
            },
            'Switch Room Underwater Chest': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots;
                },
            },
            'Switch Room Small Chest': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots;
                },
            },
            'After Switch Room Heart Piece': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots;
                },
            },
            'Outside Beamos Chest': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots;
                },
            },
            'Gor Ebizo Key Shard': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots;
                },
            },
            'Gor Ebizo Small Chest ': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots;
                },
            },
            'Small Chest Before Dangoro': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots;
                },
            },
            'Bow Chest': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots && canDoDamage();
                },
            },
            'Compass Chest': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots && canDoDamage() && items.Bow;
                },
            },
            'Gor Liggs Key Shard': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots && canDoDamage() && items.Bow;
                },
            },
            'Gor Liggs Chest': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots && canDoDamage() && items.Bow;
                },
            },
            'Main Magnet Room Top Chest': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots && canDoDamage() && items.Bow;
                },
            },
            'Outside Underwater Chest': {
                isAvailable: function() {
                    return canAccessMines() && items.IronBoots;
                },
            },
            'Outside Clawshot Chest': {
                isAvailable: function() {
                    return canAccessMines() && items.Clawshot && items.IronBoots;
                },
            },
            'Fyrus': {
                isAvailable: function() {
                    return canAccessMines() && items.Bow && items.IronBoots;
                },
            },
        },
        isBeatable: function() {
            if (canAccessMines()) {
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
            'Lobby Left Chest': {
                isAvailable: function() {
                    return canAccessLakebed();
                },
            },
            'Lobby Rear Chest': {
                isAvailable: function() {
                    return canAccessLakebed();
                },
            },
            'Stalactite Room Small Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew();
                },
            },
            'Central Room Small Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew();
                },
            },
            'Ooccoo': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew();
                },
            },
            'Dungeon Map Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew();
                },
            },
            'East Stalactite Room Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew();
                },
            },
            'East Second Floor Southwest Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew();
                },
            },
            'East Second Floor Southeast Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew();
                },
            },
            'East Water Supply Small Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew();
                },
            },
            'Before Deku Toad Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew();
                },
            },
            'Before Deku Toad Submerged Left Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew();
                },
            },
            'Before Deku Toad Submerged Right Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew();
                },
            },
            'Clawshot Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew() && canDoDamage();
                },
            },
            'Central Room Chanelier Heart Piece': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew() && items.Clawshot;
                },
            },
            'Central Room Center Spire Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew();
                },
            },
            'East Water Supply Clawshot Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew() && items.Clawshot;
                },
            },
            'West Lower Small Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew() && items.Clawshot;
                },
            },
            'West Water Supply Small Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew() && items.Clawshot;
                },
            },
            'Compass Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew() && items.Clawshot;
                },
            },
            'West Second Floor Southwest Underwater Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew() && items.Clawshot;
                },
            },
            'West Second Floor Central Small Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew() && items.Clawshot;
                },
            },
            'West Second Floor Northeast Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew() && items.Clawshot;
                },
            },
            'West Second Floor Southeast Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew() && items.Clawshot;
                },
            },
            'Big Key Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew() && items.Clawshot;
                },
            },
            'West Water Maze Small Chest': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew() && items.Clawshot;
                },
            },
            'East Stalactite Room Heart Piece': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew() && items.Clawshot;
                },
            },
            'Morpheel': {
                isAvailable: function() {
                    return canAccessLakebed() && shootPew() && items.Clawshot && (items.Sword || items.MSword);
                },
            },
        },
        isBeatable: function() {
            if (canAccessLakebed()) {
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
            'Entrance Chest': {
                isAvailable: function() {
                    return canAccessArbiters()
                },
            },
            'Poe Scent': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Lantern;
                },
            },
            'Lobby Heart Piece Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Lantern;
                },
            },
            'Dungeon Map Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Lantern;
                },
            },
            'East Redead Lower Small Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Crystal && items.PoeScent;
                },
            },
            'Compass Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Lantern && items.Clawshot && items.PoeScent;
                },
            },
            'East Upper Turnable Readed Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Lantern && items.Clawshot && items.PoeScent;
                },
            },
            'Ghoul Rat Small Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Lantern && items.Clawshot && items.PoeScent;
                },
            },
            'West Small Chest Behind Block': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Lantern && items.Clawshot && items.Crystal && items.PoeScent;
                },
            },
            'West Chandelier Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Lantern && items.Clawshot && items.Crystal && items.PoeScent;
                },
            },
            'Stalfos West Small Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && canSmash() && items.Lantern && items.Clawshot && items.Crystal && items.PoeScent;
                },
            },
            'Stalfos Northeast Small Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && canSmash() && items.Lantern && items.Clawshot && items.Crystal && items.PoeScent;
                },
            },
            'North Turning Room Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Lantern && canSmash() && items.Clawshot && items.Crystal && items.PoeScent;
                },
            },
            'Ooccoo': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Lantern && canSmash() && items.Clawshot && items.Crystal && items.PoeScent;
                },
            },
            'Spinner Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Lantern && canSmash() && items.Clawshot && items.Crystal && items.PoeScent;
                },
            },
            'Spinner Room First Small Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Spinner && items.Lantern && canSmash() && items.Clawshot && items.Crystal && items.PoeScent;
                },
            },
            'Spinner Room Second Small Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Spinner && items.Lantern && canSmash() && items.Clawshot && items.Crystal && items.PoeScent;
                },
            },
            'Spinner Room Lower Central Small Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Spinner && items.Lantern && canSmash() && items.Clawshot && items.Crystal && items.PoeScent;
                },
            },
            'Spinner Room Heart Piece Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Spinner && items.Lantern && canSmash() && items.Clawshot && items.Crystal && items.PoeScent;
                },
            },
            'Spinner Room Lower North Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Spinner && items.Lantern && canSmash() && items.Clawshot && items.Crystal && items.PoeScent;
                },
            },
            'Big Key Chest': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Spinner && items.Lantern && canSmash() && items.Clawshot && items.Crystal && items.PoeScent;
                },
            },
            'Stalord': {
                isAvailable: function() {
                    return canAccessArbiters() && items.Spinner && items.Lantern && items.Clawshot && canSmash() && items.Crystal && items.PoeScent;
                },
            },
        },
        isBeatable: function() {
            if (canAccessArbiters()) {
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
            'Entrance Left Armor Small Chest': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && items.Chainball;
                }
            },
            'Entrance Right Armor Small Chest': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && items.Chainball;
                }
            },
            'Dungeon Map': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins();
                }
            },
            'Ooccoo': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins();
                }
            },
            'Courtyard Partially Buried Small Chest': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && items.Crystal;
                }
            },
            'Courtyard Open Chest': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins();
                }
            },
            'Ordon Pumpkin Chest': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && canDoDamage();
                }
            },
            'Courtyard Buried Small Chest': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && canDoDamage();
                }
            },
            'Wooden Beam Room Small Chest': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && canSmash() && canDoDamage();
                }
            },
            'Compass Chest': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && canSmash() && canDoDamage();
                }
            },
            'Courtyard South Ice Wall Small Chest': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && canSmash() && canDoDamage();
                }
            },
            'Ball and Chain': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && canSmash() && canDoDamage();
                }
            },
            'Goat Cheese Chest': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && items.Chainball && canDoDamage();
                }
            },
            'West Breakable Floor Heart Piece': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && items.Chainball && canDoDamage();
                }
            },
            'Wooden Beam Room Chandelier Chest': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && items.Chainball && canDoDamage();
                }
            },
            'Entrace Chandelier Heart Piece Chest': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && items.Chainball && canDoDamage();
                }
            },
            'East Chilfos Chandelier Chest': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && items.Chainball && items.Clawshot && canDoDamage();
                }
            },
            'West Cannon Storage Left Small Chest': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && items.Chainball && canDoDamage();
                }
            },
            'West Cannon Storage Right Small Chest': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && canSmash() && canDoDamage();
                }
            },
            'Bedroom Key Chest': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && items.Chainball && hasBoom() && canDoDamage();
                }
            },
            'Blizzeta': {
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && items.Chainball && hasBoom() && canDoDamage();
                }
            },
        },
        isBeatable: function() {
            if (canAccessSnowpeakRuins()) {
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
            'Ooccoo': {
                isAvailable: function() {
                    return canAccessTot();
                },
            },
            'Lobby Lantern Chest': {
                isAvailable: function() {
                    return canAccessTot() && items.Lantern;
                },
            },
            'First Stair Pot Small Chest': {
                isAvailable: function() {
                    return canAccessTot();
                },
            },
            'First Stair Window Small Chest': {
                isAvailable: function() {
                    return canAccessTot();
                },
            },
            'Dungeon Map Chest': {
                isAvailable: function() {
                    return canAccessTot();
                },
            },
            'Armos Room Left Chest': {
                isAvailable: function() {
                    return canAccessTot() && items.Spinner && canDoDamage();
                },
            },
            'Compass Chest': {
                isAvailable: function() {
                    return canAccessTot() && items.Spinner && canDoDamage() && items.Bow;
                },
            },
            'Scale Room Spider Chest': {
                isAvailable: function() {
                    return canAccessTot() && items.Spinner && canDoDamage() && items.Bow;
                },
            },
            'Third Stair Swinging Gilloutine Chest': {
                isAvailable: function() {
                    return canAccessTot() && items.Spinner && canDoDamage() && items.Bow;
                },
            },
            'Third Stair Window Chest': {
                isAvailable: function() {
                    return canAccessTot() && items.Spinner && canDoDamage() && items.Bow;
                },
            },
            'Dominion Rod Chest': {
                isAvailable: function() {
                    return canAccessTot() && items.Spinner && canDoDamage() && items.Bow;
                },
            },
            'Scale Room Upper Chest': {
                isAvailable: function() {
                    return canAccessTot() && items.Spinner && items.Clawshot && canDoDamage() && items.Bow;
                },
            },
            'Helmasaur Room Small Chest': {
                isAvailable: function() {
                    return canAccessTot() && items.Spinner && canDoDamage() && items.Bow && items.Clawshot;
                },
            },
            'Big Key Chest': {
                isAvailable: function() {
                    return canAccessTot() && items.Spinner && canDoDamage() && items.Bow && items.Clawshot;
                },
            },
            'Second Stair Heart Piece Chest': {
                isAvailable: function() {
                    return canAccessTot() && items.Spinner && items.Dominion >= 1 && canDoDamage() && items.Bow;
                },
            },
            'Armos Room South Chest': {
                isAvailable: function() {
                    return canAccessTot() && items.Spinner;
                },
            },
            'Armos Room Right Heart Piece Chest': {
                isAvailable: function() {
                    return canAccessTot() && items.Spinner && items.Dominion >= 1 && canDoDamage();
                },
            },
            'Armagohma': {
                isAvailable: function() {
                    return canAccessTot() && items.Spinner && items.Dominion >= 1 && items.Clawshot && canDoDamage() && items.Bow;
                },
            },
        },
        isBeatable: function() {
            if (canAccessTot()) {
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
            'Ooccoo': {
                isAvailable: function() {
                    return canAccessCiTS();
                },
            },
            'Southwest Underwater Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots;
                },
            },
            'Underwater Southeast Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots;
                },
            },
            'West First Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && (items.Clawshot > 1 || items.Spinner);
                },
            },
            'Dungeon Map Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.Spinner && items.IronBoots;
                },
            },
            'East Tile Worm Small Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.Spinner && items.IronBoots && items.Boomerang;
                },
            },
            'East After-Dinofols Small Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.Spinner && items.IronBoots && items.Boomerang && canDoDamage();
                },
            },
            'East After-Dinofols Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.Spinner && items.IronBoots && items.Boomerang && canDoDamage();
                },
            },
            'Double Clawshot Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.Spinner && items.IronBoots && items.Boomerang && canDoDamage();
                },
            },
            'Compass Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.Spinner && items.IronBoots && items.Clawshot >= 2 && items.Boomerang && canDoDamage();
                },
            },
            'West Baba Serpent Alcove Small Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots && items.Clawshot >= 2;
                },
            },
            'West Narrow Ledge Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots && items.Clawshot >= 2;
                },
            },
            'West Tile Worm Small Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots && items.Clawshot >= 2;
                },
            },
            'Big Baba Tower West Small Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots && items.Clawshot >= 2;
                },
            },
            'Big Baba Tower North Small Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots && items.Clawshot >= 2;
                },
            },
            'Big Baba Tower Heart Piece Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots && items.Clawshot >= 2;
                },
            },
            'West Gardens Small Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots && items.Clawshot >= 2;
                },
            },
            'West Gardens Poe Island Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots && items.Clawshot >= 2;
                },
            },
            'West Gardens Lower Small Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots && items.Clawshot >= 2;
                },
            },
            'West Gardens Heart Piece Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots && items.Clawshot >= 2;
                },
            },
            'Central Outside Small Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots && items.Clawshot >= 2 && items.Crystal;
                },
            },
            'Central Outside Poe Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots && items.Clawshot >= 2 && items.Crystal;
                },
            },
            'Big Key Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots && items.Clawshot >= 2 && items.Crystal;
                },
            },
            'Central Upper Small Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.Spinner && items.IronBoots && items.Clawshot >= 2;
                },
            },
            'North Fan Chest': {
                isAvailable: function() {
                    return canAccessCiTS() && items.Spinner && items.IronBoots && items.Clawshot >= 2;
                },
            },
            'Argorok': {
                isAvailable: function() {
                    return canAccessCiTS() && items.Spinner && items.IronBoots && items.Clawshot >= 2 && items.MSword;
                },
            },
        },
        isBeatable: function() {
            if (canAccessCiTS()) {
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

            'West First Room Central Chest': {
                isAvailable: function() {
                    return canAccessPoT() && canDoDamage();
                },
            },
            'West First Room Heart Piece Chest': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot && items.Crystal;
                },
            },
            'West Second Room Central Chest': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot && items.Crystal;
                },
            },
            'Compass Chest Chest': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot && items.Crystal;
                },
            },
            'West Second Room Southeast Chest': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot > 1 && items.Crystal;
                },
            },
            'East First Room Small Chest': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot && items.Crystal;
                },
            },
            'East First Room North Chest': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot && items.Crystal;
                },
            },
            'East Second Room Northeast Small Chest': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot > 1 && items.Crystal;
                },
            },
            'East Second Room Northwest Chest': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot > 1 && items.Crystal;
                },
            },
            'Dungeon Map Chest': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot > 1 && items.Crystal;
                },
            },
            'East Second Room Southeast Chest': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot > 1 && items.Crystal;
                },
            },
            'East First Room Heart Piece Chest': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot > 1 && items.Crystal;
                },
            },
            'East First Room West Chest': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot > 1 && items.Crystal;
                },
            },
            'Central First Room Chest': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot > 1 && items.MSword > 1 && items.Crystal;
                },
            },
            'Big Key Chest': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot > 1 && items.MSword > 1 && items.Crystal;
                },
            },
            'Central Outdoor Chest': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot > 1 && items.MSword > 1 && items.Crystal;
                },
            },
            'Central Tower Chest': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot > 1 && items.MSword > 1 && items.Crystal;
                },
            },
            'Zant': {
                isAvailable: function() {
                    return canAccessPoT() && items.Clawshot > 1 && items.MSword > 1 && items.Boomerang && items.IronBoots && items.ZoraArmor && items.Chainball && items.Crystal;
                },
            },
        },
        isBeatable: function() {
            if (canAccessPoT()) {
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
            'Graveyard Grave Switch Room Right Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && canDoDamage();
                },
            },
            'Graveyard Grave Switch Room Front Left Small Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && canSmash();
                },
            },
            'Graveyard Grave Switch Room Back Left Small Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && canSmash();
                },
            },
            'Graveyard Owl Statue Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && canSmash() && items.Lantern && items.Dominion > 1;
                },
            },
            'Dungeon Map Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Boomerang && canDoDamage();
                },
            },
            'East Castle Balcony Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Boomerang && canDoDamage();
                },
            },
            'West Courtyard Northern Small Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && canDoDamage();
                },
            },
            'West Courtyard Central Small Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && canDoDamage();
                },
            },
            'King Bublin Key': {
                isAvailable: function() {
                    return canAccessHyrule() && canDoDamage();
                },
            },
            'Compass Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && canDoDamage() && items.Clawshot > 1;
                },
            },
            'Lantern Staircase Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && canDoDamage();
                },
            },
            'Main Hall Southwest Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && items.Bow && canDoDamage();
                },
            },
            'Main Hall Northwest Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && items.Bow && canDoDamage();
                },
            },
            'Southeast Balcony Tower Chest Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && items.Lantern && canDoDamage();
                },
            },
            'Big Key Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lantern) && canDoDamage();
                },
            },
            'Treasure Room First Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lantern) && items.Spinner && canDoDamage() && items.Crystal;
                },
            },
            'Treasure Room Second Chest Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lantern) && items.Spinner && canDoDamage() && items.Crystal;
                },
            },
            'Treasure Room Third Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lantern) && items.Spinner && canDoDamage() && items.Crystal;
                },
            },
            'Treasure Room Fourth Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lantern) && items.Spinner && canDoDamage() && items.Crystal;
                },
            },
            'Treasure Room Fifth Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lantern) && items.Spinner && canDoDamage() && items.Crystal;
                },
            },
            'Treasure Room First Small Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lantern) && items.Spinner && canDoDamage() && items.Crystal;
                },
            },
            'Treasure Room Second Small Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lantern) && items.Spinner && canDoDamage() && items.Crystal;
                },
            },
            'Treasure Room Third Small Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lantern) && items.Spinner && canDoDamage() && items.Crystal;
                },
            },
            'Treasure Room Fourth Small Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lantern) && items.Spinner && canDoDamage() && items.Crystal;
                },
            },
            'Treasure Room Fifth Small Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lantern) && items.Spinner && canDoDamage() && items.Crystal;
                },
            },
            'Treasure Room Sixth Small Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lantern) && items.Spinner && canDoDamage() && items.Crystal;
                },
            },
            'Treasure Room Seventh Small Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lantern) && items.Spinner && canDoDamage() && items.Crystal;
                },
            },
            'Treasure Room Eighth Small Chest': {
                isAvailable: function() {
                    return canAccessHyrule() && items.Clawshot > 1 && items.Boomerang && (items.Bow || items.Lantern) && items.Spinner && canDoDamage() && items.Crystal;
                },
            },
        },
        isBeatable: function() {
            if (canAccessHyrule()) {
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
        name: "Lake Hylia Lantern Cave",
        x: "40.75%",
        y: "55.68%",
        chestlist: {
            'First Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && canSmash();
                },
            },
            'Second Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && canSmash();
                },
            },
            'Third Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && canSmash();
                },
            },
            'Fourth Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && canSmash();
                },
            },
            'Fifth Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && canSmash();
                },
            },
            'Sixth Chest (Lantern Chest)': {
                isAvailable: function() {
                    return canAccessLakeHylia() && canSmash() && items.Lantern;
                },
            },
            'Seventh Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && canSmash();
                },
            },
            'Eighth Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && canSmash();
                },
            },
            'Ninth Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && canSmash();
                },
            },
            'Tenth Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && canSmash();
                },
            },
            'Eleventh Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && canSmash();
                },
            },
            'Twelfth Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && canSmash();
                },
            },
            'Thirteenth Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && canSmash();
                },
            },
            'Fourteenth Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && canSmash();
                },
            },
            'Heart Piece Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && canSmash() && items.Lantern;
                },
            },
        },
        isBeatable: function() {
            if (canAccessLakeHylia()) {
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
            'Dodongo Chest': {
                isAvailable: function() {
                    return eldinTwilightCleared() && items.Clawshot && items.IronBoots;
                },
            },
            'Lantern Chest': {
                isAvailable: function() {
                    return eldinTwilightCleared() && items.Clawshot && items.Lantern && items.IronBoots;
                },
            },
            'Heart Piece Chest': {
                isAvailable: function() {
                    return eldinTwilightCleared() && items.Clawshot && items.Lantern && items.IronBoots;
                },
            },
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
            'Inn Small Chest': {
                isAvailable: function() {
                    return canAccessKakVillage();
                },
            },
            'Barnes Bomb Bag': {
                isAvailable: function() {
                    return canAccessKakVillage() && (items.Boss2 || MinesPatch);
                },
            },
            'Eldin Spring Heart Piece': {
                isAvailable: function() {
                    return canAccessKakVillage() && items.IronBoots && canSmash();
                },
            },
            'Bomb Rock Spire Heart Piece': {
                isAvailable: function() {
                    return canAccessKakVillage() && items.Boomerang && shootPew();
                },
            },
            'Graveyard Lantern Chest': {
                isAvailable: function() {
                    return canAccessKakVillage() && items.Lantern;
                },
            },
            'Watchtower Chest': {
                isAvailable: function() {
                    return canAccessKakVillage();
                },
            },
            'Watchtower Alcove Chest': {
                isAvailable: function() {
                    return canAccessKakVillage() && canSmash();
                },
            },
            'Archery Heart Piece': {
                isAvailable: function() {
                    return canAccessKakVillage() && items.Bow && (items.Boss2 || MinesPatch);
                },
            },
            'Hylian Shield': {
                isAvailable: function() {
                    return canAccessKakVillage();
                },
            },
            'Hawkeye': {
                isAvailable: function() {
                    return canAccessKakVillage() && (items.Boss2 || MinesPatch);
                },
            },
            'Zora Armor': {
                isAvailable: function() {
                    return canAccessKakVillage() && lanayruTwilightCleared() && ((items.Bow && items.Boomerang) || EscortSkip);
                },
            },
            'Coral Earring': {
                isAvailable: function() {
                    return canAccessKakVillage() && items.Sketch;
                },
            },
            'Jump Strike': {
                isAvailable: function() {
                    return canAccessKakVillage() && canAccessSnowpeakSummit();
                },
            },
            'Renados Letter': {
                isAvailable: function() {
                    return canAccessKakVillage() && items.Boss6;
                },
            },
            'Horse Call': {
                isAvailable: function() {
                    return canAccessKakVillage() && items.Charm >= 4;
                },
            },
            'Powered Dominion Rod': {
                isAvailable: function() {
                    return canAccessKakVillage() && items.Skybook >= 1;
                },
            },
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
            'Underwater Left Small Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && items.IronBoots;
                },
            },
            'Underwater Right Small Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && items.IronBoots;
                },
            },
            'Southern Room Left Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && items.Clawshot;
                },
            },
            'Southern Room Right Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && items.Clawshot;
                },
            },
            'Heart Piece Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && items.Clawshot && items.Lantern;
                },
            },
            'West Double Clawshot Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && items.Clawshot > 1;
                },
            },
            'East Double Clawshot Chest': {
                isAvailable: function() {
                    return canAccessLakeHylia() && items.Clawshot > 1;
                },
            },
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
            'East Small Chest': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Charm >= 2;
                },
            },
            'Donation Heart Piece': {
                isAvailable: function() {
                    return canAccessCastleTown();
                },
            },
            'STAR Challenge 1': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Clawshot;
                },
            },
            'STAR Challenge 2': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Clawshot > 1;
                },
            },
            'Jovani Bottle': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Soul >= 20;
                },
            },
            'Jovani All Souls': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Soul >= 60;
                },
            },
            'Invoice': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Charm >= 1;
                },
            },
            'Medicine Scent': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Charm > 1;
                },
            },
            'Agitha 1st Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 1;
                },
            },
            'Agitha 2nd Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 2;
                },
            },
            'Agitha 3rd Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 3;
                },
            },
            'Agitha 4th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 4;
                },
            },
            'Agitha 5th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 5;
                },
            },
            'Agitha 6th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 6;
                },
            },
            'Agitha 7th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 7;
                },
            },
            'Agitha 8th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 8;
                },
            },
            'Agitha 9th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 9;
                },
            },
            'Agitha 10th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 10;
                },
            },
            'Agitha 11th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 11;
                },
            },
            'Agitha 12th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 12;
                },
            },
            'Agitha 13th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 13;
                },
            },
            'Agitha 14th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 14;
                },
            },
            'Agitha 15th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 15;
                },
            },
            'Agitha 16th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 16;
                },
            },
            'Agitha 17th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 17;
                },
            },
            'Agitha 18th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 18;
                },
            },
            'Agitha 19th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 19;
                },
            },
            'Agitha 20th Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 20;
                },
            },
            'Agitha 21st Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 21;
                },
            },
            'Agitha 22nd Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 22;
                },
            },
            'Agitha 23rd Bug': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 23;
                },
            },
            'Agitha All Bugs': {
                isAvailable: function() {
                    return canAccessCastleTown() && items.Bugs >= 24;
                },
            },
        },
        isBeatable: function() {
            return this.canGetChest();
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },
    {
        name: "Kakariko Gorge Lantern Cave",
        x: "65.91%",
        y: "57.31%",
        chestlist: {
            'First Chest': {
                isAvailable: function() {
                    return canSmash() && canAccessKakGorge() && canBurnWebs();
                },
            },
            'Second Chest': {
                isAvailable: function() {
                    return canSmash() && canAccessKakGorge() && canBurnWebs();
                },
            },
            'Heart Piece Chest': {
                isAvailable: function() {
                    return canSmash() && canAccessKakGorge() && canBurnWebs();
                },
            },
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
                isAvailable: function() {
                    return canAccessDesert() && canDoDamage();
                },
            },
            'Inner Tent Small Chest': {
                isAvailable: function() {
                    return canAccessDesert() && canDoDamage();
                },
            },
            'Cooked Boar Heart Piece': {
                isAvailable: function() {
                    return canAccessDesert() && canDoDamage();
                },
            },
            'Outside Arbiter Grounds Lantern Chest': {
                isAvailable: function() {
                    return items.Lantern && canAccessDesert() && canDoDamage();
                },
            },
        },
        isBeatable: function() {
            return this.canGetChest();
        },
        canGetChest: function() {
            return generalCanGetChest(this.chestlist);
        },
    },

    //Dungeon Poes
    {
        name: "Arbiter's Grounds Poes",
        x: "15.2%",
        y: "41.44%",
        chestlist: {
            'Lobby Poe': { //1
                isAvailable: function() {
                    return canAccessArbiters() && items.Lantern && items.Crystal;
                },
            },
            'East Lower Poe': { //2
                isAvailable: function() {
                    return canAccessArbiters() && items.Lantern && items.Crystal && items.PoeScent;
                },
            },
            'East Upper Poe': { //3
                isAvailable: function() {
                    return canAccessArbiters() && items.Lantern && items.Clawshot && items.Crystal && items.PoeScent;
                },
            },
            'West Poe': { //4
                isAvailable: function() {
                    return canAccessArbiters() && canSmash() && items.Lantern && items.Clawshot && items.Crystal && items.PoeScent;
                },
            }
        },
        isBeatable: function() {
            if (canAccessArbiters()) {
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
        name: "Snowpeak Ruins Poes",
        x: "21.31%",
        y: "28.64%",
        chestlist: {
            'Lobby Armor Poe': { //5
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && items.Chainball && items.Crystal;
                }
            },
            'Lobby Poe': { //6
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && items.Crystal;
                }
            },
            'Mini Freezard Poe': { //7
                isAvailable: function() {
                    return canAccessSnowpeakRuins() && items.Chainball && canDoDamage() && items.Crystal;
                }
            },
        },
        isBeatable: function() {
            if (canAccessSnowpeak()) {
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
        name: "Temple of Time Poes",
        x: "43.83%",
        y: "63.36%",
        chestlist: {
            'Poe Behind Gate': { //8
                isAvailable: function() {
                    return canAccessTot() && items.Dominion >= 1 && items.Spinner && items.Crystal;
                },
            },
            'Poe Above Scales': { //9
                isAvailable: function() {
                    return canAccessTot() && items.Spinner && items.Bow && items.Clawshot && items.Crystal;
                },
            },
        },
        isBeatable: function() {
            if (canAccessTot()) {
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
        name: "CiTS Poes",
        x: "38.0%",
        y: "50.56%",
        chestlist: {
            'Garden Island Poe': { //10
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots && items.Clawshot >= 2 && items.Crystal;
                },
            },
            'Poe Above Central Fan': { //11
                isAvailable: function() {
                    return canAccessCiTS() && items.IronBoots && items.Clawshot >= 2 && items.Crystal;
                },
            },
        },
        isBeatable: function() {
            if (canAccessCiTS()) {
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
    }
];

//define overworld chests
var chests = [{
        name: "Herding Goats Heart Piece",
        x: "56.33%",
        y: "90.16%",
        isAvailable: function() {
            if (((canDoDamage() || SkipIntro) && (items.Vessel >= 1 || TwilightSkip))) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Rat and Chu-Chu Chest",
        x: "54.33%",
        y: "90.16%",
        isAvailable: function() {
            if (items.Crystal && items.Lantern) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Lantern",
        x: "56.16%",
        y: "71.76%",
        isAvailable: function() {
            if (items.Slingshot || SkipIntro) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Coro's Bottle",
        x: "56.16%",
        y: "72.76%",
        isAvailable: function() {
            if (items.Slingshot || SkipIntro) {
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
            if (items.Lantern) {
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
            if (items.Lantern) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "South Faron Cave Small Chest",
        x: "53.7%",
        y: "71.8%",
        isAvailable: function() {
            if (canBurnWebs() || SkipIntro) {
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
            if (items.Lantern) {
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
            if (items.Lantern) {
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
            if (items.Lantern) {
                return "available";
            }
            return "unavailable"
        },
    },
    {
        name: "Mist - Owl Statue Chest",
        x: "54.01%",
        y: "69.6%",
        isAvailable: function() {
            if (items.Dominion > 1 && canSmash() && items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Mist - Skybook Letter",
        x: "55.01%",
        y: "69.6%",
        isAvailable: function() {
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
            if (canAccessNorthFaron()) {
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
            if (canAccessDeathMountain() && (items.Boss2 || MinesPatch) || items.Clawshot) {
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
            if (canSmash() && canAccessEldinField()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Ashei Sketch",
        x: "50.43%",
        y: "11.06%",
        isAvailable: function() {
            if (canAccessZoraDomain()) {
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
            if (canAccessZoraDomain() && items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Small Chest Near Mother and Child Isles",
        x: "56.73%",
        y: "11.44%",
        isAvailable: function() {
            if (canAccessZoraDomain()) {
                return "available";
            }
            return "unavailable";
        }
    },
    {
        name: "Underwater Chest",
        x: "39.85%",
        y: "54.06%",
        isAvailable: function() {
            if (canAccessLakeHylia() && items.IronBoots) {
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
            if (canAccessGrove() && items.Crystal && canSmash()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Helmasaur Chest",
        x: "45.25%",
        y: "38.48%",
        isAvailable: function() {
            if (canAccessLanayruField() && items.Crystal && items.Clawshot) {
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
            if (canAccessLakeHylia() && items.Crystal && (items.Boss3 || EarlyCits)) {
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
            if (canAccessLakeHylia()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Outside Lanayru Spring - Right Statue Chest",
        x: "43.15%",
        y: "50.76%",
        isAvailable: function() {
            if (canAccessLakeHylia()) {
                return "available";
            }
            return "unavailable";
        }
    },
    {
        name: "Flight-By-Fowl (5)",
        x: "43.5%",
        y: "48.0%",
        isAvailable: function() {
            if (canAccessLakeHylia()) {
                return "available";
            }
            return "unavailable";
        }
    },
    {
        name: "Grotto - Shell Blade Chest",
        x: "38.41%",
        y: "45.92%",
        isAvailable: function() {
            if (canAccessLakeHylia() && items.Crystal && items.IronBoots && (items.Boss3 || EarlyCits) && (items.Sword || items.MSword || items.WBombs)) {
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
            if (canAccessZoraDomain() && items.Lantern && items.IronBoots) {
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
            if (canAccessZoraDomain() && items.IronBoots && items.WBombs && items.ZoraArmor) {
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
            if (canAccessZoraDomain() && items.Boomerang && items.IronBoots && items.Lantern) {
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
            if (canAccessLanayruField() && items.Crystal && items.Lantern) {
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
            if (canAccessLanayruField() && items.IronBoots) {
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
            if (canAccessLanayruField() && items.Clawshot) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Bubble Chest",
        x: "46.33%",
        y: "56.24%",
        isAvailable: function() {
            if (canAccessLanayruField() && items.Crystal && items.Clawshot && items.Lantern && shootPew()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Oustide Grotto Chest",
        x: "44.83%",
        y: "56.24%",
        isAvailable: function() {
            if (canAccessLanayruField() && items.Clawshot && shootPew()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Under Bridge Chest",
        x: "54.91%",
        y: "58.8%",
        isAvailable: function() {
            if (canAccessFaronField() && items.Clawshot) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Chu, Baba, and Keese  Right Chest",
        x: "58.11%",
        y: "64.16%",
        isAvailable: function() {
            if (canAccessFaronField() && items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Chu, Baba, and Keese  Left Chest",
        x: "57.01%",
        y: "64.16%",
        isAvailable: function() {
            if (canAccessFaronField() && items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Chu, Baba, and Keese  Rear Chest",
        x: "57.01%",
        y: "65.16%",
        isAvailable: function() {
            if (canAccessFaronField() && items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Castle Pillar Chest",
        x: "52.83%",
        y: "44.16%",
        isAvailable: function() {
            if (canAccessCastleTown() && items.Clawshot && items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Tetike Chest",
        x: "55.8%",
        y: "46.12%",
        isAvailable: function() {
            if (canAccessCastleTown() && items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Bomskit Left Chest",
        x: "69.66%",
        y: "39.36%",
        isAvailable: function() {
            if (canAccessEldinField() && items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Bomskit Right Chest",
        x: "70.86%",
        y: "39.36%",
        isAvailable: function() {
            if (canAccessEldinField() && items.Crystal && items.Lantern) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Water Bomb Fish Chest",
        x: "77.41%",
        y: "34.88%",
        isAvailable: function() {
            if (canAccessEldinField() && items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Skulltula Chest",
        x: "33.58%",
        y: "60.32%",
        isAvailable: function() {
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
        isAvailable: function() {
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
        isAvailable: function() {
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
        isAvailable: function() {
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
        isAvailable: function() {
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
        isAvailable: function() {
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
        isAvailable: function() {
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
        isAvailable: function() {
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
        isAvailable: function() {
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
        isAvailable: function() {
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
        isAvailable: function() {
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
        isAvailable: function() {
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
        isAvailable: function() {
            if (canAccessLanayruField() && items.Spinner) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Stalfos Left Small Chest",
        x: "74.16%",
        y: "19.6%",
        isAvailable: function() {
            if (((canAccessEldinField() && canSmash()) || canAccessLanayruField()) && items.Spinner) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Stalfos Right Small Chest",
        x: "75.16%",
        y: "19.6%",
        isAvailable: function() {
            if (((canAccessEldinField() && canSmash()) || canAccessLanayruField()) && items.Spinner) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Stalfos Heart Piece Chest",
        x: "74.66%",
        y: "18.6%",
        isAvailable: function() {
            if (((canAccessEldinField() && canSmash()) || canAccessLanayruField()) && items.Spinner && canSmash()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Fountain Chest",
        x: "54.01%",
        y: "45.68%",
        isAvailable: function() {
            if (canAccessCastleTown() && items.Spinner && items.Clawshot) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Wooden Statue",
        x: "54.01%",
        y: "47.68%",
        isAvailable: function() {
            if (canAccessCastleTown() && items.MedicineScent) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Frozen Lantern Chest",
        x: "38.26%",
        y: "11.48%",
        isAvailable: function() {
            if (items.Chainball && items.Lantern && canAccessSnowpeakSummit()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Grotto - Freezard Chest",
        x: "42.5%",
        y: "9.12%",
        isAvailable: function() {
            if (items.Crystal && items.Chainball && canAccessSnowpeakSummit()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Frozen Block Cave Chest",
        x: "52.85%",
        y: "26.04%",
        isAvailable: function() {
            if (canAccessLanayruField() && items.Chainball) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Lost Woods - Lantern Chest",
        x: "45.41%",
        y: "70.8%",
        isAvailable: function() {
            if (canAccessGrove2() && items.Lantern) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Lost Woods - Spinner Chest",
        x: "42.91%",
        y: "70.8%",
        isAvailable: function() {
            if (canAccessGrove() && items.Spinner) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Eldin Bridge Owl Chest",
        x: "77.75%",
        y: "32.64%",
        isAvailable: function() {
            if (canAccessEldinField() && items.Dominion > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Eldin Bridge Skybook Letter",
        x: "77.75%",
        y: "28.64%",
        isAvailable: function() {
            if (canAccessEldinField() && items.Dominion > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Gorge Owl Statue Chest",
        x: "66%",
        y: "48.8%",
        isAvailable: function() {
            if (canAccessKakGorge() && items.Dominion > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Gorge Skybook Letter",
        x: "67%",
        y: "48.8%",
        isAvailable: function() {
            if (canAccessKakGorge() && items.Dominion > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Castle Ruins Owl Statue Chest",
        x: "45.38%",
        y: "43.84%",
        isAvailable: function() {
            if (canAccessLanayruField() && items.Dominion > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Castle Ruins Skybook Letter",
        x: "46.38%",
        y: "43.84%",
        isAvailable: function() {
            if (canAccessLanayruField() && items.Dominion > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Hylia Bridge Owl Statue Chest",
        x: "41.45%",
        y: "43.44%",
        isAvailable: function() {
            if (canAccessLanayruField() && items.Dominion > 1 && items.Clawshot) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Hylia Bridge Skybook Letter",
        x: "42.45%",
        y: "43.44%",
        isAvailable: function() {
            if (canAccessLanayruField() && items.Dominion > 1 && items.Clawshot) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Gerudo Desert Owl Statue Chest",
        x: "20.58%",
        y: "59.6%",
        isAvailable: function() {
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
        isAvailable: function() {
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
        isAvailable: function() {
            if (canAccessKakGorge() && items.Clawshot > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Lake Chasm Chest",
        x: "51.50%",
        y: "46.88%",
        isAvailable: function() {
            if (canAccessCastleTown() && items.Clawshot > 1) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Gorge Spire Heart Piece",
        x: "62.85%",
        y: "52.40%",
        isAvailable: function() {
            if (canAccessKakGorge() && items.Boomerang) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Fishing Hole Heart Piece",
        x: "64.5%",
        y: "9%",
        isAvailable: function() {
            if (canAccessZoraDomain()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Fishing Hole Bottle",
        x: "65.8%",
        y: "9.5%",
        isAvailable: function() {
            if (canAccessZoraDomain()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Plumm Fruit Game Heart Piece",
        x: "65.8%",
        y: "14.5%",
        isAvailable: function() {
            if (canAccessLakeHylia() && items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Aurus Memo",
        x: "35.58%",
        y: "53.36%",
        isAvailable: function() {
            if (canAccessLakeHylia() && items.Boss3) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Iza Bomb Bag",
        x: "65.8%",
        y: "12%",
        isAvailable: function() {
            if (canAccessZoraDomain() && (items.Sword || items.MSword)) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Giant Bomb Bag",
        x: "66.8%",
        y: "12%",
        isAvailable: function() {
            if (canAccessZoraDomain() && (items.Sword || items.MSword)) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Tree Heart Piece",
        x: "56%",
        y: "60.88%",
        isAvailable: function() {
            if (canAccessFaronField() && (items.Boomerang || items.Clawshot)) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Hot Springwater Goron",
        x: "60.25%",
        y: "40.4%",
        isAvailable: function() {
            if (canAccessKakVillage() && canAccessEldinField()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Snowboard Racing",
        x: "36.25%",
        y: "11.68%",
        isAvailable: function() {
            if (items.Boss5 && canAccessSnowpeakSummit()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Hidden Village - Impaz - Ilia Charm",
        x: "71%",
        y: "24.8%",
        isAvailable: function() {
            if (canAccessHiddenVillage() && items.Bow) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Hidden Village - Impaz - Skybook",
        x: "71%",
        y: "25.8%",
        isAvailable: function() {
            if (canAccessHiddenVillage() && items.Dominion) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Hidden Village - Hide and Seek",
        x: "72%",
        y: "23.8%",
        isAvailable: function() {
            if (items.Charm >= 4 && canAccessHiddenVillage()) {
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
            if (canAccessNorthFaron()) {
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
            if (canAccessDeathMountain() && items.Crystal) {
                return "available";
            }
            return "unavailable"
        },
    },
    {
        name: "Back Slice",
        x: "48.38%",
        y: "40.84%",
        isAvailable: function() {
            if (canAccessZoraDomain() && canAccessLanayruField() && items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Helm Splitter",
        x: "52.83%",
        y: "46.16%",
        isAvailable: function() {
            if (canAccessGrove() && items.Crystal) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Mortal Draw",
        x: "14.13%",
        y: "47.36%",
        isAvailable: function() {
            if (items.Crystal && canAccessDesert() && canAccessLakeHylia()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Great Spin",
        x: "53.85%",
        y: "38.8%",
        isAvailable: function() {
            if (items.Crystal && canAccessHiddenVillage()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Youth's Scent",
        x: "62%",
        y: "59.88%",
        isAvailable: function() {
            if (canAccessKakGorge()) {
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
            if (canAccessLanayruField()) {
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
            if (items.Rod > 1 && canAccessZoraDomain()) {
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
            if (canAccessPoT() && items.Clawshot > 1 && items.Crystal) {
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
            if (canAccessGrove()) {
                return "available";
            }
            return "unavailable";
        },
    },
    {
        name: "Shadow Crystal",
        x: "43.70%",
        y: "65.68%",
        isAvailable: function() {
            if (canAccessGrove())
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
        isAvailable: function() {
            if (canAccessCastleTown() && setMDHFlag() || items.Crystal) {
                return "available";
            }
            return "poeunavailable";
        },
    },
    {
        //13
        name: "East Castle Town Bridge Poe",
        x: "58.25%",
        y: "40.56%",
        isAvailable: function() {
            if (canAccessCastleTown() && setMDHFlag() && items.Crystal) {
                return "available";
            }
            return "poeunavailable";
        },
    },
    {
        //14
        name: "South Castle Town Field Poe",
        x: "53.66%",
        y: "45.84%",
        isAvailable: function() {
            if (canAccessCastleTown() && setMDHFlag() && items.Crystal) {
                return "available";
            }
            return "poeunavailable";
        },
    },
    {
        //15
        name: "Castle Ruins Poe",
        x: "45.16%",
        y: "43.36%",
        isAvailable: function() {
            if (canAccessLanayruField() && setMDHFlag() && items.Crystal) {
                return "available";
            }
            return "poeunavailable";
        },
    },
    {
        //16
        name: "Faron Mist Poe",
        x: "51.41%",
        y: "69.76%",
        isAvailable: function() {
            if (faronTwilightCleared() && setMDHFlag() && items.Crystal) {
                return "available";
            }
            return "poeunavailable";
        },
    },
    {
        //17
        name: "Lost Woods Poe",
        x: "47%",
        y: "71.4%",
        isAvailable: function() {
            if (canAccessGrove2() && setMDHFlag() && items.Crystal) {
                return "available";
            }
            return "poeunavailable";
        },
    },
    {
        //18
        name: "Faron Field Poe",
        x: "54.58%",
        y: "59.04%",
        isAvailable: function() {
            if (canAccessFaronField() && setMDHFlag() && items.Crystal) {
                return "available";
            }
            return "poeunavailable";
        },
    },
    {
        //19
        name: "Kakariko Gorge Poe",
        x: "65.25%",
        y: "53.52%",
        isAvailable: function() {
            if (canAccessKakGorge() && setMDHFlag() && items.Crystal) {
                return "available";
            }
            return "poeunavailable";
        },
    },
    {
        //20
        name: "Poe Under Rock",
        x: "42.16%",
        y: "68.88%",
        isAvailable: function() {
            if (canAccessGrove() && canSmash() && items.Crystal) {
                return "available";
            }
            return "poeunavailable";
        },
    },
    {
        //21
        name: "Master Sword Poe",
        x: "44.20%",
        y: "65.68%",
        isAvailable: function() {
            if (canAccessGrove2() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //22
        name: "Past - Poe",
        x: "43.78%",
        y: "68.88%",
        isAvailable: function() {
            if (canAccessTot() && items.Dominion && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //23
        name: "CoO - F17 Poe",
        x: "14.25%",
        y: "60.4%",
        isAvailable: function() {
            if (canAccessDesert() && items.Clawshot && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //24
        name: "CoO - F33 Poe",
        x: "15.25%",
        y: "60.4%",
        isAvailable: function() {
            if (canAccessDesert() && items.Clawshot && items.Crystal && items.Spinner && items.Chainball && items.Dominion > 1)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //25
        name: "CoO - F44 Poe",
        x: "14.25%",
        y: "61.4%",
        isAvailable: function() {
            if (canAccessDesert() && items.Clawshot > 1 && items.Crystal && items.Spinner && items.Chainball && items.Dominion > 1)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //26
        name: "Death Mountain Poe",
        x: "85.91%",
        y: "44%",
        isAvailable: function() {
            if (canAccessDeathMountain() && (items.Boss2 || MinesPatch) && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //27
        name: "Poe By Entrance",
        x: "33.75%",
        y: "60.40%",
        isAvailable: function() {
            if (canAccessDesert() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //28
        name: "Poe Above CoO",
        x: "14.17%",
        y: "59.4%",
        isAvailable: function() {
            if (canAccessDesert() && items.Clawshot && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //29
        name: "Poe Above Grotto",
        x: "20.83%",
        y: "50.88%",
        isAvailable: function() {
            if (canAccessDesert() && items.Clawshot && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //30
        name: "Poe in Grotto #1",
        x: "21.83%",
        y: "50.88%",
        isAvailable: function() {
            if (canAccessDesert() && items.Clawshot && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //31
        name: "Poe in Grotto #2",
        x: "20.83%",
        y: "51.88%",
        isAvailable: function() {
            if (canAccessDesert() && items.Clawshot && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //32
        name: "Poe next to Bublin Camp",
        x: "13.33%",
        y: "47.2%",
        isAvailable: function() {
            if (canAccessDesert() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //33
        name: "Bublin Camp Poe",
        x: "15%",
        y: "45.2%",
        isAvailable: function() {
            if (canAccessDesert() && setMDHFlag() && items.Crystal && canDoDamage())
                return "available";
            return "poeunavailable";
        },
    },
    {
        //34
        name: "Poe before AG",
        x: "15%",
        y: "43.6%",
        isAvailable: function() {
            if (canAccessDesert() && setMDHFlag() && items.Crystal && canDoDamage())
                return "available";
            return "poeunavailable";
        },
    },
    {
        //35
        name: "Graveyard Open Poe",
        x: "84.16%",
        y: "54.4%",
        isAvailable: function() {
            if (canAccessKakVillage() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //36
        name: "Graveyard Grave Poe",
        x: "84.16%",
        y: "55.4%",
        isAvailable: function() {
            if (canAccessKakVillage() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //37
        name: "Hidden Village Poe",
        x: "70.41%",
        y: "24.00%",
        isAvailable: function() {
            if (canAccessHiddenVillage() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //38
        name: "Eldin Longcave Poe",
        x: "65.83%",
        y: "57.2%",
        isAvailable: function() {
            if (canAccessKakGorge() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //39
        name: "Bridge Poe",
        x: "54.25%",
        y: "26.88%",
        isAvailable: function() {
            if (canAccessLanayruField() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //40
        name: "Grotto Poe #1",
        x: "49.66%",
        y: "26.8%",
        isAvailable: function() {
            if (canAccessLanayruField() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //41
        name: "Grotto Poe #2",
        x: "50.66%",
        y: "26.8%",
        isAvailable: function() {
            if (canAccessLanayruField() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //42
        name: "Poe on Rock Ledge",
        x: "44.42%",
        y: "56%",
        isAvailable: function() {
            if (canAccessLanayruField() && items.Clawshot && shootPew() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //43
        name: "Bomb Shop Poe",
        x: "81.83%",
        y: "51.76%",
        isAvailable: function() {
            if (canAccessKakVillage() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //44
        name: "Watchtower Poe",
        x: "80.83%",
        y: "50.88%",
        isAvailable: function() {
            if (canAccessKakVillage() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //45
        name: "Poe by the Dock",
        x: "46.58%",
        y: "50.64%",
        isAvailable: function() {
            if (canAccessLakeHylia() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //46
        name: "Alcove Poe",
        x: "40.08%",
        y: "54.72%",
        isAvailable: function() {
            if (canAccessLakeHylia() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //47
        name: "Poe near Tower",
        x: "34.08%",
        y: "53.12%",
        isAvailable: function() {
            if (canAccessLakeHylia() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //48
        name: "Isle of Riches Poe",
        x: "39.08%",
        y: "49.12%",
        isAvailable: function() {
            if (canAccessLakeHylia() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //49
        name: "Flight by Fowl Ledge Poe",
        x: "36.42%",
        y: "46.72%",
        isAvailable: function() {
            if (canAccessLakeHylia() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //50
        name: "LLC Poe #1",
        x: "38.5%",
        y: "54.8%",
        isAvailable: function() {
            if (canAccessLakeHylia() && canSmash() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //51
        name: "LLC Poe #2",
        x: "39.5%",
        y: "55.8%",
        isAvailable: function() {
            if (canAccessLakeHylia() && canSmash() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //52
        name: "LLC Poe #3",
        x: "38.5%",
        y: "55.8%",
        isAvailable: function() {
            if (canAccessLakeHylia() && canSmash() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //53
        name: "Poe in Blizzard",
        x: "44.67%",
        y: "9.36%",
        isAvailable: function() {
            if (canAccessSnowpeakSummit() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //54
        name: "Poe under Tree",
        x: "41.5%",
        y: "8.08%",
        isAvailable: function() {
            if (canAccessSnowpeakSummit() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //55
        name: "Poe above Grotto",
        x: "41.75%",
        y: "9.46%",
        isAvailable: function() {
            if (canAccessSnowpeakSummit() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //56
        name: "Poe in Cave",
        x: "38.08%",
        y: "11.44%",
        isAvailable: function() {
            if (canAccessSnowpeakSummit() && items.Crystal && items.Chainball)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //57
        name: "Poe next to Snowpeak Ruins",
        x: "21.75%",
        y: "31.52%",
        isAvailable: function() {
            if (canAccessSnowpeakSummit() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //58
        name: "Upper Zora River Poe",
        x: "64%",
        y: "14.16%",
        isAvailable: function() {
            if (canAccessZoraDomain() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //59
        name: "Poe Behind Waterfall",
        x: "54.5%",
        y: "9.52%",
        isAvailable: function() {
            if (canAccessZoraDomain() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },
    {
        //60
        name: "Poe By Mother and Child Rocks",
        x: "55.25%",
        y: "11.36%",
        isAvailable: function() {
            if (canAccessZoraDomain() && setMDHFlag() && items.Crystal)
                return "available";
            return "poeunavailable";
        },
    },


    //============================================
    // Golden Bugs
    {
        //1
        name: "Male Beetle",
        x: "53.58%",
        y: "62.16%",
        isAvailable: function() {
            if (canAccessFaronField())
                return "available";
            return "bugunavailable";
        },
    },
    {
        //2
        name: "Female Beetle",
        x: "57.33%",
        y: "58.72%",
        isAvailable: function() {
            if (canAccessFaronField() && (items.Boomerang || items.Clawshot))
                return "available";
            return "bugunavailable";
        },
    },
    {
        //3
        name: "Male Pill Bug",
        x: "65%",
        y: "53.60%",
        isAvailable: function() {
            if (canAccessKakGorge())
                return "available";
            return "bugunavailable";
        },
    },
    {
        //4
        name: "Female Pill Bug",
        x: "68.16%",
        y: "54.56%",
        isAvailable: function() {
            if (canAccessKakGorge())
                return "available";
            return "bugunavailable";
        },
    },
    {
        //5
        name: "Male Ant",
        x: "84.58%",
        y: "53.92%",
        isAvailable: function() {
            if (canAccessKakVillage())
                return "available";
            return "bugunavailable";
        },
    },
    {
        //6
        name: "Female Ant",
        x: "80.75%",
        y: "52.48%",
        isAvailable: function() {
            if (canAccessKakVillage())
                return "available";
            return "bugunavailable";
        },
    },
    {
        //7
        name: "Male Grasshopper",
        x: "74.58%",
        y: "40.80%",
        isAvailable: function() {
            if (canAccessEldinField())
                return "available";
            return "bugunavailable";
        },
    },
    {
        //8
        name: "Female Grasshopper",
        x: "66.67%",
        y: "34.56%",
        isAvailable: function() {
            if (canAccessEldinField())
                return "available";
            return "bugunavailable";
        },
    },
    {
        //9
        name: "Male Phasmid",
        x: "78.58%",
        y: "33.12%",
        isAvailable: function() {
            if (canAccessEldinField() && (items.Clawshot || items.Boomerang))
                return "available";
            return "bugunavailable";
        },
    },
    {
        //10
        name: "Female Phasmid",
        x: "80.00%",
        y: "26.64%",
        isAvailable: function() {
            if (canAccessEldinField() && (items.Clawshot || items.Boomerang))
                return "available";
            return "bugunavailable";
        },
    },
    {
        //11
        name: "Male Mantis",
        x: "41.17%",
        y: "46.24%",
        isAvailable: function() {
            if (canAccessLanayruField() && (items.Clawshot || items.Boomerang))
                return "available";
            return "bugunavailable";
        },
    },
    {
        //12
        name: "Female Mantis",
        x: "42.75%",
        y: "54.16%",
        isAvailable: function() {
            if (canAccessLanayruField() && (items.Clawshot || items.Boomerang))
                return "available";
            return "bugunavailable";
        },
    },
    {
        //13
        name: "Male Dragonfly",
        x: "55.5%",
        y: "11.44%",
        isAvailable: function() {
            if (canAccessZoraDomain())
                return "available";
            return "bugunavailable";
        },
    },
    {
        //14
        name: "Female Dragonfly",
        x: "65.58%",
        y: "13.20%",
        isAvailable: function() {
            if (canAccessZoraDomain())
                return "available";
            return "bugunavailable";
        },
    },
    {
        //15
        name: "Male Butterfly",
        x: "46.58%",
        y: "42.24%",
        isAvailable: function() {
            if (canAccessLanayruField())
                return "available";
            return "bugunavailable";
        },
    },
    {
        //16
        name: "Female Butterfly",
        x: "45.5%",
        y: "38.48%",
        isAvailable: function() {
            if (canAccessLanayruField() && (items.Clawshot || items.Boomerang))
                return "available";
            return "bugunavailable";
        },
    },
    {
        //17
        name: "Male Stag Beetle",
        x: "50.58%",
        y: "28.00%",
        isAvailable: function() {
            if (canAccessLanayruField())
                return "available";
            return "bugunavailable";
        },
    },
    {
        //18
        name: "Female Stag Beetle",
        x: "53.25%",
        y: "24.48%",
        isAvailable: function() {
            if (canAccessLanayruField() && (items.Clawshot || items.Boomerang))
                return "available";
            return "bugunavailable";
        },
    },
    {
        //19
        name: "Female LadyBug",
        x: "52.5%",
        y: "45.2%",
        isAvailable: function() {
            if (canAccessCastleTown())
                return "available";
            return "bugunavailable";
        },
    },
    {
        //20
        name: "Male Ladybug",
        x: "55.08%",
        y: "46.16%",
        isAvailable: function() {
            if (canAccessCastleTown())
                return "available";
            return "bugunavailable";
        },
    },
    {
        //21
        name: "Male Dayfly",
        x: "22.75%",
        y: "60.16%",
        isAvailable: function() {
            if (canAccessDesert())
                return "available";
            return "bugunavailable";
        },
    },
    {
        //22
        name: "Female Dayfly",
        x: "18.16%",
        y: "59.2%",
        isAvailable: function() {
            if (canAccessDesert())
                return "available";
            return "bugunavailable";
        },
    },
    {
        //23
        name: "Male Snail",
        x: "44.08%",
        y: "69.6%",
        isAvailable: function() {
            if (canAccessGrove())
                return "available";
            return "bugunavailable";
        },
    },
    {
        //24
        name: "Female Snail",
        x: "42.41%",
        y: "69.9%",
        isAvailable: function() {
            if (canAccessTot())
                return "available";
            return "bugunavailable";
        },
    },

    //============================================
    // Shops

    // Ordon
    {
        name: "Milk - 10 Rupees",
        x: "55.5%",
        y: "85.76%",
        isAvailable: function() {
            if ((canDoDamage() || SkipIntro) || (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Bee Larva - 10 Rupees",
        x: "56.5%",
        y: "85.76%",
        isAvailable: function() {
            if ((canDoDamage() || SkipIntro) || (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Lantern Oil - 20 Rupees",
        x: "55.5%",
        y: "86.76%",
        isAvailable: function() {
            if ((canDoDamage() || SkipIntro) && (items.Lantern || (items.Bottle || NoBottleReq)))
                return "available";
            return "bugunavailable";
        },
    },

    //Malo Mark - Kak
    {
        name: "Red Potion - 30 Rupees",
        x: "80.25%",
        y: "54.28%",
        isAvailable: function() {
            if (canAccessKakVillage() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Wooden Shield - 50 Rupees",
        x: "81.25%",
        y: "54.28%",
        isAvailable: function() {
            if (canAccessKakVillage())
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Hylian Shield - 200 Rupees",
        x: "80.25%",
        y: "55.28%",
        isAvailable: function() {
            if (canAccessKakVillage())
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Hawkeye - 100 Rupees",
        x: "81.25%",
        y: "55.28%",
        isAvailable: function() {
            if (items.Boss2 || MinesPatch)
                return "available";
            return "bugunavailable";
        },
    },

    //Death Mountain
    {
        name: "Lantern Oil - 20 Rupees",
        x: "85.33%",
        y: "37.60%",
        isAvailable: function() {
            if (canAccessDeathMountain() && (items.Lantern || (items.Bottle || NoBottleReq)))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Wooden Shield - 50 Rupees",
        x: "86.33%",
        y: "37.60%",
        isAvailable: function() {
            if (canAccessDeathMountain())
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Milk - 20 Rupees",
        x: "85.33%",
        y: "38.60%",
        isAvailable: function() {
            if (canAccessDeathMountain() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },

    //Goron at Kak Night
    {
        name: "Lantern Oil - 20 Rupees",
        x: "80.25%",
        y: "51.68%",
        isAvailable: function() {
            if (canAccessKakVillage() && (items.Lantern || (items.Bottle || NoBottleReq)))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Red Potion - 30 Rupees",
        x: "81.25%",
        y: "51.68%",
        isAvailable: function() {
            if (canAccessKakVillage() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Blue Potion - 100 Rupees",
        x: "80.25%",
        y: "52.68%",
        isAvailable: function() {
            if (canAccessKakVillage() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },

    //Malo Mart -Castle Town
    {
        name: "Blue Potion - 50 Rupees",
        x: "55.33%",
        y: "40.88%",
        isAvailable: function() {
            if (canAccessCastleTown() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Red Potion - 15 Rupees",
        x: "56.33%",
        y: "40.88%",
        isAvailable: function() {
            if (canAccessCastleTown() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Magic Armor - 598 Rupees",
        x: "55.33%",
        y: "41.88%",
        isAvailable: function() {
            if (canAccessCastleTown())
                return "available";
            return "bugunavailable";
        },
    },

    // Goron Castle Town Shop
    {
        name: "Hylian Shield - 210 Rupees",
        x: "51.66%",
        y: "40.48%",
        isAvailable: function() {
            if (canAccessCastleTown())
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Red Potion - 40 Rupees",
        x: "52.66%",
        y: "40.48%",
        isAvailable: function() {
            if (canAccessCastleTown() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Lantern Oil - 30 Rupees",
        x: "51.66%",
        y: "41.48%",
        isAvailable: function() {
            if (canAccessCastleTown() && (items.Lantern || (items.Bottle || NoBottleReq)))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Arrows - 40 Rupees",
        x: "52.66%",
        y: "41.48%",
        isAvailable: function() {
            if (canAccessCastleTown() && items.Bow)
                return "available";
            return "bugunavailable";
        },
    },

    //Goron Hot Springwater
    {
        name: "Hot Springwater - 20 Rupees",
        x: "54.33%",
        y: "42.48%",
        isAvailable: function() {
            if (canAccessCastleTown() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },

    //CiTS Shop
    {
        name: "Red Potion - 30 Rupees",
        x: "38.42%",
        y: "50.00%",
        isAvailable: function() {
            if (canAccessCiTS() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Blue Potion - 100 Rupees",
        x: "37.42%",
        y: "51.00%",
        isAvailable: function() {
            if (canAccessCiTS() && (items.Bottle || NoBottleReq))
                return "available";
            return "bugunavailable";
        },
    },
    {
        name: "Lantern Oil - 20 Rupees",
        x: "38.42%",
        y: "51.00%",
        isAvailable: function() {
            if (canAccessCiTS() && (items.Lantern || (items.Bottle || NoBottleReq)))
                return "available";
            return "bugunavailable";
        },
    }
]