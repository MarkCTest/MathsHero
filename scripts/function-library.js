
// REFACTOR
//
//	- Remove the hard codede reference to the images folder, so it can be moved if needed
//
//////////////////////////////////////////////////////////////////////////////////////////

// Make the form to enter the sum
function formMaker() {
	document.write("<form name='answerChecker' align='center'>");
	firstBigCheck(); // switch numbers if first is smaller than second
	document.write("<div class='sumtext'><b>" + ranNum1 + " " + currentSymbol + " " + ranNum2 + "</b> ?</div>");
	document.write("<div><p><input type='text' name='answer' autocomplete='off' autofocus></p>");
	document.write("<p><button name='submit' onclick='mathCheck()')>Check your answer</button></p></div>");
	document.write("</form>");
};

// Sets the PLAYER LEVEL and level indicator on the screen for the player
// REFACTOR : This is untenable with 10, 20, 30 levels : REFACTOR // 
function playerLevelChooser() {
	if (totalExp <= gameLevelControl[0].levelExperience) {
		localStorage.setItem("playerLevel", 1); // 0 to 200
		document.write("<img src='images/" + gameLevelControl[0].levelBanner + "'/>");
	} else if (totalExp > gameLevelControl[0].levelExperience && totalExp <= gameLevelControl[1].levelExperience) {
		localStorage.setItem("playerLevel", 2); //201 to 300
		document.write("<img src='images/" + gameLevelControl[1].levelBanner + "'/>");
	} else if (totalExp > gameLevelControl[1].levelExperience && totalExp <= gameLevelControl[2].levelExperience) {
		localStorage.setItem("playerLevel", 3); //301 to 400
		document.write("<img src='images/" + gameLevelControl[2].levelBanner + "'/>");
	} else if (totalExp > gameLevelControl[2].levelExperience && totalExp <= gameLevelControl[3].levelExperience)  {
		localStorage.setItem("playerLevel", 4); //401 to 500
		document.write("<img src='images/" + gameLevelControl[3].levelBanner + "'/>");
	} else { // the level is 5
		localStorage.setItem("playerLevel", 5);
		document.write("<img src='images/" + gameLevelControl[4].levelBanner + "'/>");
	};
};


 function mobCaller() {    
  // Create a leveled list of mobs, that match the player level
//###########################################################################
	var mobDetails = function (mobList) {
	    this.mobData = {};

	    this.mobDataArray = [];

	    this.addMob = function (mobObject) {

	        this.mobData[mobObject.mobName] = mobObject;

	        this.mobDataArray.push(mobObject);

	        return this.mobData[mobObject.mobName];
	    };

	    this.getAllMobs = function () { return this.mobDataArray; };

	    this.getMobsWhere = function (key, value, loose) {

	        var results = [];

	        for (var mob in this.mobData) {
	            if (this.mobData.hasOwnProperty(mob)) {

	                var target = this.mobData[mob];

	                if (target[key] === value) {
	                    results.push(target);
	                }
	                else if (loose === true) {
	                    // A "loose" search will validate if the search value
	                    // Is anywhere in the desired property. 
	                    // You could search for "mobName" and "rotting" and then
	                    // Get any mob whose name contains "rotting". 
	                    if (target[key]
	                        .toString()
	                        .toLowerCase()
	                        .indexOf(value.toString()
	                        .toLowerCase()) >= 0) {

	                        results.push(target);
	                    }
	                }
	            }
	        }

	        return results;
	    };

	    this.getRandomMob = function (key, value, loose) {
	        // If no key is given, pick any random mob. 
	        if (!key || !value) {
	            return this.mobDataArray.randomValue();
	        }

	        // If a key/value pair is present, filter first!
	        var mobPool = this.getMobsWhere(key, value, loose);

	        return mobPool.randomValue();
	    }

	    // Setup the object by default

	    if (Array.isArray(mobList)) {
	        var i = 0, len = mobList.length;
	        for (; i < len; i++) {
	            this.addMob(mobList[i]);
	        }
	    }
	};

	// Let's make getting random values from arrays easier.
	// This adds a method to the Array object itself!
	Array.prototype.randomValue = function () {
	    var MyLength = this.length;
	    var randomIndex = Math.floor(Math.random() * (MyLength));
	    return this[randomIndex];
	};
	
	// Mob details table
	var Mobs = new mobDetails([
		{ mobLevel: 1, mobName: 'Giant Rat', mobImage: 'mob-giant-rat-001', mobHP: 50 },
		{ mobLevel: 1, mobName: 'Skeleton Warrior', mobImage: 'mob-skeleton-warrior-001', mobHP: 50 },
		{ mobLevel: 1, mobName: 'Malicious Mold', mobImage: 'mob-malicious-mold-001', mobHP: 60 },
		{ mobLevel: 1, mobName: 'Dervish Thug', mobImage: 'mob-dervish-thug-001', mobHP: 60 },
		{ mobLevel: 1, mobName: 'Dark Bear', mobImage: 'mob-dark-bear-001', mobHP: 60 },
		{ mobLevel: 2, mobName: 'Troll Scout', mobImage: 'mob-troll-scout-001', mobHP: 70 },
		{ mobLevel: 2, mobName: 'Rotting Mummy', mobImage: 'mob-rotting-mummy-001', mobHP: 80 },
		{ mobLevel: 2, mobName: 'Skeleton Captain', mobImage: 'mob-skeleton-captain-001', mobHP: 80 },
		{ mobLevel: 3, mobName: 'Ettin Brute', mobImage: 'mob-ettin-brute-001', mobHP: 90 },
		{ mobLevel: 3, mobName: 'Kobold Runner', mobImage: 'mob-kobold-runner-001', mobHP: 100 },
		{ mobLevel: 4, mobName: 'Forest Beetle', mobImage: 'mob-forest-beetle-001', mobHP: 110 },
		{ mobLevel: 4, mobName: 'Tree Snake', mobImage: 'mob-tree-snake-001', mobHP: 120 },
		{ mobLevel: 5, mobName: 'Young Treant', mobImage: 'mob-young-treant-001', mobHP: 130 },	
		{ mobLevel: 5, mobName: 'Dragon Hatchling', mobImage: 'mob-dragon-hatchling-001', mobHP: 140 },
		{ mobLevel: 6, mobName: 'Dragon del Norte', mobImage: 'mob-dragon-del-norte-001', mobHP: 500 }
	]);	
	
	// Generate the leveled mob list from the full list of mobs in: scripts/set-up.js
	var leveledMobList = Mobs.getMobsWhere("mobLevel", parseInt(localStorage.getItem("playerLevel")));
 	
	// we could also choose 'getRandomMob' and 'getAllMobs'
	 
//###########################################################################
	 
	// The current mob appears dead (0 HP), call a new one
  if (localStorage.getItem("mobCurrentHP") <= "0") {
	
	  localStorage.setItem("theMobIndex", Math.floor(Math.random() * leveledMobList.length));
	  var theMobIndex = parseInt(localStorage.getItem("theMobIndex")); // this is just to create a short reference

	  localStorage.setItem("mobCurrentHP", leveledMobList[theMobIndex].mobHP); // set the Mob HP
	  
      document.write("<img src='images/" + leveledMobList[theMobIndex].mobImage + ".jpg' height='220' width='150' />");           
      document.write("<br/><b>Defeat the " + leveledMobList[theMobIndex].mobName + "!</b>");

      document.write("<p><b>HP</b>: <progress class='mobHp' value='" + localStorage.getItem("mobCurrentHP") + "' max='" + leveledMobList[theMobIndex].mobHP + "'></progress></br>");
      document.write("Mob HP: " + localStorage.getItem("mobCurrentHP") + ". Mob Max: " + leveledMobList[theMobIndex].mobHP + "</p>");

     // else if the mob is still alive, put it back on screen
    } else if (localStorage.getItem("mobCurrentHP") > "0") {

      var currentMobIndex = parseInt(localStorage.getItem("theMobIndex"));
         
      document.write("<img src='images/" + leveledMobList[currentMobIndex].mobImage + ".jpg' height='220' width='150' />");           
      document.write("<br/><b>Defeat the " + leveledMobList[currentMobIndex].mobName + "!</b>");
      
      document.write("<p><b>HP</b>: <progress class='mobHp' value='" + localStorage.getItem("mobCurrentHP") + "' max='" + leveledMobList[currentMobIndex].mobHP + "'></progress></br>");
      document.write("Mob HP: " + localStorage.getItem("mobCurrentHP") + ". Mob Max: " + leveledMobList[currentMobIndex].mobHP + "</p>"); 
    };
 };
       
