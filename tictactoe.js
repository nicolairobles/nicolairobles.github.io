"use strict";

// $(document).ready(function () {
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
// Switch Players Function
	var switchPlayer = function(){
		console.log("switched player");
		if(player === 1){
			player = 0; 
		} else {
			player = 1;
		}
	};
// Make mark in specified div
	var makeMark = function(location){
		console.log("made mark")
		if (player === 1){
			$(location).text("X");
		} else  {
			$(location).text("O");
		}	
	}
// Check Location Function
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
// Check if there's a winner function
	var horizontalPts;
	var verticalPts;
	var diagonalPts;

	var checkIfHorizontalWinner = function(){
		for (var i = 0; i < 3; i++ ){
			if(gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2] && gameBoard[i][2] != null){
				console.log("winner in row " + (i+1));
			}
		}
	}
	var checkIfVerticalWinner = function(){
		for (var i = 0; i < 3; i++ ){
			if(gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i] && gameBoard[1][i] != null){
				console.log("winner in column " + (i+1));
			}
		}
	}
	var checkIfDiagonalWinner = function(){
		if (gameBoard[2][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[0][2] && gameBoard[0][2] != null){
				console.log("winner diagonally");			
		} else if( gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[2][2] != null){
				console.log("winner diagonally");			
		}
	}


//Diagonal Almost
	// 	if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] != null){
	// 		console.log("almost diagonal winner")
	// 		diagonalPts = 2;
	// 		if(gameBoard[1][1] === gameBoard[2][2]){
	// 			diagonalPts = 3;
	// 			console.log("winner diagonally")
	// 		}
	// 	} else if(gameBoard[2][0] === gameBoard[1][1] && gameBoard[1][1] != null){
	// 		diagonalPts = 2;
	// 		if(gameBoard[1][1] === gameBoard[2][2]){
	// 			diagonalPts = 3;
	// 			console.log("winner diagonally")
	// 		}
	// 	}
	// }

//Horizontal Almost
	// 	if(gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][1] != null){
	// 		horizontalPts = 2;
	// 		if(gameBoard[0][1] === gameBoard[0][2]){
	// 			horizontalPts = 3;
	// 			console.log("winner in row 1")
	// 		}
	// 	} else if(gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][1] != null){
	// 		horizontalPts = 2;
	// 		if(gameBoard[1][1] === gameBoard[1][2]){
	// 			horizontalPts = 3;
	// 			console.log("winner in row 2")
	// 		}
	// 	} else if (gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][1] != null){
	// 		horizontalPts = 2;
	// 		if(gameBoard[2][1] === gameBoard[2][2]){
	// 			horizontalPts = 3;
	// 			console.log("winner in row 3")
	// 		}
	// 	}
	// }

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

	var checkIfAlmostHorizontalWinner = function(){
		for (var i = 0; i < 3; i++ ){
			//Check first two first
			if(gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] != null){
				var blockPosition = $("."+i);
				makeMark(blockPosition);
				console.log("block position:["+i+"][2]")
				//Check corners first
			} else if (gameBoard[i][0] === gameBoard[i][2] && gameBoard[i][2] != null){
				var blockPosition = box2A;
				makeMark(blockPosition);
				console.log("block position:["+i+"][2]")
				//Check last two first
			} else if (gameBoard[i][1] === gameBoard[i][2] && gameBoard[i][2] != null){
				var blockPosition = box1A;
				makeMark(blockPosition);
				console.log("block position:["+i+"][2]")
			}
		}
	}

	var checkIfAlmostDiagonalWinner = function(){
		for (var i = 0; i < 3; i++ ){
			//Check first two first
			if(gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] != null){
				var blockPosition = box1C;
				makeMark(blockPosition);
				console.log("block position:["+i+"][2]")
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

	// 	 else if(gameBoard[0][1] === gameBoard[1][1] && gameBoard[1][1] != null){
	// 		verticalPts = 2;
	// 		if(gameBoard[1][1] === gameBoard[2][1]){
	// 			verticalPts = 3;
	// 			console.log("winner in column 2")
	// 		}
	// 	} else if (gameBoard[0][2] === gameBoard[1][2] && gameBoard[1][2] != null){
	// 		console.log("almost winner in column 3")
	// 		verticalPts = 2;
	// 		if (gameBoard[1][2] === gameBoard[2][2]){
	// 			verticalPts = 3;
	// 			console.log("winner in column 3")
	// 		}
	// 	}
	// }


	// Refactor checkIFWinnerIn3LetterArray(game[1])
	// State who won!
    // If Horizontal, given an array, check if xx_, x_x, or _xx
    //     If array[0] === x && array[1]
    //         winner approaching from left in row 1
    //     if array[0] ===x && array[2]
    //         winner approaching from corners in row 1
    // If Vertical, given a nested array game, create a new array of column
    //     tempColumn.push(array[0][0])
    //     tempColumn.push(array[1][0])
    //     tempColumn.push(array[2][0])





	var checkIfWinner = function(){
		checkIfVerticalWinner();
		checkIfHorizontalWinner();
		checkIfDiagonalWinner();
		checkIfAlmostVerticalWinner();
		checkIfAlmostHorizontalWinner();
	}

// Event listeners 
	var addEventListeners = function(){
		// Event listener for clicking on any box
		box.on("click", function(){
			makeMark(this);
			checkLocation(this);
			checkIfWinner();
			switchPlayer();
		})
		// Event listener for "Play Computer" button
		// Event listener for "Two-Player" game button
	};	

// Loads event listeners once page is loaded on browser
	$(document).ready(function(){
		addEventListeners();
	});

// });