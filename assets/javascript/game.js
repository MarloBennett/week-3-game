// Sets the computer choices 
var wordBank = ["doberman","lab"];

// Declares the tallies to 0 
var wins = 0;
var losses = 0;
var ties = 0;

var lettersGuessed = "";
var currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];

console.log("Current word is: " +currentWord);

// When the user presses the key it records the keypress and then sets it to userguess
document.onkeyup = function(event) {
	var currentLetterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	lettersGuessed = lettersGuessed + currentLetterGuessed;
	console.log("Letters guessed: " + lettersGuessed);

	var hangmanWord = getHangmanWord(lettersGuessed);
	// Taking the tallies and displaying them in HTML
	var html = 
		"<p>Letters guessed: " + lettersGuessed+ "</p>" +
		"<p>Hangman word: " + hangmanWord + "</p>";

	if(hangmanWord.indexOf("-")<0){
		html = html + "<p>You win!!!</p>";

	}

	

	// Placing the html into the game ID
	document.querySelector('#game').innerHTML = html;

}

	

function getHangmanWord(lettersGuessed) {
	
	var hangmanWord = "";
	// Iterate over all the letters in the current word
	for(i=0; i<currentWord.length;i++) {
		var currentWordLetter = currentWord[i];

		// If the current word letter is in the string of letters guessed...
		if(	lettersGuessed.indexOf(currentWordLetter) >-1 ) {
			hangmanWord = hangmanWord + currentWordLetter;
		}
		// else the letter hasn't been guessed so add a dash
		else {
			hangmanWord = hangmanWord + "-";	
		}
	}

	return hangmanWord;

}