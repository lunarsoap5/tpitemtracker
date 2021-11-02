//set the boss reward values for later testing
var defaultrewards = {
    Boss1: 0,
    Boss2: 0,
    Boss3: 0,
    Boss4: 0,
    Boss5: 0,
    Boss6: 0,
    Boss7: 0,
    Boss8: 0
};
var rewards = defaultrewards;

//sets the images of the dungeon rewards to their appropriate values
var dungeonImg = [
    'Unknown',
    'label1',
    'label2',
    'label3',
    'label4',
    'label5',
    'label6',
    'label7'
];

//set our default variables
showprizes = true;
var mouseOverItem = false;
var mouseLastOverR;
var mouseLastOverC;
var mouseLastOverCor;
var opened = 0;
var Dopened = 0;

var itemGrid = [];
var itemLayout = [];

var editmode = false;
var selected = {};

var dungeonSelect = 0;
var totalChecks = 501;

// if we change an option, we want to update our cookies
function setCookie(obj) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    var val = JSON.stringify(obj);
    document.cookie = "key=" + val + ";" + expires + ";path=/";
}

//upon loading the website we want to get our cookie values that were stored if any
function getCookie() {
    var name = "key=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return {};
}


//we want to set our default cookie values so that we can just load from there if need be
var cookieDefault = {
    map: 1,
    iZoom: 100,
    mZoom: 100,
    mPos: 0,
    prize: 1,
    rewards: defaultrewards,
    items: defaultItemGrid,
    obtainedItems: items,
    overworldChests: serializeChests(),
    dungeonChests: serializeDungeonChests(),
}

//assigns the cookie values to their respective parameters
var cookielock = false;
function loadCookie() {
    if (cookielock) {
        return;
    }

    cookielock = true;

    cookieobj = getCookie();

    Object.keys(cookieDefault).forEach(function(key) {
        if (cookieobj[key] === undefined) {
            cookieobj[key] = cookieDefault[key];
        }
    });

    rewards = JSON.parse(JSON.stringify(cookieobj.rewards));
    initGridRow(JSON.parse(JSON.stringify(cookieobj.items)));
    items = JSON.parse(JSON.stringify(cookieobj.obtainedItems));
    deserializeChests(JSON.parse(JSON.stringify(cookieobj.overworldChests)));
    deserializeDungeonChests(JSON.parse(JSON.stringify(cookieobj.dungeonChests)));

    updateGridItemAll();

    document.getElementsByName('showmap')[0].checked = !!cookieobj.map;
    document.getElementsByName('showmap')[0].onchange();
    document.getElementsByName('itemdivsize')[0].value = cookieobj.iZoom;
    document.getElementsByName('itemdivsize')[0].onchange();
    document.getElementsByName('mapdivsize')[0].value = cookieobj.mZoom;
    document.getElementsByName('mapdivsize')[0].onchange();

    document.getElementsByName('mapposition')[cookieobj.mPos].click();

    document.getElementsByName('showprizes')[0].checked = false;
    document.getElementsByName('showprizes')[0].onchange();

    cookielock = false;
}

//applies the stored cookies to the web cookies
function saveCookie() {
    if (cookielock) {
        return;
    }

    cookielock = true;

    cookieobj = {};

    cookieobj.map = document.getElementsByName('showmap')[0].checked ? 1 : 0;
    cookieobj.iZoom = document.getElementsByName('itemdivsize')[0].value;
    cookieobj.mZoom = document.getElementsByName('mapdivsize')[0].value;

    cookieobj.mPos = document.getElementsByName('mapposition')[1].checked ? 1 : 0;

    cookieobj.prize = document.getElementsByName('showprizes')[0].checked ? 1 : 0;

    cookieobj.rewards = JSON.parse(JSON.stringify(rewards));
    cookieobj.items = JSON.parse(JSON.stringify(itemLayout));
    cookieobj.obtainedItems = JSON.parse(JSON.stringify(items));
    cookieobj.overworldChests = JSON.parse(JSON.stringify(serializeChests()));
    cookieobj.dungeonChests = JSON.parse(JSON.stringify(serializeDungeonChests()));

    setCookie(cookieobj);

    cookielock = false;
}

//Set up the functions to open and close chests on the map
function serializeChests() {
    return overworldChests.map(chest => chest.isOpened || false);
}

function serializeDungeonChests() {
    return dungeons.map(dungeon => Object.values(dungeon.chestlist).map(chest => chest.isOpened || false));
}

function deserializeChests(serializedChests) {
    for (var i = 0; i < overworldChests.length; i++) {
        overworldChests[i].isOpened = serializedChests[i];
        refreshChest(i);
    }
}

function deserializeDungeonChests(serializedDungeons) {
    for (var i = 0; i < dungeons.length; i++) {
        var dungeon = dungeons[i];
        var serializedDungeon = serializedDungeons[i];
        var chestNames = Object.keys(dungeon.chestlist);
        for (var j = 0; j < chestNames.length; j++) {
            dungeon.chestlist[chestNames[j]].isOpened = serializedDungeon[j];
        }
    }
}

