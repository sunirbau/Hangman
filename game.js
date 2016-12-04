//GLOBAL VARIABLES....
//=============================================================================================================================================================
//ARRAY CONTAINING POSSIBLE CHOICES OF WORDS..
var choices = ["darthvader", "hansolo", "yoda", "princessleia", "lukeskywalker", "obiwankenobi", "chewbacca", "admiralackbar", "anakin", "lando", "jabba", "mazkanata", "admiralmotti", "finn","grumgarr"];
var wins = 0;
var sounds = {
 letter_right: {
     sound: new Howl({
         urls: ['./assets/sounds/right.mp3'],
     })
 },
 letter_wrong: {
     sound: new Howl({
         urls: ['./assets/sounds/wrong.mp3'],
     })
 }
};
var computer = "";
var displayWord ="";
var guessesLeft = 9;
var wrongGuess = [];

//INITIALIZE GAME..
startGame();

function startGame(){
	document.querySelector("#letter").value = "";
	guessesLeft = 9;
	document.querySelector("#guessesLeft").innerHTML = "Guesses Left: " + guessesLeft;
	wrongGuess = [];
	document.querySelector("#wrongGuess").innerHTML = "Wrong Guess: " + wrongGuess;

//THIS WILL GENERATE A RANDOM WORD..
 computer = choices[Math.floor(Math.random() * choices.length)];

//THIS WILL DISPLAY THE REQURIED NUMBER OF "_"..
displayWord = "_".repeat(computer.length);
document.querySelector("#letter").innerHTML = displayWord.split("").join(" ");
}

//TO START THE GAME BY PRESSING ANY KEY..
document.onkeyup = function(event) {
	document.querySelector("#start").className = "";//BY GIVING THE EMPTY CLASSNAME TO CLASS "START", THE HIDDEN ELEMENTS ARE SHOWN!

//CHECKING THE KEY ENTERED IS ALPHABET
if(event.keyCode >= 65 && event.keyCode <= 90) {
	searchLetter();
} else {
	document.querySelector("#message").innerHTML = "Enter only aphabets!";
}

//searchLetter FUNCTION IS CALLED EVERYTIME KEY IS PRESSED..
//=========================================================================================================================================================
function searchLetter() {
	var player = event.key;//document.querySelector("#letter").value;
	var array = computer.split(player);
	var occurence = array.length-1;
		document.querySelector("#message").innerHTML = "";

//FUNCTION TO GET AN INDEX..
//===================================================================================================================================================

var getIndices = function(string, character){
var indices = [];
	for (var i = 0; i < string.length; i++){
		if(string[i] === character){
		indices.push(i);
		}
	}
	return indices;
}

	//RE-ENTERED VALUES CONDITION..
	if(displayWord.indexOf(player) >= 0 || wrongGuess.indexOf(player) >= 0 ) {
		document.querySelector("#message").innerHTML = "ENTERED ALREADY!!Please enter another letter!!";
		return;
		}

	// RIGHT CONDITION..
	 if(occurence > 0 ){
		var indices = getIndices(computer, player);
		for(i = 0; i < indices.length; i++){
		displayWord = displayWord.substring(0, indices[i]) + player + displayWord.substring(indices[i] + 1)  ;
	}
	document.querySelector("#letter").innerHTML =  displayWord.split("").join(" ");
	sounds.letter_right.sound.play();

		//GAME WON CONDITION..
		if(displayWord === computer){
			document.querySelector("#message").innerHTML = "Congratulations!! YOU WON!!";
			wins++;
			document.querySelector("#win").innerHTML = "Wins: " + wins;
			startGame();
			return;
			}
		}

	//WRONG CONDITION..
	else {
		wrongGuess.push(player);
		document.querySelector("#wrongGuess").innerHTML = "Wrong Guess: " + wrongGuess;
		sounds.letter_wrong.sound.play();
		guessesLeft--;
		document.querySelector("#guessesLeft").innerHTML = "Guesses Left: " + guessesLeft;

		//GAME LOST CONDITION..
		if(guessesLeft === 0){
			document.querySelector("#message").innerHTML = "YOU LOST!" + " The word is:  " +  computer;
			startGame();
			return;
			}
		}

//EMPTIES THE INPUT FIELD..
document.querySelector("#letter").value = "";
}
}





