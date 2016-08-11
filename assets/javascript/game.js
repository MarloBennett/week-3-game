// Sets the computer choices 
var wordBank = ["doberman", "labrador", "beagle", "bulldog", "akita", "husky", "pomeranian", "yorkie", "mastiff", "pug", "malamute", "collie", "bloodhound", "boxer", "sheepdog", "dalmation", "greyhound"];

var possibleGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var wins = 0;

var lettersGuessed = "";

var currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];

var guessesRemaining = currentWord.length + 7;

// When the user presses the key it records the keypress and then sets it to userguess
document.onkeyup = function(event) {
	var currentLetterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

	
	for (c = 0; c < possibleGuesses.length; c++) {
		var possibleChoice = possibleGuesses[c]; 

		//iterates over array of possible choices (letters only); adds to lettersGuessed if so
		if (currentLetterGuessed.indexOf(possibleChoice) > -1) {
			lettersGuessed = lettersGuessed + currentLetterGuessed;
		}
		//if not a letter, doesn't add to lettersGuessed
		else {
			lettersGuessed = lettersGuessed;
		}
	}

	for (d = 0; d < lettersGuessed.length; d++) {	
		var alreadySelected = lettersGuessed[d]; 

		//iterates over array of lettersGuessed; adds to lettersGuessed if not already chose
		if (currentLetterGuessed.indexOf(alreadySelected) < 0) {
			lettersGuessed = lettersGuessed + currentLetterGuessed;
		}
		//if already selected, doesn't add to lettersGuessed
		else {
			lettersGuessed = lettersGuessed;
		}
	}

	console.log(currentWord);

	var hangmanWord = getHangmanWord(lettersGuessed);	

		//Taking the tallies and displaying them in HTML
	var html = 
		"<p>Press any letter key to start playing.</p>" +
		"<p>Letters guessed: " + lettersGuessed + "</p>" +
		"<p>Hangman word: " + hangmanWord + "</p>" +
		"<p>Guesses remaining: " + guessesRemaining + "</p>"; 

	if (lettersGuessed.length > currentWord.length + 6) {
		html = html + "The man is hanged! You lose.";
		setTimeout(function() {location.reload(false)}, 3000);
	}
	else if (hangmanWord.indexOf("_") < 0) {
		wins++;
		html = html + "<p>You win!</p>" +
		"<p>Wins: " + wins + "</p>";
		setTimeout(function() {location.reload(false)}, 3000);
	} 
	console.log("wins:" + wins);
	
	// Placing the html into the game ID
	document.querySelector("#game").innerHTML = html;




function getHangmanWord(lettersGuessed) {
	
	var hangmanWord = "";

	// Iterate over all the letters in the current word
	for (i = 0; i < currentWord.length; i++) {
		var currentWordLetter = currentWord[i];

		// If the current word letter is in the string of letters guessed
		if (lettersGuessed.indexOf(currentWordLetter) > -1 ) {
			hangmanWord = hangmanWord + currentWordLetter;
		}
		// else the letter hasn't been guessed so add a dash
		else {
			hangmanWord = hangmanWord + "_ ";
		}
	}
	guessesRemaining--;
	
	return hangmanWord;
}
}