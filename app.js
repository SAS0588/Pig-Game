/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

Challenge:
- Roll Dice functionality

*/

var scores, roundScore, activePlayer, gamePlaying;

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

// hides the dice. this appends the CSS and changes the display attribute for this class.
    document.querySelector('.dice').style.display = 'none';

// sets the score and current score to 0;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


function nextPlayer(){
    // Next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // same as:
        //if (activePlayer === 0){
            //activePlayer = 1;
        //} else {
            //activePlayer = 0;
        //}
        // set round score to 0 (since we lose all of our points)
        roundScore = 0;
        
        // sets the current score to 0
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        // switches the red dot next to player to indicate whose turn it is now
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        
        // removes the dice image
        document.querySelector('.dice').style.display = 'none';
        
    }

//*********** Event Listeners **************//
// adds an event listener to the button. it waits for a click and then invokes the function.

// ROLL BUTTON //
document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if (gamePlaying) {
        // 1. Creates a random number from 1 - 6
        var dice = Math.floor(Math.random() * 6) + 1; 

        // 2. Display the results
        var diceDOM = document.querySelector('.dice'); // we can set a selection as a variable so we don't have to keep typing things up.
        diceDOM.style.display = 'block'; // then use the variable to manipulate the DOM - this just makes it more time efficient to type.
        diceDOM.src = 'dice-' + dice + '.png'; // this is setting the src to the dice number we roll. this helps to select the right dice picture and display it on the screen. 

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            // Add score
            roundScore += dice; // shorthand way of saying roundScore = roundScore + dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore; // sets the current score to display on screen.
        } else {
            nextPlayer();
        }
    }    
});
    
// HOLD BUTTON //
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        // add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'; // player texts turns into winner
            document.querySelector('.dice').style.display = 'none'; // dice disappears
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); 
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

// NEW GAME BUTTON //
document.querySelector('.btn-new').addEventListener('click', init);