/////////////////////////////////////////////////////////////////////////////////

// REMOVE the Mob's HP
function removeMobHP(mobLostHP) {
    var mobFightingHP = parseInt(localStorage.getItem("mobCurrentHP"));
    mobFightingHP = (mobFightingHP - mobLostHP);
    localStorage.setItem("mobCurrentHP", mobFightingHP);
	// localStorage.getItem(leveledMobList[theMobIndex].mobGotHit);
};  


// REMOVE the Hero's HP
function removeHeroHP(lostHP) {
	var currentHP = parseInt(localStorage.getItem("totalHP"));
	currentHP = (currentHP - lostHP);
	localStorage.setItem("totalHP", currentHP);
		if (currentHP === 0) {
				alert("YOU DIED!!    Game will be Reset");
			resetTheGame();
		};
};	

//////////////////////////////       add   AND   remove    COINS     /////////////////////////////

// ADD Coins where the player guessing right
function addCoins(amount) {  
	if (currentSymbol === "+")  {
		    var coins = parseInt(localStorage.getItem("copperCoins"));
		    coins = (coins + amount);
		    localStorage.setItem("copperCoins", coins); 
	} else if (currentSymbol === "-") {
		    var coins = parseInt(localStorage.getItem("silverCoins"));
		    coins = (coins + amount);
		    localStorage.setItem("silverCoins", coins); 
	} else if (currentSymbol === "x") {
		    var coins = parseInt(localStorage.getItem("goldCoins"));
		    coins = (coins + amount);
		    localStorage.setItem("goldCoins", coins); 
	} else { //currentSymbol === "/" Here for later use
		    var coins = parseInt(localStorage.getItem("platinumCoins"));
		    coins = (coins + amount);
		    localStorage.setItem("platinumCoins", coins); 
	};
};

