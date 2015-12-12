//Gustavo Ocasio
//Guessing Game Javascript File

$(document).ready(function(){
	//$(document).data("initialGameState", $("body").clone(true)); //Save initial game state in document
	/* **** Global Variables **** */
	var guessArray = [];
	var winningNumber = generateWinningNumber();
	
	/* **** Guessing Game Functions **** */
	
	// Generate the Winning Number

	function generateWinningNumber(){
		// Generate a random number between 1 and 100
		// and store it in the winningNumber variable
		return Math.floor((Math.random() * 100) + 1);
	}

	// Fetch the Players Guess

	function playersGuessSubmission(){
		var playersGuess = +$('#numberInput').val();
		$('#numberInput').val('Input # 1 - 100'); //Remove guess from DOM
		checkGuess(winningNumber, playersGuess);		
	}

	// Determine if the next guess should be a lower or higher number

	function lowerOrHigher(winNum, guess){
		if(guess > winNum) {
			return "Your guess is higher";
		} else {
			return "Your guess is lower";
		}
	}

	function guessMessage(winNum, guess){
		var message = "";
		var diff = Math.abs(winNum - guess);
		if (diff >= 10){
			message = ", and more than 10 digits away from the winning number.";
		}
		else {
			message = ", but within 10 digits away from the winning number.";
		}
		return lowerOrHigher(winNum, guess) + message;
	}

	// Check if the Player's Guess is the winning number 

	function checkGuess(winNum, guess){
		if (guessArray.length >= 5) {
			return $('.message').text('Game Over. Click "Play Again" to start a new game.');
		} else if(guess === 0 || isNaN(guess)) {
			return $('.message').text('No value entered. Please try again');
		} else if(guessArray.indexOf(guess) > -1) {
			return $('.message').text('Duplicate entry. Try Again');
		} else {
			guessArray.push(guess);
			var total = guessArray.length;
			var remaining = 5 - total;
			$('footer span').text(remaining);

			if(guess === winNum) {
				return $('.message').text('You Win!');
			} else {
				return $('.message').text(guessMessage(winNum, guess));
			}
		}
	}


	function provideHint(){
		var randomValue1 = generateWinningNumber();
		var randomValue2 = generateWinningNumber();
		var hintArray = [winningNumber, randomValue1, randomValue2];
		hintArray = hintArray.sort(); //Sort array such that winningNumber is not in the same spot every time
		
		var hintString = '';
		for (var i = 0; i < hintArray.length; i++) {
			hintString += hintArray[i];
			if (i !== hintArray.length - 1) {
				hintString += ", ";
			}
		}
		return $('section .hint').text("One of the following 3 numbers is the winning number: " + hintString);
	}

	// Allow the "Player" to Play Again

	function playAgain(){
		guessArray = [];
		winningNumber = generateWinningNumber();
		$('#numberInput').val('Input # 1 - 100');
		$('footer span').text(5);
		$('.message').text('');
		$('section .hint').text('');
	}


	/* **** Event Listeners/Handlers ****  */		
	$('#again').on('click', playAgain);
		
	$('#numberInput').on('click', function(){  //Disappear text from input box so we can type our number guess
		$(this).val('');
		//
	});

	$('#submit').on('click', playersGuessSubmission); //When submit button is clicked, we invoke the playersGuessSubmission function
	
	$('#numberInput').keypress(function(e) {
		if (e.which === 13) { 
			playersGuessSubmission();
		}
	});

	$('#hint').on('click', provideHint);
		
});
