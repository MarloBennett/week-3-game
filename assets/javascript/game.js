// Sets the computer choices 
var wordBank = ["doberman", "labrador", "beagle", "bulldog", "akita", "husky", "pomeranian", "yorkie", "mastiff", "pug", "malamute", "collie", "bloodhound", "boxer", "sheepdog", "dalmation", "greyhound"];

var wins = 0;

var lettersGuessed = "";

var currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];


var guessesRemaining = currentWord.length + 6;

// When the user presses the key it records the keypress and then sets it to userguess
document.onkeyup = function(event) {
	var currentLetterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	lettersGuessed = lettersGuessed + currentLetterGuessed;

	console.log(currentWord);

	var hangmanWord = getHangmanWord(lettersGuessed);	

		//Taking the tallies and displaying them in HTML
	var html = 
		"<p>Press any letter key to start playing.</p>" +
		"<p>Letters guessed: " + lettersGuessed + "</p>" +
		"<p>Hangman word: " + hangmanWord + "</p>" +
		"<p>Guesses remaining: " + guessesRemaining + "</p>"; 

	if (lettersGuessed.length > currentWord.length + 7) {
		html = html + "The man is hanged! You lose.";
		setTimeout(function() {location.reload()}, 1000);
	}
	else if (hangmanWord.indexOf("_") < 0) {
		wins++;
		html = html + "<p>You win!</p>" +
		"<p>Wins: " + wins + "</p>";
		setTimeout(function() {location.reload()}, 1000);
	} 
	console.log("wins:" + wins);
	
	// Placing the html into the game ID
	document.querySelector("#game").innerHTML = html;




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
			hangmanWord = hangmanWord + "_";
			guessesRemaining --;
			console.log(guessesRemaining);
		}
	}
	
	return hangmanWord;
}
}