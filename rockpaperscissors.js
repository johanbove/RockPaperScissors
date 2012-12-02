
/**
 *  "Rock Paper Scissors" game in JavaScript
 *  ========================================
 * 
 *  Inspired by http://www.codecademy.com/courses/javascript-beginner-en-Bthev-mskY8
 *  This program is intended to run inside a browser window.
 * 
 *  version: 0.2
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

		player1Score = 0,
		player1Streak = 0,
		player1StreakHigh = 0,
		player2Score = 0,
		player2Streak = 0,
		player2StreakHigh = 0,
		nrGames = 1,
		tieGames = 0,

		// Default texts in US English
		txt = {
			"locale" : "en_US",
			"choices" : {
				"rock" : "rock",
				"paper" : "paper",
				"scissors" : "scissors"
			},
			"welcome" : "Welcome to Rock Paper Scissors!\nHit enter or click \"ok\" to start a new game.",
			"title" : "Game #{0}",
			"yourturn" : "Your turn!",
			"yourturnfieldhelp" : "Enter rock, paper or scissors...",
			"tiegames" : "Tiegames: {0}",
			"introductions" : {
				"invalidgame" : "Whoops! Please try to enter rock, paper or scissors this time...\n\nPlay again?",
				"tie" : "Wow, what are the odds of that!\n\nPlay again?",
				"p1" : "Congratulations winning that game!\nYou're on a roll!\n\nPlay again?",
				"p2" : "Sorry to see you lose! Best out of three?\n\nPlay again?"
			},
			"outcomes" : {
				"invalidgame" : "Invalid play! Try again!",
				"tie" : "It's a tie!",
				"p1" : ":) You WON this game!",
				"p2" : ":( You LOST this game!"
			},
			"player1" : {
				"played" : "You played: {0} ...",
				"point" : "Player: {0} point",
				"points" : "Player: {0} points",
				"streak" : "Player streak: {0}",
				"higheststreak" : "Highest streak: {0}"
			},
			"player2" : {
				"played" : "Computer played: {0} ...",
				"point" : "Computer: {0} point",
				"points" : "Computer: {0} points",
				"streak" : "Computer streak: {0}",
				"higheststreak" : "Highest streak: {0}"
			}
		},
		introduction = txt.welcome,

		/**
		 * Checks for "malicious" input!
		 */
		isValidChoice = function (choice) {
			var choices = txt.choices;
			return (choice === choices.rock || choice === choices.paper || choice === choices.scissors);
		},

		/**
		 * Main "engine" for the game.
		 */
		play = function (choice1, choice2) {

			var game,
				choices = txt.choices;

			nrGames += 1;

			if (!isValidChoice(choice1) || !isValidChoice(choice2)) {

				game = "invalidgame";

			} else if (choice1 === choice2) {

				tieGames += 1;

				game = "tie";

			} else if ((choice1 === choices.rock && choice2 === choices.scissors) || (choice1 === choices.scissors && choice2 === choices.paper) || (choice1 === choices.paper && choice2 === choices.rock)) {

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
		 * Outputs the scores for all players.
		 */
		outputScore = function (params) {

			var score = params.score || 0,
				player = params.player || null,
				streak = params.streak || 0,
				highstreak = params.highstreak || 0,
				output = "";

			// Taking care of plurality
			output += (score !== 1) ? player.points.replace("{0}", score) + "\n" : player.point.replace("{0}", score) + "\n";
			output += player.streak.replace("{0}", streak) + "\n";
			output += player.higheststreak.replace("{0}", highstreak) + "\n";

			return output;

		},

		/**
		 * Starts a new game.
		 */
		run = function () {

			var t_choices = txt.choices,
				t_introductions = txt.introductions,
				t_outcomes = txt.outcomes,
				t_player1 = txt.player1,
				t_player2 = txt.player2,
				t_title = txt.title.replace("{0}", nrGames) + "\n\n",
				// Rock Paper Scissors array
				posAnswers = [t_choices.rock.toString(), t_choices.paper.toString(), t_choices.scissors.toString()],
				// Human is Player1
				answerPlayer1 = w.prompt(t_title + txt.yourturn + "\n", txt.yourturnfieldhelp),
				// Computer is Player2
				answerPlayer2 = fisherYates(posAnswers)[0] || "error",
				// Introduction and outcomes are set here
				game = play(answerPlayer1, answerPlayer2),
				outcome = "",
				output = "",
				answers = "",
				footer = "",
				scores = "";

			// Outputs the game results
			introduction = t_introductions[game];
			outcome = t_outcomes[game];

			if (answerPlayer1 && answerPlayer2) {

				// Outputs what the players entered,
				answers += t_player1.played.replace("{0}", answerPlayer1.toUpperCase()) + "\n";
				answers += t_player2.played.replace("{0}", answerPlayer2.toUpperCase()) + "\n\n";

				// Player 1 score
				scores += outputScore({
					"score" : player1Score,
					"player" : t_player1,
					"streak" : player1Streak,
					"highstreak" : player1StreakHigh
				});

				scores += "\n";

				// Player 2 score
				scores += outputScore({
					"score" : player2Score,
					"player" : t_player2,
					"streak" : player2Streak,
					"highstreak" : player2StreakHigh
				});

				// Some stats...
				footer += "\n" + txt.tiegames.replace("{0}", tieGames) + "\n";

				// Brings it all together
				output += t_title + answers + outcome + "\n\n" + scores + footer;

				alert(output);

			}

		};

	/**
	 * The game loop...
	 */
	while (w.confirm(introduction)) {
		run();
	}

}(window));