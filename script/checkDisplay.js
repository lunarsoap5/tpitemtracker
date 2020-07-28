function setMapTracker() {
    if (document.getElementById('maptracker').checked) {
        for (var i = 0; i < 104; i++) {
            document.getElementById("" + i).style.zIndex = "auto";
        }
        for (var j = 0; j < 17; j++) {
            document.getElementById("dungeon" + j).style.zIndex = "auto";
        }
        for (var j = 17; j < 21; j++) {
            document.getElementById("dungeon" + j).style.zIndex = "-1";
        }
        for (var i = 104; i < 202; i++) {
            document.getElementById("" + i).style.zIndex = "-1";
        }
    }
    else {
        return;
    }
}

function setPoeTracker() {
    if (document.getElementById('poetracker').checked) {
        for (var i = 0; i < 104; i++) {
            document.getElementById(i).style.zIndex = "-1";
        }
        for (var j = 0; j < 17; j++) {
            document.getElementById("dungeon" + j).style.zIndex = "-1";
        }
        for (var j = 17; j < 21; j++) {
            document.getElementById("dungeon" + j).style.zIndex = "auto";
        }
        for (var i = 104; i < 153; i++) {
            document.getElementById("" + i).style.zIndex = "auto";
        }
        for (var i = 153; i < 202; i++) {
            document.getElementById("" + i).style.zIndex = "-1";
        }
    }
    else {
        return;
    }
}

function setBugTracker() {
    if (document.getElementById('bugtracker').checked) {
        for (var i = 0; i < 153; i++) {
            document.getElementById(i).style.zIndex = "-1";
        }
        for (var j = 0; j < 21; j++) {
            document.getElementById("dungeon" + j).style.zIndex = "-1";
        }
        for (var i = 153; i < 177; i++) {
            document.getElementById("" + i).style.zIndex = "auto";
        }
        for (var j = 177; j < 202; j++) {
            document.getElementById("" + j).style.zIndex = "-1";
        }
    }
    else {
        return;
    }
}

function setShopTracker() {
    if (document.getElementById('shoptracker').checked) {
        for (var i = 0; i < 153; i++) {
            document.getElementById(i).style.zIndex = "-1";
        }
        for (var j = 0; j < 21; j++) {
            document.getElementById("dungeon" + j).style.zIndex = "-1";
        }
        for (var i = 153; i < 177; i++) {
            document.getElementById("" + i).style.zIndex = "-1";
        }
        for (var j = 177; j < 202; j++) {
            document.getElementById("" + j).style.zIndex = "auto";
        }
    }
    else {
        return;
    }
}