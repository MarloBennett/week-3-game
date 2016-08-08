// Sets the computer choices 
var wordBank = ["doberman", "labrador", "beagle", "bulldog", "akita", "husky", "pomeranian", "yorkie", "mastiff", "pug", "malamute", "collie", "bloodhound", "boxer", "sheepdog", "dalmation", "greyhound"];

// Declares the tallies to 0 
var wins = 0;

var lettersGuessed = "";
var currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];

// When the user presses the key it records the keypress and then sets it to userguess
document.onkeyup = function(event) {
	var currentLetterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	lettersGuessed = lettersGuessed + currentLetterGuessed;

	console.log(currentWord);

	var hangmanWord = getHangmanWord(lettersGuessed);	

		//Taking the tallies and displaying them in HTML
	var html = 
		"<p>Press any letter key to start playing.</p>" +
		"<p>Letters guessed: " + lettersGuessed+ "</p>" +
		"<p>Hangman word: " + hangmanWord + "</p>" +
		"<p>wins: " + wins + "</p>";
	
	if (lettersGuessed.length > currentWord.length + 10) {
		html = html + "The man is hanged! You lose."
	}
	else if (hangmanWord.indexOf("-") < 0) {
		html = html + "<p>You win!!!</p>";
		wins++;
	} 
	console.log("wins:" + wins);
	
	// Placing the html into the game ID
	document.querySelector("#game").innerHTML = html;

}

	

function getHangmanWord(lettersGuessed) {
	
	var hangmanWord = "";

	// Iterate over all the letters in the current word
	for (i = 0; i < currentWord.length; i++) {
		var currentWordLetter = currentWord[i];

		// If the current word letter is in the string of letters guessed...
		if (lettersGuessed.indexOf(currentWordLetter) > -1 ) {
			hangmanWord = hangmanWord + currentWordLetter;
		}
		// else the letter hasn't been guessed so add a dash
		else {
			hangmanWord = hangmanWord + "-";	
		}
	}

	return hangmanWord;

}