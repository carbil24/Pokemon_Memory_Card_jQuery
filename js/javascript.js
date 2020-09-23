var nowTime = 0;
var allOpen = [];
var match = 0;
var seconds = 0;
var moves = 0;
var wait = 420;
var totalCard = 0
var finalScore = 0;
var openCard = "";
var userName = "";
var gameLevel = "";
var nextLevel = "";

// This is to define the Scoring system by moves.
var pokeball_5 = 10;
var pokeball_4 = 15;
var pokeball_3 = 20;
var pokeball_2 = 25;
var pokeball_1 = 30;

//This is to hide the section with the id: #game.
$('#game').hide();

//This function is to create the array with pokemons.
function loadPokemons(){
	var pokemons = new Array();

	pokemons[0] = new Image();
	pokemons[0].src = 'images/pikachu.png';
	pokemons[1] = new Image();
	pokemons[1].src = 'images/pikachu.png';
	pokemons[2] = new Image();
	pokemons[2].src = 'images/charmander.png';
	pokemons[3] = new Image();
	pokemons[3].src = 'images/charmander.png';
	pokemons[4] = new Image();
	pokemons[4].src = 'images/butterfree.png';
	pokemons[5] = new Image();
	pokemons[5].src = 'images/butterfree.png';
	pokemons[6] = new Image();
	pokemons[6].src = 'images/blastoise.png';
	pokemons[7] = new Image();
	pokemons[7].src = 'images/blastoise.png';
	pokemons[8] = new Image();
	pokemons[8].src = 'images/jigglypuff.png';
	pokemons[9] = new Image();
	pokemons[9].src = 'images/jigglypuff.png';
	pokemons[10] = new Image();
	pokemons[10].src = 'images/bulbasaur.png';
	pokemons[11] = new Image();
	pokemons[11].src = 'images/bulbasaur.png';	
	pokemons[12] = new Image();
	pokemons[12].src = 'images/eevee.png';
	pokemons[13] = new Image();
	pokemons[13].src = 'images/eevee.png';
	pokemons[14] = new Image();
	pokemons[14].src = 'images/squirtle.png';
	pokemons[15] = new Image();
	pokemons[15].src = 'images/squirtle.png';
	
	return pokemons;
}


// This function enables that no two games have the same card arrangement 
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//This function call the begin of the game.
function begin() {
	
	var pokemons = loadPokemons();
	
	userName = $('#user').val();
	$('.message').text('Go ' + userName + ' Go!!!');
	$('.moves').html('Moves: ' + moves);
	
	if (gameLevel == ""){
		gameLevel = $('.level').val();
	}
	else{
		gameLevel = nextLevel;
	}	

	//The array of pokemons change according of the level.
	if (userName != "" && gameLevel != null){
		$window = $(window);
        windowsize = $window.width();

		if (gameLevel == "easy") {
			pokemons = pokemons.slice(0,8);
			$('.container').css('margin-top', '50px')
			$('.deck').css('margin-top', '50px')
			if (windowsize > 600){
				$('.deck').css('height', '340px')
			}
			else if(windowsize > 339){
				$('.deck').css('height', '200px')
			}
			else{
				$('.deck').css('height', '160px')
			}
			$('#game').css('top', '10%')
			
		}
		else if(gameLevel == "medium"){
			pokemons = pokemons.slice(0,12);
			$('.container').css('margin-top', '25px')
			$('.deck').css('margin-top', '30px')
			if (windowsize > 600){
				$('.deck').css('height', '510px')
			}
			else if (windowsize > 339){
				$('.deck').css('height', '280px')
			}
			else{
				$('.deck').css('height', '250px')
			}
			$('#game').css('top', '7%')

		}
		else{
			pokemons = pokemons.slice(0,16);
			$('.container').css('margin-top', '0px')
			$('.deck').css('margin-top', '0px')
			$('.deck').css('height', '680px')
			if (windowsize > 600){
				$('.deck').css('height', '680px')
			}
			else if (windowsize > 339){
				$('.deck').css('height', '350px')
			}
			else{
				$('.deck').css('height', '300px')
			}
			$('#game').css('top', '0%')
		}
		

		// The game starts with no matching cards and zero moves 
		match = 0;
		moves = 0;
		totalCard = pokemons.length / 2;
		var allCards = shuffle(pokemons);

		$('#game_instructions').hide();
		$('#game').show();
		$('#pokeball_1').show();
		$('#pokeball_2').show();
		$('#pokeball_3').show();
		$('#pokeball_4').show();
		$('#pokeball_5').show();
		$('.deck').empty();
		
		// This resets the timer to 0 when the game is restarted.
		stopTimer(nowTime);
		initTime();
		seconds = 0;
		$('.time').text('Time: ' + seconds + ' s');

		// A for loop creates 16  <li> tags with the class of card for every <i> tag
		for (var i = 0; i < allCards.length; i++) {
			$('.deck').append($('<li class="card"><img src=' + allCards[i].src + ' /></li>'))
			$('.card').find('img').hide();
			
		}
		cardVerification();
	}
	else{
		
		alert("Please enter your name and choose the level to begin.");
		
	}
}

