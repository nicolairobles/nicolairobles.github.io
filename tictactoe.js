"use strict";

// $(document).ready(function () {

//Introduction Sequence
	var timerIdStart;
	var game_start = new Audio("/audio/start-round.mp3");
//2 Player Game
	$(".two-player-game").on("click", function(){
		$(".opening img").hide();
		$(".button").hide();
		$(".opening").hide( "puff", 250 );
	  game_start.play();
	  timerIdStart = setInterval(countDown, 500);
	});
//Computer-Human Game
	$(".play-computer").on("click", function(){
		$(".opening img").hide();
		$(".button").hide();
		$(".opening").hide( "puff", 250 );
	  game_start.play();
	  timerIdStart = setInterval(countDown, 500);
	  console.log("computer move")
		if(marks === 1){
			if(box2B != "x"){
				makeMove(box2B);
			} else if (box1A != "x"){
				makeMove(box1A);
			} else if (box1C != "x"){
				makeMove(box1C);
			} else if (box3A != "x"){
				makeMove(box3A);
			} else if (box3C != "x"){
				makeMove(box3C);
			}
		} else if (marks > 2){
			checkIfAlmostWinner();
			makeMove(blockPosition);
		}
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
	var winnerChosen;

//Timer Implementation
	var timer = $(".timer")
	var seconds = 3
	var countDown = function(){
  	if(seconds === 0){
  		clearInterval(timerIdStart)
  		clearInterval(timerIdClick)
  		timer.text("time up. " + player + " wins");
			timer.effect("pulsate", {distance:1, times:2}, 250);
			newGame();
  	} else if (seconds >= 0){
	  	seconds--;
	  	timer.text(seconds);
 	 	}
  }
// HUMAN TO HUMAN GAME
// Switch Players Function
	var switchPlayer = function(){
		console.log("switched player");
		if(player === "x"){
			player = "o"; 
		} else {
			player = "x";
		}
	};
// Make mark in specified div
	var marks = 0;
	var makeMark = function(location){
		console.log("made mark")
		if( $(location).text() === "x" || $(location).text() === "o" ){
			$(location).effect("shake", {distance:1, times:2}, 250);
			switchPlayer();
		} else {
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
	var checkIfWinner = function(){
		checkIfVerticalWinner();
		checkIfHorizontalWinner();
		checkIfDiagonalWinner();
		if(winnerChosen===true){newGame();}
		// checkIfAlmostVerticalWinner();
		// checkIfAlmostHorizontalWinner();
	}
	var winnerCelebration = function(){
		$(".timer").text(winner + " wins")
		clearInterval(timerIdClick)
		setTimeout(function(){
			box.effect("shake", {distance:1, times:2}, 250);
		}, 250)
		console.log("beat");
	}
	var checkIfTied = function(){
		if(marks === 9){
			clearInterval(timerIdClick)
			$(".timer").text("tie")
			box.effect("shake", {distance:1, times:2}, 250);
			newGame();
		}
	}	
	var newGame = function(){
		// $("game_screen").hide("puff", 2000);
		setTimeout(function(){
			location.reload();
		}, 1250)
	}
// //COMPUTER-TO-HUMAN GAME
	function makeMove(location){
		clearInterval(timerIdStart);
		clearInterval(timerIdClick);
		timer.effect("pulsate", {distance:1, times:2}, 250);
		seconds = 4;
		timerIdClick = setInterval(countDown, 500);
		makeMark(location);
		checkLocation(location);
		checkIfWinner();
		switchPlayer();
	}
	var checkIfAlmostVerticalWinner = function(){
		for (var i = 0; i < 3; i++ ){
			//Check first two first
			if(gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] != null){
				var blockPosition = box3A;
				makeMark(blockPosition);
				console.log("block position: [2]["+i+"]")
				//Check corners first
			} else if (gameBoard[0][i] === gameBoard[2][i] && gameBoard[2][i] != null){
				var blockPosition = box2A;
				makeMark(blockPosition);
				console.log("block position: [1]["+i+"]")
				//Check last two first
			} else if (gameBoard[1][i] === gameBoard[2][i] && gameBoard[2][i] != null){
				var blockPosition = box1A;
				makeMark(blockPosition);
				console.log("block position: [0]["+i+"]")
			}
		}
	}

	// var checkIfAlmostHorizontalWinner = function(){
	// 	for (var i = 0; i < 3; i++ ){
	// 		//Check first two first
	// 		if(gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] != null){
	// 			var blockPosition = $("."+i);
	// 			makeMark(blockPosition);
	// 			console.log("block position:["+i+"][2]")
	// 			//Check corners first
	// 		} else if (gameBoard[i][0] === gameBoard[i][2] && gameBoard[i][2] != null){
	// 			var blockPosition = box2A;
	// 			makeMark(blockPosition);
	// 			console.log("block position:["+i+"][2]")
	// 			//Check last two first
	// 		} else if (gameBoard[i][1] === gameBoard[i][2] && gameBoard[i][2] != null){
	// 			var blockPosition = box1A;
	// 			makeMark(blockPosition);
	// 			console.log("block position:["+i+"][2]")
	// 		}
	// 	}
	// }
	// var checkIfAlmostDiagonalWinner = function(){
	// 	for (var i = 0; i < 3; i++ ){
	// 		//Check first two first
	// 		if(gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] != null){
	// 			var blockPosition = box1C;
	// 			makeMark(blockPosition);
	// 			console.log("block position:["+i+"][2]")
	// 			//Check corners first
	// 		} else if (gameBoard[0][i] === gameBoard[2][i] && gameBoard[2][i] != null){
	// 			var blockPosition = box2A;
	// 			makeMark(blockPosition);
	// 			console.log("block position: [1]["+i+"]")
	// 			//Check last two first
	// 		} else if (gameBoard[1][i] === gameBoard[2][i] && gameBoard[2][i] != null){
	// 			var blockPosition = box1A;
	// 			makeMark(blockPosition);
	// 			console.log("block position: [0]["+i+"]")
	// 		}
	// 	}
	// }
	var checkIfAlmostWinner = function(){
		checkIfAlmostDiagonalWinner();
		checkIfAlmostHorizontalWinner();
		checkIfAlmostHorizontalWinner();
	}
	var computerMove = function(){
		console.log("computer move")
		if(marks === 1){
			if(box2B != "x"){
				makeMove(box2B);
			} else if (box1A != "x"){
				makeMove(box1A);
			} else if (box1C != "x"){
				makeMove(box1C);
			} else if (box3A != "x"){
				makeMove(box3A);
			} else if (box3C != "x"){
				makeMove(box3C);
			}
		} else if (marks > 2){
			checkIfAlmostWinner();
			makeMove(blockPosition);
		}
	}
// Event listeners 
	var timerIdClick;
	var addEventListeners = function(){
		// Event listener for clicking on any box
		box.on("click", function(){
			clearInterval(timerIdStart);
			clearInterval(timerIdClick);
			timer.effect("pulsate", {distance:1, times:2}, 250);
			seconds = 4;
  		timerIdClick = setInterval(countDown, 500);
			makeMark(this);
			checkLocation(this);
			checkIfWinner();
			switchPlayer();
		})
	};	
// Loads event listeners once page is loaded on browser
	$(document).ready(function(){
		addEventListeners();
	});
// });