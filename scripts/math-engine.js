
/////////////////////    GENERATE THE SUM     /////////////////////////

// randomly generate the first and second numbers
var ranNum1 = Math.floor(Math.random()*12);
var ranNum2 = Math.floor(Math.random()*12);

var opSymbols = ["+", "-", "x"]; //removed divide (/) for now
var operator = Math.floor(Math.random()*(opSymbols.length)); // randomly choose one of the operators
var currentSymbol = opSymbols[operator];


// check if the first number is bigger than the second, if so flip them
function firstBigCheck() {
	if (ranNum1 < ranNum2) {
		ranNum2 = [ranNum1, ranNum1 = ranNum2][0]; // switch values
	} else {
		// keep them as they are
	};
};

/////////////////////////////////////////////////////////////////////////////////        

//Check what the operator was and convert it to a computer executable sum
function mathCheck() {
	if (currentSymbol === "+")  {
		var sum = ranNum1 + ranNum2;
	} else if (currentSymbol === "-") {
		var sum = ranNum1 - ranNum2;
	} else if (currentSymbol === "x") {
		var sum = ranNum1 * ranNum2;
	} else { // here for later when we have divide
		 var sum = (ranNum1 / ranNum2).toFixed(1);
	} ;

	var userAnswer = parseFloat(document.answerChecker.answer.value);
			
	if (userAnswer === sum) {		
	  // and
		if (currentSymbol === "+") {
			addCoins(5);
			removeMobHP(5);
		} else if (currentSymbol === "-") {
			addCoins(5);
            removeMobHP(5);
		} else if (currentSymbol === "x") {
			addCoins(10);
            removeMobHP(10);
		} else { // it must be divide so...
			addCoins(10);
            removeMobHP(10);
		};
		
	} else if (userAnswer !== sum) {
		// and
		if (currentSymbol === "+") {
			removeCoins(5);
			removeHeroHP(5);
		} else if (currentSymbol === "-") {
			removeCoins(5);
			removeHeroHP(5);
		} else if (currentSymbol === "x") {
			removeCoins(10);
			removeHeroHP(10);
		} else { // it must be divide so...
			removeCoins(10);
			removeHeroHP(10);
		};
	}; 

}; //end mathCheck()