"use strict";

// $(document).ready(function () {

//Introduction Sequence
	var timerIdStart;
	var game_start = new Audio("/audio/start-round.mp3");
	game_start.loop = true;
//2 Player Game
	$(".two-player-game").on("click", function(){
		$(".opening img").hide();
		$(".button").hide();
		$(".opening").hide( "puff", 250 );
		game_start.play();
		$("#game_screen, #body-container, .box, .timer").css("display", "inline-block");
		timerIdStart = setInterval(countDown, 500);
	});
//Computer-Human Game
	var computerGame;
	$(".play-computer").on("click", function(){
		computerGame = true;
		$(".opening img").hide();
		$(".button").hide();
		$(".opening").hide( "puff", 250 );
		game_start.play();
		$("#game_screen, #body-container, .box, .timer").css("display", "inline-block");
		timerIdStart = setInterval(countDown, 500);
		console.log("computer move")
	});
//Set up variables
	/* Tic Tac Toe Board Structure
		  1 a  |  1 b |  1 c  
	      2 a  |  2 b |  2 c  
		  3 a  |  3 b |  3 c   */
// All boxes
	var box = $(".box");
		var box1A = $(".one.a");
		var box1B = $(".one.b");
		var box1C = $(".one.c");
		var box2A = $(".two.a");
		var box2B = $(".two.b");
		var box2C = $(".two.c");
		var box3A = $(".three.a");
		var box3B = $(".three.b");
		var box3C = $(".three.c");
// Board 
	var gameBoard = 
		[[null, null, null],
		 [null, null, null],
		 [null, null, null]];
// Players
	var player = "x"; // Game starts with Player X
	var winner;
	var oAlmostWin;
	var xAlmostWin;
	var winnerChosen;

//Timer Implementation
	var timer = $(".timer")
	var seconds = 5
	var countDown = function(){
	  	if(seconds === 0){
	  		clearInterval(timerIdStart)
	  		clearInterval(timerIdClick);
	  		if(marks === 0){
	  			timer.text("time up o wins");
	  			timer.effect("pulsate", {distance:1, times:2}, 250);
				newGame();
	  		} else {
		  		timer.text("time up " + player + " wins");
				timer.effect("pulsate", {distance:1, times:2}, 250);
				newGame();
	  		}
	  	} else if (seconds >= 0){
		  	seconds--;
		  	timer.text(seconds);
 	 	}
  	} 
// 2-PLAYER GAME
// Switch Players Function
	var switchPlayer = function(){
		console.log("switched player");
		if(player === "x"){
			player = "o"; 
		} else {
			player = "x";
		}
	};
// Make mark in clicked box
	var marks = 0;
	var makeMark = function(location){
		// console.log("made mark")
		// if( $(location).text() === "x" || $(location).text() === "o" ){
		// 	$(location).effect("shake", {distance:1, times:2}, 250);
		// 	switchPlayer();
		// } else if (winnerChosen === true){
		// } else {
		if (player === "x") {
			$(location).addClass("x");
			$(location).text("x");
			marks++;
			checkIfTied();
		} else {
			$(location).addClass("o");
			$(location).text("o");
			marks++;
			checkIfTied();
		}
	}
// Update array so CheckIfWinner functions can function
	var checkLocation = function(location){
		var currentRowIndex;
		var currentColIndex;
		// Get current row and store it
		if ($(location).hasClass("one")){
			currentRowIndex = 0;
		} else if ($(location).hasClass("two")){
			currentRowIndex = 1;
		} else if ($(location).hasClass("three")){
			currentRowIndex = 2;
		} 
		// Get current column and store it
		if ($(location).hasClass("a")){
			currentColIndex = 0;
		} else if ($(location).hasClass("b")){
			currentColIndex = 1;
		} else if ($(location).hasClass("c")){
			currentColIndex = 2;		
		}
		// Update game board with correct symbol
		gameBoard[currentRowIndex][currentColIndex] = $(location).text();
		console.log("location noted in gameboard array")
	}
