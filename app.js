/*
Game Rules 
- User enter random number between 10 - 20
- If user guesses correct number game is over - they win
- If user enter incorrect number they get 3 chances to enter correct number 
- User gets to play again after game is over
*/

let low = 10,
    high = 20,
    numGuess = 3,
    errorMsg,
    winNum = RandomNum();

// UI elements
const container = document.querySelector('.container'),
       gamer = document.querySelector('#gamer'),
       guessBtn = document.querySelector('#button-addon2'),
       userInput = document.querySelector('#userInput'),
       message = document.querySelector('.message');


// Play again event listener
gamer.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again'){
    // Window reload
    window.location.reload();
  }
});
//Guess button event listener
guessBtn.addEventListener('click', function() {

//User guess
 let guess = parseInt(userInput.value);
//Validation
if(isNaN(guess) || guess < low || guess > high){
errorMessage(`Please enter a number between ${low} and ${high}`);
}

// Compare user Input to winning number 
if(guess === winNum){
  gameOver(true, `You got the correct number, YOU WIN!!!`);
} else {
  numGuess -=1;
  setMessage(`Sorry buddy, wrong guess you have ${numGuess} left`, 'red');
}

//Number of guess equal 0
if(numGuess === 0){
  gameOver(false, `Sorry you have exhausted all your guess attempts, correct guess was ${winNum}`);
}
});

//Get Random Number Function
function RandomNum() {
  let ranNum = Math.floor(Math.random()*(high-low) + low);
  return ranNum;
}
//Game over function 
function gameOver(win, msg) {
  let color;
  if(win === true){
    color = 'green';
  } else {
    color = 'red';
  }
  
  //Guess input border color
  userInput.style.borderColor = color;
  // Message color 
  message.style.color = color;
  // Set message color
  message.textContent = msg;

  //Play again
  guessBtn.textContent = 'Play again';
  guessBtn.className = 'play-again';
}
//Set message function
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
  userInput.value = '';
}
//Error message function
function errorMessage(x){
  //Create error message
  errorMsg = document.createElement('p');
  errorMsg.className = 'alert alert-danger';
  errorMsg.appendChild(document.createTextNode(x));
  container.insertBefore(errorMsg, gamer);
  userInput.value = '';

  //Clear error message
  setTimeout(clearMessage,2000);
}

//Clear Message function
function clearMessage() {
 document.querySelector('.alert').remove();
}