// REMOVE coins if the player guesses wrong
function removeCoins(amount) {
	if (currentSymbol === "+" && localStorage.getItem("copperCoins") > 0) {
		var coins = parseInt(localStorage.getItem("copperCoins"));
		coins = (coins - amount);
		localStorage.setItem("copperCoins", coins);
	} else if (currentSymbol === "-" && localStorage.getItem("silverCoins") > 0) {
		var coins = parseInt(localStorage.getItem("silverCoins"));
		coins = (coins - amount);
		localStorage.setItem("silverCoins", coins);		
	} else if (currentSymbol === "x" && localStorage.getItem("goldCoins") > 0) {
		var coins = parseInt(localStorage.getItem("goldCoins"));
		coins = (coins - amount);
		localStorage.setItem("goldCoins", coins);
	} else {
		var coins = parseInt(localStorage.getItem("platinumCoins"));
		coins = (coins - amount);
		localStorage.setItem("platinumCoins", coins);		
	};
};

/////////////////////////////////////////////////////////////////////////////////

// Toggle the INVENTORY overlay on and off
function toggleOverlay() {
	var overlay = document.getElementById('overlay');
	var inventoryWindow = document.getElementById('inventoryWindow');
	overlay.style.opacity = .7;
	if(overlay.style.display == "block"){
		overlay.style.display = "none";
		inventoryWindow.style.display = "none";
	} else {
		overlay.style.display = "block";
		inventoryWindow.style.display = "block";
	}
};

// Add the inventory icons to the 'main.html' page (added 8th June)
function inventoryLink() {
	document.write("<div id='inventoryArea'><p><img src='images/icon-backpack.jpg' width='64' height='64' alt='Inventory' title='Inventory' name='Inventory' class='inventoryBackpack' onClick='toggleOverlay()'/></p></div>");
	document.write("<img src='images/icon-potion-answer.jpg' width='64' height='64' alt='Answer Potion' title='Answer Potion' name='Answer Potion' class='answerPotion'/>");
	//document.write("<p><img src='images/icon-potion-health.jpg' width='64' height='64' alt='Heal Potion' title='Heal Potion' name='Heal Potion'></p></div>");	
};

/////////////////////////////////////////////////////////////////////////////////


// RESET button to clear coins and start the game again
function resetTheGame() {
    for (var i = 0; i < coinTypes.length; i++) {
        localStorage.setItem(coinTypes[i]+"Coins", 0); // coins to 0 means EXP is set to 0 too
    };
	localStorage.setItem("totalHP", gameLevelControl[(localStorage.getItem("playerLevel"))-1].heroStartingHP);
	localStorage.setItem("mobCurrentHP", mobDetails[localStorage.getItem("theMobIndex")].mobHP);
};
	