// Check each row to see if there are three xs or three os in a row
	var checkIfHorizontalWinner = function(){
		for (var i = 0; i < 3; i++ ){
			if(gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2] && gameBoard[i][2] != null){
				console.log("winner in row " + (i+1));
				winner = gameBoard[i][0];
				console.log(winner + " won");
				winnerChosen = true;
				winnerCelebration();
			}
		}
	}
// Check each column to see if there are three xs or three os in a column
	var checkIfVerticalWinner = function(){
		for (var i = 0; i < 3; i++ ){
			if(gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i] && gameBoard[1][i] != null){
				console.log("winner in column " + (i+1));
				winner = gameBoard[0][i];
				console.log(winner + " won");
				winnerChosen = true;
				winnerCelebration();
			}
		}
	}
// Check each diagonal to see if there are three xs or three os in a diagonal
	var checkIfDiagonalWinner = function(){
		if (gameBoard[2][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[0][2] && gameBoard[0][2] != null){
				console.log("winner diagonally");		
				winner = gameBoard[2][0];
				console.log(winner + " won");	
				winnerChosen = true;
				winnerCelebration();
		} else if( gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[2][2] != null){
				console.log("winner diagonally");	
				winner = gameBoard[0][0];
				console.log(winner + " won");
				winnerChosen = true;
				winnerCelebration();			
		}
	}
// Check if a winner was found, if so, restart game
	var checkIfWinner = function(){
		checkIfVerticalWinner();
		checkIfHorizontalWinner();
		checkIfDiagonalWinner();
		if(winnerChosen===true){newGame();}
	}
// Celebrate winner: (1) state winner and (2) make marks shake
	var winnerCelebration = function(){
		$(".timer").text(winner + " wins")
		clearInterval(timerIdClick)
		setTimeout(function(){
			box.effect("shake", {distance:1, times:2}, 250);
		}, 250)
		console.log("beat");
	}
// Check if the gameboard is full and no winner was declared
	var checkIfTied = function(){
		if(marks === 9){
			clearInterval(timerIdClick)
			$(".timer").text("tie")
			box.effect("shake", {distance:1, times:2}, 250);
			newGame();
		}
	}	
// Restart the game
	var newGame = function(){
		setTimeout(function(){
			location.reload();
		}, 1750)
	}
// PLAY THE COMPUTER GAME
// Function the computer uses to make a move
	function makeMove(location){
		clearInterval(timerIdStart);
		clearInterval(timerIdClick);
		timer.effect("pulsate", {distance:1, times:2}, 250);
		seconds = 6;
		timerIdClick = setInterval(countDown, 500);
		makeMark(location);
		checkLocation(location);
		checkIfWinner();
		switchPlayer();
	}
	var blockPosition;
	var checkMate;
// Computer searches the gameboard to see if there are two xs or two os in a row
	var checkIfAlmostVerticalWinner = function(){
		//first column
		if(gameBoard[0][0] === gameBoard[1][0] && gameBoard[1][0] != null && gameBoard[2][0] === null && box3A.hasClass("o") === false){
			if(box1A.text() === "x"){ 
				blockPosition = box3A;
				xAlmostWin = true
			} else { 
				checkMate = box3A
				oAlmostWin = true
			}
		} if (gameBoard[0][0] === gameBoard[2][0] && gameBoard[2][0] != null && gameBoard[1][0] === null && box2A.hasClass("o") === false){
			if(box1A.text() === "x"){ 
				blockPosition = box2A;
				xAlmostWin = true
			} else { 
				checkMate = box2A
				oAlmostWin = true
			}
		} if (gameBoard[1][0] === gameBoard[2][0] && gameBoard[2][0] != null && gameBoard[0][0] === null && box1A.hasClass("o") === false){
			if(box2A.text() === "x"){ 
				blockPosition = box1A;
				xAlmostWin = true
			} else { 
				checkMate = box1A
				oAlmostWin = true
			}
		// Second column
		} if(gameBoard[0][1] === gameBoard[1][1] && gameBoard[1][1] != null && gameBoard[2][1] === null && box3B.hasClass("o") === false){
			if(box1B.text() === "x"){ 
				blockPosition = box3B;
				xAlmostWin = true
			} else { 
				checkMate = box3B
				oAlmostWin = true
			}
		} if (gameBoard[0][1] === gameBoard[2][1] && gameBoard[2][1] != null && gameBoard[1][1] === null && box2B.hasClass("o") === false){
			if(box1B.text() === "x"){ 
				blockPosition = box2B;
				xAlmostWin = true
			} else { 
				checkMate = box2B
				oAlmostWin = true
			}
		} if (gameBoard[1][1] === gameBoard[2][1] && gameBoard[2][1] != null && gameBoard[0][1] === null && box1B.hasClass("o") === false){
			if(box2B.text() === "x"){ 
				blockPosition = box1B;
				xAlmostWin = true
			} else { 
				checkMate = box1B
				oAlmostWin = true
			}
		//third column
		} if(gameBoard[0][2] === gameBoard[1][2] && gameBoard[1][2] != null && gameBoard[2][2] === null && box3C.hasClass("o") === false){
			if(box1C.text() === "x"){ 
				blockPosition = box3C;
				xAlmostWin = true
			} else { 
				checkMate = box3C
				oAlmostWin = true
			}
		} if (gameBoard[0][2] === gameBoard[2][2] && gameBoard[2][2] != null && gameBoard[1][2] === null && box2C.hasClass("o") === false){
			if(box1C.text() === "x"){ 
				blockPosition = box2C;
				xAlmostWin = true
			} else { 
				checkMate = box2C
				oAlmostWin = true
			}
		} if (gameBoard[1][2] === gameBoard[2][2] && gameBoard[2][2] != null && gameBoard[0][2] === null && box1C.hasClass("o") === false){
			if(box2C.text() === "x"){ 
				blockPosition = box1C;
				xAlmostWin = true
			} else { 
				checkMate = box1C
				oAlmostWin = true
			}
		}
	}
// Computer searches the gameboard to see if there are two xs or two os in a column
	var checkIfAlmostHorizontalWinner = function(){
		//first row
		if(gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][1] != null && gameBoard[0][2] === null && box1C.hasClass("o") === false){
			if(box1A.text() === "x"){ 
				blockPosition = box1C;
				xAlmostWin = true
			} else { 
				checkMate = box1C
				oAlmostWin = true
			}
		} if (gameBoard[0][0] === gameBoard[0][2] && gameBoard[0][2] != null && gameBoard[0][1] === null && box1B.hasClass("o") === false){
			if(box1A.text() === "x"){ 
				blockPosition = box1B;
				xAlmostWin = true
			} else { 
				checkMate = box1B
				oAlmostWin = true
			}
		} if (gameBoard[0][1] === gameBoard[0][2] && gameBoard[0][2] != null && gameBoard[0][0] === null && box1A.hasClass("o") === false){
			if(box1B.text() === "x"){ 
				blockPosition = box1A;
				xAlmostWin = true
			} else { 
				checkMate = box1A
				oAlmostWin = true
			}
		} 		//second row
		if(gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][1] != null && gameBoard[1][2] === null && box2C.hasClass("o") === false){
			if(box2A.text() === "x"){ 
				blockPosition = box2C;
				xAlmostWin = true
			} else { 
				checkMate = box2C
				oAlmostWin = true
			}
		} if (gameBoard[1][0] === gameBoard[1][2] && gameBoard[1][2] != null && gameBoard[1][1] === null && box2B.hasClass("o") === false){
			if(box2A.text() === "x"){ 
				blockPosition = box2B;
				xAlmostWin = true
			} else { 
				checkMate = box2B
				oAlmostWin = true
			}
		} if (gameBoard[1][1] === gameBoard[1][2] && gameBoard[1][2] != null && gameBoard[1][0] === null && box2A.hasClass("o") === false){
			if(box2B.text() === "x"){ 
				blockPosition = box2A;
				xAlmostWin = true
			} else { 
				checkMate = box2A
				oAlmostWin = true
			}
		} 		//third row
		if(gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][1] != null && gameBoard[2][2] === null && box3C.hasClass("o") === false){
			if(box3A.text() === "x"){ 
				blockPosition = box3C;
				xAlmostWin = true
			} else { 
				checkMate = box3C
				oAlmostWin = true
			}
		} if (gameBoard[2][0] === gameBoard[2][2] && gameBoard[2][2] != null && gameBoard[2][1] === null && box3B.hasClass("o") === false){
			if(box3A.text() === "x"){ 
				blockPosition = box3B;
				xAlmostWin = true
			} else { 
				checkMate = box3B
				oAlmostWin = true
			}
		} if (gameBoard[2][1] === gameBoard[2][2] && gameBoard[2][2] != null && gameBoard[2][0] === null && box3A.hasClass("o") === false){
			if(box3B.text() === "x"){ 
				blockPosition = box3A;
				xAlmostWin = true
			} else { 
				checkMate = box3A
				oAlmostWin = true
			}
		}
	}
