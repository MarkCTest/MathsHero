// ~~~~~~~~  WORLD INVENTORY TABLES ~~~~~~~~~~~

// Game and character level information
var gameLevelControl = [
	{ gameLevel: 'lev1', levelBanner: 'level-1.jpg', levelBackground: 'level-bg-001.jpg', heroStartingHP: 100, levelExperience: 200 },
	{ gameLevel: 'lev2', levelBanner: 'level-2.jpg', levelBackground: 'level-bg-002.jpg', heroStartingHP: 125, levelExperience: 400 },
	{ gameLevel: 'lev3', levelBanner: 'level-3.jpg', levelBackground: 'level-bg-003.jpg', heroStartingHP: 150, levelExperience: 600 },
	{ gameLevel: 'lev4', levelBanner: 'level-4.jpg', levelBackground: 'level-bg-004.jpg', heroStartingHP: 175, levelExperience: 800 },
	{ gameLevel: 'lev5', levelBanner: 'level-5.jpg', levelBackground: 'level-bg-005.jpg', heroStartingHP: 200, levelExperience: 1000 }
];

//////////////////////////////////////////////////////////

// Library of Magical items
var potionList = [
	{ potItemLevel: 1, potName: 'Potion of Healing', potDesc: 'Heals the Player for 5 HP', potEffect: 5, potUses: 1 },
	{ potItemLevel: 1, potName: 'Potion of Insight', potDesc: 'Skip the Sum by magically answering it', potEffect: 5, potUses: 1 }
];

// Library of Equipment
var armourList = [
	{ id: 'arm1', armourName: 'Bronze Helmet', protection: 2 },
	{ id: 'arm2', armourName: 'Bronze Breastplate', protection: 2},
	{ id: 'arm3', armourName: 'Bronze Vambraces', protection: 2},
	{ id: 'arm4', armourName: 'Bronze Gauntlet', protection: 2},
	{ id: 'arm5', armourName: 'Bronze Greaves', protection: 2},	
	{ id: 'arm6', armourName: 'Bronze Boots', protection: 2}
];

// Library of Weapons
var weaponList = [
	{ id: 'wea1', weaponName: 'Bronze Axe', damage: 2},
	{ id: 'wea2', weaponName: 'Bronze Short Sword', damage: 2},
	{ id: 'wea3', weaponName: 'Bronze Long Sword', damage: 2},
	{ id: 'wea4', weaponName: 'Bronze Club', damage: 2},	
];

////////////////////////////////////////////////////////////

// TO DO: Define a playerInventory key-value array or JSON? to hold items

var playerEquipedItems = [];

var playerBackpack = [];


////////////////////////////////////////////////////////////

// Define the available coin types
var coinTypes = ["copper", "silver", "gold", "platinum"];

// Set the Coins to zero if a new player or to the previous score if played before
for (var i = 0; i < coinTypes.length; i++) {
	if (localStorage.getItem(coinTypes[i]+"Coins") === null) {
		localStorage.setItem(coinTypes[i]+"Coins", 0);
		};
};

//Calculate EXPERIENCE based on coins using these temp variables to pull the data in
var copperExp = parseInt(localStorage.getItem("copperCoins"));
var silverExp = parseInt(localStorage.getItem("silverCoins"));
var goldExp = parseInt(localStorage.getItem("goldCoins"));
var platinumExp = parseInt(localStorage.getItem("platinumCoins"));

var totalExp = (copperExp + silverExp + goldExp + platinumExp); // this variable is used in main.html to display EXP bar


// .................... 07-Jun : Moved to index.html as the song was playing incorrectly ...............
// Set the LEVEL to 1 if the player is new or to the previous value if played before
//if (localStorage.getItem("playerLevel") === null) {
//	localStorage.setItem("playerLevel", 1);
//};
//'.....................................................................................................

// Set the HP to be appropriate if the player is new or to the previous value if played before
if (localStorage.getItem("totalHP") === null) {
	localStorage.setItem("totalHP", gameLevelControl[(localStorage.getItem("playerLevel"))-1].heroStartingHP);
};

var currentHP = parseInt(localStorage.getItem("totalHP"));


// Set the mob HP to zero to force the selection of a new Mob by mobCaller()
if (localStorage.getItem("mobCurrentHP") === null) {
    localStorage.setItem("mobCurrentHP", 0);
};

// Attached to resetTheGame() this does NOT reset the MobIndex...  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
if (localStorage.getItem("theMobIndex") === null) {
    localStorage.setItem("theMobIndex", 0);
};

