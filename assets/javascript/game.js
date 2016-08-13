// Sets the computer choices 
var wordBank = ["doberman", "labrador", "corgi", "beagle", "bulldog", "akita", "husky", "pomeranian", "yorkie", "mastiff", "pug", "malamute", "collie", "bloodhound", "boxer", "sheepdog", "dalmation", "greyhound"];

var wins = 0;

var lettersGuessed = "";

// Set to true if a game is over and should restart when key pressed
var restartGame = false;

var currentWord;

var guessesRemaining;

var msg = "";

// Init the first game when the page is loaded
initializeNewGame();

//Initializes a new game
function initializeNewGame() {

	restartGame = false;

	// Choose the word to be guessed
	currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];

	console.log(currentWord);

	// Set the number of guesses remaining
	guessesRemaining = currentWord.length + 7;

	// Clear the letters guessed
	lettersGuessed = "";	

	//resets message to nothing
	msg = "";

	updateGame();
}


// When the user presses the key it records the keypress and then sets it to userguess
document.onkeyup = function(event) {
	
	if (restartGame) {
		initializeNewGame();
		return;
	}

	var currentLetterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

	// If the key pressed is not a letter, tell them and don't add to letters chosen
	if (!(currentLetterGuessed.match(/[a-z]/i))) { 
		msg = "<p>Your choice is not a letter!</p>";
	} 
	// else, if the letter has already been chosen, tell them and dont't add to letters chosen
	else if (lettersGuessed.indexOf(currentLetterGuessed)>-1) {
		msg = "<p>You already tried that letter! Please choose a different letter.</p>";
	}
	// otherwise, the letter is a valid guess
	else {
		// Check if the letter is in the word. Tell them if not. Remove a guess if not.
		if(currentWord.indexOf(currentLetterGuessed)<0) {
			msg = "<p>Sorry! Your man is one part closer to being hanged.</p>";	
			guessesRemaining--;
		}
		else {
			msg = "<p>Good call!</p>";	
		}
		
		lettersGuessed = lettersGuessed + currentLetterGuessed;
	}

	updateGame();
	
}


function updateGame() {

	console.log("Upating game");

	var hangmanWord = getHangmanWord(lettersGuessed);	

		//replaces the html in the html file
	var html = 
		"<p>Letters guessed: " + lettersGuessed + "</p>" +
		"<p>Hangman word: " + hangmanWord + "</p>" +
		"<p>Guesses remaining: " + guessesRemaining + "</p>" +
		msg;

	// Check if the player won
	if (hangmanWord.indexOf("_") < 0) {
		wins++;
		html = html + "<p>You win! Press any key to start a new game.</p>" +
					"<p>Wins: " + wins;
		restartGame = true;
	} 
	// Check if the player lost
	else if (guessesRemaining < 1){
		html = html + "<p>Your man is hanged! Press any key to start a new game.</p>"
		restartGame = true;
	}
	// Otherwise, keep going
	else {
		html = html + "<p>Select a new letter to continue.</p>";
	}

	// Placing the html into the game ID
	document.querySelector("#game").innerHTML = html;
}


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
	
	return hangmanWord;
}