// Computer searches the gameboard to see if there are two xs or two os in a diagonal
	var checkIfAlmostDiagonalWinner = function(){
		if(gameBoard[2][0] === gameBoard[1][1] && gameBoard[1][1] != null && gameBoard[0][2] === null && box1C.hasClass("o") === false){
			if(box3A.text() === "x"){ 
				blockPosition = box1C;
				xAlmostWin = true
			} else { 
				checkMate = box1C
				oAlmostWin = true
			}
		} if (gameBoard[2][0] === gameBoard[0][2] && gameBoard[0][2] != null && gameBoard[1][1] === null && box2B.hasClass("o") === false){
			if(box3A.text() === "x"){ 
				blockPosition = box2B
				xAlmostWin = true
			} else { 
				checkMate = box2B
				oAlmostWin = true
			}
		} if (gameBoard[1][1] === gameBoard[0][2] && gameBoard[0][2] != null & gameBoard[2][0] === null && box3A.hasClass("o") === false){
			if(box2B.text() === "x"){ 
				blockPosition = box3A;
				xAlmostWin = true
			} else { 
				checkMate = box3A
				oAlmostWin = true
			}
		} if(gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] != null && gameBoard[2][2] === null && box3C.hasClass("o") === false){
			if(box1A.text() === "x"){ 
				blockPosition = box3C;
				xAlmostWin = true
			} else { 
				checkMate = box3C
				oAlmostWin = true
			}
		} if (gameBoard[0][0] === gameBoard[2][2] && gameBoard[2][2] != null && gameBoard[1][1] === null && box2B.hasClass("o") === false){
			if(box1A.text() === "x"){ 
				blockPosition = box2B;
				xAlmostWin = true
			} else { 
				checkMate = box2B
				oAlmostWin = true
			}
		} if (gameBoard[1][1] === gameBoard[2][2] && gameBoard[2][2] != null & gameBoard[0][0] === null && box1A.hasClass("o") === false){
			if(box2B.text() === "x"){ 
				blockPosition = box1A;
				xAlmostWin = true
			} else { 
				checkMate = box1A
				oAlmostWin = true
			}
		}
	}