// Event of clicking a chest on the map
function toggleChest(x) {
    overworldChests[x].isOpened = !overworldChests[x].isOpened;
    refreshChest(x);
    c = document.getElementsByClassName("mapspan chest available").length;
    opened = document.getElementsByClassName("mapspan chest opened").length;
    document.getElementById('checkCounter').innerHTML = "Checks: " + (dungeonChest + c) + " available, " + (totalChecks - opened - Dopened) + " Remaining";
    saveCookie();
}

function refreshChest(x) {
    var stateClass = overworldChests[x].isOpened ? 'opened' : overworldChests[x].isAvailable();
    document.getElementById(x).className = 'mapspan chest ' + stateClass;
}

// Highlights a chest location
function highlight(x) {
    document.getElementById(x).style.backgroundImage = 'url(images/highlighted.png)';
    c = document.getElementsByClassName("mapspan chest available").length;
    opened = document.getElementsByClassName("mapspan chest opened").length;
    document.getElementById('checkCounter').innerHTML = "Checks: " + (dungeonChest + c) + " available, " + (totalChecks - opened - Dopened) + " Remaining";
}

function unhighlight(x) {
    document.getElementById(x).style.backgroundImage = 'url(images/poi.png)';
    c = document.getElementsByClassName("mapspan chest available").length;
    opened = document.getElementsByClassName("mapspan chest opened").length;
    document.getElementById('checkCounter').innerHTML = "Checks: " + (dungeonChest + c) + " available, " + (totalChecks - opened - Dopened) + " Remaining";
}

// Highlights a chest location (but for dungeons)
function highlightDungeon(x) {
    document.getElementById('dungeon' + x).style.backgroundImage = 'url(images/highlighted.png)';
    c = document.getElementsByClassName("mapspan chest available").length;
    opened = document.getElementsByClassName("mapspan chest opened").length;
    document.getElementById('checkCounter').innerHTML = "Checks: " + (dungeonChest + c) + " available, " + (totalChecks - opened - Dopened) + " Remaining";
}

function unhighlightDungeon(x) {
    if (dungeonSelect != x)
        document.getElementById('dungeon' + x).style.backgroundImage = 'url(images/poi.png)';
        c = document.getElementsByClassName("mapspan chest available").length;
    opened = document.getElementsByClassName("mapspan chest opened").length;
    document.getElementById('checkCounter').innerHTML = "Checks: " + (dungeonChest + c) + " available, " + (totalChecks - opened - Dopened) + " Remaining";
}

// Event of clicking a dungeon box on the map
function clickDungeon(d) {
    document.getElementById('dungeon' + dungeonSelect).style.backgroundImage = 'url(images/poi.png)';
    dungeonSelect = d;
    document.getElementById('dungeon' + dungeonSelect).style.backgroundImage = 'url(images/highlighted.png)';

    document.getElementById('submaparea').innerHTML = dungeons[dungeonSelect].name;
    document.getElementById('submaparea').className = 'DC' + dungeons[dungeonSelect].isBeatable();
    var DClist = document.getElementById('submaplist');
    DClist.innerHTML = '';

    for (var key in dungeons[dungeonSelect].chestlist) {
        var s = document.createElement('li');
        s.innerHTML = key;

        if (dungeons[dungeonSelect].chestlist[key].isOpened) {
            s.className = "DCopened";
        } else if ( dungeons[dungeonSelect].chestlist[key].isAvailable()) {
            s.className = "DCavailable";
        } else {
            s.className = "DCunavailable";
        }

        s.onclick = new Function('toggleDungeonChest(this,' + dungeonSelect + ',"' + key + '")');
        s.onmouseover = new Function('highlightDungeonChest(this)');
        s.onmouseout = new Function('unhighlightDungeonChest(this)');
        s.style.cursor = "pointer";

        DClist.appendChild(s);
        
    }
}

function toggleDungeonChest(sender, d, c) {
    dungeons[d].chestlist[c].isOpened = !dungeons[d].chestlist[c].isOpened;
    if (dungeons[d].chestlist[c].isOpened) {
        sender.className = 'DCopened';
        Dopened++;
    }
    else if (dungeons[d].chestlist[c].isAvailable()) {
        sender.className = 'DCavailable';
        Dopened--;
    }
    else {
        sender.className = 'DCunavailable';
        Dopened--;
    }

    
    updateMap();
    c = document.getElementsByClassName("mapspan chest available").length;
    opened = document.getElementsByClassName("mapspan chest opened").length;
    document.getElementById('checkCounter').innerHTML = "Checks: " + (dungeonChest + c) + " available, " + (totalChecks - opened - Dopened) + " Remaining";
    saveCookie();
}

function highlightDungeonChest(x) {
    x.style.backgroundColor = '#282828';
    c = document.getElementsByClassName("mapspan chest available").length;
    opened = document.getElementsByClassName("mapspan chest opened").length;
    document.getElementById('checkCounter').innerHTML = "Checks: " + (dungeonChest + c) + " available, " + (totalChecks - opened - Dopened) + " Remaining";
}

function unhighlightDungeonChest(x) {
    x.style.backgroundColor = '';
    c = document.getElementsByClassName("mapspan chest available").length;
    opened = document.getElementsByClassName("mapspan chest opened").length;
    document.getElementById('checkCounter').innerHTML = "Checks: " + (dungeonChest + c) + " available, " + (totalChecks - opened - Dopened) + " Remaining";
}