// This function adds a score from 1 to 5 pokeballs depending on the amount of moves done and the time passed.
function score() {
	
    var pokeballs = 0;
	
    if ((seconds == 60 || moves >= pokeball_1)){
        $('#pokeball_1').hide();
		pokeballs = 0
	} else if ((seconds >= 50 && seconds < 60)||(moves >= pokeball_2 && moves < pokeball_1)){
        $('#pokeball_2').hide();
		pokeballs = 1
	} else if ((seconds >= 40 && seconds < 50) || (moves >= pokeball_3 && moves < pokeball_2)){
        $('#pokeball_3').hide();
		pokeballs = 2
    } else if ((seconds >= 30 && seconds < 40) || (moves >= pokeball_4 && moves < pokeball_3)){
        $('#pokeball_4').hide();
		pokeballs = 3
	} else if ((seconds >= 20 && seconds < 30) || (moves >= pokeball_5 && moves < pokeball_4)){
        $('#pokeball_5').hide();
		pokeballs = 4
    }
	else if ((seconds < 20) || (moves < pokeball_5)){
		pokeballs = 5
    }
	
    return pokeballs;
}

//this function shows the messages according of the results of the game.
function gameOver(){
	
	if (finalScore == 5){
		
		if(gameLevel == "hard"){
			
			var nextLevelAnswer = alert(userName + ":\nIn " + seconds + " seconds, you did a total of " 
											+ moves + " moves. \nYou got a score of " + finalScore + " pokeballs"
											+ ". The maximum score. Congratulations!!! \n\n You have completed all the levels. You are a Pokemon Hunter!!!");	
			window.location.reload();		

		}
		else{
			var nextLevelAnswer = confirm(userName + ":\nIn " + seconds + " seconds, you did a total of "
											+ moves + " moves. \nYou got a score of " + finalScore + " pokeballs"
											+ ". The maximum score. Congratulations!!! \n\n Do you want to go to the next level?");
										  
			if (gameLevel == "easy"){
				nextLevel = "medium";
			}
			else if(gameLevel == "medium"){
				nextLevel = "hard";
			}
		}	
	}	
	else if (finalScore == 4){
		
		if(gameLevel == "hard"){
			var nextLevelAnswer = alert(userName + ":\nIn " + seconds + " seconds, you did a total of " 
											+ moves + " moves. \nYou got a score of " + finalScore + " pokeballs" 
											+ ". Well Done!!! \n\n You have completed all the levels. You are a Pokemon Hunter!!!");	
			window.location.reload();		
											
		}
		else{
			var nextLevelAnswer = confirm(userName + ":\nIn " + seconds + " seconds, you did a total of "
											+ moves + " moves. \nYou got a score of " + finalScore + " pokeballs"
											+ ".  Well Done!!! \n\n Do you want to go to the next level?");
										  
			if (gameLevel == "easy"){
				nextLevel = "medium";
			}
			else if(gameLevel == "medium"){
				nextLevel = "hard";
			}
		}	
	}
	else if (finalScore == 3){

		if(gameLevel == "hard"){
			var nextLevelAnswer = alert(userName + ":\nIn " + seconds + " seconds, you did a total of " 
											+ moves + " moves. \nYou got a score of " + finalScore + " pokeballs"
											+ ". Not too bad. \n\n You have completed all the levels. You are a Pokemon Hunter!!!");	
			window.location.reload();		
											
		}
		else{
			var nextLevelAnswer = confirm(userName + ":\nIn " + seconds + " seconds, you did a total of "
											+ moves + " moves. \nYou got a score of " + finalScore + " pokeballs"
											+ ". Not too bad. \n\n Do you want to go to the next level?");
										  
			if (gameLevel == "easy"){
				nextLevel = "medium";
			}
			else if(gameLevel == "medium"){
				nextLevel = "hard";
			}
		}
	}
	else if (finalScore == 2){
			var nextLevelAnswer = confirm(userName + ":\nIn " + seconds + " seconds, you did a total of "
											+ moves + " moves. \nYou got a score of " + finalScore + " pokeballs"
											+ ". You should practice more!!! \n\n Do you want to play again?");
		
		if (gameLevel == "easy"){
			nextLevel = "easy";
		}
		else if(gameLevel == "medium"){
			nextLevel = "medium";
		}
		else if(gameLevel == "hard"){
			nextLevel = "hard";
		}

	}
	else if (finalScore == 1){
			var nextLevelAnswer = confirm(userName + ":\nIn " + seconds + " seconds, you did a total of "
											+ moves + " moves. \nYou got a score of " + finalScore + " pokeballs"
											+ ". So bad!!! \n\n Do you want to play again?");
		
		if (gameLevel == "easy"){
			nextLevel = "easy";
		}
		else if(gameLevel == "medium"){
			nextLevel = "medium";
		}
		else if(gameLevel == "hard"){
			nextLevel = "hard";
		}
	}
	
	else if (finalScore == 0){
			var nextLevelAnswer = confirm("GAME OVER " + userName + "\nDo you want to try again?");
		
		if (gameLevel == "easy"){
			nextLevel = "easy";
		}
		else if(gameLevel == "medium"){
			nextLevel = "medium";
		}
		else if(gameLevel == "hard"){
			nextLevel = "hard";
		}
	}
	
	if (nextLevelAnswer !== false){
			begin();
	}
	else{
		window.location.reload();		
	}

}