// Check if there's almost a winner
	var checkIfAlmostWinner = function(){
		checkIfAlmostDiagonalWinner();
		checkIfAlmostHorizontalWinner();
		checkIfAlmostVerticalWinner();
	}
// Calculate the computer's move depending on the progress in the game
	var computerMove = function(){
		console.log("computer move")
		// After x has made its initial move, the computer should occupy box2B or go to a corner
		if(marks === 1){
			if(box2B.hasClass("x") != true && box2B.hasClass("o") != true){
				makeMove(box2B);
			} else if (box1A.hasClass("x") != true && box1A.hasClass("o") != true ){
				makeMove(box1A);
			} else if (box1C.hasClass("x") != true && box1C.hasClass("o") != true){
				makeMove(box1C);
			} else if (box3A.hasClass("x") != true && box3A.hasClass("o") != true){
				makeMove(box3A);
			} else if (box3C.hasClass("x") != true && box3C.hasClass("o") != true){
				makeMove(box3C);
			}
		// If x has gone twice and the computer has gone once, the computer should check if x is about to win
		} else if (marks === 3){
			checkIfAlmostWinner();
			if(blockPosition === undefined){
				if (box1A.hasClass("x") != true && box1A.hasClass("o") != true){
					makeMove(box1A);
				} else if (box1C.hasClass("x") != true && box1C.hasClass("o") != true){
					makeMove(box1C);
				} else if (box3A.hasClass("x") != true && box3A.hasClass("o") != true){
					makeMove(box3A);
				} else if (box3C.hasClass("x") != true && box3C.hasClass("o") != true){
					makeMove(box3C);
				}
			} else if (blockPosition.hasClass("x") != true && blockPosition.hasClass("o") != true){
				makeMove(blockPosition);
				console.log("executed defense")
			} else{
				if(box2B.hasClass("x") != true && box2B.hasClass("o") != true){
					makeMove(box2B);
				} else if (box1A.hasClass("x") != true && box1A.hasClass("o") != true ){
					makeMove(box1A);
				} else if (box1C.hasClass("x") != true && box1C.hasClass("o") != true){
					makeMove(box1C);
				} else if (box3A.hasClass("x") != true && box3A.hasClass("o") != true){
					makeMove(box3A);
				} else if (box3C.hasClass("x") != true && box3C.hasClass("o") != true){
					makeMove(box3C);
				}
			}
		// If x has gone three times and the computer twice, the computer should first check if it could be an almost winner
		// If not, then it should continue blocking
		} else if (marks >= 5){
			checkIfAlmostWinner();
			if (oAlmostWin === true){
				if(checkMate.hasClass("x") != true && checkMate.hasClass("o") != true){
				makeMove(checkMate);
				console.log("executed offense");
				}
			} else if(blockPosition === undefined){
				//Go to remaining corners
				if (box1A.hasClass("x") != true && box1A.hasClass("o") != true){
					makeMove(box1A);
				} else if (box1C.hasClass("x") != true && box1C.hasClass("o") != true){
					makeMove(box1C);
				} else if (box3A.hasClass("x") != true && box3A.hasClass("o") != true){
					makeMove(box3A);
				} else if (box3C.hasClass("x") != true && box3C.hasClass("o") != true){
					makeMove(box3C);
				//Go to remaining boxes
				} else if (box1B.hasClass("x") != true && box1B.hasClass("o") != true){
					makeMove(box1B);
				} else if (box2C.hasClass("x") != true && box2C.hasClass("o") != true){
					makeMove(box2C);
				} else if (box3B.hasClass("x") != true && box3B.hasClass("o") != true){
					makeMove(box3B);
				} else if (box2A.hasClass("x") != true && box2A.hasClass("o") != true){
					makeMove(box2A);
				}
			} else if (blockPosition.hasClass("x") != true && blockPosition.hasClass("o") != true){
				makeMove(blockPosition);
				console.log("executed defense")
			}
		}
	}
// Event listeners 
	var timerIdClick;
	var addEventListeners = function(){
		// Event listener for clicking on any box
		box.on("click", function(){
			if( $(this).text() === "x" || $(this).text() === "o" ){
				$(this).effect("shake", {distance:1, times:2}, 250);
			} else if (winnerChosen === true){
				//do nothing
			} else {
				clearInterval(timerIdStart);
				clearInterval(timerIdClick);
				timer.effect("pulsate", {distance: 1, times: 2}, 250);
				seconds = 6;
				timerIdClick = setInterval(countDown, 500);
				makeMark(this);
				checkLocation(this);
				checkIfWinner();
				switchPlayer();
				// If a player if facing the computer, a computer Move will execute after a player makes their move
				if(computerGame === true & marks != 9){
					setTimeout(function(){
						computerMove();
						blockPosition = undefined;
						checkMate = undefined;
					}, 500)
				}
			}

		})
	};	
// Loads event listeners once page is loaded on browser
	$(document).ready(function(){
		addEventListeners();
	});
// });