function setOrder(H) {
    if (H) {
        document.getElementById('layoutdiv').classList.remove('flexcontainer');
    } else {
        document.getElementById('layoutdiv').classList.add('flexcontainer');
    }
    saveCookie();
}

function showPrizes(sender) {
    showprizes = sender.checked;
    updateGridItemAll();
    saveCookie();
}

//Set the values for the skips if their boxes are checked
function setFaronEscape(sender) {
    faronescape = sender.checked;
    if (!faronescape)
    {
        FaronEscape = false;
        updateMap();
    }
    else 
    {
        FaronEscape = true;
        updateMap();
    }
}

function setTwilightSkip(sender) {
    twilightskip = sender.checked;
    if (!twilightskip)
    {
        TwilightSkip = false;
        updateMap();
    }
    else 
    {
        TwilightSkip = true;
        updateMap();
    }
}

function setRemoveBoxes(sender) {
    removeboxes = sender.checked;
    if (!removeboxes)
    {
        RemoveBoxes = false;
        updateGridItemAll();
    }
    else 
    {
        RemoveBoxes = true;
        updateGridItemAll();
    }
}

function setSkipMdh(sender) {
    skipmdh = sender.checked;
    if (!skipmdh)
    {
        SkipMDH = false;
        updateMap();
    }
    else 
    {
        SkipMDH = true;
        updateMap();
    }
}

function setSkipIntro(sender) {
    skipintro = sender.checked;
    if (!skipintro)
    {
        SkipIntro = false;
        updateMap();
    }
    else 
    {
        SkipIntro = true;
        updateMap();
    }
}

function setEarlyDesert(sender) {
    earlydesert = sender.checked;
    if (!earlydesert)
    {
        EarlyDesert = false;
        updateMap();
    }
    else 
    {
        EarlyDesert = true;
        updateMap();
    }
}

function setEarlyCits(sender) {
    earlycits = sender.checked;
    if (!earlycits)
    {
        EarlyCits = false;
        updateMap();
    }
    else 
    {
        EarlyCits = true;
        updateMap();
    }
}

function setOpenGates(sender) {
    opengates = sender.checked;
    if (!opengates)
    {
        OpenGates = false;
        updateMap();
    }
    else 
    {
        OpenGates = true;
        updateMap();
    }
}

function setMinesPatch(sender) {
    minespatch = sender.checked;
    if (!minespatch) {
        MinesPatch = false;
        updateMap();
    }
    else {
        MinesPatch = true;
        updateMap();
    }
}

function setNoBottleReq(sender) {
    nobottlereq = sender.checked;
    if (!nobottlereq) {
        NoBottleReq = false;
        updateMap();
    }
    else {
        NoBottleReq = true;
        updateMap();
    }
}

function setEarlyHyruleCastle(sender) {
    earlyhyrulecastle = sender.checked;
    if (!earlyhyrulecastle) {
        EarlyHyruleCastle = false;
        updateMap();
    }
    else {
        EarlyHyruleCastle = true;
        updateMap();
    }
}

function setEscortSkip(sender) {
    escortskip = sender.checked;
    if (!escortskip) {
        EscortSkip = false;
        updateMap();
    }
    else {
        EscortSkip = true;
        updateMap();
    }
}

function setEarlyToT(sender) {
    earlytot = sender.checked;
    if (!earlytot) {
        EarlyToT = false;
        updateMap();
    }
    else {
        EarlyToT = true;
        updateMap();
    }
}

function setEarlyPoT(sender) {
    earlypot = sender.checked;
    if (!earlypot) {
        EarlyPoT = false;
        updateMap();
    }
    else {
        EarlyPoT = true;
        updateMap();
    }
}

//sets the icons for the Talo Map
function setTaloMap(sender) {
    talomap = sender.checked;
    if (!talomap) {
        TaloMap = false;
        document.getElementById("mapdiv").style.backgroundImage = "url('images/map.png')";
        document.body.style.backgroundImage = "url('images/Backgrounds/none.png')";
        updateMap();
        updateGridItemAll();
    }
    else {
        TaloMap = true;
        document.getElementById("mapdiv").style.backgroundImage = "url('images/taloItems/map.png')";
        document.body.style.backgroundImage = "url('images/taloItems/paper.jpg')";
        updateMap();
        updateGridItemAll();
    }
}

//set glitched logic options
function setGlitchedLogicOff() {
    glitchedLogic = false;
    updateMap();
}

function setGlitchedLogicOn() {
    glitchedLogic = true;
    updateMap();
}

