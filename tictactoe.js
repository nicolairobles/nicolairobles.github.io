"use strict";

// $(document).ready(function () {
	// debugger;
// Set up variables
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
	var playerAlerts = $(".player_alerts"); //area on screen where alerts pop up
	var player;
	player = 1; // Game starts with Player X

// HUMAN TO HUMAN GAME
	var switchPlayer; //switch from one player to another
	var makeMark; //place current player's symbol in box
	var checkLocation; //check which box was selected
	var updateGameBoard; //update track of all marks
	var checkIfWinner; //check if there's now a winner
// Switch Players Function
	switchPlayer = function(){
		console.log("switched player");
		if(player === 1){
			player = 0; 
		} else {
			player = 1;
		}
	};
// Make mark in specified div
	makeMark = function(){
		console.log("made mark")
		if (player === 1){
			$(this).text("X");
		} else  {
			$(this).text("O");
		}	
	}
// Check Location Function
	var currentRowIndex;
	var currentColIndex;
	checkLocation = function(){
		// Get current row and store it
		if ($(this).hasClass("one")){
			currentRowIndex = 0;
			console.log("row 1")
		} else if ($(this).hasClass("two")){
			currentRowIndex = 1;
		} else if ($(this).hasClass("three")){
			currentRowIndex = 2;
		} 
		// Get current column and store it
		if ($(this).hasClass("a")){
			currentColIndex = 0;
			console.log("col a")
		} else if ($(this).hasClass("b")){
			currentColIndex = 1;
		} else if ($(this).hasClass("c")){
			currentColIndex = 2;		
		}
		// Update game board with correct symbol
		gameBoard[currentRowIndex][currentColIndex] = $(this).text();
	}

// Check if there's a winner function
	var checkIfVerticalWinner = function(){
			gameBoard.forEach(function(){
				
			})
		}
	var checkIfHorizontalWinner;
	var checkIfDiagonalWinner;
	checkIfWinner = function(){
		
	}



// Event listeners to switch players and paint X or O
	box.on("click", makeMark);
	box.on("click", switchPlayer);
	box.on("click", checkLocation);




// });