//Action on Restart button.
$('.restart').bind('click', function (){
    begin();
});

//Action on End Game button.
$('.end_game').bind('click', function (){
	window.location.reload();		
});

// This function validate each card. If it is an equal match to another card, they stay open.
// If the cards do not match, both cards are flipped back over.
function cardVerification() {
	$window = $(window);
	windowsize = $window.width();

    // The card clicked is flipped.
    $('.deck').find('.card').click(function (){

		$(this).find('img').show();

		if (windowsize > 600){

		}
		else if (windowsize > 339){
			$(this).find('img').css('height', '60px')
			$(this).find('img').css('width', '60px')
		}
		else{
			$(this).find('img').css('height', '52px')
			$(this).find('img').css('width', '52px')
		}
		
        $(this).addClass('open show');

		
		if (openCard == ""){
			openCard = $(this).find('img').attr('src');
		}
		else{
			
			if ($(this).find('img').attr('src') === openCard){
                $('.deck').find('.open').addClass('match');
				$('.match').find('img').show();

                setTimeout(function (){
                    $('.deck').find('open').removeClass('open show');

                }, wait);
                match++;
				

            // If cards are not matched, the cards will turn back cover up.
            } else {
                $('.deck').find('.open').addClass('notmatch');
                setTimeout(function (){
                    $('.deck').find('.open').removeClass('open show');
					$('.notmatch').find('img').hide();
					$('.match').find('img').show();

					
                }, wait / 1.5);

            }

			openCard = "";
			
            moves++;

            score();
			
			$('.moves').html('Moves: ' + moves);
        
		}
            

        // The game is finished when all the cards have been matched.
        if (totalCard === match) {
            finalScore = score();
            setTimeout(gameOver, 500);
        }
    });
}

//Function for timing.
function secondHasPassed(){
	seconds++; 
	$window = $(window);
	windowsize = $window.width();

	if (gameLevel == "easy") {
		if (windowsize > 600){
			$('.deck').css('height', '340px')
		}
		else if(windowsize > 339){
			$('.deck').css('height', '200px')
		}
		else{
			$('.deck').css('height', '160px')
		}

		$('#game').css('top', '10%')
	}


	else if(gameLevel == "medium"){
		if (windowsize > 600){
			$('.deck').css('height', '510px')
		}
		else if (windowsize > 339){
			$('.deck').css('height', '280px')
		}
		else{
			$('.deck').css('height', '250px')
		}
		$('#game').css('top', '7%')

	}
	else{
		$('.deck').css('height', '680px')
		if (windowsize > 600){
			$('.deck').css('height', '680px')
		}
		else if (windowsize > 339){
			$('.deck').css('height', '350px')
		}
		else{
			$('.deck').css('height', '300px')
		}
		$('#game').css('top', '0%')
	}





	$('.time').text('Time: ' + seconds + ' s');
	
	if (seconds === 61){
		seconds = 60;
		stopTimer(nowTime);

		gameOver();

	}
	
	finalScore = score();

}


// This function initiates the timer whren the game is loaded.
function initTime() {
    nowTime = setInterval(secondHasPassed, 1000);
}

// This function resets the timer when the game ends or is restarted.
function stopTimer(timer){
	clearInterval(timer);
}