// Options for when a person clicks on the different check options
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
        for (var i = 104; i < 201; i++) {
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
        for (var i = 153; i < 201; i++) {
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
        for (var j = 177; j < 201; j++) {
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
        for (var j = 177; j < 201; j++) {
            document.getElementById("" + j).style.zIndex = "auto";
        }
    }
    else {
        return;
    }
}


//Set map zoom
function setZoom(target, sender) {
    document.getElementById(target).style.zoom = sender.value / 100;
    document.getElementById(target).style.zoom = sender.value / 100;

    document.getElementById(target).style.MozTransform = 'scale(' + (sender.value / 100) + ')';
    document.getElementById(target).style.MozTransformOrigin = '0 0';

    document.getElementById(target + 'size').innerHTML = (sender.value) + '%';
    saveCookie();
}

//Set map distance from item tracker
function setDistance(target, sender) {
    document.getElementById(target).style.width = (sender.value / 40 * 20)+ "%";
    document.getElementById(target).style.width = (sender.value / 40 * 20) + "%";

    document.getElementById(target + 'size').innerHTML = (sender.value) + '%';
    saveCookie();
}

//set unused item opacity
function setOpacity(target, sender) {
    x = document.getElementsByClassName(target);
    for (var i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "rgba(0,0,0, " + sender.value / 100 + ")";
    }

    document.getElementById(target + 'size').innerHTML = (sender.value) + '%';
    saveCookie();
}


//function for setting the custom background images
function setBackground() {
    var none = document.getElementById("none").selected;
    var castle = document.getElementById("castle").selected;
    var meadow = document.getElementById("meadow").selected;
    var bridge = document.getElementById("bridge").selected;

    if (none == true) {
        document.body.style.backgroundImage = "url('images/Backgrounds/none.png')";
    }
    else if (castle == true) {
        document.body.style.backgroundImage = "url('images/Backgrounds/castle.jpg')";
    }
    else if (meadow == true) {
        document.body.style.backgroundImage = "url('images/Backgrounds/meadow.jpg')";
    }
    else if (bridge == true) {
        document.body.style.backgroundImage = "url('images/Backgrounds/bridge.jpg')";
    }
}

//backend for the settings button
function showSettings(sender) {
    if (editmode) {
        var r, c;
        var startdraw = false;

        editmode = false;
        updateGridItemAll();
        showTracker('mapdiv', document.getElementsByName('showmap')[0]);
        document.getElementById('itemconfig').style.display = 'none';
        document.getElementById('rowButtons').style.display = 'none';
        sender.innerHTML = '🔧';
        saveCookie();
    } else {
        var x = document.getElementById('settings');
        if (!x.style.display || x.style.display == 'none') {
            x.style.display = 'initial';
            sender.innerHTML = 'X';
        } else {
            x.style.display = 'none';
            sender.innerHTML = '🔧';
        }
    }
}

//displays the map tracker
function showTracker(target, sender) {
    if (sender.checked) {
        document.getElementById(target).style.display = '';
    }
    else {
        document.getElementById(target).style.display = 'none';
    }
}

//sets the parameters for edit mode
function EditMode() {
    var r, c;

    editmode = true;
    updateGridItemAll();
    showTracker('mapdiv', {checked: false});
    document.getElementById('settings').style.display = 'none';
    document.getElementById('itemconfig').style.display = '';
    document.getElementById('rowButtons').style.display = 'flex';

    document.getElementById('settingsbutton').innerHTML = 'Exit Edit Mode';
}

//sets all of the item and map options to their defaults
function ResetLayout()
{
	initGridRow(defaultItemGrid);
	updateGridItemAll();
	
	document.getElementById('itemdiv').style.zoom = 100 / 100;
	document.getElementById('itemdiv').style.zoom = 100 / 100;
	document.getElementById('itemdiv').style.MozTransform = 'scale(' + (100 / 100) + ')';
	document.getElementById('itemdiv').style.MozTransformOrigin = '0 0';
	document.getElementById('itemdivsize').innerHTML='100%';
	document.getElementById('itemrange').value=100;
	
	document.getElementById('mapdiv').style.zoom = 100 / 100;
	document.getElementById('mapdiv').style.zoom = 100 / 100;
	document.getElementById('mapdiv').style.MozTransform = 'scale(' + (100 / 100) + ')';
	document.getElementById('mapdiv').style.MozTransformOrigin = '0 0';
    document.getElementById('mapdivsize').innerHTML='100%';
    document.getElementById('maprange').value = 100;

    document.getElementById('blankspace').style.width = "1%";
    document.getElementById('blankspace').style.width = "1%";
    document.getElementById('trackerDistanceID').value = 1;
    document.getElementById('blankspacesize').innerHTML = "1%";    

    x = document.getElementsByClassName("tracker");
    for (var i = 0; i < x.length; i++)
    {
        x[i].style.backgroundColor = "rgba(0,0,0,1)";
    }
    document.getElementById('trackerOpacityID').value = 100;
    document.getElementById('trackersize').innerHTML = "100%"; 
    document.body.style.backgroundImage = "url('images/Backgrounds/none.png')";
    saveCookie();
}


function ResetTracker() {
    overworldChests.forEach(chest => delete chest.isOpened);
    dungeons.forEach(dungeon => Object.values(dungeon.chestlist).forEach(chest => delete chest.isOpened));
    items = Object.assign({}, baseItems);
    totalChecks = 501;
    document.getElementById('maptracker').checked = true;
    setMapTracker();

    updateGridItemAll();
    updateMap();
    document.getElementById('checkCounter').innerHTML = "Checks: " + (dungeonChest + c) + " available, " + totalChecks + " Remaining";
    saveCookie();
}

// creates an extra row when in edit mode
function addItemRow() {
    var sender = document.getElementById('itemdiv')
    var r = itemLayout.length;

    itemGrid[r] = [];
    itemLayout[r] = [];

    itemGrid[r]['row'] = document.createElement('table');
    itemGrid[r]['row'].className = 'tracker';

    itemGrid[r]['tablerow'] = document.createElement('tr')
    itemGrid[r]['tablerow'].appendChild(itemGrid[r]['row']);
    sender.appendChild(itemGrid[r]['tablerow']);

    var tr = document.createElement('tr');
    itemGrid[r]['row'].appendChild(tr);

    itemGrid[r]['addbutton'] = document.createElement('button');
    itemGrid[r]['addbutton'].innerHTML = '+';
    itemGrid[r]['addbutton'].style.backgroundColor = 'green';
    itemGrid[r]['addbutton'].style.color = 'white';
    itemGrid[r]['addbutton'].onclick = new Function("addItem(" + r + ")");
    itemGrid[r]['row'].appendChild(itemGrid[r]['addbutton']);

    itemGrid[r]['removebutton'] = document.createElement('button');
    itemGrid[r]['removebutton'].innerHTML = '-';
    itemGrid[r]['removebutton'].style.backgroundColor = 'red';
    itemGrid[r]['removebutton'].style.color = 'white';
    itemGrid[r]['removebutton'].onclick = new Function("removeItem(" + r + ")");
    itemGrid[r]['row'].appendChild(itemGrid[r]['removebutton']);

    saveCookie();
}

// removes an item row when in edit mode
function removeItemRow() {
    var sender = document.getElementById('itemdiv')
    var r = itemLayout.length - 1;

    sender.removeChild(itemGrid[r]['tablerow'])
    itemGrid.splice(r, 1);
    itemLayout.splice(r, 1);

    saveCookie();
}

//adds an item to the item tracker 
function addItem(r) {
    var i = itemLayout[r].length

    itemGrid[r][i] = [];
    itemLayout[r][i] = 'blank';

    itemGrid[r][i]['item'] = document.createElement('td');
    itemGrid[r][i]['item'].className = 'griditem';
    itemGrid[r]['row'].appendChild(itemGrid[r][i]['item']);

    var tdt = document.createElement('table');
    tdt.className = 'lonk';
    itemGrid[r][i]['item'].appendChild(tdt);
        var tdtr1 = document.createElement('tr');
        tdt.appendChild(tdtr1);
            itemGrid[r][i][0] = document.createElement('th');
            itemGrid[r][i][0].className = 'corner';
            itemGrid[r][i][0].onmouseover = new Function("setMOver(" + r + "," + i + ",0)")
            itemGrid[r][i][0].onmouseout = new Function("setMOff()")
            itemGrid[r][i][0].onclick = new Function("gridItemClick(" + r + "," + i + ",0)");
            tdtr1.appendChild(itemGrid[r][i][0]);
            itemGrid[r][i][1] = document.createElement('th');
            itemGrid[r][i][1].className = 'corner';
            itemGrid[r][i][1].onmouseover = new Function("setMOver(" + r + "," + i + ",1)")
            itemGrid[r][i][1].onmouseout = new Function("setMOff()")
            itemGrid[r][i][1].onclick = new Function("gridItemClick(" + r + "," + i + ",1)");
            tdtr1.appendChild(itemGrid[r][i][1]);
        var tdtr2 = document.createElement('tr');
            tdt.appendChild(tdtr2);
            itemGrid[r][i][2] = document.createElement('th');
            itemGrid[r][i][2].className = 'corner';
            itemGrid[r][i][2].onmouseover = new Function("setMOver(" + r + "," + i + ",2)")
            itemGrid[r][i][2].onmouseout = new Function("setMOff()")
            itemGrid[r][i][2].onclick = new Function("gridItemClick(" + r + "," + i + ",2)");
            tdtr2.appendChild(itemGrid[r][i][2]);
            itemGrid[r][i][3] = document.createElement('th');
            itemGrid[r][i][3].className = 'corner';
            itemGrid[r][i][3].onmouseover = new Function("setMOver(" + r + "," + i + ",3)")
            itemGrid[r][i][3].onmouseout = new Function("setMOff()")
            itemGrid[r][i][3].onclick = new Function("gridItemClick(" + r + "," + i + ",3)");
            tdtr2.appendChild(itemGrid[r][i][3]);

    updateGridItem(r, i);
    saveCookie();
}
function removeItem(r) {
    var i = itemLayout[r].length - 1

    if (i < 0) {
        return
    }

    itemGrid[r]['row'].removeChild(itemGrid[r][i]['item'])
    itemGrid[r].splice(i, 1);
    itemLayout[r].splice(i, 1);
    saveCookie();
}

//sets the images, etc of an item 
function updateGridItem(row, index) 
{
    var item = itemLayout[row][index];
    var itemImageURLHeader = 'url(images/Items/'; 
    var itemCountImageHeader = 'url(images/ItemCounts/';
    
    //if Talo's Map is enabled, set the URL header appropriately
    if (TaloMap)
    {
        itemImageURLHeader = 'url(images/taloItems/';
        itemCountImageHeader = 'url(images/taloItems/ItemCounts/';
    }

    if (editmode) 
    {
        if (!item || item == 'blank') {
            itemGrid[row][index]['item'].style.backgroundImage = 'url(images/blank.png)';
        }
        else if ((typeof items[item]) == 'boolean')
        {
            itemGrid[row][index]['item'].style.backgroundImage = itemImageURLHeader + item + '.png)';
        }
        else
        {
            itemGrid[row][index]['item'].style.backgroundImage = itemImageURLHeader + item + itemsMax[item] + '.png)';
        }
        itemGrid[row][index]['item'].style.border = '1px solid white';
        itemGrid[row][index]['item'].className = 'griditem true'

        return;
    }

    itemGrid[row][index]['item'].style.border = '0px';

    if (!item || item == 'blank') 
    {
        itemGrid[row][index]['item'].style.backgroundImage = '';
        return;
    }

    if (RemoveBoxes)
    {
        if ((typeof items[item]) == 'boolean') 
        {
            itemGrid[row][index]['item'].style.backgroundImage = itemImageURLHeader + item + '.png)';
        }
        else if (progressiveItems.includes(item))
        {
            itemGrid[row][index]['item'].style.backgroundImage = itemImageURLHeader + item + items[item] + '.png';
        } 
        else 
        {
            itemGrid[row][index]['item'].style.backgroundImage = itemCountImageHeader + items[item] + '.png),' + itemImageURLHeader + item + '.png)';
        }
    }
    else
    {
        if ((typeof items[item]) == 'boolean') 
        {
            itemGrid[row][index]['item'].style.backgroundImage = itemImageURLHeader + item + '.png), url(images/ItemBox.png)';
        }
        else if (progressiveItems.includes(item))
        {
            itemGrid[row][index]['item'].style.backgroundImage = itemImageURLHeader + item + items[item] + '.png), url(images/ItemBox.png)';
        } 
        else 
        {
            itemGrid[row][index]['item'].style.backgroundImage = itemCountImageHeader + items[item] + '.png),' + itemImageURLHeader + item + '.png), url(images/ItemBox.png)';
        }
    }
    

    itemGrid[row][index]['item'].className = 'griditem ' + !!items[item];

    if (rewards[item] !== undefined) {
        if (showprizes) {
            itemGrid[row][index][3].style.backgroundImage = 'url(images/' + dungeonImg[rewards[item]] + '.png)';
        } else {
            itemGrid[row][index][3].style.backgroundImage = '';
        }
    }
}


function updateGridItemAll() {
    var r, c;
    for (r = 0; r < itemLayout.length; r++) {
        for (c = 0; c < itemLayout[r].length; c++) {
            updateGridItem(r, c);
        }

        if (editmode) {
            itemGrid[r]['addbutton'].style.display = ''
            itemGrid[r]['removebutton'].style.display = ''
        }
        else {
            itemGrid[r]['addbutton'].style.display = 'none'
            itemGrid[r]['removebutton'].style.display = 'none'
        }
    }
}


function setGridItem(item, row, index) {
    while (!itemLayout[row]) {
        addItemRow();
    }
    while (!itemLayout[row][index]) {
        addItem(row);
    }

    itemLayout[row][index] = item;
    updateGridItem(row, index);
}


function initGridRow(itemsets) {
    while (itemLayout.length > 0) {
        removeItemRow();
    }

    var r, c;
    for (r = 0; r < itemsets.length; r++) {
        for (c = 0; c < itemsets[r].length; c++) {
            setGridItem(itemsets[r][c], r, c);
        }
    }
}

function setMOver(row, col,corner) {
    //keep track of what item you moused over.
    mouseLastOverCor = corner;
    mouseLastOverR = row;
    mouseLastOverC = col;
    mouseOverItem = true;

}

function setMOff() {
    mouseOverItem = false;
}
function gridItemClick(row, col, corner) {
    if (editmode) {
        if (selected.item) {
            document.getElementById(selected.item).style.border = '1px solid white';
            var old = itemLayout[row][col];

            if (old == selected.item) {
                selected = {};
                return;
            }

            itemLayout[row][col] = selected.item;
            updateGridItem(row, col);
            selected = {};
            document.getElementById(old).style.opacity = 1;
        } else if (selected.row !== undefined) {
            itemGrid[selected.row][selected.col]['item'].style.border = '1px solid white';

            var temp = itemLayout[row][col];
            itemLayout[row][col] = itemLayout[selected.row][selected.col];
            itemLayout[selected.row][selected.col] = temp;
            updateGridItem(row, col);
            updateGridItem(selected.row, selected.col);
            selected = {};
        } else {
            itemGrid[row][col]['item'].style.border = '3px solid yellow';
            selected = {row: row, col: col};
        }
    } else {
        var item = itemLayout[row][col];

        if (rewards[item] !== undefined && showprizes) {
            if (corner == 3) {
                rewards[item]++;
                if (rewards[item] >=  9) {
                    rewards[item] = 0;
                }
            }
            else {
                items[item] = !items[item];
            }
        }
        else if ((typeof items[item]) == 'boolean') {
            items[item] = !items[item];
        } else {
            items[item]++;
            if (items[item] > itemsMax[item]) {
                items[item] = itemsMin[item];
            }
        }

        }
    updateMap();
    updateGridItem(row,col);
   c = document.getElementsByClassName("mapspan chest available").length;
   opened = document.getElementsByClassName("mapspan chest opened").length;
   document.getElementById('checkCounter').innerHTML = "Checks: " + (dungeonChest + c) + " available, " + (totalChecks - opened - Dopened) + " Remaining";
    saveCookie();

    }


function gridItemRClick(row, col, corner) {
    if (editmode) {
 //Do Nothing
    } else {
        var item = itemLayout[row][col];

        if (rewards[item] !== undefined && showprizes) {
            if (corner == 3) {
                //this is where the code for the dungeon list happenes
                //corner 3 is bottom right
                if (rewards[item] <= 0) {
                    rewards[item] = 8;
                }
                else {
                    rewards[item] = rewards[item] - 1;

                }
            }
            else {
                items[item] = !items[item];
            }
        }
        else if ((typeof items[item]) == 'boolean') 
        {
            items[item] = !items[item];
        } 
        else 
        {
            if (items[item] == itemsMin[item]) {
                items[item] = itemsMax[item]
            } else {
                items[item]--;
            }
        }

        updateMap();
        updateGridItem(row, col);
    }
    c = document.getElementsByClassName("mapspan chest available").length;
   opened = document.getElementsByClassName("mapspan chest opened").length;
   document.getElementById('checkCounter').innerHTML = "Checks: " + (dungeonChest + c) + " available, " + (totalChecks - opened - Dopened) + " Remaining";
    saveCookie();

}

function updateMap() {
    for (k = 0; k < overworldChests.length; k++) {
        if (!overworldChests[k].isOpened)
            document.getElementById(k).className = 'mapspan chest ' + overworldChests[k].isAvailable();
    }
    for (k = 0; k < dungeons.length; k++) {
        document.getElementById('dungeon' + k).className = 'mapspan dungeon ' + dungeons[k].canGetChest();

        var DCcount = 0;
        for (var key in dungeons[k].chestlist) {
            if (dungeons[k].chestlist.hasOwnProperty(key)) {
                if (!dungeons[k].chestlist[key].isOpened && dungeons[k].chestlist[key].isAvailable()) {
                    DCcount++;
                }
            }
        }
        var child = document.getElementById('dungeon' + k).firstChild;
        while (child) {
            if (child.className == 'chestCount') {
                if (DCcount == 0) {
                    child.innerHTML = '';
                } else {
                    child.innerHTML = DCcount;
                    if (DCcount > 0) {
                        dungeonChest = dungeonChest + DCcount;
                    }
                }
                break;
            }
            child = child.nextSibling;
        }
    }
    if (dungeonChestOld < dungeonChest) {
        dungeonChest = dungeonChest - dungeonChestOld;
    }

    dungeonChestOld = dungeonChest;

    document.getElementById('submaparea').className = 'DC' + dungeons[dungeonSelect].isBeatable();
    var itemlist = document.getElementById('submaplist').children;
    for (var item in itemlist) {
        if (itemlist.hasOwnProperty(item)) {
            if (dungeons[dungeonSelect].chestlist[itemlist[item].innerHTML].isOpened) {
                itemlist[item].className = 'DCopened';
            } else if ( dungeons[dungeonSelect].chestlist[itemlist[item].innerHTML].isAvailable()) {
                itemlist[item].className = 'DCavailable';
            } else {
                itemlist[item].className = 'DCunavailable';
            }
        }
    }
}

function itemConfigClick (sender) {
    var item = sender.id;

    if (selected.item) {
        document.getElementById(selected.item).style.border = '0px';
        sender.style.border = '3px solid yellow';
        selected = {item: item};
    } else if (selected.row !== undefined) {
        itemGrid[selected.row][selected.col]['item'].style.border = '1px solid white';
        var old = itemLayout[selected.row][selected.col];

        if (old == item) {
            selected = {};
            return;
        }

        itemLayout[selected.row][selected.col] = item;
        updateGridItem(selected.row, selected.col);

        document.getElementById(old).style.opacity = 1;

        selected = {};
    } else {
        sender.style.border = '3px solid yellow';
        selected = {item: item}
    }
}

function populateMapdiv() {
    var mapdiv = document.getElementById('mapdiv');

    // Initialize all chests on the map
    for (k = 0; k < overworldChests.length; k++) {
        var s = document.createElement('span');
        s.style.backgroundImage = 'url(images/poi.png)';
        s.style.color = 'black';
        s.id = k;
        s.onclick = new Function('toggleChest(' + k + ')');
        s.onmouseover = new Function('highlight(' + k + ')');
        s.onmouseout = new Function('unhighlight(' + k + ')');
        s.style.left = overworldChests[k].x;
        s.style.top = overworldChests[k].y;
        if (overworldChests[k].isOpened) {
            s.className = 'mapspan chest opened';
        } else {
            s.className = 'mapspan chest ' + overworldChests[k].isAvailable();

        }

        var ss = document.createElement('span');
        ss.className = 'tooltip';
        ss.innerHTML = overworldChests[k].name;
        s.appendChild(ss);

        mapdiv.appendChild(s);
    }

    // Dungeon bosses & chests
    for (k=0; k<dungeons.length; k++) {
        s = document.createElement('span');
        s.style.backgroundImage = 'url(images/poi.png)';
        s.id = 'dungeon' + k;

        s.onclick = new Function('clickDungeon(' + k + ')');
        s.onmouseover = new Function('highlightDungeon(' + k + ')');
        s.onmouseout = new Function('unhighlightDungeon(' + k + ')');
        s.style.left = dungeons[k].x;
        s.style.top = dungeons[k].y;
        s.className = 'mapspan dungeon ' + dungeons[k].canGetChest();

        var DCcount = 0;
        for (var key in dungeons[k].chestlist) {
            if (dungeons[k].chestlist.hasOwnProperty(key)) {
                if (!dungeons[k].chestlist[key].isOpened && dungeons[k].chestlist[key].isAvailable()) {
                    DCcount++;
                    dungeonChest++;
                }
            }
        }

        var ss = document.createElement('span');
        ss.className = 'chestCount';
        if (DCcount == 0) {
            ss.innerHTML = '';
        } else {
            ss.innerHTML = DCcount;
            dungeonChest = dungeonChest + DCcount;
        }
        if (dungeonChestOld < dungeonChest) {
            dungeonChest = dungeonChest - dungeonChestOld;
        }

        dungeonChestOld = dungeonChest;
        c = document.getElementsByClassName("mapspan chest available").length;
        opened = document.getElementsByClassName("mapspan chest opened").length;
        document.getElementById('checkCounter').innerHTML = "Checks: " + (dungeonChest + c) + " available, " + (totalChecks - opened - Dopened) + " Remaining";
        ss.style.color = 'black'
        s.style.textAlign = 'center';
        ss.display = 'inline-block';
        ss.style.lineHeight = '15px';
        s.appendChild(ss);

        var ss = document.createElement('span');
        ss.className = 'tooltipgray';
        ss.innerHTML = dungeons[k].name;
        s.appendChild(ss);

        mapdiv.appendChild(s);
        
    }

    document.getElementById('submaparea').innerHTML = dungeons[dungeonSelect].name;
    document.getElementById('submaparea').className = 'DC' + dungeons[dungeonSelect].isBeatable();
    document.getElementById('dungeon' + dungeonSelect).style.backgroundImage = 'url(images/highlighted.png)';
    for (var key in dungeons[dungeonSelect].chestlist) {
        var s = document.createElement('li');
        s.innerHTML = key

        if (dungeons[dungeonSelect].chestlist[key].isOpened) {
            s.className = 'DCopened';
        }
        else if ( dungeons[dungeonSelect].chestlist[key].isAvailable()) {
            s.className = 'DCavailable';
        }
        else {
            s.className = 'DCunavailable';
        }

        s.onclick = new Function('toggleDungeonChest(this,' + dungeonSelect + ',"' + key + '")');
        s.onmouseover = new Function('highlightDungeonChest(this)');
        s.onmouseout = new Function('unhighlightDungeonChest(this)');
        s.style.cursor = 'pointer';

        document.getElementById('submaplist').appendChild(s);
    }
}

function populateItemconfig() {
    var grid = document.getElementById('itemconfig');

    var i = 0;

    var row;

    for (var key in items) {
        if (i % 10 == 0) {
            row = document.createElement('tr');
            grid.appendChild(row);
        }
        i++;

        var rowitem = document.createElement('td');
        rowitem.className = 'corner';
        rowitem.id = key;
        rowitem.style.backgroundSize = '100% 100%';
        rowitem.onclick = new Function('itemConfigClick(this)');
        if ((typeof items[key]) == 'boolean') {
            rowitem.style.backgroundImage = 'url(images/Items' + key + '.png)';
        } else {
            rowitem.style.backgroundImage = 'url(images/Items' + key + itemsMax[key] + '.png)';
        }
        row.appendChild(rowitem);
    }
}

//runs on site load
function init() {
    populateMapdiv();
    populateItemconfig();
    updateMap();
    c = document.getElementsByClassName("mapspan chest available").length;
    opened = document.getElementsByClassName("mapspan chest opened").length;
    document.getElementById('checkCounter').innerHTML = "Checks: " + (dungeonChest + c) + " available, " + (totalChecks - opened - Dopened) + " Remaining";
    loadCookie();
    saveCookie();
}

function preloader() {
    for (item in items) {
        if ((typeof items[item]) == 'boolean') {
            var img = new Image();
            if (TaloMap) {
                img.src = 'images/taloItems/' + item + '.png';
            }
            else {
                img.src = 'images/Items/' + item + '.png';
            }

        } else {
            for (i = itemsMin[item]; i < itemsMax[item]; i++) {
                var img = new Image();
                if (TaloMap) {
                    img.src = 'images/taloItems/' + item + '.png';
                }
                else {
                    img.src = 'images/Items/' + item + '.png';
                }
            }
        }
    }

    for (dungReward in dungeonImg) {
        var img = new Image();
        img.src = 'images/' + dungeonImg[dungReward] + '.png';
    }
}
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
addLoadEvent(preloader);
// Created by Lunar Soap, TreZc0_, TestRunner