
/**
 *  "Rock Paper Scissors" game in JavaScript
 *  ========================================
 * 
 *  Inspired by http://www.codecademy.com/courses/javascript-beginner-en-Bthev-mskY8
 *  This program is intended to run inside a browser window.
 * 
 */

(function (w) {

	"use strict";

	/**
	 * @see http://bost.ocks.org/mike/shuffle/
	 */
	var fisherYates = function (myArray) {

		var m = myArray.length, t, i;

		// While there remain elements to shuffle…
		while (m) {

			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = myArray[m];
			myArray[m] = myArray[i];
			myArray[i] = t;
		}

		return myArray;
	},

		introduction = "Welcome to Rock Paper Scissors!\nHit enter or click \"ok\" to start a new game.",
	
		player1Score = 0,
		player1Streak = 0,
		player1StreakHigh = 0,
		player2Score = 0,
		player2Streak = 0,
		player2StreakHigh = 0,
		nrGames = 1,
		tieGames = 0,

		/**
		 * Checks for "malicious" input!
		 */
		isValidChoice = function (choice) {
			return (choice === "rock" || choice === "paper" || choice === "scissors");
		},

		/**
		 * Main "engine" for the game.
		 */
		play = function (choice1, choice2) {

			var game;

			nrGames += 1;

			if (!isValidChoice(choice1) || !isValidChoice(choice2)) {

				game = "invalidgame";

			} else if (choice1 === choice2) {

				tieGames += 1;

				game = "tie";

			} else if ((choice1 === "rock" && choice2 === "scissors") || (choice1 === "scissors" && choice2 === "paper") || (choice1 === "paper" && choice2 === "rock")) {

				player1Score += 1;
				player1Streak += 1;

				if (player1Streak > player1StreakHigh) {
					player1StreakHigh = player1Streak;
				}

				player2Streak = 0;

				game = "p1";

			} else {

				player2Score += 1;
				player2Streak += 1;

				if (player2Streak > player2StreakHigh) {
					player2StreakHigh = player2Streak;
				}

				player1Streak = 0;

				game = "p2";

			}

			return game;

		},

		/**
		 * Starts a new game.
		 */
		run = function () {

			var answers = ["rock", "paper", "scissors"],
				title = "Game #" + nrGames + "\n\n",
				answerPlayer1 = w.prompt(title + "Your turn! (Enter rock, paper or scissors)"),
				answerPlayer2 = fisherYates(answers)[0] || "error",	// Computer is Player2
				game = play(answerPlayer1, answerPlayer2),
				outcome = "",
				result = "";

			switch (game) {
			case "invalidgame":
				outcome = "Invalid play! Try again!";
				introduction = "Whoops! Please try to enter rock, paper or scissors this time...\n\nPlay again?";
				break;
			case "tie":
				introduction = "Wow, what are the odds of that!\n\nPlay again?";
				outcome = "It's a tie!";
				break;
			case "p1":
				introduction = "Congratulations winning that game!\nYou're on a roll!\n\nPlay again?";
				outcome = "You WON! :)";
				break;
			case "p2":
				introduction = "Sorry to see you lose! Best out of three?\n\nPlay again?";
				outcome = "You LOST! :(";
				break;
			default:
				outcome = "No play...";
				break;
			}

			result += "You played: " + answerPlayer1.toUpperCase() + "... " + "\n" + "Computer played: " + answerPlayer2.toUpperCase() + "...\n\n";
			result += outcome + "\n\n";
			result += "Player: " + player1Score + " points. Streak: " + player1Streak + ". High Streak: " + player1StreakHigh + ".\n";
			result += "Computer: " + player2Score + " points. Streak: " + player2Streak + ". High Streak: " + player2StreakHigh + ".\n";
			result += "Tiegames: " + tieGames + "\n";

			alert(title + result);

		};

	/**
	 * The game loop...
	 */
	while (w.confirm(introduction)) {
		run();
	}

}(window));